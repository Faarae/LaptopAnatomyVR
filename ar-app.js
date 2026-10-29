import { AR_COMPONENTS, getComponentByIndex } from './ar-data.js';

// Application State
const state = {
  view: 'landing', // 'landing' | 'scanner'
  activeTargetIndex: null, // 0, 1, 2 or null
  lastTargetIndex: 0, // default CPU
  scale: 1.0, // 0.25 to 2.5
  rotationY: 0,
  autoRotate: true, // Auto-rotate ON by default so 3D model spins and exhibits 3D depth
  isSpeaking: false,
  sheetExpanded: false,
  activeTab: 'overview',
  speechSynth: window.speechSynthesis || null,
  currentUtterance: null,
  selectedVoice: null
};

// Base scales for balanced visual proportions on top of 800x1000 markers
const BASE_SCALES = {
  0: 0.52, // CPU
  1: 0.38, // RAM
  2: 0.44  // SSD
};

// DOM Elements
const elements = {
  landingView: document.getElementById('landingView'),
  scannerView: document.getElementById('scannerView'),
  aframeScene: document.getElementById('aframeScene'),
  statusPill: document.getElementById('statusPill'),
  statusText: document.getElementById('statusText'),
  reticle: document.getElementById('reticleContainer'),
  // Controls
  btnScaleUp: document.getElementById('btnScaleUp'),
  btnScaleDown: document.getElementById('btnScaleDown'),
  btnResetScale: document.getElementById('btnResetScale'),
  btnRotLeft: document.getElementById('btnRotLeft'),
  btnRotRight: document.getElementById('btnRotRight'),
  btnAutoRotate: document.getElementById('btnAutoRotate'),
  btnTTS: document.getElementById('btnTTS'),
  btnToggleInfo: document.getElementById('btnToggleInfo'),
  btnBackToLanding: document.getElementById('btnBackToLanding'),
  btnStartScan: document.getElementById('btnStartScan'),
  btnViewMarkers: document.getElementById('btnViewMarkers'),
  btnViewGuides: document.getElementById('btnViewGuides'),
  // Bottom Sheet
  bottomSheet: document.getElementById('bottomSheet'),
  sheetHandle: document.getElementById('sheetHandle'),
  sheetBadge: document.getElementById('sheetBadge'),
  sheetTitle: document.getElementById('sheetTitle'),
  sheetHeaderTTS: document.getElementById('sheetHeaderTTS'),
  tabOverview: document.getElementById('tabOverview'),
  tabSpecs: document.getElementById('tabSpecs'),
  tabRole: document.getElementById('tabRole'),
  contentOverview: document.getElementById('contentOverview'),
  contentSpecs: document.getElementById('contentSpecs'),
  contentRole: document.getElementById('contentRole'),
  // Modals & Toasts
  markersModal: document.getElementById('markersModal'),
  instructionsModal: document.getElementById('instructionsModal'),
  targetsMindModal: document.getElementById('targetsMindModal'),
  cameraErrorModal: document.getElementById('cameraErrorModal'),
  toast: document.getElementById('toast')
};

// Initialize Speech Synthesis Voices
function initTTS() {
  if (!state.speechSynth) return;
  const setVoice = () => {
    const voices = state.speechSynth.getVoices();
    // Prioritize Indonesian voice, fallback to Malay or English or default
    state.selectedVoice = voices.find(v => v.lang.startsWith('id') || v.lang.startsWith('in'))
      || voices.find(v => v.lang.startsWith('ms'))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
  };
  setVoice();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = setVoice;
  }
}

// Show Toast Message
function showToast(message, duration = 3000) {
  elements.toast.textContent = message;
  elements.toast.classList.add('toast-visible');
  setTimeout(() => {
    elements.toast.classList.remove('toast-visible');
  }, duration);
}

