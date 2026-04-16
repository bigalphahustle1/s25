import { useState, useEffect } from 'react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [verifyingStock, setVerifyingStock] = useState(false);
  const [validatingAnswer, setValidatingAnswer] = useState(false);
  const [spotAvailable, setSpotAvailable] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [activeParticipants, setActiveParticipants] = useState(1284);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Randomly update active participants for "live" feel
        setActiveParticipants(p => p + (Math.random() > 0.5 ? 1 : -1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatMinutesSeconds = (totalSeconds: number) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const formatHoursMinutesSeconds = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const min = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const ctaUrl = "https://singingfiles.com/show.php?l=0&u=1073998&id=70079";

  const handleAnswer = (questionNum: number) => {
    if (questionNum === 1) {
      setCurrentQuestion(2);
    } else if (questionNum === 2) {
      setCurrentQuestion(3);
    } else if (questionNum === 3) {
      setCurrentQuestion(4);
      setVerifyingStock(true);
      
      setTimeout(() => {
        setVerifyingStock(false);
        setValidatingAnswer(true);
        
        setTimeout(() => {
          setValidatingAnswer(false);
          setSpotAvailable(true);
          setShowCTA(true);
          
          setTimeout(() => {
             // We don't auto-redirect in "Web App" mode to let them see status, 
             // but user requested redirect to CTA. Let's keep a small delay.
             // window.location.href = ctaUrl;
          }, 3000);
          
        }, 1500);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#1A1A1A]">
      {/* Urgency Top Bar */}
      <div className="bg-[#e60012] text-white py-2 px-4 text-center sticky top-0 z-[60] shadow-sm">
        <p className="font-headline font-bold text-sm tracking-tight flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          OFFER EXPIRES IN: <span className="font-mono">{formatMinutesSeconds(timeLeft)}</span>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white px-10 py-5 border-b border-[#E5E5E5] flex justify-between items-center w-full z-50 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="text-[20px] font-[900] tracking-[-1px] uppercase">
            DataSyncS25
          </div>
          <div className="h-6 w-[1px] bg-[#E5E5E5] hidden md:block"></div>
          <div className="text-xs font-bold text-[#8E9299] uppercase tracking-widest hidden md:block">Verification Gateway v2.4</div>
        </div>
        <div className="timer-container scale-75 md:scale-100">
          {formatHoursMinutesSeconds(timeLeft)}
        </div>
      </header>

      {/* Main Grid Interface */}
      <main className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 flex-1 max-w-[1400px] mx-auto w-full">
        
        {/* Profile / Hero Card */}
        <div className="bento-card col-span-1 md:col-span-2 row-span-1 justify-center relative overflow-hidden">
          <div className="card-title">User Allocation Phase</div>
          <div className="z-10 relative">
            <h1 className="text-3xl font-black leading-none tracking-tighter mb-4">
              PARABÉNS!<br />
              <span className="text-[#007AFF]">VOCÊ FOI SELECIONADO.</span>
            </h1>
            <p className="text-[#8E9299] text-sm leading-relaxed mb-4 max-w-sm">
              Seu perfil foi validado para participar da distribuição brasileira do Samsung Galaxy S25. 
              Conclua as métricas de resposta abaixo.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#4CAF50] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Identity Verified: region_br_allocated
            </div>
          </div>
          <img alt="S25" src="https://lh3.googleusercontent.com/aida/ADBb0ug7tL0Mrcm9coYl0xnNUe6OiLN6I8C48QigDuebgwxPQgb0-FtEybmR-VAYfkMO63jbVUVXXUP6ft6G03rK2prL27RQMWTkGI5uEV_3luh_URGLHvm_ReGEE1sIjaKi8cHPmi3-KbmxetmfgbX2x0yWJzcf4CLnIR_ORPKpCLkYQSkqe_ooLhpwi0Oveitht3i0Xa7EAXXnS385xb6OGhxsZ0JKYufBPRoBDs6ah0VWVq9CcdiEGilJkyE_cuzF1yqXI657QEVe5g" 
               className="absolute right-0 bottom-0 w-48 opacity-20 pointer-events-none transform translate-x-10 translate-y-10" />
        </div>

        {/* Live Stat 1 */}
        <div className="bento-card justify-center">
          <div className="card-title">Participantes Ativos</div>
          <div className="text-5xl font-light my-2 tracking-tighter">{activeParticipants.toLocaleString()}</div>
          <div className="text-[12px] text-[#4CAF50] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            ↑ 12% na última hora
          </div>
        </div>

        {/* Live Stat 2 */}
        <div className="bento-card justify-center">
          <div className="card-title">Latência do Gateway</div>
          <div className="text-5xl font-light my-2 tracking-tighter">99.9%</div>
          <div className="text-[12px] text-[#8E9299] font-medium">Estável em 4 regiões</div>
        </div>

        {/* Questionnaire (The Core App Logic) */}
        <div className="bento-card bento-card-dark col-span-1 md:col-span-2 row-span-2">
          <div className="card-title card-title-dark">Metrics Collection Task</div>
          
          <div className="space-y-4 my-auto">
            {/* Step 1 */}
            <div className={`question-item ${currentQuestion > 1 ? 'selected' : ''} ${currentQuestion === 1 ? 'opacity-100' : 'opacity-40'}`} 
                 onClick={() => currentQuestion === 1 && handleAnswer(1)}>
              <span className="text-[15px] font-medium block">01. Verificação de Residência</span>
              <div className="flex gap-2 mt-3">
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors uppercase font-bold tracking-widest">Reside no Brasil</span>
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors uppercase font-bold tracking-widest">Outro</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`question-item ${currentQuestion > 2 ? 'selected' : ''} ${currentQuestion === 2 ? 'opacity-100' : (currentQuestion < 2 ? 'hidden' : 'opacity-40')}`}
                 onClick={() => currentQuestion === 2 && handleAnswer(2)}>
              <span className="text-[15px] font-medium block">02. Experiência do Ecossistema</span>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 uppercase font-bold tracking-widest">Samsung</span>
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 uppercase font-bold tracking-widest">Apple</span>
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 uppercase font-bold tracking-widest">Android Generic</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`question-item ${currentQuestion > 3 ? 'selected' : ''} ${currentQuestion === 3 ? 'opacity-100' : (currentQuestion < 3 ? 'hidden' : 'opacity-40')}`}
                 onClick={() => currentQuestion === 3 && handleAnswer(3)}>
              <span className="text-[15px] font-medium block">03. Configuração de Hardware</span>
              <div className="flex gap-2 mt-3">
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 uppercase font-bold tracking-widest flex items-center gap-2">
                   Shadow Black
                </span>
                <span className="text-[11px] px-4 py-1.5 rounded-full border border-white/20 uppercase font-bold tracking-widest flex items-center gap-2">
                   Titanium Silver
                </span>
              </div>
            </div>
            
            {currentQuestion > 3 && (
              <div className="mt-4 text-[#00FF00] font-bold text-xs flex items-center gap-2 animate-pulse">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                METRICS SYNC COMPLETE.
              </div>
            )}
          </div>
        </div>

        {/* Status Area / Logs (Web App Feel) */}
        <div className="bento-card col-span-1 md:col-span-1 row-span-1">
          <div className="card-title">System Execution Logs</div>
          <div className="font-mono text-[10px] leading-[1.6] text-[#666] h-[150px] overflow-hidden flex flex-col justify-end">
            <div className="opacity-40">[14:22:01] Gateway request init... OK</div>
            <div className="opacity-60">[14:22:03] Loading user_profile_BR... OK</div>
            <div className={`${currentQuestion <= 3 ? 'animate-pulse text-[#007aff]' : ''}`}>
              [14:22:05] {currentQuestion > 3 ? 'Questions answered. Processing data.' : 'Awaiting manual metric input...'}
            </div>
            {verifyingStock && <div className="text-[#007aff]">[14:22:06] SCANNING_INVENTORY_S25...</div>}
            {validatingAnswer && <div className="text-[#007aff]">[14:22:07] VALIDATING_RESPONSE_SET...</div>}
            {spotAvailable && (
              <>
                <div className="text-[#4CAF50] font-bold">[14:22:08] STATUS: ALLOCATED</div>
                <div className="text-[#4CAF50]">[14:22:09] REDIRECT_READY: TRUE</div>
              </>
            )}
          </div>
        </div>

        {/* Global CTA Card */}
        <div onClick={() => { if(showCTA) window.location.href = ctaUrl; }} 
             className={`bento-card cta-card-gradient col-span-1 md:col-span-1 row-span-1 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${!showCTA ? 'opacity-20 pointer-events-none grayscale' : 'hover:scale-[1.05] shadow-2xl'}`}>
          <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter leading-none">REIVINDICAR</h2>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Proceed to Gateway</p>
          {showCTA && (
            <div className="absolute top-0 right-0 p-2">
              <span className="material-symbols-outlined text-white animate-bounce">arrow_downward</span>
            </div>
          )}
        </div>

      </main>

      {/* Footer (Simplified for Web App) */}
      <footer className="bg-white border-t border-[#E5E5E5] py-6 px-10 flex flex-col md:flex-row justify-between items-center text-[#8E9299]">
        <div className="text-[11px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Global Promotions Group // Powered by Samsung Loyalty
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="text-[11px] hover:text-[#007AFF] uppercase font-bold transition-colors" href="#">Security Docs</a>
          <a className="text-[11px] hover:text-[#007AFF] uppercase font-bold transition-colors" href="#">System Status</a>
          <a className="text-[11px] hover:text-[#007AFF] uppercase font-bold transition-colors" href="#">Help Desk</a>
        </div>
      </footer>

      {/* Ticker for "Web App" depth */}
      <div className="bg-black text-[#8E9299] py-1 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center justify-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          <span>SECURE GATEWAY ACTIVE // SYSTEM_VERIFIED // NO_ALLOCATION_ERRORS // SECURE GATEWAY ACTIVE // SYSTEM_VERIFIED // NO_ALLOCATION_ERRORS</span>
          <span>SECURE GATEWAY ACTIVE // SYSTEM_VERIFIED // NO_ALLOCATION_ERRORS // SECURE GATEWAY ACTIVE // SYSTEM_VERIFIED // NO_ALLOCATION_ERRORS</span>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
