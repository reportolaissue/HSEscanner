import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Upload,
  ArrowRight,
  Scan,
  HardHat,
  Zap,
  Clock,
  BarChart3,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, className = "", delay = 0 }) => (
  <div 
    className={`group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-sm p-6 
                hover:border-cyan-500/50 transition-colors duration-300 ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30" />
    
    <div className="p-3 bg-orange-500/10 rounded-sm w-fit mb-4 group-hover:bg-orange-500/20 transition-colors">
      <Icon className="w-6 h-6 text-orange-500" />
    </div>
    <h3 className="text-lg font-heading font-bold uppercase tracking-tight mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
  </div>
);

// Step component for How It Works
const Step = ({ number, icon: Icon, title, description }) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center
                      group-hover:border-orange-500 transition-colors duration-300">
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center
                      text-sm font-mono font-bold text-slate-900">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-2">{title}</h3>
    <p className="text-sm text-slate-400 max-w-xs">{description}</p>
  </div>
);

// Violation category component
const ViolationCategory = ({ icon: Icon, title, items, color }) => (
  <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-sm p-5 hover:border-slate-700 transition-colors">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-sm ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="font-heading font-bold uppercase tracking-tight">{title}</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
          <ChevronRight className="w-3 h-3 text-cyan-500" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
           style={{
             backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)`,
             backgroundSize: '60px 60px'
           }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-sm">
                <Shield className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-lg font-heading font-bold uppercase tracking-tight">AI Safety Vision</span>
            </div>
            <Link to="/inspect">
              <Button className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-mono font-bold uppercase tracking-wider rounded-sm">
                Start Inspection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Construction site"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan-line opacity-50" 
               style={{ animation: 'scan-vertical 4s ease-in-out infinite' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 rounded-none px-3 py-1 font-mono text-xs uppercase tracking-widest">
                AI-Powered Safety Analysis
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold uppercase tracking-tighter leading-none">
                Detect Safety<br />
                <span className="text-orange-500">Violations</span><br />
                Instantly
              </h1>
              
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                Upload site photos and let our advanced AI vision system identify safety hazards, 
                PPE violations, and compliance issues in seconds. Generate comprehensive audit reports automatically.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/inspect">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-mono font-bold uppercase tracking-wider rounded-sm h-14 px-8"
                          data-testid="hero-cta-button">
                    Start Free Inspection
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 font-mono uppercase tracking-wider rounded-sm h-14 px-8">
                  <Eye className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-slate-400">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-slate-400">Results in seconds</span>
                </div>
              </div>
            </div>

            {/* Right Content - Demo Image */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative rounded-sm overflow-hidden border border-slate-800 bg-slate-900/50">
                {/* HUD Corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/60 z-10" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/60 z-10" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/60 z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/60 z-10" />

                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Safety inspection demo"
                  className="w-full aspect-video object-cover"
                />

                {/* Simulated Detection Boxes */}
                <div className="absolute top-[20%] left-[15%] w-24 h-32 border-2 border-red-500 rounded-sm animate-pulse">
                  <div className="absolute -top-6 left-0 bg-red-500 px-2 py-0.5 text-xs font-mono text-white">
                    No Helmet: 96%
                  </div>
                </div>
                <div className="absolute top-[30%] right-[20%] w-20 h-28 border-2 border-amber-500 rounded-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <div className="absolute -top-6 left-0 bg-amber-500 px-2 py-0.5 text-xs font-mono text-slate-900">
                    No Vest: 89%
                  </div>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-slate-400">2 VIOLATIONS DETECTED</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 rounded-none text-xs font-mono">
                    HIGH RISK
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 99, suffix: "%", label: "Detection Accuracy" },
              { value: 3, suffix: "s", label: "Average Scan Time" },
              { value: 50, suffix: "+", label: "Violation Types" },
              { value: 24, suffix: "/7", label: "Available" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-orange-500">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-400 font-mono uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 rounded-none px-3 py-1 font-mono text-xs uppercase tracking-widest mb-4">
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">
              Everything You Need for<br />
              <span className="text-orange-500">Safety Compliance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Eye}
              title="AI Vision Analysis"
              description="Advanced computer vision powered by GPT-4o detects safety violations with 99% accuracy across all categories."
              delay={0}
            />
            <FeatureCard 
              icon={Zap}
              title="Instant Results"
              description="Get comprehensive safety analysis in under 3 seconds. No waiting, no delays—just actionable insights."
              delay={100}
            />
            <FeatureCard 
              icon={FileText}
              title="PDF Reports"
              description="Generate professional audit reports with one click. Includes executive summary, violations, and recommendations."
              delay={200}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Risk Scoring"
              description="Each photo receives a safety score and risk level (High/Medium/Low) based on detected violations."
              delay={300}
            />
            <FeatureCard 
              icon={HardHat}
              title="PPE Detection"
              description="Automatically identify missing hard hats, safety vests, gloves, goggles, and other protective equipment."
              delay={400}
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Compliance Ready"
              description="Reports are formatted for OSHA, ISO 45001, and other safety standards compliance documentation."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900/50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 rounded-none px-3 py-1 font-mono text-xs uppercase tracking-widest mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">
              How It <span className="text-cyan-400">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-10 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-slate-700 to-slate-700" />
            <div className="hidden md:block absolute top-10 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-slate-700 to-slate-700" />

            <Step 
              number={1}
              icon={Upload}
              title="Upload Photos"
              description="Drag and drop your site inspection photos. Supports JPG, PNG, and WEBP formats. Upload multiple files at once."
            />
            <Step 
              number={2}
              icon={Scan}
              title="AI Analysis"
              description="Our AI scans each image for safety violations, PPE compliance, equipment hazards, and environmental risks."
            />
            <Step 
              number={3}
              icon={FileText}
              title="Get Report"
              description="Review results instantly and download a comprehensive PDF audit report ready for compliance documentation."
            />
          </div>

          <div className="text-center mt-16">
            <Link to="/inspect">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-mono font-bold uppercase tracking-wider rounded-sm h-14 px-8">
                Try It Now — It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Detect Section */}
      <section className="py-24" id="detection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-red-500/30 rounded-none px-3 py-1 font-mono text-xs uppercase tracking-widest mb-4">
              Comprehensive Detection
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">
              What We <span className="text-red-500">Detect</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Our AI is trained to identify over 50 types of safety violations across four major categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ViolationCategory 
              icon={HardHat}
              title="PPE Violations"
              color="bg-red-500/10 text-red-500"
              items={["Missing hard hat", "No safety vest", "Missing gloves", "No eye protection", "Improper footwear"]}
            />
            <ViolationCategory 
              icon={AlertTriangle}
              title="Equipment Hazards"
              color="bg-amber-500/10 text-amber-500"
              items={["Exposed machinery", "Uncovered pits", "Unstable stacking", "Missing guards", "Unsecured loads"]}
            />
            <ViolationCategory 
              icon={Zap}
              title="Environmental"
              color="bg-blue-500/10 text-blue-500"
              items={["Spills & leaks", "Exposed wiring", "Fire hazards", "Blocked exits", "Poor lighting"]}
            />
            <ViolationCategory 
              icon={Eye}
              title="Housekeeping"
              color="bg-purple-500/10 text-purple-500"
              items={["Clutter & debris", "Disorganized tools", "Waste buildup", "Tripping hazards", "Dirty conditions"]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-cyan-500/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
        }} />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-6">
            Ready to Improve<br />
            <span className="text-orange-500">Site Safety?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Start analyzing your inspection photos now. No signup required, no credit card needed. 
            Just upload and get instant AI-powered safety insights.
          </p>
          <Link to="/inspect">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-mono font-bold uppercase tracking-wider rounded-sm h-16 px-12 text-lg"
                    data-testid="cta-start-inspection">
              Start Free Inspection
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-sm">
                <Shield className="w-4 h-4 text-slate-900" />
              </div>
              <span className="font-heading font-bold uppercase tracking-tight">AI Safety Vision</span>
            </div>
            <p className="text-sm text-slate-500 font-mono">
              Powered by GPT-4o Vision • Built for Safety Professionals
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes scan-vertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};
