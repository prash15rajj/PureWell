document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const breathCircle = document.getElementById('breathCircle');
    const inhaleExhaleText = document.getElementById('inhaleExhaleText');

    let isBreathing = false;
    let intervalId;

    startButton.addEventListener('click', () => {
        if (!isBreathing) {
            startBreathingGame();
            isBreathing = true;
            startButton.textContent = 'Stop';
        } else {
            stopBreathingGame();
            isBreathing = false;
            startButton.textContent = 'Start';
        }
    });

    function startBreathingGame() {
        const breathCycles = [
            { type: 'inhale', duration: 4000 },  // Inhale for 4 seconds
            { type: 'hold', duration: 2000 },   // Hold for 2 seconds
            { type: 'exhale', duration: 4000 }, // Exhale for 4 seconds
            { type: 'hold', duration: 2000 }    // Hold for 2 seconds
        ];

        let currentCycle = 0;

        executeBreathCycle();

        function executeBreathCycle() {
            const cycle = breathCycles[currentCycle];
            const nextCycleIndex = (currentCycle + 1) % breathCycles.length;
            const nextCycle = breathCycles[nextCycleIndex];

            if (cycle.type === 'inhale') {
                inhaleExhaleText.textContent = 'Inhale';
                breathCircle.style.transform = 'scale(1)';
            } else if (cycle.type === 'exhale') {
                inhaleExhaleText.textContent = 'Exhale';
                breathCircle.style.transform = 'scale(0.5)';
            } else {
                inhaleExhaleText.textContent = 'Hold';
            }

            intervalId = setTimeout(() => {
                currentCycle = nextCycleIndex;
                executeBreathCycle();
            }, cycle.duration);
        }
    }

    function stopBreathingGame() {
        clearTimeout(intervalId);
        inhaleExhaleText.textContent = 'Click Start to Begin';
        breathCircle.style.transform = 'scale(1)';
    }
});
