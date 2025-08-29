class Timer {
    constructor() {
        this.timeLeft = 0;
        this.totalTime = 0;
        this.isRunning = false;
        this.interval = null;
        this.audio = null; // Fallback HTMLAudioElement
        this.audioContext = null; // Web Audio API
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadAudio();
    }

    initializeElements() {
        this.hoursDisplay = document.getElementById('hours');
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        
        this.hoursInput = document.getElementById('hoursInput');
        this.minutesInput = document.getElementById('minutesInput');
        this.secondsInput = document.getElementById('secondsInput');
        
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.timerStatus = document.getElementById('timerStatus');
        this.timerDisplay = document.getElementById('timeDisplay');
        this.notification = document.getElementById('notification');
        this.closeNotificationBtn = document.getElementById('closeNotification');
        
        this.presetButtons = document.querySelectorAll('.preset-btn');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.closeNotificationBtn.addEventListener('click', () => this.hideNotification());
        
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const seconds = parseInt(btn.dataset.time);
                this.setTimeFromSeconds(seconds);
            });
        });
        
        this.hoursInput.addEventListener('input', () => this.updateDisplay());
        this.minutesInput.addEventListener('input', () => this.updateDisplay());
        this.secondsInput.addEventListener('input', () => this.updateDisplay());
        
        this.setupInputValidation();
        
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        const resumeAudio = () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        };
        ['click','keydown','touchstart'].forEach(evt => {
            document.addEventListener(evt, resumeAudio, { once: true });
        });
    }

    setupInputValidation() {
        const inputs = [this.hoursInput, this.minutesInput, this.secondsInput];
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                let value = parseInt(input.value) || 0;
                if (input === this.hoursInput) {
                    value = Math.min(value, 23);
                } else {
                    value = Math.min(value, 59);
                }
                input.value = value;
                this.updateDisplay();
            });
        });
    }

    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (this.isRunning) { this.pause(); } else { this.start(); }
                break;
            case 'KeyR':
                if (e.ctrlKey) { e.preventDefault(); this.reset(); }
                break;
        }
    }

    loadAudio() {
        this.audio = new Audio();
        this.audio.src = 'data:audio/wav;base64,UklGRmYAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='; // silencio mínimo
        this.audio.load();

        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.audioContext = new AudioCtx();
            }
        } catch (e) {
            this.audioContext = null;
        }
    }

    // Beep de respaldo
    playVintageBeep() {
        if (!this.audioContext) {
            try { const beep = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQCQAAAA'); beep.play(); } catch (e) {}
            return;
        }
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const duration = 0.25;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, now);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
    }

    // Melodía polifónica retro
    playVintageMelody() {
        if (!this.audioContext) { this.playVintageBeep(); return; }
        const ctx = this.audioContext;
        const now = ctx.currentTime + 0.02;
        const tempo = 120; // bpm
        const q = 60 / tempo; // negra

        // Utilidad para crear una voz con envolvente
        const createVoice = (type, volume = 0.15) => {
            const osc = ctx.createOscillator();
            osc.type = type;
            const gain = ctx.createGain();
            gain.gain.value = 0.0;
            osc.connect(gain);
            gain.connect(ctx.destination);
            return { osc, gain };
        };

        const note = (freq, start, len, voice) => {
            const t0 = now + start;
            const t1 = t0 + len;
            voice.osc.frequency.setValueAtTime(freq, t0);
            voice.gain.gain.cancelScheduledValues(t0);
            voice.gain.gain.setValueAtTime(0.0001, t0);
            voice.gain.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
            voice.gain.gain.exponentialRampToValueAtTime(0.001, t1 - 0.02);
        };

        // Frecuencias helper (escala C Eólio ~ C menor natural)
        const FREQ = {
            C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16,
            C5: 523.25, D5: 587.33, Eb5: 622.25, F5: 698.46, G5: 783.99, Ab5: 830.61, Bb5: 932.33
        };

        // Voces: bajo, lead y acompañamiento (acordes)
        const bass = createVoice('triangle');
        const lead = createVoice('square');
        const pad1 = createVoice('sawtooth');
        const pad2 = createVoice('sawtooth');

        bass.osc.start(now);
        lead.osc.start(now);
        pad1.osc.start(now);
        pad2.osc.start(now);

        // Patrón de 2 compases (8 negras) con acordes
        // Compás 1: Cm (C Eb G)
        note(FREQ.C4, 0*q, 2*q, bass);
        note(FREQ.C5, 0*q, 1*q, lead);
        note(FREQ.Eb5, 1*q, 1*q, lead);
        note(FREQ.G5, 2*q, 1*q, lead);
        note(FREQ.Eb5, 3*q, 1*q, lead);
        // acorde sostenido con pad
        note(FREQ.C4, 0*q, 4*q, pad1);
        note(FREQ.Eb4, 0*q, 4*q, pad2);

        // Compás 2: Ab (Ab C Eb)
        note(FREQ.Ab4, 4*q, 2*q, bass);
        note(FREQ.C5, 4*q, 1*q, lead);
        note(FREQ.Eb5, 5*q, 1*q, lead);
        note(FREQ.C5, 6*q, 1*q, lead);
        note(FREQ.Ab4, 7*q, 1*q, lead);
        note(FREQ.Ab4, 4*q, 4*q, pad1);
        note(FREQ.C4, 4*q, 4*q, pad2);

        // Suave vibrato al lead
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(5.5, now);
        lfoGain.gain.setValueAtTime(7, now);
        lfo.connect(lfoGain);
        lfoGain.connect(lead.osc.frequency);
        lfo.start(now);

        const stopAt = now + 8*q + 0.1;
        bass.osc.stop(stopAt);
        lead.osc.stop(stopAt);
        pad1.osc.stop(stopAt);
        pad2.osc.stop(stopAt);
        lfo.stop(stopAt);
    }

    setTimeFromSeconds(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        this.hoursInput.value = hours;
        this.minutesInput.value = minutes;
        this.secondsInput.value = seconds;
        this.updateDisplay();
    }

    updateDisplay() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        this.hoursDisplay.textContent = hours.toString().padStart(2, '0');
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        this.totalTime = hours * 3600 + minutes * 60 + seconds;
        this.timeLeft = this.totalTime;
    }

    start() {
        if (this.totalTime === 0) {
            this.showMessage('Por favor, configura un tiempo antes de iniciar', 'error');
            return;
        }
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.timerStatus.textContent = 'Temporizador en marcha...';
            this.timerDisplay.classList.add('active');
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay();
                if (this.timeLeft <= 0) { this.complete(); }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.timerStatus.textContent = 'Temporizador pausado';
            this.timerDisplay.classList.remove('active');
            clearInterval(this.interval);
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateTimerDisplay();
        this.timerStatus.textContent = 'Listo para comenzar';
        this.timerDisplay.classList.remove('active');
    }

    updateTimerDisplay() {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;
        this.hoursDisplay.textContent = hours.toString().padStart(2, '0');
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    complete() {
        this.pause();
        this.timerStatus.textContent = '¡Tiempo completado!';
        this.timerDisplay.classList.remove('active');
        
        // Melodía polifónica vintage
        this.playVintageMelody();
        
        this.showNotification();
        this.showBrowserNotification();
    }

    showNotification() { this.notification.classList.add('show'); }
    hideNotification() { this.notification.classList.remove('show'); }

    showBrowserNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Temporizador Completado', {
                body: 'Tu sesión de trabajo ha terminado. ¡Buen trabajo!'
            });
        } else if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') { this.showBrowserNotification(); }
            });
        }
    }

    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #173a22; color: #e8ffe8;
            padding: 1rem 1.5rem; border: 2px solid #13361d; border-radius: 6px; box-shadow: 6px 6px 0 #3b2f2f; z-index: 1001;
        `;
        document.body.appendChild(messageEl);
        setTimeout(() => { document.body.removeChild(messageEl); }, 2200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer();
    if ('Notification' in window && Notification.permission === 'default') {
        setTimeout(() => { Notification.requestPermission(); }, 1500);
    }
});
