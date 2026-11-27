export function createLeadTracker(endpoint, vertical, state, storageKey) {
  let timer;

  function send() {
    if (!endpoint || !state.answers.some(Boolean)) return;
    state.trackingRevision = (state.trackingRevision || 0) + 1;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // El envío funciona aunque el navegador bloquee el almacenamiento.
    }

    const payload = {
      vertical,
      id: state.reference,
      version: state.trackingRevision,
      stage: state.stage,
      answers: state.answers.map(answer => answer?.value || ''),
      contact: {
        nombre: state.contact.nombre || '',
        negocio: state.contact.negocio || '',
        whatsapp: state.contact.whatsapp || '',
        presencia: state.contact.presencia || ''
      },
      openedWhatsApp: state.openedWhatsApp
    };
    const body = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });
    if (!navigator.sendBeacon?.(endpoint, body)) {
      fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, body }).catch(() => {});
    }
  }

  function schedule(immediate = false) {
    if (!endpoint || !state.answers.some(Boolean)) return;
    clearTimeout(timer);
    if (immediate) send();
    else timer = setTimeout(send, 600);
  }

  window.addEventListener('pagehide', () => {
    if (timer) {
      clearTimeout(timer);
      send();
    }
  });

  return schedule;
}
