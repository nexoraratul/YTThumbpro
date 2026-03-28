import { Youtube, ArrowLeft, Clock, Tag, Search } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-posts";
import NotFound from "./not-found";
import { useEffect } from "react";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find(p => p.slug === params?.slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Abstract Background Effects */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <header className="w-full border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">YTThumb<span className="text-primary">Pro</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="text-foreground font-semibold">Blog</Link>
            <Link href="/api" className="hover:text-foreground transition-colors">API</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 pb-24 w-full max-w-3xl mx-auto z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Tag className="w-3 h-3" /> {post.category}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Clock className="w-4 h-4" /> {post.readTime} read
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="w-full h-[1px] bg-white/10 mb-10" />

          {/* Render HTML content safely since it's hardcoded mockup data */}
          <article 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 p-8 glass-panel border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to upgrade your thumbnails?</h3>
            <p className="text-muted-foreground mb-6">Use our free tool to analyze competitor thumbnails in maximum resolution.</p>
            <Link href="/">
              <button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                <Search className="w-4 h-4" /> Try YTThumbPro Now
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 mt-auto bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-lg tracking-tight flex items-center gap-2">
              <Youtube className="w-4 h-4 text-primary" /> YTThumb<span className="text-primary">Pro</span>
            </span>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} YTThumbPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
