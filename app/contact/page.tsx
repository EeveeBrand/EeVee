"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-editorial tracking-wider mb-4">CONTACT US</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-editorial tracking-wider">GET IN TOUCH</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-none"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-none"
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="rounded-none"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] rounded-none"
                  />
                </div>

                <Button type="submit" className="w-full rounded-none" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </motion.div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-editorial tracking-wider">CONTACT INFORMATION</h2>
                <p className="text-muted-foreground">You can also reach us through these channels.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Fashion Street
                      <br />
                      Los Angeles, CA 90210
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">
                      info@eevee.com
                      <br />
                      support@eevee.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">
                      +1 (213) 456-7890
                      <br />
                      Monday-Friday, 9am-6pm PST
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t">
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {["Instagram", "Twitter", "Facebook", "TikTok"].map((platform) => (
                    <motion.a
                      key={platform}
                      href={`#${platform.toLowerCase()}`}
                      className="px-4 py-2 border border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {platform}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Map */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16">
            <div className="aspect-[21/9] bg-muted relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1616201876575!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="EeVee Location"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-editorial tracking-wider mb-4">FREQUENTLY ASKED QUESTIONS</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: "How long does shipping take?",
                  a: "Domestic orders typically take 3-5 business days. International shipping can take 7-14 business days depending on the destination.",
                },
                {
                  q: "What is your return policy?",
                  a: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for domestic orders.",
                },
                {
                  q: "How do I track my order?",
                  a: "Once your order ships, you'll receive a confirmation email with tracking information that you can use to monitor your delivery.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.",
                },
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Didn't find what you're looking for?{" "}
                <a href="#" className="text-primary hover:underline">
                  Check our full FAQ page
                </a>{" "}
                or contact us directly.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

