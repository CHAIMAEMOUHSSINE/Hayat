
import React, { useState, useEffect, useMemo } from 'react';
import { Language, Patient, TranslationSet, ViewState } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ImpactStats from './components/ImpactStats';
import QueueTable from './components/QueueTable';
import Analytics from './components/Analytics';
import SearchPanel from './components/SearchPanel';
import { analyzePatientTriage } from './services/geminiService';
import { PlusCircle, Stethoscope, LineChart, AlertTriangle, X, LayoutDashboard, Home, Activity, Database } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<ViewState>('landing');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Driss Amrani',
      age: 52,
      gender: 'M',
      vitals: { hr: 115, bp: '160/100', spo2: 91, temp: 39.2 },
      symptoms: 'Chest tightness and high fever',
      priority: 'P1',
      arrival_time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      explanation: 'Critical hypoxia (91%) combined with tachycardia indicated P1 resuscitation.'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M',
    hr: '',
    bp: '',
    spo2: '',
    temp: '',
    symptoms: ''
  });

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  useEffect(() => {
    setIsRTL(['ar', 'dar'].includes(lang));
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lang]);

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const vitals = { hr: Number(formData.hr), bp: formData.bp, spo2: Number(formData.spo2), temp: Number(formData.temp) };
    const triageResult = await analyzePatientTriage(vitals, formData.symptoms);
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender,
      vitals,
      symptoms: formData.symptoms,
      priority: triageResult.priority,
      arrival_time: new Date().toISOString(),
      explanation: triageResult.explanation
    };
    setPatients(prev => [newPatient, ...prev]);
    setIsAnalyzing(false);
    setIsFormOpen(false);
    setFormData({ name: '', age: '', gender: 'M', hr: '', bp: '', spo2: '', temp: '', symptoms: '' });
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar 
        lang={lang} 
        onLanguageChange={setLang} 
        t={t} 
        currentView={view} 
        onViewChange={setView} 
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {isSearchOpen && <SearchPanel onClose={() => setIsSearchOpen(false)} />}

      <div className="pt-20">
        {view === 'landing' ? (
          <LandingPage t={t} onLaunch={() => setView('dashboard')} onViewChange={setView} />
        ) : (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  Clinical Dashboard
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Real-time emergency telemetry and patient triage.</p>
              </div>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-nhs-blue hover:bg-nhs-dark-blue text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-nhs-blue/30 transition-all flex items-center gap-3"
              >
                <PlusCircle className="w-6 h-6" />
                {t.intake}
              </button>
            </div>

            <div className="space-y-16">
              <ImpactStats t={t} />
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2">
                   <QueueTable patients={patients} t={t} onSelect={setSelectedPatient} />
                </div>
                <div className="space-y-8">
                   <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
                      <h3 className="text-xl font-black text-gray-900 mb-6">Unit Load</h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-gray-400">BEDS</span>
                            <span>18/20</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3">
                            <div className="bg-emergency-red h-full rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
              <Analytics t={t} />
            </div>
          </main>
        )}
      </div>

      {/* Triage Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-3xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-3xl font-black text-gray-900">Admission</h2>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X/></button>
             </div>
             <form onSubmit={handleIntakeSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Patient Name" className="p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-nhs-blue" />
                   <input required type="number" value={formData.age} onChange={e=>setFormData({...formData, age: e.target.value})} placeholder="Age" className="p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-nhs-blue" />
                </div>
                <div className="grid grid-cols-4 gap-4 bg-gray-50 p-6 rounded-3xl">
                   <input placeholder="HR" value={formData.hr} onChange={e=>setFormData({...formData, hr: e.target.value})} className="p-3 rounded-xl border border-gray-200" />
                   <input placeholder="BP" value={formData.bp} onChange={e=>setFormData({...formData, bp: e.target.value})} className="p-3 rounded-xl border border-gray-200" />
                   <input placeholder="SpO2" value={formData.spo2} onChange={e=>setFormData({...formData, spo2: e.target.value})} className="p-3 rounded-xl border border-gray-200" />
                   <input placeholder="Temp" value={formData.temp} onChange={e=>setFormData({...formData, temp: e.target.value})} className="p-3 rounded-xl border border-gray-200" />
                </div>
                <textarea required value={formData.symptoms} onChange={e=>setFormData({...formData, symptoms: e.target.value})} placeholder="Clinical Symptoms" rows={3} className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-nhs-blue" />
                <button type="submit" disabled={isAnalyzing} className="w-full py-5 bg-nhs-blue text-white font-black rounded-2xl shadow-xl">
                   {isAnalyzing ? 'Analyzing...' : 'Run ML Triage'}
                </button>
             </form>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[40px] shadow-3xl overflow-hidden animate-in fade-in duration-300">
              <div className="p-10">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <h2 className="text-3xl font-black">{selectedPatient.name}</h2>
                       <div className="mt-2 text-nhs-blue font-black uppercase text-xs tracking-widest">
                          Priority Matrix Result: {selectedPatient.priority}
                       </div>
                    </div>
                    <button onClick={() => setSelectedPatient(null)}><X className="text-gray-300"/></button>
                 </div>
                 <div className="bg-nhs-blue/5 p-8 rounded-3xl border border-nhs-blue/10 mb-8 italic text-gray-700 leading-relaxed">
                    "{selectedPatient.explanation}"
                 </div>
                 <button onClick={() => setSelectedPatient(null)} className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl">Dismiss Analysis</button>
              </div>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 py-20 mt-32 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-nhs-blue rounded-2xl flex items-center justify-center text-white font-black text-2xl">H</div>
               <div>
                  <div className="text-2xl font-black text-gray-900">Hayat</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Saving Lives Through Data</div>
               </div>
            </div>
            <div className="flex gap-10 text-sm font-bold text-gray-400 uppercase tracking-widest">
               <a href="#home">Home</a>
               <a href="#about">About</a>
               <a href="#contact">Contact</a>
            </div>
            <div className="text-xs text-gray-300 font-mono">© 2025 HAYAT • MINISTRY OF HEALTH PILOT</div>
         </div>
      </footer>
    </div>
  );
};

export default App;
