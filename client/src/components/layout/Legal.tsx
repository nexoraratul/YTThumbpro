import { Youtube } from "lucide-react";
import { Link } from "wouter";

export default function Legal({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="w-full border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">YTThumb<span className="text-primary">Pro</span></span>
          </Link>
          
          <Link href="/">
             <span className="text-sm font-medium text-primary hover:underline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 pb-24 w-full max-w-3xl mx-auto z-10 relative">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 w-full">{title}</h1>
        
        <div className="w-full prose prose-invert prose-primary max-w-none">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 mt-auto bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} YTThumbPro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
