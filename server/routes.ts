import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify().catch((error: any) => {
  console.warn("Email transporter verification failed:", error.message);
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store the submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Prepare email content
      const serviceMap = {
        staffing: "Staffing Solutions",
        executive: "Executive Search", 
        both: "Both Services",
        consultation: "Consultation"
      };

      const emailContent = `
        New Contact Form Submission - Pyramid HR
        
        Contact Information:
        Name: ${validatedData.firstName} ${validatedData.lastName}
        Email: ${validatedData.email}
        Company: ${validatedData.company}
        Service Interest: ${serviceMap[validatedData.service]}
        
        Message:
        ${validatedData.message}
        
        Submitted at: ${new Date().toLocaleString()}
      `;

      // Send notification email
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to: process.env.TO_EMAIL || "hello@talentpro.com",
          subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
          text: emailContent,
          html: emailContent.replace(/\n/g, "<br>"),
        });
        
        console.log("Contact form email sent successfully");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails, just log it
      }

      // Send auto-reply to customer
      try {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to: validatedData.email,
          subject: "Thank you for contacting Pyramid HR",
          text: `Dear ${validatedData.firstName},

Thank you for your interest in Pyramid HR. We have received your inquiry regarding ${serviceMap[validatedData.service]}.

Our team will review your message and get back to you within 24 hours with more information about how we can help with your hiring needs.

Best regards,
The Pyramid HR Team`,
          html: `
            <p>Dear ${validatedData.firstName},</p>
            <p>Thank you for your interest in <strong>Pyramid HR</strong>. We have received your inquiry regarding <strong>${serviceMap[validatedData.service]}</strong>.</p>
            <p>Our team will review your message and get back to you within 24 hours with more information about how we can help with your hiring needs.</p>
            <p>Best regards,<br>The Pyramid HR Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send auto-reply:", emailError);
      }

      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get contact submissions (for admin use)
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Failed to get contact submissions:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to retrieve contact submissions" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
