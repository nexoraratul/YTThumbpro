import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Youtube, 
  Check, 
  Copy,
  Search,
  Zap,
  ShieldBan,
  MonitorPlay,
  Menu,
  X,
  RefreshCw,
  ChevronDown,
  History,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";

// Helper to extract YouTube video ID
const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Available thumbnail qualities
const QUALITIES = [
  { id: "maxresdefault", name: "High Definition (HD)", width: 1280, height: 720 },
  { id: "hqdefault", name: "High Quality (HQ)", width: 480, height: 360 },
  { id: "mqdefault", name: "Medium Quality (MQ)", width: 320, height: 180 },
  { id: "default", name: "Standard Quality", width: 120, height: 90 },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("maxresdefault");
  const [copied, setCopied] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);
  const [recentVideos, setRecentVideos] = useState<string[]>([]);
  const { toast } = useToast();
  const [location] = useLocation();
  
  // Track valid image status
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Initialize recent videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ytthumb-recent");
    if (saved) {
      try {
        setRecentVideos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent videos");
      }
    }
  }, []);

  // Update document title for SEO
  useEffect(() => {
    document.title = "YTThumbPro - Download YouTube Thumbnails in High Quality";
  }, []);

  // Global Paste Listener - Pro Feature
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      // Don't interfere if they are already typing in an input or textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      const text = e.clipboardData?.getData('text');
      if (text && extractVideoId(text)) {
        e.preventDefault();
        setUrl(text);
        toast({
          title: "Link Auto-Detected!",
          description: "We intercepted a YouTube link from your clipboard.",
        });
      }
    };
    
    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [toast]);

  // Main Extraction Logic
  useEffect(() => {
    if (url) {
      const extractedId = extractVideoId(url);
      if (extractedId && extractedId !== videoId) {
        setIsLoading(true);
        setTimeout(() => {
          setVideoId(extractedId);
          setIsLoading(false);
          setImageErrors({});
          setActiveTab("maxresdefault");
          
          // Save to recent
          setRecentVideos(prev => {
            const filtered = prev.filter(id => id !== extractedId);
            const updated = [extractedId, ...filtered].slice(0, 5); // Keep last 5
            localStorage.setItem("ytthumb-recent", JSON.stringify(updated));
            return updated;
          });
        }, 600);
      } else if (!extractedId && videoId) {
        setVideoId(null);
      }
    } else {
      setVideoId(null);
    }
  }, [url, videoId]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (extractVideoId(text)) {
        toast({
          title: "Link detected!",
          description: "We're fetching the thumbnails for you.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to paste",
        description: "Please paste the link manually.",
      });
    }
  };

  const downloadImage = async (imgUrl: string, filename: string) => {
    try {
      toast({
        title: "Downloading...",
        description: "Preparing your thumbnail.",
      });
      
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      
      toast({
        title: "Success!",
        description: "Thumbnail downloaded successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not download the image directly. Try opening it in a new tab.",
      });
      window.open(imgUrl, "_blank");
    }
  };

  const copyUrl = (imgUrl: string, qualityId: string) => {
    navigator.clipboard.writeText(imgUrl);
    setCopied(qualityId);
    toast({
      title: "Copied!",
      description: "Image URL copied to clipboard.",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleImageError = (qualityId: string) => {
    setImageErrors(prev => ({ ...prev, [qualityId]: true }));
    if (qualityId === "maxresdefault" && activeTab === "maxresdefault") {
      setActiveTab("hqdefault");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const loadRecent = (id: string) => {
    setUrl(`https://youtube.com/watch?v=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqData = [
    {
      q: "How do I download a thumbnail?",
      a: "Simply copy the YouTube video link (URL), paste it into the search box above, and click on the 'Download Image' button next to the quality you prefer. Pro tip: You can just press Ctrl+V / Cmd+V anywhere on the page to instantly paste your link!"
    },
    {
      q: "Is it free to use?",
      a: "Yes! YTThumbPro is 100% free to use. There are no hidden fees, no required sign-ups, and no limits on how many thumbnails you can download."
    },
    {
      q: "Can I download Shorts thumbnails?",
      a: "Absolutely. Our tool supports standard YouTube videos, YouTube Shorts, and even past live streams. Just paste the link and we'll do the rest."
    },
    {
      q: "Where are the downloaded images saved?",
      a: "The images are saved to your device's default 'Downloads' folder, unless you have configured your browser to ask where to save each file."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Abstract Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <header className="w-full border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-50 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,42,85,0.4)] group-hover:scale-105 transition-transform">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">YTThumb<span className="text-primary">Pro</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className={`${location === '/' ? 'text-foreground font-semibold' : 'hover:text-foreground transition-colors'}`}>Home</Link>
            <Link href="/blog" className={`${location === '/blog' ? 'text-foreground font-semibold' : 'hover:text-foreground transition-colors'}`}>Blog</Link>
            <Link href="/api" className={`${location === '/api' ? 'text-foreground font-semibold' : 'hover:text-foreground transition-colors'}`}>API</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground z-50 focus:outline-none hover:bg-white/5 rounded-lg transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 flex flex-col md:hidden z-40 shadow-2xl"
              >
                <div className="p-4 flex flex-col gap-2">
                  <Link href="/" className="block p-4 rounded-xl hover:bg-white/5 font-medium transition-colors border border-transparent hover:border-white/5 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  <Link href="/blog" className="block p-4 rounded-xl hover:bg-white/5 font-medium transition-colors border border-transparent hover:border-white/5 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog & SEO Guides</Link>
                  <Link href="/api" className="block p-4 rounded-xl hover:bg-white/5 font-medium transition-colors border border-transparent hover:border-white/5 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Developer API</Link>
                  <Link href="/privacy" className="block p-4 rounded-xl hover:bg-white/5 font-medium transition-colors text-muted-foreground border border-transparent hover:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
                  <Link href="/terms" className="block p-4 rounded-xl hover:bg-white/5 font-medium transition-colors text-muted-foreground border border-transparent hover:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Terms of Service</Link>
                  <Link href="/contact" className="block p-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors border border-primary/20 mt-2 text-center" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 md:pt-20 pb-24 w-full max-w-6xl mx-auto z-10 relative">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-8 md:mb-12 px-2 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold mb-6 border border-primary/20 shadow-[0_0_10px_rgba(255,42,85,0.2)]"
          >
            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary/50" />
            <span>Fast, clean, no ads</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 leading-[1.1] px-2"
          >
            Download YouTube Thumbnails <br className="hidden md:block"/>
            in <span className="text-gradient drop-shadow-sm">High Quality</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 font-medium"
          >
            Extract, view, and save HD thumbnails from any YouTube video instantly. 
            Supports Shorts, live streams, and 4K videos.
          </motion.p>

          {/* Search Box - Optimized for Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center shadow-2xl rounded-2xl overflow-hidden glass-panel p-2 gap-2 sm:gap-0 transition-all duration-300 border ${url ? 'border-primary/50 shadow-[0_0_20px_rgba(255,42,85,0.15)]' : 'border-white/10 shadow-black/50'} focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(255,42,85,0.15)]`}>
              <div className="hidden sm:flex absolute left-6 text-muted-foreground z-10 pointer-events-none">
                <LinkIcon className="w-5 h-5" />
              </div>
              <Input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube link or press Ctrl+V anywhere..." 
                className="w-full sm:pl-14 sm:pr-36 h-14 bg-white/5 sm:bg-transparent border-white/10 sm:border-none focus-visible:ring-0 text-base md:text-lg shadow-none rounded-xl sm:rounded-none px-4 transition-all placeholder:text-muted-foreground/60"
                data-testid="input-youtube-url"
              />
              <div className="flex w-full sm:w-auto sm:absolute right-2 gap-2 sm:gap-2 px-0 sm:px-0">
                {!url ? (
                  <Button 
                    size="default"
                    onClick={handlePaste}
                    className="flex-1 sm:flex-none h-12 sm:h-10 text-white font-semibold bg-primary hover:bg-primary/90 rounded-xl sm:rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
                    data-testid="button-paste"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 sm:hidden" />
                    Paste Link
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setUrl("")} 
                    variant="ghost" 
                    size="default"
                    className="flex-1 sm:flex-none h-12 sm:h-10 text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 mr-1 sm:hidden" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            
            {/* Visual indicator for loading */}
            {isLoading && (
              <div className="absolute -bottom-2 left-4 right-4 h-1 bg-primary/20 overflow-hidden rounded-full mt-2 sm:mt-0 shadow-[0_0_10px_rgba(255,42,85,0.5)]">
                <div className="absolute top-0 left-0 h-full bg-primary animate-[pulse_1s_ease-in-out_infinite] w-full origin-left" style={{ animation: "progress 1s infinite linear" }} />
              </div>
            )}
          </motion.div>

          {/* Recent History (Pro Feature) */}
          <AnimatePresence>
            {!videoId && recentVideos.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
              >
                <div className="flex items-center text-xs text-muted-foreground mr-2 font-medium">
                  <Clock className="w-3.5 h-3.5 mr-1.5" /> Recent:
                </div>
                {recentVideos.map((id, index) => (
                  <button
                    key={id + index}
                    onClick={() => loadRecent(id)}
                    className="relative w-12 h-8 rounded border border-white/10 overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer focus:outline-none"
                    title={`Load recent thumbnail`}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${id}/default.jpg`} 
                      alt="Recent video" 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {videoId && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mt-4"
              data-testid="result-section"
            >
              {/* Preview Area */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="glass-panel rounded-2xl p-2 md:p-4 overflow-hidden shadow-2xl border border-white/10 bg-black/20">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/5 group">
                    {/* The main preview image based on active tab */}
                    {activeTab && !imageErrors[activeTab] ? (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/${activeTab}.jpg`} 
                          alt="YouTube Thumbnail Preview" 
                          className="w-full h-full object-contain md:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          onError={() => handleImageError(activeTab)}
                          data-testid="img-thumbnail-preview"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-center pb-8">
                          <Button 
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white shadow-[0_10px_30px_rgba(255,42,85,0.4)] scale-95 group-hover:scale-100 transition-all duration-300 font-bold px-8 rounded-full"
                            onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/${activeTab}.jpg`, `youtube-thumbnail-${videoId}.jpg`)}
                          >
                            <Download className="w-5 h-5 mr-2" /> Download High-Res Image
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground p-6 flex flex-col items-center justify-center h-full w-full bg-white/[0.02]">
                        <ImageIcon className="w-12 h-12 md:w-16 h-16 mb-4 opacity-30 text-destructive" />
                        <p className="text-base md:text-lg font-medium text-white">Resolution Not Available</p>
                        <p className="text-sm mt-2 max-w-xs mx-auto text-center">This video doesn't have an image at this specific quality level. Please select another option.</p>
                      </div>
                    )}
                    
                    {/* Quality Badge Overlay */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/20 shadow-lg flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {QUALITIES.find(q => q.id === activeTab)?.name}
                    </div>
                  </div>
                </div>
                
                {/* Download Actions for mobile (hidden on lg) - Sticky on mobile for better UX */}
                <div className="lg:hidden flex gap-3 w-full sticky bottom-4 z-20 shadow-2xl">
                  <Button 
                    className="flex-1 h-14 font-bold text-base bg-primary hover:bg-primary/90 shadow-[0_10px_20px_rgba(255,42,85,0.3)] rounded-xl"
                    onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/${activeTab}.jpg`, `youtube-thumbnail-${videoId}.jpg`)}
                    disabled={imageErrors[activeTab]}
                    data-testid="button-download-mobile"
                  >
                    <Download className="w-5 h-5 mr-2" /> Download Image
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 w-14 shrink-0 p-0 border-white/20 bg-background/90 backdrop-blur-xl hover:bg-white/10 rounded-xl"
                    onClick={() => copyUrl(`https://img.youtube.com/vi/${videoId}/${activeTab}.jpg`, 'mobile-copy')}
                    disabled={imageErrors[activeTab]}
                  >
                    {copied === 'mobile-copy' ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
                  </Button>
                </div>
              </div>

              {/* Quality Selection Options */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-white/10 h-full flex flex-col">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                    <MonitorPlay className="w-5 h-5 text-primary" />
                    Select Resolution
                  </h3>
                  
                  <div className="flex-1 flex flex-col gap-3">
                    {QUALITIES.map((quality) => {
                      const imgUrl = `https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`;
                      const hasError = imageErrors[quality.id];
                      const isActive = activeTab === quality.id;
                      
                      return (
                        <div 
                          key={quality.id}
                          className={`
                            p-3 md:p-4 rounded-xl transition-all duration-200 border-2 cursor-pointer flex flex-col gap-3 relative overflow-hidden
                            ${isActive ? 'bg-primary/5 border-primary/50 shadow-[0_0_20px_rgba(255,42,85,0.15)]' : 'bg-black/20 border-transparent hover:border-white/10 hover:bg-white/5'}
                            ${hasError ? 'opacity-40 cursor-not-allowed grayscale' : ''}
                          `}
                          onClick={() => !hasError && setActiveTab(quality.id)}
                          data-testid={`card-quality-${quality.id}`}
                        >
                          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />}
                          
                          <div className="flex justify-between items-center pl-2 md:pl-1">
                            <div className="flex flex-col">
                              <p className={`font-bold text-sm md:text-base mb-1 ${isActive ? 'text-white' : 'text-foreground'}`}>{quality.name}</p>
                              <p className="text-xs text-muted-foreground font-mono bg-white/5 inline-block px-2 py-0.5 rounded w-fit border border-white/5">{quality.width} x {quality.height}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {hasError && <span className="text-[10px] bg-destructive/20 text-destructive border border-destructive/30 px-2 py-1 rounded uppercase font-bold tracking-wider">Not Found</span>}
                              {isActive && !hasError && <Check className="w-5 h-5 text-primary mr-1" />}
                            </div>
                          </div>
                          
                          {/* Desktop quick actions inside the card */}
                          <div className="hidden lg:flex gap-2 mt-2 pl-1" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              size="sm" 
                              className={`flex-1 h-9 text-xs font-semibold ${isActive ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                              onClick={(e) => { e.stopPropagation(); downloadImage(imgUrl, `youtube-thumbnail-${quality.id}.jpg`); }}
                              disabled={hasError}
                              data-testid={`button-download-${quality.id}`}
                            >
                              <Download className="w-3.5 h-3.5 mr-1.5" /> Save Image
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-9 w-9 shrink-0 p-0 border-white/20 hover:bg-white/10 bg-black/40 transition-colors"
                              onClick={(e) => { e.stopPropagation(); copyUrl(imgUrl, quality.id); }}
                              disabled={hasError}
                              title="Copy Image URL"
                            >
                              {copied === quality.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground hover:text-white" />}
                            </Button>
                          </div>
                          
                          {/* Hidden image to test loading status */}
                          <img 
                            src={imgUrl} 
                            alt="" 
                            className="hidden" 
                            onError={() => handleImageError(quality.id)} 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features / Placeholder state when empty */}
        <AnimatePresence>
          {!videoId && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 md:mt-20 flex flex-col items-center w-full max-w-5xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full mb-20">
                {[
                  { icon: Search, title: "Auto-detect URLs", desc: "Just paste any standard, shortened, or Shorts YouTube link and we'll do the rest instantly." },
                  { icon: Zap, title: "Instant Extraction", desc: "No waiting time. Thumbnails are generated immediately in highest possible quality (1280x720)." },
                  { icon: History, title: "Smart History", desc: "Your recent downloads are securely saved locally so you can quickly jump back to them." }
                ].map((feature, i) => (
                  <div key={i} className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col items-center text-center hover:bg-white/[0.03] transition-colors border border-white/5 hover:border-primary/20 shadow-lg group">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 md:mb-6 shadow-[0_0_20px_rgba(255,42,85,0.15)] border border-primary/20 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2 md:mb-3 text-lg md:text-xl">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="w-full max-w-3xl glass-panel p-6 md:p-10 rounded-3xl border border-white/5 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqData.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${showFaq === idx ? 'bg-white/5 shadow-md border-white/20' : 'bg-black/20 hover:bg-white/[0.02]'}`}
                    >
                      <button 
                        className="w-full px-6 py-5 text-left flex justify-between items-center font-semibold text-base md:text-lg focus:outline-none"
                        onClick={() => setShowFaq(showFaq === idx ? null : idx)}
                      >
                        {faq.q}
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${showFaq === idx ? 'rotate-180 text-primary' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {showFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-5 text-muted-foreground text-sm md:text-base leading-relaxed font-medium border-t border-white/5 pt-4"
                          >
                            <p>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-10 mt-auto bg-black/40 backdrop-blur-xl relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-bold text-xl tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(255,42,85,0.4)]">
                <Youtube className="w-3.5 h-3.5 text-white" />
              </div>
              YTThumb<span className="text-primary">Pro</span>
            </span>
            <p className="text-sm text-muted-foreground font-medium text-center md:text-left">
              The fastest way to download YouTube thumbnails.<br className="hidden md:block" />
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/api" className="hover:text-white transition-colors">API</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
