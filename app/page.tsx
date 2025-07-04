"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { WorkflowModal } from "@/components/workflow-modal"
import { CustomizationModal } from "@/components/customization-modal"
import { MobileNav } from "@/components/mobile-nav"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { useKeyboardNavigation, scrollToSection } from "@/components/keyboard-nav"
import { useScrollSpy } from "@/components/scroll-spy"
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Workflow,
  Zap,
  Users,
  Settings,
  Database,
  Cloud,
  Keyboard,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

const freeWorkflows = [
  {
    title: "Google Drive Duplicate File Manager",
    description: "Automatically detect and manage duplicate files in Google Drive with smart organization and cleanup.",
    longDescription:
      "This workflow helps you maintain a clean and organized Google Drive by automatically detecting duplicate files, organizing them into designated folders, and providing options for cleanup. Perfect for individuals and small teams who want to optimize their cloud storage without manual effort.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Popular",
    tagColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    link: "https://n8n.io/workflows/3512-google-drive-duplicate-file-manager/",
    category: "File Management",
    stats: {
      downloads: "1.2K+",
      rating: "4.8",
      users: "850+",
    },
    features: [
      "Automatic duplicate detection using file hashes",
      "Smart folder organization and categorization",
      "Configurable cleanup rules and policies",
      "Detailed reporting and logging",
      "Integration with Google Drive API",
      "Batch processing for large file sets",
    ],
  },
  {
    title: "Email Attachments to Google Drive Organizer",
    description: "Organize email attachments into Google Drive folders by company with Gmail and Sheets integration.",
    longDescription:
      "Streamline your document management by automatically extracting email attachments from Gmail and organizing them into Google Drive folders based on company or sender. Uses Google Sheets for configuration and tracking, making it perfect for businesses that receive many documents via email.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "New",
    tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    link: "https://n8n.io/workflows/3464-organize-email-attachments-into-google-drive-folders-by-company-with-gmail-and-sheets/",
    category: "Email Automation",
    stats: {
      downloads: "890+",
      rating: "4.9",
      users: "620+",
    },
    features: [
      "Gmail integration for attachment extraction",
      "Company-based folder organization",
      "Google Sheets configuration management",
      "Automatic file naming and categorization",
      "Duplicate handling and conflict resolution",
      "Email notification and reporting",
    ],
  },
  {
    title: "Social Media Scheduler",
    description: "Schedule and cross-post content across multiple social media platforms from a single source.",
    longDescription:
      "Manage your social media presence efficiently by scheduling posts across multiple platforms simultaneously. This workflow supports various content types and optimal posting times for maximum engagement.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Popular",
    tagColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Social Media",
    stats: {
      downloads: "2.1K+",
      rating: "4.7",
      users: "1.5K+",
    },
    features: [
      "Multi-platform posting (Twitter, LinkedIn, Facebook)",
      "Content scheduling and queue management",
      "Image and media handling",
      "Hashtag optimization",
      "Analytics and performance tracking",
      "Content calendar integration",
    ],
  },
  {
    title: "Invoice Reminder System",
    description: "Automatically send payment reminders and track invoice status across multiple clients.",
    longDescription:
      "Never miss a payment again with this comprehensive invoice management system that tracks due dates, sends automated reminders, and maintains client payment history.",
    image: "/placeholder.svg?height=300&width=500",
    tag: null,
    tagColor: "",
    link: "https://n8n.io/creators/vminev/",
    category: "Finance",
    stats: {
      downloads: "1.8K+",
      rating: "4.6",
      users: "1.2K+",
    },
    features: [
      "Automated reminder scheduling",
      "Multiple reminder templates",
      "Client payment history tracking",
      "Integration with accounting software",
      "Customizable reminder intervals",
      "Payment confirmation handling",
    ],
  },
  {
    title: "Lead Capture & Nurture",
    description: "Capture leads from forms and automatically add them to your CRM with follow-up sequences.",
    longDescription:
      "Transform your lead generation process with automated capture, qualification, and nurturing sequences that turn prospects into customers through personalized communication.",
    image: "/placeholder.svg?height=300&width=500",
    tag: null,
    tagColor: "",
    link: "https://n8n.io/creators/vminev/",
    category: "CRM",
    stats: {
      downloads: "1.5K+",
      rating: "4.8",
      users: "980+",
    },
    features: [
      "Multi-source lead capture",
      "CRM integration and data sync",
      "Automated email sequences",
      "Lead scoring and qualification",
      "Personalized content delivery",
      "Conversion tracking and analytics",
    ],
  },
  {
    title: "File Backup Automation",
    description: "Automatically backup important files to cloud storage with version control and notifications.",
    longDescription:
      "Ensure your important files are always safe with automated backup processes that include version control, integrity checks, and notification systems for peace of mind.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "New",
    tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Backup",
    stats: {
      downloads: "1.1K+",
      rating: "4.9",
      users: "750+",
    },
    features: [
      "Multi-cloud backup support",
      "Automated version control",
      "File integrity verification",
      "Scheduled and real-time backups",
      "Restoration and recovery tools",
      "Backup status notifications",
    ],
  },
]