// Update Active 3D Model Scale & Rotation
function applyModelTransform() {
  if (state.activeTargetIndex === null) return;
  const targetId = `model-${state.activeTargetIndex === 0 ? 'cpu' : state.activeTargetIndex === 1 ? 'ram' : 'ssd'}`;
  const modelEl = document.getElementById(targetId);
  if (!modelEl) return;

  const base = BASE_SCALES[state.activeTargetIndex] || 0.45;
  const currentScale = base * state.scale;
  modelEl.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);
  
  // Tilted 3D floating perspective: 55 degrees tilt, rotating around Y
  modelEl.setAttribute('rotation', `55 ${state.rotationY} 0`);
  modelEl.setAttribute('position', '0 0 0.14');

  if (modelEl.object3D) {
    modelEl.object3D.visible = true;
  }
}

// Auto-Rotate Animation Frame Loop
function animationLoop() {
  if (state.autoRotate && state.activeTargetIndex !== null) {
    state.rotationY = (state.rotationY + 1.2) % 360;
    applyModelTransform();
  }
  requestAnimationFrame(animationLoop);
}

// Speak Component Description (TTS)
function toggleTTS() {
  if (!state.speechSynth) {
    showToast('Web Speech API tidak didukung pada browser ini.');
    return;
  }

  if (state.isSpeaking) {
    stopTTS();
    return;
  }

  const comp = getComponentByIndex(state.lastTargetIndex);
  if (!comp) return;

  stopTTS(); // Cancel any current utterance

  const textToSpeak = comp.ttsNarration || `${comp.name}. ${comp.description}`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  if (state.selectedVoice) {
    utterance.voice = state.selectedVoice;
  }
  utterance.rate = 0.95; // Clear pace
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    state.isSpeaking = true;
    elements.btnTTS.classList.add('btn-tts-active');
    elements.btnTTS.innerHTML = '⏹';
    elements.sheetHeaderTTS.innerHTML = '⏹ Stop';
  };

  utterance.onend = () => {
    stopTTS();
  };

  utterance.onerror = () => {
    stopTTS();
  };

  state.currentUtterance = utterance;
  state.speechSynth.speak(utterance);
}

function stopTTS() {
  if (state.speechSynth && state.isSpeaking) {
    state.speechSynth.cancel();
  }
  state.isSpeaking = false;
  elements.btnTTS.classList.remove('btn-tts-active');
  elements.btnTTS.innerHTML = '🔊';
  elements.sheetHeaderTTS.innerHTML = '🔊 Dengarkan';
}

