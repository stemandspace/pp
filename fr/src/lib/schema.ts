import { z } from "zod";

// Contact form schema for frontend-only mode
export const insertContactSubmissionSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().min(1, "Company name is required"),
    service: z.enum(["staffing", "executive", "both", "consultation"], {
        required_error: "Please select a service",
    }),
    message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
