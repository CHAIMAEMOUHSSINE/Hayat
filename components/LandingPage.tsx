
import React, { useEffect, useState } from 'react';
import { TranslationSet } from '../types';
import { 
  ArrowRight, Activity, Database, ShieldCheck, Zap, 
  HeartPulse, Building2, Phone, Mail, MapPin, Clock, 
  XCircle, UserCheck, BarChart3, Globe, Lock, Code2, 
  CheckCircle2, Star, ChevronRight, LayoutDashboard, BrainCircuit
} from 'lucide-react';

interface Props {
  t: TranslationSet;
  onLaunch: () => void;
}

const LandingPage: React.FC<Props> = ({ t, onLaunch }) => {
  const [counts, setCounts] = useState({ wait: 8, detect: 85, satisfaction: 60 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounts({ wait: 5, detect: 98, satisfaction: 94 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-32 bg-zellige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-nhs-blue ring-1 ring-nhs-blue/20 bg-nhs-blue/5">
              <span className="animate-pulse mr-2 text-emergency-red">●</span> Live in Moroccan CHUs
            </div>
            <h1 className="text-6xl lg:text-8xl font-playfair font-black text-gray-900 leading-tight">
              Hayat
              <span className="block text-4xl lg:text-5xl mt-2 font-sans font-bold text-nhs-blue tracking-tight">
                Intelligent Triage. Faster Care. Lives Saved.
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-lg font-sans">
              Reducing emergency wait times by 30-40% in Moroccan CHUs through data-driven precision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onLaunch}
                className="inline-flex items-center px-10 py-5 text-lg font-black text-white bg-emergency-red rounded-2xl hover:bg-red-700 shadow-2xl shadow-red-200 transition-all hover:-translate-y-1 active:scale-95"
              >
                Launch Live Demo
                <ArrowRight className="ml-2 w-6 h-6" />
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-10 py-5 text-lg font-bold text-nhs-blue border-2 border-nhs-blue rounded-2xl hover:bg-nhs-blue/5 transition-all"
              >
                Case Studies
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative p-8 bg-white/40 backdrop-blur-xl rounded-[60px] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transform rotate-2 overflow-hidden">
              <Activity className="w-80 h-80 text-nhs-blue/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-full shadow-2xl ring-8 ring-nhs-blue/5 animate-pulse-soft">
                  <HeartPulse className="w-16 h-16 text-emergency-red" />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-10 right-10 bg-emergency-red text-white p-3 rounded-2xl font-black text-sm shadow-xl rotate-12">P1 - CRITICAL</div>
              <div className="absolute bottom-10 left-10 bg-nhs-blue text-white p-3 rounded-2xl font-black text-sm shadow-xl -rotate-12">P5 - STABLE</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce cursor-pointer" onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}>
          <ChevronRight className="w-8 h-8 rotate-90" />
        </div>
      </section>

      {/* 2. Problem Statement */}
      <section id="problem" className="py-32 bg-gray-50 border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-center text-4xl lg:text-5xl font-playfair font-black text-gray-900">The Reality of Emergency Units</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-xl border-l-[8px] border-gray-800 space-y-4 hover:translate-y-[-8px] transition-transform">
              <Clock className="w-12 h-12 text-gray-400" />
              <div className="text-6xl font-bebas text-gray-900">6-8 Hours</div>
              <p className="text-gray-600 font-semibold">Average wait time in peak periods before intelligent intervention.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border-l-[8px] border-gray-800 space-y-4 hover:translate-y-[-8px] transition-transform">
              <XCircle className="w-12 h-12 text-emergency-red" />
              <div className="text-6xl font-bebas text-gray-900">15% MISSED</div>
              <p className="text-gray-600 font-semibold">Critical cases not detected in time due to manual backlog.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl border-l-[8px] border-gray-800 space-y-4 hover:translate-y-[-8px] transition-transform">
              <UserCheck className="w-12 h-12 text-gray-400" />
              <div className="text-6xl font-bebas text-gray-900">High BURNOUT</div>
              <p className="text-gray-600 font-semibold">Medical staff operating under extreme pressure without clear flow data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Overview (Split-Screen) */}
      <section className="relative overflow-hidden group">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-1/2 bg-[#2C2C2C] p-20 flex flex-col justify-center text-white space-y-8">
            <h3 className="text-3xl font-playfair font-bold text-gray-400">THE LEGACY PROBLEM</h3>
            <ul className="space-y-6 text-xl font-mono text-gray-500">
              <li className="flex items-center gap-4"><XCircle className="text-red-900"/> Manual paper tracking</li>
              <li className="flex items-center gap-4"><XCircle className="text-red-900"/> Inconsistent triage levels</li>
              <li className="flex items-center gap-4"><XCircle className="text-red-900"/> Zero real-time analytics</li>
              <li className="flex items-center gap-4"><XCircle className="text-red-900"/> Delayed resuscitation calls</li>
            </ul>
          </div>
          <div className="lg:w-1/2 bg-nhs-blue p-20 flex flex-col justify-center text-white space-y-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-playfair font-bold">THE HAYAT TRANSFORMATION</h3>
              <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                 <LayoutDashboard className="w-full h-auto text-white/50" />
                 <div className="absolute top-4 right-4 bg-green-500 px-3 py-1 rounded text-[10px] font-black uppercase">Live Triage v1.0</div>
              </div>
              <p className="text-xl leading-relaxed text-blue-100">
                A seamless integration of AI acuity prediction and real-time WebSocket queuing.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 4. Impact Metrics */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="text-[120px] font-archivo leading-none text-nhs-blue">{counts.wait}h</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Reduced Wait Time</div>
            </div>
            <div className="space-y-4">
              <div className="text-[120px] font-archivo leading-none text-green-500">{counts.detect}%</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Critical Accuracy</div>
            </div>
            <div className="space-y-4">
              <div className="text-[120px] font-archivo leading-none text-emergency-red">{counts.satisfaction}%</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Staff Well-being</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How it Works (Timeline) */}
      <section id="how-it-works" className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-4xl lg:text-5xl font-playfair font-black text-gray-900 mb-20">Seamless Medical Workflow</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-nhs-blue/20 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { step: '01', title: 'Admission', desc: 'Patient vitals entered by triage nurse.', icon: Mail },
                { step: '02', title: 'AI Analysis', desc: 'XGBoost regression predicts priority level.', icon: BrainCircuit },
                { step: '03', title: 'Queue Management', desc: 'Dashboard updates via WebSocket instantly.', icon: LayoutDashboard },
                { step: '04', title: 'Optimization', desc: 'Resources allocated to critical patients first.', icon: Zap },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:scale-105 transition-transform group">
                  <div className="w-16 h-16 bg-nhs-blue text-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="text-xs font-black text-nhs-blue mb-2">{item.step}</div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Features Showcase */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <div className="w-14 h-14 bg-nhs-blue/10 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="text-nhs-blue w-7 h-7" />
               </div>
               <h4 className="text-2xl font-bold">Explainable AI (SHAP)</h4>
               <p className="text-gray-600">Total transparency on triage decisions. Every P-level comes with a clinical justification based on input coefficients.</p>
            </div>
            <div className="p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <Globe className="text-green-600 w-7 h-7" />
               </div>
               <h4 className="text-2xl font-bold">Multilingual RTL</h4>
               <p className="text-gray-600">Native support for AR, FR, Darija, and Tamazight. Seamlessly toggle between LTR and RTL medical interfaces.</p>
            </div>
            <div className="p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <div className="w-14 h-14 bg-emergency-red/10 rounded-2xl flex items-center justify-center">
                  <Lock className="text-emergency-red w-7 h-7" />
               </div>
               <h4 className="text-2xl font-bold">Loi 09-08 Secure</h4>
               <p className="text-gray-600">Fully compliant with Moroccan data privacy laws. AES-256 encryption for all Patient Identifiable Information (PII).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
             <Star className="w-12 h-12 text-moroccan-gold mx-auto fill-current" />
             <h2 className="text-4xl font-playfair font-black mt-4">Voices from the Frontline</h2>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="max-w-md bg-white p-10 rounded-3xl shadow-xl relative">
              <span className="absolute -top-10 left-10 text-nhs-blue/10 text-[200px] leading-none select-none">“</span>
              <p className="text-lg italic text-gray-700 relative z-10 leading-relaxed">
                Hayat has transformed our night shifts at CHU Ibn Rochd. We no longer guess who to treat first; the data speaks for itself.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-nhs-blue to-cyan-400"></div>
                <div className="text-left">
                  <div className="font-bold">Dr. Amina Bennani</div>
                  <div className="text-xs text-gray-400">Emergency Lead, CHU Casablanca</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tech Stack */}
      <section className="py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-12 flex items-center justify-center gap-4">
             <Code2 className="w-5 h-5" /> Enterprise Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
             {['React', 'TypeScript', 'Gemini AI', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Prometheus'].map(tech => (
               <span key={tech} className="text-3xl font-archivo uppercase">{tech}</span>
             ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-emergency-red rounded-[60px] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-red-200">
              <div className="relative z-10 space-y-8">
                 <h2 className="text-5xl font-playfair font-black">Ready to modernize your emergency unit?</h2>
                 <p className="text-xl text-white/80 max-w-2xl mx-auto font-sans">
                   Join the pilot phase and help us shape the future of Moroccan healthcare.
                 </p>
                 <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={onLaunch} className="px-12 py-5 bg-white text-emergency-red font-black rounded-2xl hover:bg-gray-50 shadow-xl transition-all hover:scale-105 active:scale-95">
                       Request Institution Demo
                    </button>
                    <button className="px-12 py-5 border-2 border-white text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                       Download Whitepaper
                    </button>
                 </div>
              </div>
              <div className="absolute inset-0 bg-zellige opacity-10 mix-blend-overlay"></div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nhs-blue text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="text-3xl font-black tracking-tighter">HAYAT</div>
            <p className="text-white/60 text-sm leading-relaxed">
              Intelligent Triage Management for Morocco. Transforming CHUs with data-driven clinical excellence.
            </p>
          </div>
          <div className="space-y-4">
             <h4 className="font-bold uppercase text-xs tracking-widest text-white/40">Quick Links</h4>
             <ul className="space-y-2 text-sm font-semibold">
                <li><a href="#home" className="hover:text-moroccan-gold transition-colors">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-moroccan-gold transition-colors">Technology</a></li>
                <li><a href="#features" className="hover:text-moroccan-gold transition-colors">Compliance</a></li>
             </ul>
          </div>
          <div className="space-y-4">
             <h4 className="font-bold uppercase text-xs tracking-widest text-white/40">Contact</h4>
             <ul className="space-y-2 text-sm font-semibold">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4"/> +212 522-123456</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4"/> pilot@hayat.ma</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4"/> CHU Ibn Rochd, Casablanca</li>
             </ul>
          </div>
          <div className="space-y-4">
             <h4 className="font-bold uppercase text-xs tracking-widest text-white/40">Partners</h4>
             <div className="grid grid-cols-2 gap-4 text-[10px] font-black opacity-30">
                <span>ENSEM</span>
                <span>UM6P</span>
                <span>EMINES</span>
                <span>MINISTRY OF HEALTH</span>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-bold">
           <span>© 2025 HAYAT TRIAGE SYSTEM • ALL RIGHTS RESERVED</span>
           <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">SECURITY AUDIT</a>
              <a href="#" className="hover:text-white transition-colors">LEGAL</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
