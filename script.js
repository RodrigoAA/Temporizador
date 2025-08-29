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

        // Asegurar que el contexto de audio pueda iniciarse por interacción del usuario
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
        // Fallback simple por si Web Audio no está disponible
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

    playVintageBeep() {
        if (!this.audioContext) {
            // pequeño beep fallback
            try {
                const beep = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQCQAAAA');
                beep.play();
            } catch (e) {}
            return;
        }
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const duration = 0.9;

        // Ganancia con envolvente
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.6, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        // Oscilador principal (triángulo, tono bajo vintage)
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(420, now);

        // Oscilador armónico breve para textura
        const osc2 = ctx.createOscillator();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(840, now);

        // LFO para vibrato
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(6, now);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(8, now); // ±8 Hz
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);

        // Pequeño ruido blanco corto para "click" retro
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) { data[i] = (Math.random() * 2 - 1) * 0.2; }
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.25, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        // Conexiones
        osc1.connect(gain);
        osc2.connect(gain);
        noise.connect(noiseGain);
        noiseGain.connect(gain);
        gain.connect(ctx.destination);

        // Iniciar
        osc1.start(now);
        osc2.start(now);
        lfo.start(now);
        noise.start(now);

        // Parar
        osc1.stop(now + duration);
        osc2.stop(now + duration * 0.7);
        lfo.stop(now + duration);
        noise.stop(now + 0.1);
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
        
        // Sonido vintage
        this.playVintageBeep();
        
        // Notificación visual
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
            position: fixed; top: 20px; right: 20px; background: ${type === 'error' ? '#000' : '#000'}; color: #fff;
            padding: 1rem 1.5rem; border: 2px solid #000; border-radius: 6px; box-shadow: 6px 6px 0 #000; z-index: 1001;
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
