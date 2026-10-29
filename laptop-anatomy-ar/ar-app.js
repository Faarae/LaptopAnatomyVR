import { AR_COMPONENTS, getComponentByIndex } from './ar-data.js';

// Application State
const state = {
  view: 'landing', // 'landing' | 'scanner'
  activeTargetIndex: null, // 0, 1, 2 or null
  lastTargetIndex: 0, // default CPU
  scale: 1.0, // 0.25 to 2.5
  rotationY: 0,
  autoRotate: true,
  isSpeaking: false,
  sheetExpanded: false,
  activeTab: 'overview',
  speechSynth: window.speechSynthesis || null,
  currentUtterance: null,
  selectedVoice: null
};

const BASE_SCALES = {
  0: 0.52, // CPU
  1: 0.38, // RAM
  2: 0.44  // SSD
};

const elements = {
  landingView: document.getElementById('landingView'),
  scannerView: document.getElementById('scannerView'),
  aframeScene: document.getElementById('aframeScene'),
  statusPill: document.getElementById('statusPill'),
  statusText: document.getElementById('statusText'),
  reticle: document.getElementById('reticleContainer'),
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
  markersModal: document.getElementById('markersModal'),
  instructionsModal: document.getElementById('instructionsModal'),
  targetsMindModal: document.getElementById('targetsMindModal'),
  cameraErrorModal: document.getElementById('cameraErrorModal'),
  toast: document.getElementById('toast')
};

function notifyParent(type, payload = {}) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ source: 'webar-studio', type, ...payload }, '*');
  }
}

