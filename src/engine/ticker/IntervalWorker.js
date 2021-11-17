let maxAnimationRate = 8;
let maxDisplayRate = 24;

let lastAnimationTick = 0;
let minAnimationTick = 0;

let lastDisplayTick = 0;
let minDisplayTick = 0;

let frame = 0;
let interval = null;

function updateMaxAnimationRate(animationRate) {
    maxAnimationRate = animationRate;
    lastAnimationTick = 0;
    minAnimationTick = 1000 / animationRate;
}

function updateMaxDisplayRate(displayRate) {
    maxDisplayRate = displayRate;
    lastDisplayTick = 0;
    minDisplayTick = 1000 / displayRate;
}

function updateInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
        const now = performance.now();

        if ((now - lastAnimationTick) >= minAnimationTick) {
            lastAnimationTick = now;
            frame++;

            postMessage('animation');
        }

        if ((now - lastDisplayTick) >= minDisplayTick) {
            lastDisplayTick = now;

            postMessage('display');
        }
    }, minDisplayTick);
}

onmessage = (message) => {
    updateMaxAnimationRate(message.data.animationRate);
    updateMaxDisplayRate(message.data.displayRate);
    updateInterval();
};
