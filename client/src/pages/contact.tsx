import Legal from "@/components/layout/Legal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission for mockup
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Legal title="Contact Us">
      <p className="text-muted-foreground mb-8">
        Have questions, feedback, or found a bug? We'd love to hear from you. Fill out the form below and we'll try to respond as soon as possible.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <Input id="name" required placeholder="John Doe" className="bg-white/5 border-white/10" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <Input id="email" type="email" required placeholder="john@example.com" className="bg-white/5 border-white/10" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject</label>
              <Input id="subject" required placeholder="How can we help?" className="bg-white/5 border-white/10" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
              <Textarea id="message" required placeholder="Your message here..." className="bg-white/5 border-white/10 min-h-[120px]" />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Direct Email</h3>
            <p className="text-muted-foreground text-sm">
              Prefer to email us directly? You can reach us at:
            </p>
            <a href="mailto:hello@ytthumbpro.com" className="text-primary hover:underline mt-2 inline-block font-medium">
              hello@ytthumbpro.com
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-semibold mb-2">FAQ</h3>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-sm">Is this service really free?</h4>
                <p className="text-xs text-muted-foreground mt-1">Yes, completely free with no ads or hidden charges.</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Do you store the downloaded images?</h4>
                <p className="text-xs text-muted-foreground mt-1">No, the images are fetched directly from YouTube's servers to your browser.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Legal>
  );
}