const professionalWorkflows = [
  {
    title: "CRM-ERP Sync Pro",
    description:
      "Advanced bidirectional synchronization between your CRM and ERP systems with real-time data validation, conflict resolution, and comprehensive audit trails. Supports multiple data formats and custom field mapping.",
    longDescription:
      "Enterprise-grade synchronization solution that ensures your CRM and ERP systems work in perfect harmony. Features real-time bidirectional sync, advanced conflict resolution, and comprehensive audit trails for complete data integrity.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Enterprise Integration",
    stats: {
      downloads: "450+",
      rating: "5.0",
      users: "280+",
    },
    features: [
      "Real-time bidirectional synchronization",
      "Advanced conflict resolution algorithms",
      "Custom field mapping and transformation",
      "Comprehensive audit trails and logging",
      "Multi-format data support (JSON, XML, CSV)",
      "Enterprise security and compliance",
    ],
  },
  {
    title: "Automated Client Onboarding Suite",
    description:
      "Complete client onboarding automation including document collection, approval workflows, account setup, and welcome sequences. Integrates with legal, finance, and project management systems.",
    longDescription:
      "Streamline your client onboarding process with this comprehensive automation suite that handles everything from initial contact to project kickoff, ensuring consistent and professional client experiences.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Customizable",
    tagColor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Client Management",
    stats: {
      downloads: "320+",
      rating: "4.9",
      users: "190+",
    },
    features: [
      "Automated document collection and verification",
      "Multi-stage approval workflows",
      "Account and system provisioning",
      "Personalized welcome sequences",
      "Integration with legal and finance systems",
      "Progress tracking and notifications",
    ],
  },
  {
    title: "Multi-Channel Marketing Orchestrator",
    description:
      "Sophisticated marketing automation that coordinates campaigns across email, social media, SMS, and web platforms. Includes A/B testing, performance analytics, and dynamic content personalization.",
    longDescription:
      "Take your marketing to the next level with this comprehensive orchestration platform that manages campaigns across all channels, optimizes performance through A/B testing, and delivers personalized experiences at scale.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Marketing Automation",
    stats: {
      downloads: "680+",
      rating: "4.8",
      users: "420+",
    },
    features: [
      "Multi-channel campaign coordination",
      "Advanced A/B testing and optimization",
      "Dynamic content personalization",
      "Real-time performance analytics",
      "Customer journey mapping",
      "ROI tracking and attribution",
    ],
  },
  {
    title: "Enterprise Data Pipeline Manager",
    description:
      "Robust ETL processes for large-scale data integration, transformation, and loading. Features error handling, data quality checks, scheduling, and monitoring with enterprise-grade security.",
    longDescription:
      "Handle your enterprise data needs with this robust pipeline management system that ensures data quality, maintains security standards, and provides comprehensive monitoring and alerting capabilities.",
    image: "/placeholder.svg?height=300&width=500",
    tag: "Enterprise",
    tagColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    link: "https://n8n.io/creators/vminev/",
    category: "Data Management",
    stats: {
      downloads: "290+",
      rating: "5.0",
      users: "150+",
    },
    features: [
      "Large-scale ETL processing",
      "Advanced data quality validation",
      "Enterprise security and encryption",
      "Comprehensive monitoring and alerting",
      "Flexible scheduling and orchestration",
      "Data lineage and governance",
    ],
  },
]

