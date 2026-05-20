document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed to maintain layout performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ==========================================
     2. DYNAMIC SPORT TABS TOGGLER
     ========================================== */
  const tabs = document.querySelectorAll('.console-tab');
  const views = document.querySelectorAll('.match-widget-view');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Remove active state from current tab
      tabs.forEach(t => t.classList.remove('active'));
      // 2. Add active to clicked tab
      tab.classList.add('active');
      
      // 3. Switch dashboard views
      const targetedSport = tab.getAttribute('data-sport');
      
      views.forEach(view => {
        view.classList.remove('active');
        if (view.getAttribute('id') === `view-${targetedSport}`) {
          view.classList.add('active');
        }
      });
    });
  });

  /* ==========================================
     3. AI PROBABILITY GAUGE ANIMATION
     ========================================== */
  const gaugeCircle = document.getElementById('gauge-predict');
  const gaugeValDisplay = document.getElementById('gauge-val-display');
  
  if (gaugeCircle) {
    // Standard circle length with radius 60: 2 * PI * r = ~377
    const strokeDashArray = 377;
    gaugeCircle.style.strokeDasharray = strokeDashArray;
    
    // Set target percentage
    const targetPercent = 74;
    const offset = strokeDashArray - (strokeDashArray * targetPercent) / 100;
    
    // Animate stroke dashoffset on a slight timeout so users see the loading motion
    setTimeout(() => {
      gaugeCircle.style.strokeDashoffset = offset;
    }, 400);
  }

  /* ==========================================
     4. SIMULATED REAL-TIME SPORTS ENGINE
     ========================================== */
  // Football Real-time simulation state
  let fbMinute = 82;
  let fbHomeScore = 2;
  let fbAwayScore = 1;
  const fbTimerDisplay = document.getElementById('futbol-timer');
  const fbScoreDisplay = document.getElementById('futbol-score');
  const fbPossValText = document.getElementById('stat-poss-vals');
  const fbPossFill = document.getElementById('stat-poss-fill');
  
  // Basketball State
  let bbHomeScore = 84;
  let bbAwayScore = 80;
  const bbScoreDisplay = document.getElementById('basket-score');
  
  // Real-time ticking interval (every 4.5 seconds simulates a minute/play)
  setInterval(() => {
    // 4.1 Update Football Match Minute
    if (fbMinute < 90) {
      fbMinute++;
      if (fbTimerDisplay) fbTimerDisplay.textContent = `${fbMinute}'`;
      
      // Random event trigger
      if (fbMinute === 88 && fbHomeScore === 2) {
        fbHomeScore = 3;
        if (fbScoreDisplay) {
          fbScoreDisplay.textContent = `${fbHomeScore} - ${fbAwayScore}`;
          // Visual flare highlighting the score update
          fbScoreDisplay.style.color = 'var(--color-primary-green)';
          setTimeout(() => fbScoreDisplay.style.color = 'var(--color-text-charcoal)', 1500);
        }
      }
      
      // Fluctuate possession stats slightly to simulate active pitch actions
      if (fbPossValText && fbPossFill) {
        const homePoss = Math.floor(Math.random() * (65 - 58) + 58); // range 58% to 65%
        const awayPoss = 100 - homePoss;
        fbPossValText.textContent = `${homePoss}% - ${awayPoss}%`;
        fbPossFill.style.width = `${homePoss}%`;
      }
    } else if (fbMinute === 90) {
      fbMinute = fbMinute + 1; // display 90+
      if (fbTimerDisplay) fbTimerDisplay.textContent = "90+'";
    }
    
    // 4.2 Update Basketball Scores
    if (bbHomeScore < 98) {
      const incrementHome = Math.random() > 0.4 ? Math.floor(Math.random() * 3) : 0;
      const incrementAway = Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0;
      
      bbHomeScore += incrementHome;
      bbAwayScore += incrementAway;
      
      if (bbScoreDisplay) {
        bbScoreDisplay.textContent = `${bbHomeScore} - ${bbAwayScore}`;
      }
    }
  }, 4500);

  /* ==========================================
     5. BUTTON ACTION BRIDGE FEEDBACK
     ========================================== */
  const ctaLinks = document.querySelectorAll('.btn-premium, footer a');
  
  // Create an elegant absolute floating toast component for user notifications
  const triggerBridgeToast = (message) => {
    // Remove old toast if exists
    const oldToast = document.querySelector('.premium-toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--color-white);
      border: 1px solid var(--color-border-glow);
      box-shadow: 0 15px 40px rgba(0, 200, 117, 0.25);
      border-radius: 16px;
      padding: 1rem 1.75rem;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      pointer-events: none;
    `;
    
    const toastIcon = `
      <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-emerald-glow); color: var(--color-primary-green); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    `;
    
    const toastText = `
      <div style="font-family: var(--font-family-body); text-align: left;">
        <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-charcoal); margin:0;">Yönlendiriliyorsunuz...</p>
        <p style="font-size: 0.75rem; color: var(--color-text-gray); margin:0;">${message}</p>
      </div>
    `;
    
    toast.innerHTML = toastIcon + toastText;
    document.body.appendChild(toast);
    
    // Animate out
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };
  
  // Inject toast keyframes to document
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes toastIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes toastOut {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(20px); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Bind beautiful feedback to CTA clicks
  ctaLinks.forEach(cta => {
    cta.addEventListener('click', (e) => {
      // Allow custom visual feedback first, then perform dynamic redirect
      e.preventDefault();
      
      let ctaMsg = "SporPredict ana platformuna güvenli bağlantı kuruluyor.";
      const targetId = cta.getAttribute('id');
      
      if (targetId === 'hero-cta') ctaMsg = "Premium bülten ve canlı analiz merkezine aktarılıyorsunuz.";
      if (targetId === 'live-cta') ctaMsg = "Anlık maç momentum simülatörlerine bağlanılıyor.";
      if (targetId === 'analytics-cta') ctaMsg = "Gelişmiş AI tahmin paneli yükleniyor.";
      if (targetId === 'mobile-cta') ctaMsg = "Mobil responsive spor takip sunucularına bağlanılıyor.";
      if (targetId === 'trust-cta') ctaMsg = "SporPredict topluluk ağımıza kaydınız yapılıyor.";
      if (targetId === 'final-conversion-cta') ctaMsg = "Ana prediction platformuna yönlendiriliyorsunuz.";
      
      triggerBridgeToast(ctaMsg);
      
      // Perform genuine transition to the target CTA URL after showing the premium toast
      const redirectUrl = cta.getAttribute('href');
      if (redirectUrl && redirectUrl !== '#') {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1200); // 1.2 second delay for perfect visual pacing of the toast
      }
    });
  });

});
