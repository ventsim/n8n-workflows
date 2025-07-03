"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Building, User } from "lucide-react"
import { useState } from "react"

interface CustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  workflow: {
    title: string
    category: string
    tag?: string
    tagColor?: string
  }
}

export function CustomizationModal({ isOpen, onClose, workflow }: CustomizationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    timeline: "",
    budget: "",
    requirements: "",
    integrations: [] as string[],
    additionalServices: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Customization request:", { workflow: workflow.title, ...formData })
    // You could integrate with your preferred form service here
    alert("Thank you! Your customization request has been submitted. I'll get back to you within 24 hours.")
    onClose()
  }

  const handleIntegrationChange = (integration: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        integrations: [...prev.integrations, integration],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        integrations: prev.integrations.filter((i) => i !== integration),
      }))
    }
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        additionalServices: [...prev.additionalServices, service],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalServices: prev.additionalServices.filter((s) => s !== service),
      }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">Request Customization</DialogTitle>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-muted-foreground">for</span>
            <Badge variant="secondary">{workflow.category}</Badge>
            <span className="font-semibold">{workflow.title}</span>
            {workflow.tag && <Badge className={workflow.tagColor}>{workflow.tag}</Badge>}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-purple-500" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Your company name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              Project Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customization">Workflow Customization</SelectItem>
                    <SelectItem value="integration">System Integration</SelectItem>
                    <SelectItem value="automation">Process Automation</SelectItem>
                    <SelectItem value="consulting">Automation Consulting</SelectItem>
                    <SelectItem value="training">Training & Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeline">Desired Timeline</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                    <SelectItem value="1-2months">1-2 months</SelectItem>
                    <SelectItem value="3+months">3+ months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range (Optional)</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1k">Under $1,000</SelectItem>
                  <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k+">$25,000+</SelectItem>
                  <SelectItem value="discuss">Prefer to discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Specific Requirements</h3>
            <div>
              <Label htmlFor="requirements">Describe your automation needs *</Label>
              <Textarea
                id="requirements"
                required
                value={formData.requirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                placeholder="Please describe your specific requirements, current challenges, desired outcomes, and any technical constraints..."
                rows={4}
              />
            </div>
          </div>

          {/* Integrations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Integrations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Google Workspace",
                "Microsoft 365",
                "Salesforce",
                "HubSpot",
                "Slack",
                "Discord",
                "Zapier",
                "Webhooks",
                "REST APIs",
                "Database (SQL)",
                "Airtable",
                "Notion",
                "Shopify",
                "WooCommerce",
                "Stripe",
                "PayPal",
                "Mailchimp",
                "Other CRM",
              ].map((integration) => (
                <div key={integration} className="flex items-center space-x-2">
                  <Checkbox
                    id={integration}
                    checked={formData.integrations.includes(integration)}
                    onCheckedChange={(checked) => handleIntegrationChange(integration, checked as boolean)}
                  />
                  <Label htmlFor={integration} className="text-sm">
                    {integration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Setup & Configuration",
                "Training & Documentation",
                "Ongoing Support & Maintenance",
                "Performance Monitoring",
                "Security Audit",
                "Data Migration",
              ].map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.additionalServices.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 via-purple-600 to-orange-400 hover:from-purple-600 hover:via-purple-700 hover:to-orange-500"
            >
              Submit Customization Request
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
