import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertContactSubmissionSchema,
  type InsertContactSubmission,
} from "@/lib/schema";
import {
  Users,
  Search,
  Lightbulb,
  Network,
  UserCheck,
  Handshake,
  Zap,
  Award,
  Building,
  Heart,
  Phone,
  Mail,
  MapPin,
  Send,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

function TestimonialCarousel() {
  const testimonials = [
    {
      text: "It's been fantastic working with Pyramid over the past several years, guiding us and advising us on a number of key hires. If you're looking for strategic HR advice or expert help hiring strong leaders, turn to Chandra.",
      author: "Paul Needham",
      title: "CEO @ Arca",
    },
    {
      text: "Pyramid is a bunch of very intelligent and a result-oriented persons. They not just care but put that extra effort and walks the extra mile to make things happen. Their attitude, clarity of thoughts and vision is remarkable and also a benchmark for other staffing firms to follow. People like him are very rare in the corporate world. One would always want to opt him as an ideal.",
      author: "Kumkum Aggarwal",
      title: "Director Talent Acquisition-Group Head TA Global",
    },
    {
      text: "Pyramid is adept at volume hiring, Niche Hiring and Search. Very Rare to find a firm who does a sterling job in all three areas. If you have critical needs Pyramid is your go to Company",
      author: "Amit Jain",
      title: "VP Engineering | Ex-Amazon",
    },
    {
      text: "Pyramid has been able to find us Human before Resource – so much of value to the Hospitality Industry.",
      author: "Sanjay Singh",
      title: "GM Radisson Hotel",
    },
    {
      text: "Pyramid has been our only successful partner when others fail. Pyramid scores distinction. Thoroughly enjoyed their work in our niche hiring.",
      author: "Amit Saxena",
      title: "CEO Sarus, Atlanta USA",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Card
      className="p-6 shadow-lg border border-border"
      data-testid="testimonial-card"
    >
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
            <span className="text-accent-foreground text-sm">"</span>
          </div>
          <h4 className="text-lg font-semibold text-card-foreground">
            Client Testimonials
          </h4>
        </div>
        <div className="relative min-h-[120px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              data-testid={`testimonial-${index}`}
            >
              <p className="text-muted-foreground italic mb-4">
                "{testimonial.text}"
              </p>
              <div className="text-sm text-muted-foreground">
                — {testimonial.author}, {testimonial.title}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-accent" : "bg-muted-foreground/30"
              }`}
              data-testid={`testimonial-dot-${index}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      service: undefined,
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      // For frontend-only mode, we'll simulate a successful submission
      // In a real scenario, you would integrate with a third-party service
      // like Formspree, Netlify Forms, or EmailJS
      console.log("Contact form submission:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true, message: "Form submitted successfully" };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for your interest. We'll be in touch within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("bg-background/95", "backdrop-blur-md");
        } else {
          navbar.classList.remove("bg-background/95", "backdrop-blur-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary flex items-center">
                <Users className="mr-2" size={28} />
                Pyramid HR
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-foreground hover:text-accent transition-colors"
                  data-testid="nav-about"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-foreground hover:text-accent transition-colors"
                  data-testid="nav-services"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("process")}
                  className="text-foreground hover:text-accent transition-colors"
                  data-testid="nav-process"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("why-us")}
                  className="text-foreground hover:text-accent transition-colors"
                  data-testid="nav-why-us"
                >
                  Why Us
                </button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="gradient-btn"
                  data-testid="nav-contact"
                >
                  Contact
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-background border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("about")}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
                  data-testid="mobile-nav-about"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
                  data-testid="mobile-nav-services"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("process")}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
                  data-testid="mobile-nav-process"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("why-us")}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-colors w-full text-left"
                  data-testid="mobile-nav-why-us"
                >
                  Why Us
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block px-3 py-2 text-accent font-medium w-full text-left"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1
                className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
                data-testid="hero-title"
              >
                Connecting Companies with{" "}
                <span className="text-accent-foreground">Top Talent</span>
              </h1>
              <p
                className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl"
                data-testid="hero-subtitle"
              >
                Expert staffing solutions and executive search services that
                deliver exceptional candidates for your most critical roles.
                Building lasting partnerships through quality placements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hover-lift"
                  onClick={() => scrollToSection("contact")}
                  data-testid="hero-cta-primary"
                >
                  Get Started Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => scrollToSection("about")}
                  data-testid="hero-cta-secondary"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional business team collaborating"
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Executive meeting in boardroom"
                className="rounded-2xl shadow-xl w-full h-auto"
                data-testid="about-image"
              />
            </div>
            <div>
              <h2
                className="text-4xl font-bold text-foreground mb-6"
                data-testid="about-title"
              >
                About Pyramid HR
              </h2>
              <p
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
                data-testid="about-description"
              >
                With over{" "}
                <span className="text-accent font-semibold">15 years</span> of
                experience in recruitment and executive search, we've
                successfully placed thousands of professionals across diverse
                industries.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our team of seasoned recruiters combines deep industry knowledge
                with innovative sourcing strategies to identify and attract
                top-tier talent for your organization.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center" data-testid="stat-placements">
                  <div className="text-3xl font-bold text-primary mb-2">
                    2,500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Successful Placements
                  </div>
                </div>
                <div className="text-center" data-testid="stat-clients">
                  <div className="text-3xl font-bold text-primary mb-2">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Satisfied Clients
                  </div>
                </div>
                <div className="text-center" data-testid="stat-industries">
                  <div className="text-3xl font-bold text-primary mb-2">
                    25+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Industries Served
                  </div>
                </div>
                <div className="text-center" data-testid="stat-retention">
                  <div className="text-3xl font-bold text-primary mb-2">
                    95%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Client Retention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-foreground mb-6"
              data-testid="services-title"
            >
              Our Services
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="services-description"
            >
              Comprehensive recruitment solutions tailored to meet your unique
              hiring challenges and organizational goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className="service-card p-8 hover-lift"
              data-testid="service-staffing"
            >
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Users
                    className="text-2xl text-primary-foreground"
                    size={32}
                  />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  Staffing Solutions
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Comprehensive staffing services for temporary, permanent, and
                  contract positions. We handle everything from entry-level
                  roles to specialized technical positions across multiple
                  industries.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      Temporary & Contract Staffing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      Direct Hire Placements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      Specialized Technical Roles
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="service-card p-8 hover-lift"
              data-testid="service-executive"
            >
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6">
                  <Search
                    className="text-2xl text-accent-foreground"
                    size={32}
                  />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  Executive Search
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Confidential executive search services for C-suite, VP, and
                  director-level positions. Our proven methodology ensures we
                  find leaders who drive organizational success.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      C-Suite & Executive Roles
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      Confidential Search Process
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-accent mr-3 mt-1" size={16} />
                    <span className="text-card-foreground">
                      Leadership Assessment
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-foreground mb-6"
              data-testid="process-title"
            >
              Our Proven Process
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="process-description"
            >
              A systematic approach that ensures we find the right talent for
              your organization every time.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div
              className="process-step text-center"
              data-testid="process-step-1"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb
                  className="text-2xl text-primary-foreground"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Understanding Needs
              </h3>
              <p className="text-muted-foreground">
                We dive deep into your company culture, role requirements, and
                strategic objectives to ensure perfect alignment.
              </p>
            </div>
            <div
              className="process-step text-center"
              data-testid="process-step-2"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Network
                  className="text-2xl text-accent-foreground"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Sourcing Talent
              </h3>
              <p className="text-muted-foreground">
                Leveraging our extensive network and advanced sourcing
                techniques to identify qualified candidates.
              </p>
            </div>
            <div
              className="process-step text-center"
              data-testid="process-step-3"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck
                  className="text-2xl text-primary-foreground"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Comprehensive Screening
              </h3>
              <p className="text-muted-foreground">
                Rigorous evaluation including skills assessment, cultural fit
                analysis, and reference verification.
              </p>
            </div>
            <div
              className="process-step text-center"
              data-testid="process-step-4"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake
                  className="text-2xl text-accent-foreground"
                  size={32}
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Successful Placement
              </h3>
              <p className="text-muted-foreground">
                Facilitating smooth onboarding and providing ongoing support to
                ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold text-foreground mb-6"
                data-testid="why-us-title"
              >
                Why Choose Pyramid HR?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We go beyond traditional recruiting to become your strategic
                talent acquisition partner.
              </p>
              <div className="space-y-6">
                <div className="flex items-start" data-testid="benefit-speed">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                    <Zap className="text-accent-foreground" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Lightning-Fast Results
                    </h3>
                    <p className="text-muted-foreground">
                      Average time-to-fill of just 14 days, significantly faster
                      than industry standards without compromising quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start" data-testid="benefit-quality">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                    <Award className="text-primary-foreground" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Premium Quality Candidates
                    </h3>
                    <p className="text-muted-foreground">
                      Rigorous vetting process ensures only the top 5% of
                      candidates are presented to your organization.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start"
                  data-testid="benefit-expertise"
                >
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                    <Building className="text-accent-foreground" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Deep Industry Expertise
                    </h3>
                    <p className="text-muted-foreground">
                      Specialized recruiters with years of experience in
                      technology, healthcare, finance, and manufacturing
                      sectors.
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-start"
                  data-testid="benefit-partnerships"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                    <Heart className="text-primary-foreground" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Long-Term Partnerships
                    </h3>
                    <p className="text-muted-foreground">
                      95% client retention rate built on trust, transparency,
                      and consistently exceeding expectations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
                alt="Modern office environment"
                className="rounded-2xl shadow-lg w-full h-auto"
                data-testid="why-us-image"
              />

              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-foreground mb-6"
              data-testid="contact-title"
            >
              Ready to Find Your Next Star?
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="contact-description"
            >
              Let's discuss your hiring needs and how we can help you build an
              exceptional team.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional handshake representing partnership"
                className="rounded-2xl shadow-lg w-full h-auto mb-8"
                data-testid="contact-image"
              />

              <div className="space-y-6">
                <div className="flex items-center" data-testid="contact-phone">
                  <Phone className="text-accent mr-4" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-muted-foreground">
                      +91 956 0483 444
                    </div>
                  </div>
                </div>
                <div className="flex items-center" data-testid="contact-email">
                  <Mail className="text-accent mr-4" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-muted-foreground">
                      gautam@pyramid-hr.com
                    </div>
                  </div>
                </div>
                <div className="flex items-start" data-testid="contact-address">
                  <MapPin className="text-accent mr-4 mt-1" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">Address</div>
                    <div className="text-muted-foreground">
                      Suite 5 104 Beverly Park, Dwarka
                      <br />
                      New Delhi 110077
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card
                className="p-8 shadow-lg border border-border"
                data-testid="contact-form"
              >
                <CardContent className="p-0">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium text-card-foreground"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          placeholder="John"
                          className="mt-2"
                          data-testid="input-firstName"
                        />
                        {form.formState.errors.firstName && (
                          <p
                            className="text-destructive text-sm mt-1"
                            data-testid="error-firstName"
                          >
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium text-card-foreground"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          placeholder="Doe"
                          className="mt-2"
                          data-testid="input-lastName"
                        />
                        {form.formState.errors.lastName && (
                          <p
                            className="text-destructive text-sm mt-1"
                            data-testid="error-lastName"
                          >
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="john.doe@company.com"
                        className="mt-2"
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p
                          className="text-destructive text-sm mt-1"
                          data-testid="error-email"
                        >
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="company"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Company
                      </Label>
                      <Input
                        id="company"
                        {...form.register("company")}
                        placeholder="Your Company Name"
                        className="mt-2"
                        data-testid="input-company"
                      />
                      {form.formState.errors.company && (
                        <p
                          className="text-destructive text-sm mt-1"
                          data-testid="error-company"
                        >
                          {form.formState.errors.company.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="service"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Service Interest
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("service", value as any)
                        }
                        value={form.watch("service")}
                      >
                        <SelectTrigger
                          className="mt-2"
                          data-testid="select-service"
                        >
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="staffing">
                            Staffing Solutions
                          </SelectItem>
                          <SelectItem value="executive">
                            Executive Search
                          </SelectItem>
                          <SelectItem value="both">Both Services</SelectItem>
                          <SelectItem value="consultation">
                            Consultation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.service && (
                        <p
                          className="text-destructive text-sm mt-1"
                          data-testid="error-service"
                        >
                          {form.formState.errors.service.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-card-foreground"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        rows={4}
                        placeholder="Tell us about your hiring needs..."
                        className="mt-2 resize-none"
                        data-testid="input-message"
                      />
                      {form.formState.errors.message && (
                        <p
                          className="text-destructive text-sm mt-1"
                          data-testid="error-message"
                        >
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="gradient-btn w-full shadow-lg"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit"
                    >
                      {contactMutation.isPending
                        ? "Sending..."
                        : "Send Message"}
                      <Send className="ml-2" size={16} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4 flex items-center">
                <Users className="mr-2" size={28} />
                Pyramid HR
              </div>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Your trusted partner in talent acquisition and executive search.
                Building exceptional teams for exceptional companies.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/hi2gautam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Staffing Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Executive Search
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Contract Staffing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © 2024 Pyramid HR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