// Populate Bottom Sheet with Component Details
function updateBottomSheet(targetIndex) {
  const comp = getComponentByIndex(targetIndex);
  if (!comp) return;

  state.lastTargetIndex = targetIndex;
  elements.sheetBadge.textContent = comp.tag;
  elements.sheetBadge.style.color = comp.accentColor;
  elements.sheetTitle.textContent = comp.name;

  // Overview Tab
  elements.contentOverview.innerHTML = `
    <p style="margin-bottom: 10px; color: #f8fafc; font-weight: 500;">${comp.fullName}</p>
    <p style="margin-bottom: 12px; color: #cbd5e1;">${comp.description}</p>
    <div style="background: rgba(30, 41, 59, 0.6); padding: 10px; border-radius: 8px; border-left: 3px solid ${comp.accentColor}; font-size: 0.85rem;">
      <strong style="color: ${comp.accentColor};">Highlight:</strong> ${comp.specsHighlight}
    </div>
  `;

  // Specs Tab
  let specsHtml = '<table class="specs-table"><tbody>';
  for (const [key, val] of Object.entries(comp.specs)) {
    specsHtml += `<tr><td>${key}</td><td>${val}</td></tr>`;
  }
  specsHtml += '</tbody></table>';
  elements.contentSpecs.innerHTML = specsHtml;

  // Role Tab
  elements.contentRole.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div>
        <h5 style="color: ${comp.accentColor}; font-size: 0.88rem; margin-bottom: 4px;">Peran Krusial di Laptop:</h5>
        <p style="color: #cbd5e1;">${comp.laptopRole}</p>
      </div>
      <div>
        <h5 style="color: ${comp.accentColor}; font-size: 0.88rem; margin-bottom: 4px;">Cara Kerja Singkat:</h5>
        <p style="color: #cbd5e1;">${comp.workingPrinciple}</p>
      </div>
    </div>
  `;
}

// Set Tab in Bottom Sheet
function setTab(tabName) {
  state.activeTab = tabName;
  elements.tabOverview.classList.toggle('tab-active', tabName === 'overview');
  elements.tabSpecs.classList.toggle('tab-active', tabName === 'specs');
  elements.tabRole.classList.toggle('tab-active', tabName === 'role');

  elements.contentOverview.classList.toggle('tab-content-active', tabName === 'overview');
  elements.contentSpecs.classList.toggle('tab-content-active', tabName === 'specs');
  elements.contentRole.classList.toggle('tab-content-active', tabName === 'role');
}

// Toggle Bottom Sheet
function toggleBottomSheet(expand) {
  const shouldExpand = expand !== undefined ? expand : !state.sheetExpanded;
  state.sheetExpanded = shouldExpand;
  elements.bottomSheet.classList.toggle('sheet-collapsed', !shouldExpand);
  elements.btnToggleInfo.classList.toggle('btn-action-active', shouldExpand);
}

// Switch Views
function setView(viewName) {
  state.view = viewName;
  if (viewName === 'landing') {
    elements.landingView.classList.remove('view-hidden');
    elements.scannerView.classList.add('view-hidden');
    stopTTS();
    stopARSystem();
  } else if (viewName === 'scanner') {
    elements.landingView.classList.add('view-hidden');
    elements.scannerView.classList.remove('view-hidden');
    startARSystem();

    // Trigger viewport resize to synchronize MindAR video dimensions and A-Frame canvas
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (elements.aframeScene && elements.aframeScene.resize) {
        elements.aframeScene.resize();
      }
    }, 150);
  }
}

let arListenersAttached = false;

function startARSystem() {
  const sceneEl = elements.aframeScene;
  if (!sceneEl) return;

  // Listen to 3D model loaded and error events
  ['model-cpu', 'model-ram', 'model-ssd'].forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el && !el._arBound) {
      el._arBound = true;
      el.addEventListener('model-loaded', () => {
        console.log(`[WebAR] 3D Model loaded: ${id}`);
        if (state.activeTargetIndex === idx) {
          applyModelTransform();
        }
      });
      el.addEventListener('model-error', (e) => {
        console.error(`[WebAR] 3D Model error on ${id}:`, e.detail);
      });
    }
  });

  const triggerStart = () => {
    const arSystem = sceneEl.systems['mindar-image-system'];
    if (arSystem) {
      console.log('Starting MindAR Image System...');
      arSystem.start();
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  };

  if (sceneEl.hasLoaded) {
    triggerStart();
  } else {
    sceneEl.addEventListener('loaded', triggerStart, { once: true });
  }

  if (arListenersAttached) return;
  arListenersAttached = true;

  // Listen to MindAR events
  sceneEl.addEventListener('arReady', () => {
    console.log('MindAR camera ready!');
    showToast('Kamera WebAR siap! Arahkan ke kartu marker icon.');
  });

  sceneEl.addEventListener('arError', (event) => {
    console.error('MindAR Error:', event);
    showToast('Kamera gagal dibuka atau izin ditolak.');
  });

  // Target event listeners for CPU, RAM, SSD
  const targets = [
    { id: 'target-cpu', index: 0 },
    { id: 'target-ram', index: 1 },
    { id: 'target-ssd', index: 2 }
  ];

  targets.forEach(({ id, index }) => {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    targetEl.addEventListener('targetFound', () => {
      state.activeTargetIndex = index;
      state.lastTargetIndex = index;
      const comp = getComponentByIndex(index);

      // Update Status Pill
      elements.statusPill.className = 'status-pill status-found';
      elements.statusText.textContent = `● Terdeteksi: ${comp ? comp.name : 'Hardware'}`;
      elements.reticle.classList.add('reticle-hidden');

      // Update UI and apply transform
      updateBottomSheet(index);
      applyModelTransform();
      showToast(`Target Terdeteksi: ${comp ? comp.name : ''}`);
    });

    targetEl.addEventListener('targetLost', () => {
      if (state.activeTargetIndex === index) {
        state.activeTargetIndex = null;
        elements.statusPill.className = 'status-pill status-lost';
        elements.statusText.textContent = 'Marker Hilang. Arahkan kembali kamera';
        elements.reticle.classList.remove('reticle-hidden');
      }
    });
  });
}

function stopARSystem() {
  const sceneEl = elements.aframeScene;
  if (!sceneEl) return;
  const arSystem = sceneEl.systems['mindar-image-system'];
  if (arSystem && arSystem.stop) {
    try {
      arSystem.stop();
    } catch (e) {
      console.warn('Error stopping AR system:', e);
    }
  }
}

// Bind UI Listeners
function bindEvents() {
  // Navigation
  elements.btnStartScan.addEventListener('click', () => setView('scanner'));
  elements.btnBackToLanding.addEventListener('click', () => setView('landing'));

  // Modals
  elements.btnViewMarkers.addEventListener('click', () => elements.markersModal?.classList.add('modal-open'));
  elements.btnViewGuides.addEventListener('click', () => elements.instructionsModal?.classList.add('modal-open'));

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.markersModal?.classList.remove('modal-open');
      elements.instructionsModal?.classList.remove('modal-open');
      elements.targetsMindModal?.classList.remove('modal-open');
      elements.cameraErrorModal?.classList.remove('modal-open');
    });
  });

  // Scale Controls
  elements.btnScaleUp.addEventListener('click', () => {
    state.scale = Math.min(state.scale + 0.15, 2.5);
    applyModelTransform();
    showToast(`Scale: ${(state.scale).toFixed(2)}x`);
  });

  elements.btnScaleDown.addEventListener('click', () => {
    state.scale = Math.max(state.scale - 0.15, 0.25);
    applyModelTransform();
    showToast(`Scale: ${(state.scale).toFixed(2)}x`);
  });

  elements.btnResetScale.addEventListener('click', () => {
    state.scale = 1.0;
    state.rotationY = 0;
    state.autoRotate = false;
    elements.btnAutoRotate.classList.remove('btn-action-active');
    applyModelTransform();
    showToast('Reset Scale & Rotasi (1.0x)');
  });

  // Rotate Controls
  elements.btnRotLeft.addEventListener('click', () => {
    state.rotationY = (state.rotationY - 15 + 360) % 360;
    applyModelTransform();
  });

  elements.btnRotRight.addEventListener('click', () => {
    state.rotationY = (state.rotationY + 15) % 360;
    applyModelTransform();
  });

  elements.btnAutoRotate.addEventListener('click', () => {
    state.autoRotate = !state.autoRotate;
    elements.btnAutoRotate.classList.toggle('btn-action-active', state.autoRotate);
    showToast(state.autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF');
  });

  // TTS Controls
  elements.btnTTS.addEventListener('click', toggleTTS);
  elements.sheetHeaderTTS.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTTS();
  });

  // Bottom Sheet Controls
  elements.btnToggleInfo.addEventListener('click', () => toggleBottomSheet());
  elements.sheetHandle.addEventListener('click', () => toggleBottomSheet());
  document.querySelector('.sheet-header').addEventListener('click', () => toggleBottomSheet());

  elements.tabOverview.addEventListener('click', () => setTab('overview'));
  elements.tabSpecs.addEventListener('click', () => setTab('specs'));
  elements.tabRole.addEventListener('click', () => setTab('role'));

  // Quick scan on card click in landing
  document.querySelectorAll('.clean-marker-card, .marker-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-index');
      if (idx !== null) {
        state.lastTargetIndex = parseInt(idx, 10);
        updateBottomSheet(state.lastTargetIndex);
      }
      setView('scanner');
    });
  });

  // Init Auto-Rotate button active state
  if (state.autoRotate && elements.btnAutoRotate) {
    elements.btnAutoRotate.classList.add('btn-action-active');
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  initTTS();
  bindEvents();
  updateBottomSheet(0); // Initialize with CPU data
  requestAnimationFrame(animationLoop);
});

