import { Youtube, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(10);

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Abstract Background Effects */}
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      
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
          
          <Link href="/">
             <span className="md:hidden text-sm font-medium text-primary">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 md:pt-20 pb-24 w-full max-w-5xl mx-auto z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">Creator <span className="text-gradient">Resources & SEO Guides</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The ultimate knowledge base for YouTubers. Learn how to optimize your thumbnails, increase your Click-Through Rate (CTR), and master the algorithm. 
            We have 50 comprehensive guides covering everything you need to know.
          </p>
        </motion.div>

        {/* Blog Post Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 10) * 0.05 }}
                className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(255,42,85,0.15)] flex flex-col h-full cursor-pointer bg-white/[0.01] hover:bg-white/[0.03]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3 text-xs text-primary font-bold tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
                    <span>{post.category}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    {post.readTime} read
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow text-sm md:text-base">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-auto pt-4 border-t border-white/5">
                  Read full article <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {visiblePosts < blogPosts.length && (
          <div className="mt-12 text-center w-full">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-8 shadow-xl"
              onClick={() => setVisiblePosts(prev => Math.min(prev + 10, blogPosts.length))}
            >
              Load More Articles ({blogPosts.length - visiblePosts} remaining)
            </Button>
          </div>
        )}
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
          
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors py-1">Home</Link>
            <Link href="/blog" className="text-foreground py-1">Blog</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors py-1">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors py-1">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors py-1">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