function initTTS() {
  if (!state.speechSynth) return;
  const setVoice = () => {
    const voices = state.speechSynth.getVoices();
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

function showToast(message, duration = 2600) {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.add('toast-visible');
  setTimeout(() => {
    elements.toast.classList.remove('toast-visible');
  }, duration);
}

function applyModelTransform() {
  if (state.activeTargetIndex === null) return;
  const targetId = `model-${state.activeTargetIndex === 0 ? 'cpu' : state.activeTargetIndex === 1 ? 'ram' : 'ssd'}`;
  const modelEl = document.getElementById(targetId);
  if (!modelEl) return;

  const base = BASE_SCALES[state.activeTargetIndex] || 0.45;
  const currentScale = base * state.scale;
  modelEl.setAttribute('scale', `${currentScale} ${currentScale} ${currentScale}`);
  modelEl.setAttribute('rotation', `55 ${state.rotationY} 0`);
  modelEl.setAttribute('position', '0 0 0.14');

  if (modelEl.object3D) {
    modelEl.object3D.visible = true;
  }
}

function animationLoop() {
  if (state.autoRotate && state.activeTargetIndex !== null) {
    state.rotationY = (state.rotationY + 1.2) % 360;
    applyModelTransform();
  }
  requestAnimationFrame(animationLoop);
}

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

  stopTTS();

  const textToSpeak = comp.ttsNarration || `${comp.name}. ${comp.description}`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  if (state.selectedVoice) {
    utterance.voice = state.selectedVoice;
  }
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    state.isSpeaking = true;
    elements.btnTTS?.classList.add('btn-tts-active');
    if (elements.btnTTS) elements.btnTTS.textContent = 'Stop';
    if (elements.sheetHeaderTTS) elements.sheetHeaderTTS.textContent = 'Hentikan Suara';
    notifyParent('ttsState', { isSpeaking: true });
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
  elements.btnTTS?.classList.remove('btn-tts-active');
  if (elements.btnTTS) elements.btnTTS.textContent = 'TTS';
  if (elements.sheetHeaderTTS) elements.sheetHeaderTTS.textContent = 'Narasi Suara';
  notifyParent('ttsState', { isSpeaking: false });
}

function updateBottomSheet(targetIndex) {
  const comp = getComponentByIndex(targetIndex);
  if (!comp) return;

  state.lastTargetIndex = targetIndex;
  if (elements.sheetBadge) elements.sheetBadge.textContent = `TARGET 0${targetIndex + 1} / ${comp.id.toUpperCase()}`;
  if (elements.sheetTitle) elements.sheetTitle.textContent = comp.name;

  if (elements.contentOverview) {
    elements.contentOverview.innerHTML = `
      <p style="margin-bottom: 8px; color: #f8fafc; font-weight: 600;">${comp.fullName}</p>
      <p style="margin-bottom: 12px; color: #cbd5e1;">${comp.description}</p>
      <div style="background: rgba(30, 41, 59, 0.7); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #10b981; font-size: 0.84rem;">
        <strong style="color: #10b981;">Spesifikasi Utama:</strong> ${comp.specsHighlight}
      </div>
    `;
  }

  let specsHtml = '<table class="specs-table"><tbody>';
  for (const [key, val] of Object.entries(comp.specs)) {
    specsHtml += `<tr><td>${key}</td><td>${val}</td></tr>`;
  }
  specsHtml += '</tbody></table>';
  if (elements.contentSpecs) elements.contentSpecs.innerHTML = specsHtml;

  if (elements.contentRole) {
    elements.contentRole.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div>
          <h5 style="color: #10b981; font-size: 0.84rem; margin-bottom: 4px;">Peran Krusial di Laptop:</h5>
          <p style="color: #cbd5e1;">${comp.laptopRole}</p>
        </div>
        <div>
          <h5 style="color: #10b981; font-size: 0.84rem; margin-bottom: 4px;">Prinsip Kerja:</h5>
          <p style="color: #cbd5e1;">${comp.workingPrinciple}</p>
        </div>
      </div>
    `;
  }
}

function setTab(tabName) {
  state.activeTab = tabName;
  elements.tabOverview?.classList.toggle('tab-active', tabName === 'overview');
  elements.tabSpecs?.classList.toggle('tab-active', tabName === 'specs');
  elements.tabRole?.classList.toggle('tab-active', tabName === 'role');

  elements.contentOverview?.classList.toggle('tab-content-active', tabName === 'overview');
  elements.contentSpecs?.classList.toggle('tab-content-active', tabName === 'specs');
  elements.contentRole?.classList.toggle('tab-content-active', tabName === 'role');
}

function toggleBottomSheet(expand) {
  const shouldExpand = expand !== undefined ? expand : !state.sheetExpanded;
  state.sheetExpanded = shouldExpand;
  elements.bottomSheet?.classList.toggle('sheet-collapsed', !shouldExpand);
  elements.btnToggleInfo?.classList.toggle('btn-action-active', shouldExpand);
}

function setView(viewName) {
  state.view = viewName;
  if (viewName === 'landing') {
    elements.landingView?.classList.remove('view-hidden');
    elements.scannerView?.classList.add('view-hidden');
    stopTTS();
    stopARSystem();
  } else if (viewName === 'scanner') {
    elements.landingView?.classList.add('view-hidden');
    elements.scannerView?.classList.remove('view-hidden');
    startARSystem();

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

  ['model-cpu', 'model-ram', 'model-ssd'].forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el && !el._arBound) {
      el._arBound = true;
      el.addEventListener('model-loaded', () => {
        if (state.activeTargetIndex === idx) {
          applyModelTransform();
        }
      });
    }
  });

  const triggerStart = () => {
    const arSystem = sceneEl.systems['mindar-image-system'];
    if (arSystem) {
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

  sceneEl.addEventListener('arReady', () => {
    showToast('Kamera siap. Arahkan ke kartu marker sasaran.');
    notifyParent('arReady', { status: 'ready' });
  });

  sceneEl.addEventListener('arError', () => {
    showToast('Kamera gagal dibuka atau izin ditolak.');
    notifyParent('arError', { status: 'error' });
  });

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

      if (elements.statusPill) elements.statusPill.className = 'status-pill status-found';
      if (elements.statusText) elements.statusText.textContent = `Terdeteksi: ${comp ? comp.name : 'Hardware'}`;
      elements.reticle?.classList.add('reticle-hidden');

      updateBottomSheet(index);
      applyModelTransform();
      showToast(`Target Terdeteksi: ${comp ? comp.name : ''}`);
      notifyParent('targetFound', { targetIndex: index });
    });

    targetEl.addEventListener('targetLost', () => {
      if (state.activeTargetIndex === index) {
        state.activeTargetIndex = null;
        if (elements.statusPill) elements.statusPill.className = 'status-pill status-lost';
        if (elements.statusText) elements.statusText.textContent = 'Marker hilang. Arahkan kembali kamera.';
        elements.reticle?.classList.remove('reticle-hidden');
        notifyParent('targetLost', { targetIndex: index });
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
      // ignore
    }
  }
}

function handleScaleUp() {
  state.scale = Math.min(state.scale + 0.15, 2.5);
  applyModelTransform();
  showToast(`Skala: ${(state.scale).toFixed(2)}x`);
  notifyParent('scaleChanged', { scale: state.scale });
}

function handleScaleDown() {
  state.scale = Math.max(state.scale - 0.15, 0.25);
  applyModelTransform();
  showToast(`Skala: ${(state.scale).toFixed(2)}x`);
  notifyParent('scaleChanged', { scale: state.scale });
}

function handleResetScale() {
  state.scale = 1.0;
  state.rotationY = 0;
  state.autoRotate = false;
  elements.btnAutoRotate?.classList.remove('btn-action-active');
  applyModelTransform();
  showToast('Reset Skala & Rotasi (1.0x)');
  notifyParent('scaleChanged', { scale: state.scale, autoRotate: false });
}

function handleRotLeft() {
  state.rotationY = (state.rotationY - 15 + 360) % 360;
  applyModelTransform();
}

function handleRotRight() {
  state.rotationY = (state.rotationY + 15) % 360;
  applyModelTransform();
}

function handleToggleAutoRotate() {
  state.autoRotate = !state.autoRotate;
  elements.btnAutoRotate?.classList.toggle('btn-action-active', state.autoRotate);
  showToast(state.autoRotate ? 'Rotasi Otomatis Aktif' : 'Rotasi Otomatis Nonaktif');
  notifyParent('autoRotateChanged', { autoRotate: state.autoRotate });
}

function bindEvents() {
  elements.btnStartScan?.addEventListener('click', () => setView('scanner'));
  elements.btnBackToLanding?.addEventListener('click', () => setView('landing'));

  elements.btnViewMarkers?.addEventListener('click', () => elements.markersModal?.classList.add('modal-open'));
  elements.btnViewGuides?.addEventListener('click', () => elements.instructionsModal?.classList.add('modal-open'));

  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.markersModal?.classList.remove('modal-open');
      elements.instructionsModal?.classList.remove('modal-open');
      elements.targetsMindModal?.classList.remove('modal-open');
      elements.cameraErrorModal?.classList.remove('modal-open');
    });
  });

  elements.btnScaleUp?.addEventListener('click', handleScaleUp);
  elements.btnScaleDown?.addEventListener('click', handleScaleDown);
  elements.btnResetScale?.addEventListener('click', handleResetScale);
  elements.btnRotLeft?.addEventListener('click', handleRotLeft);
  elements.btnRotRight?.addEventListener('click', handleRotRight);
  elements.btnAutoRotate?.addEventListener('click', handleToggleAutoRotate);

  elements.btnTTS?.addEventListener('click', toggleTTS);
  elements.sheetHeaderTTS?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTTS();
  });

  elements.btnToggleInfo?.addEventListener('click', () => toggleBottomSheet());
  elements.sheetHandle?.addEventListener('click', () => toggleBottomSheet());
  document.querySelector('.sheet-header')?.addEventListener('click', () => toggleBottomSheet());

  elements.tabOverview?.addEventListener('click', () => setTab('overview'));
  elements.tabSpecs?.addEventListener('click', () => setTab('specs'));
  elements.tabRole?.addEventListener('click', () => setTab('role'));

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

  if (state.autoRotate && elements.btnAutoRotate) {
    elements.btnAutoRotate.classList.add('btn-action-active');
  }

  // Listen to parent studio control commands
  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || data.target !== 'webar-iframe') return;
    switch (data.action) {
      case 'scaleUp': handleScaleUp(); break;
      case 'scaleDown': handleScaleDown(); break;
      case 'resetScale': handleResetScale(); break;
      case 'rotLeft': handleRotLeft(); break;
      case 'rotRight': handleRotRight(); break;
      case 'toggleAutoRotate': handleToggleAutoRotate(); break;
      case 'toggleTTS': toggleTTS(); break;
      case 'toggleInfo': toggleBottomSheet(); break;
      case 'selectTarget':
        if (typeof data.index === 'number') {
          state.lastTargetIndex = data.index;
          updateBottomSheet(data.index);
        }
        break;
      case 'setView':
        if (data.view) setView(data.view);
        break;
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (window.self !== window.top || params.get('embedded') === '1') {
    document.body.classList.add('is-embedded');
  }
  if (params.get('studio') === '1') {
    document.body.classList.add('hide-internal-hud');
  }
  initTTS();
  bindEvents();
  updateBottomSheet(0);
  if (params.get('scan') === '1') {
    setView('scanner');
  }
  requestAnimationFrame(animationLoop);
});
