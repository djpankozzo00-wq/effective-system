const Sounds = (() => {
  let ctx;
  const ensure = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  const tone = (freq, dur = 0.12, type = 'sine', gain = 0.04) => {
    try {
      const c = ensure();
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = gain;
      o.connect(g); g.connect(c.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.stop(c.currentTime + dur);
    } catch (_) {}
  };
  return {
    tap: () => tone(520, 0.05, 'triangle', 0.025),
    success: () => { tone(523, 0.09, 'sine', 0.05); setTimeout(() => tone(784, 0.14, 'sine', 0.05), 90); },
    credit: () => { tone(440, 0.08); setTimeout(() => tone(660, 0.1), 70); setTimeout(() => tone(880, 0.16), 150); },
    error: () => tone(180, 0.18, 'sawtooth', 0.03),
    open: () => tone(600, 0.07, 'sine', 0.03),
    message: () => {
      tone(880, 0.07, 'sine', 0.045);
      setTimeout(() => tone(1175, 0.11, 'sine', 0.04), 70);
      setTimeout(() => tone(1568, 0.08, 'triangle', 0.025), 150);
    },
  };
})();
window.MapsSounds = Sounds;
