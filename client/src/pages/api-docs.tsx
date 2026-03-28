import Legal from "@/components/layout/Legal";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal, Code, Cpu, Youtube } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Api() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-x-hidden">
      {/* Abstract Background Effects */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        {/* Same header as other pages - simplified for brevity here, assuming layout wrapper in real app */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,42,85,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </div>
            <span className="font-bold text-xl tracking-tight">YTThumb<span className="text-primary">Pro</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/api" className="text-foreground font-semibold">API</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 pb-24 w-full max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Developer <span className="text-gradient">API</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Integrate high-quality YouTube thumbnail extraction directly into your own applications. 
            No authentication required, 100% free, and lightning fast.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-bold border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Operational
          </div>
        </div>

        <div className="w-full space-y-8">
          
          {/* Endpoint 1 */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" /> Generate Image URLs
            </h2>
            <p className="text-muted-foreground mb-6">Pass any valid YouTube URL or Video ID to receive an array of all available thumbnail resolutions.</p>
            
            <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-sm overflow-x-auto relative group">
              <div className="flex items-center gap-4 mb-3 border-b border-white/10 pb-3">
                <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">GET</span>
                <span className="text-white">https://api.ytthumbpro.com/v1/extract</span>
              </div>
              <div className="text-muted-foreground mb-2">Query Parameters:</div>
              <div className="pl-4 text-white">
                <span className="text-blue-300">url</span> = https://youtube.com/watch?v=dQw4w9WgXcQ
              </div>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard('https://api.ytthumbpro.com/v1/extract?url=YOUR_URL', 'endpoint1')}
              >
                {copiedCode === 'endpoint1' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">JSON Response</h3>
              <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-sm overflow-x-auto relative group">
<pre className="text-gray-300"><code>{`{
  "success": true,
  "video_id": "dQw4w9WgXcQ",
  "thumbnails": {
    "hd": {
      "url": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      "width": 1280,
      "height": 720
    },
    "hq": {
      "url": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      "width": 480,
      "height": 360
    },
    "mq": {
      "url": "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      "width": 320,
      "height": 180
    }
  }
}`}</code></pre>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(`{"success":true,"video_id":"dQw4w9WgXcQ","thumbnails":{"hd":{"url":"...maxresdefault.jpg"}}...}`, 'response1')}
                >
                  {copiedCode === 'response1' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" /> Quick Start Examples
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">JavaScript (Fetch)</h3>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-sm overflow-x-auto relative group">
<pre className="text-gray-300"><code>{`const getVideoThumbnails = async (youtubeUrl) => {
  try {
    const response = await fetch(
      \`https://api.ytthumbpro.com/v1/extract?url=\${encodeURIComponent(youtubeUrl)}\`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log("HD Thumbnail:", data.thumbnails.hd.url);
      return data.thumbnails;
    }
  } catch (error) {
    console.error("Failed to fetch thumbnails:", error);
  }
};`}</code></pre>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(`const getVideoThumbnails = async...`, 'codejs')}
                  >
                    {copiedCode === 'codejs' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Python (Requests)</h3>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-sm overflow-x-auto relative group">
<pre className="text-gray-300"><code>{`import requests

def get_thumbnails(url):
    api_endpoint = "https://api.ytthumbpro.com/v1/extract"
    params = {"url": url}
    
    response = requests.get(api_endpoint, params=params)
    data = response.json()
    
    if data.get("success"):
        return data["thumbnails"]
    return None

# Usage
thumbs = get_thumbnails("https://youtu.be/dQw4w9WgXcQ")
print(f"HD URL: {thumbs['hd']['url']}")`}</code></pre>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(`import requests...`, 'codepy')}
                  >
                    {copiedCode === 'codepy' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-bold mb-2">Rate Limits & CORS</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To keep the API free for everyone, we enforce a soft limit of <strong>100 requests per minute</strong> per IP address. 
              CORS is fully enabled, allowing you to call this API directly from your frontend applications without needing a proxy server.
            </p>
          </div>

        </div>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