const navigationSections = [
  { id: "free-workflows", label: "Free Workflows" },
  { id: "professional-workflows", label: "Professional Solutions" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export default function LandingPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false)
  const [selectedWorkflowForCustomization, setSelectedWorkflowForCustomization] = useState<any>(null)

  // Initialize keyboard navigation
  useKeyboardNavigation()

  // Get active section for navigation highlighting
  const activeSection = useScrollSpy(
    navigationSections.map((s) => s.id),
    150,
  )

  const openWorkflowModal = (workflow: any) => {
    setSelectedWorkflow(workflow)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedWorkflow(null)
  }

  const openCustomizationModal = (workflow: any) => {
    setSelectedWorkflowForCustomization(workflow)
    setIsCustomizationModalOpen(true)
    setIsModalOpen(false) // Close the workflow modal
  }

  const closeCustomizationModal = () => {
    setIsCustomizationModalOpen(false)
    setSelectedWorkflowForCustomization(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Workflow className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-slate-200 drop-shadow-sm">Ventsislav Minev</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  className={`transition-all duration-200 cursor-pointer rounded-md px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:bg-muted/50 transform hover:scale-105 ${
                    activeSection === section.id
                      ? "text-orange-500 font-semibold bg-orange-50 dark:bg-orange-950/20"
                      : "text-muted-foreground hover:text-orange-500"
                  }`}
                  onClick={() => scrollToSection(section.id, 100)}
                >
                  {section.label}
                </button>
              ))}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Keyboard className="h-3 w-3" />
                <span>j/k</span>
              </div>
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
          <div className="mt-2">
            <BreadcrumbNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-4 overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Automate Smarter: Discover
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block drop-shadow-sm">
                Powerful n8n Workflows
              </span>
            </h1>
            <div className="max-w-4xl mx-auto text-lg text-muted-foreground mb-8 leading-relaxed">
              <p className="mb-4">
                Hello, I'm <strong>Ventsislav Minev</strong>, IT Consultant and Freelancer from Sofia, Bulgaria. I help
                small and medium businesses simplify their operations through smart automation. Drawing on over 15 years
                of IT experience, I make powerful IT and Automation tools accessible and affordable by bringing
                enterprise-level expertise to your business no matter its size.
              </p>
              <p>
                My goal is simple: free up your time and resources so you can focus on what matters most. I firmly
                believe that everyone—not just big corporations—deserves access to reliable, affordable IT solutions and
                high-quality consulting.
              </p>
            </div>

            {/* Key Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-transparent hover:bg-muted/80 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                asChild
              >
                <a href="https://n8n.io/creators/vminev/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  My n8n Community Profile
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 bg-transparent hover:bg-muted/80 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/ventsislav-minev-a02919165/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  My LinkedIn Profile
                </a>
              </Button>
            </div>

            {/* Primary CTA */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              onClick={() => scrollToSection("free-workflows", 100)}
            >
              Explore My Workflows
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Free Workflows Section */}
      <section id="free-workflows" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm">
              Unlock Productivity with Our Free n8n Workflows
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready-to-use, powerful workflows designed for common tasks, perfect for individual users and those
              starting with automation. Get started immediately with these community-loved solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {freeWorkflows.map((workflow, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2 flex flex-col h-full"
                onClick={() => openWorkflowModal(workflow)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openWorkflowModal(workflow)
                  }
                }}
              >
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-orange-500 transition-colors duration-200">
                      {workflow.title}
                    </CardTitle>
                    {workflow.tag && <Badge className={workflow.tagColor}>{workflow.tag}</Badge>}
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    className="w-full bg-transparent hover:bg-muted/80 transition-all duration-200"
                    variant="outline"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-muted/80 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 bg-transparent"
              asChild
            >
              <a href="https://n8n.io/creators/vminev/" target="_blank" rel="noopener noreferrer">
                View All Free Workflows
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Workflows Section */}
      <section id="professional-workflows" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm">
              Elevate Your Business: Professional & Custom n8n Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Complex, robust workflows designed for teams and companies seeking deeper integration and efficiency.
              These solutions can be fully customized and supported to meet your specific business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {professionalWorkflows.map((workflow, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2 flex flex-col h-full"
                onClick={() => openWorkflowModal(workflow)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openWorkflowModal(workflow)
                  }
                }}
              >
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {index === 0 && <Database className="h-8 w-8 text-muted-foreground" />}
                      {index === 1 && <Users className="h-8 w-8 text-muted-foreground" />}
                      {index === 2 && <Zap className="h-8 w-8 text-muted-foreground" />}
                      {index === 3 && <Cloud className="h-8 w-8 text-muted-foreground" />}
                      <CardTitle className="text-xl group-hover:text-orange-500 transition-colors duration-200">
                        {workflow.title}
                      </CardTitle>
                    </div>
                    <Badge className={workflow.tagColor}>{workflow.tag}</Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent Card onClick
                      openCustomizationModal(workflow)
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Learn More & Request Customization
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-sm">
              Beyond Workflows: Your Expert Automation Partner
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group hover:bg-muted/30 p-4 rounded-lg transition-all duration-200">
                  <CheckCircle className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 drop-shadow-sm">Custom Development</h3>
                    <p className="text-muted-foreground">
                      Building bespoke automation solutions tailored to your unique business processes and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-muted/30 p-4 rounded-lg transition-all duration-200">
                  <CheckCircle className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 drop-shadow-sm">Consulting & Strategy</h3>
                    <p className="text-muted-foreground">
                      Identifying automation opportunities, designing comprehensive solutions, and conducting
                      infrastructure audits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:bg-muted/30 p-4 rounded-lg transition-all duration-200">
                  <CheckCircle className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 drop-shadow-sm">Reliability & Support</h3>
                    <p className="text-muted-foreground">
                      Ensuring your automations run smoothly with ongoing maintenance, monitoring, and optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-8 rounded-lg hover:bg-muted/70 transition-all duration-200">
              <h3 className="text-2xl font-bold mb-4 drop-shadow-sm">15+ Years of IT Excellence</h3>
              <p className="text-muted-foreground mb-6">
                With extensive experience in full-stack development, agile methodologies, ETL integrations, DevOps
                practices, system architecture, and SaaS solutions, I bring enterprise-level expertise to businesses of
                all sizes.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>DevOps & Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>ETL Integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span>SaaS Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-20 px-4 bg-slate-900 overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-slate-300">
              Let's discuss how custom automation can streamline your business processes
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto border border-slate-700 hover:bg-slate-800/90 transition-all duration-200">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-200">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-200">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-slate-200">
                  Company (Optional)
                </label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-200">
                  Project Details
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your automation needs, current challenges, or specific workflows you'd like to discuss..."
                  rows={4}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                Request Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Workflow className="h-6 w-6 text-purple-500" />
                <span className="text-lg font-bold text-slate-200 drop-shadow-sm">Ventsislav Minev</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making enterprise-level automation accessible to businesses of all sizes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 drop-shadow-sm">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors duration-200 focus:text-orange-500 focus:outline-none"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("free-workflows", 100)}
                    className="hover:text-foreground transition-colors duration-200 text-left focus:text-orange-500 focus:outline-none"
                  >
                    Free Workflows
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("professional-workflows", 100)}
                    className="hover:text-foreground transition-colors duration-200 text-left focus:text-orange-500 focus:outline-none"
                  >
                    Professional Workflows
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about", 100)}
                    className="hover:text-foreground transition-colors duration-200 text-left focus:text-orange-500 focus:outline-none"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact", 100)}
                    className="hover:text-foreground transition-colors duration-200 text-left focus:text-orange-500 focus:outline-none"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 drop-shadow-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors duration-200 flex items-center gap-2 focus:text-orange-500 focus:outline-none"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Notion Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors duration-200 flex items-center gap-2 focus:text-orange-500 focus:outline-none"
                  >
                    <Github className="h-3 w-3" />
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://n8n.io/creators/vminev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors duration-200 flex items-center gap-2 focus:text-orange-500 focus:outline-none"
                  >
                    <ExternalLink className="h-3 w-3" />
                    n8n Community Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 drop-shadow-sm">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>ventsislav@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3 w-3" />
                  <Link
                    href="https://www.linkedin.com/in/ventsislav-minev-a02919165/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors duration-200 focus:text-orange-500 focus:outline-none"
                  >
                    LinkedIn Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ventsislav Minev. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Workflow Modal */}
      {selectedWorkflow && (
        <WorkflowModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onRequestCustomization={() => openCustomizationModal(selectedWorkflow)}
          workflow={selectedWorkflow}
        />
      )}
      {/* Customization Modal */}
      {selectedWorkflowForCustomization && (
        <CustomizationModal
          isOpen={isCustomizationModalOpen}
          onClose={closeCustomizationModal}
          workflow={selectedWorkflowForCustomization}
        />
      )}
    </div>
  )
}
