document.addEventListener('DOMContentLoaded', () => {
    const moon = document.getElementById('moon');
    const phaseName = document.getElementById('phase-name');

    function calculateMoonPhase() {
        const today = new Date();
        const synodicMonth = 29.53058770576; // Average length of a synodic month in days
        const newMoon = new Date('2024-01-11T21:44:00Z'); // Reference new moon date

        const daysSinceNewMoon = (today - newMoon) / 86400000; // Milliseconds in a day
        const currentPhase = (daysSinceNewMoon % synodicMonth) / synodicMonth;

        let phase = '';
        let phasePercentage = 0;

        if (currentPhase < 0.03 || currentPhase > 0.97) {
            phase = 'New Moon';
            phasePercentage = 0;
        } else if (currentPhase < 0.25) {
            phase = 'Waxing Crescent';
            phasePercentage = currentPhase * 4;
        } else if (currentPhase < 0.27) {
            phase = 'First Quarter';
            phasePercentage = 1;
        } else if (currentPhase < 0.50) {
            phase = 'Waxing Gibbous';
            phasePercentage = currentPhase * 4 - 1;
        } else if (currentPhase < 0.53) {
            phase = 'Full Moon';
            phasePercentage = 1;
        } else if (currentPhase < 0.75) {
            phase = 'Waning Gibbous';
            phasePercentage = 1 - ((currentPhase - 0.5) * 4);
        } else if (currentPhase < 0.77) {
            phase = 'Last Quarter';
            phasePercentage = 0;
        } else {
            phase = 'Waning Crescent';
            phasePercentage = 1 - ((currentPhase - 0.75) * 4);
        }

        phaseName.innerText = phase;
        moon.style.setProperty('--phase-percentage', phasePercentage);
    }

    // CSS Variable for dynamic moon phase styling
    const moonStyle = document.createElement('style');
    moonStyle.innerHTML = `
        .moon::before {
            width: calc(150px * var(--phase-percentage));
        }
    `;
    document.head.appendChild(moonStyle);

    // Initial calculation and interval for continuous updates
    calculateMoonPhase();
    setInterval(calculateMoonPhase, 3600000); // Update every hour
});
