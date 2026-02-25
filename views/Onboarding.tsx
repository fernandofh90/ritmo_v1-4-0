import React, { useState } from 'react';
import { UserConfig } from '../types';
import { ArrowRight, Battery, Moon, Sun, Users } from 'lucide-react';

interface OnboardingProps {
  onComplete: (config: UserConfig) => void;
  initialConfig: UserConfig;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialConfig }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<UserConfig>(initialConfig);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        onComplete({ ...config, isOnboarded: true });
      }, 2000);
    }
  };

  if (isProcessing) {
      return (
          <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold mb-2">Calibrando...</h2>
              <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-[width_2s_ease-out_forwards]" style={{ width: '100%' }}></div>
              </div>
              <p className="text-slate-400 mt-4 text-sm">Criando seu ritmo pessoal...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between max-w-md mx-auto p-8">
      <div className="flex-1 flex flex-col justify-center">
        
        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
             <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
               <Battery size={32} />
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Como você recarrega?</h2>
             <p className="text-slate-500 mb-6">Para proteger sua energia, preciso saber o que te drena.</p>
             
             <div className="space-y-4">
                <button
                  onClick={() => setConfig({ ...config, socialPreference: 'SOLITARY' })}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    config.socialPreference === 'SOLITARY' 
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🧘</span>
                    <span className={`font-bold ${config.socialPreference === 'SOLITARY' ? 'text-blue-900' : 'text-slate-900'}`}>
                      SOZINHO
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    "Preciso de tempo só meu para pensar. Muita gente me cansa."
                  </p>
                </button>

                <button
                  onClick={() => setConfig({ ...config, socialPreference: 'SOCIAL' })}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    config.socialPreference === 'SOCIAL' 
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🤝</span>
                    <span className={`font-bold ${config.socialPreference === 'SOCIAL' ? 'text-blue-900' : 'text-slate-900'}`}>
                      COM PESSOAS
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    "Conversar me dá energia. Ficar sozinho me desanima."
                  </p>
                </button>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
               <Sun size={32} />
             </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Pico de Produtividade</h2>
            <p className="text-slate-500 mb-8">Quando você sente que seu cérebro está mais afiado?</p>

            <div className="space-y-3">
              {[
                { id: 'MORNING', label: 'Manhã (6h-12h)', desc: 'Acordo com energia total' },
                { id: 'AFTERNOON', label: 'Tarde (12h-18h)', desc: 'Demoro a engrenar, mas vou longe' },
                { id: 'NIGHT', label: 'Noite (18h-22h)', desc: 'Funciono melhor quando todos param' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setConfig({ ...config, peakProductivity: option.id as any })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    config.peakProductivity === option.id 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className={`font-semibold ${config.peakProductivity === option.id ? 'text-amber-900' : 'text-slate-900'}`}>
                    {option.label}
                  </div>
                  <div className="text-sm text-slate-500">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
            <div className="animate-fade-in">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                    <Moon size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Necessidade de Sono</h2>
                <p className="text-slate-500 mb-8">Quantas horas você PRECISA dormir para funcionar bem?</p>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                    <div className="text-6xl font-bold text-slate-900 mb-2">
                        {config.sleepGoal}
                        <span className="text-xl text-slate-400 font-normal ml-1">h</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-8">Horas por noite</p>
                    
                    <div className="flex items-center gap-4 justify-center">
                        <button 
                            onClick={() => setConfig({ ...config, sleepGoal: Math.max(4, config.sleepGoal - 0.5) })}
                            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600"
                        >
                            -
                        </button>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 transition-all"
                                style={{ width: `${((config.sleepGoal - 4) / 6) * 100}%` }}
                            />
                        </div>
                        <button 
                            onClick={() => setConfig({ ...config, sleepGoal: Math.min(10, config.sleepGoal + 0.5) })}
                            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-600"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Meta Diária</h2>
             <p className="text-slate-500 text-sm mb-6">Defina seus objetivos comerciais base.</p>
             
             <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contatos realizados</label>
                  <input 
                    type="number" 
                    className="block w-full rounded-xl border-slate-200 bg-white p-3 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                    value={config.dailyTargets.contacts}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      dailyTargets: { ...config.dailyTargets, contacts: Number(e.target.value) } 
                    })}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Conversas iniciadas</label>
                  <input 
                    type="number" 
                    className="block w-full rounded-xl border-slate-200 bg-white p-3 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                    value={config.dailyTargets.conversations}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      dailyTargets: { ...config.dailyTargets, conversations: Number(e.target.value) } 
                    })}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reuniões agendadas</label>
                  <input 
                    type="number" 
                    className="block w-full rounded-xl border-slate-200 bg-white p-3 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                    value={config.dailyTargets.meetings}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      dailyTargets: { ...config.dailyTargets, meetings: Number(e.target.value) } 
                    })}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vendas fechadas</label>
                  <input 
                    type="number" 
                    className="block w-full rounded-xl border-slate-200 bg-white p-3 text-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                    value={config.dailyTargets.sales}
                    onChange={(e) => setConfig({ 
                      ...config, 
                      dailyTargets: { ...config.dailyTargets, sales: Number(e.target.value) } 
                    })}
                  />
               </div>
             </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Foco Inicial</h2>
            <p className="text-slate-500 mb-8">O sistema ajustará as sugestões com base nisso.</p>

            <div className="space-y-3">
              {[
                { id: 'prospecting', label: 'Prospecção', desc: 'Preciso encher o funil' },
                { id: 'meetings', label: 'Reuniões', desc: 'Preciso agendar mais' },
                { id: 'conversion', label: 'Conversão', desc: 'Preciso fechar mais' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setConfig({ ...config, focus: option.id as any })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    config.focus === option.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className={`font-semibold ${config.focus === option.id ? 'text-blue-900' : 'text-slate-900'}`}>
                    {option.label}
                  </div>
                  <div className="text-sm text-slate-500">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-slate-900 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg"
      >
        {step === 5 ? 'Finalizar Setup' : 'Próximo'}
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
