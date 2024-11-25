document.addEventListener('DOMContentLoaded', () => {
    const moon = document.getElementById('moon');
    const phaseName = document.getElementById('phase-name');
    const calendar = document.getElementById('calendar');

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

    function generateCalendar() {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const table = document.createElement('table');
        const header = document.createElement('tr');
        
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.innerText = day;
            header.appendChild(th);
        });

        table.appendChild(header);

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                table.appendChild(row);
                row = document.createElement('tr');
            }

            const cell = document.createElement('td');
            cell.innerText = day;
            if (day === today.getDate()) {
                cell.style.backgroundColor = '#00f';
            }
            row.appendChild(cell);
        }
        
        table.appendChild(row);
        calendar.appendChild(table);
    }

    const moonStyle = document.createElement('style');
    moonStyle.innerHTML = `
        .moon::before {
            width: calc(150px * var(--phase-percentage));
        }
    `;
    document.head.appendChild(moonStyle);

    // Initial calculations and interval for continuous updates
    calculateMoonPhase();
    generateCalendar();
    setInterval(calculateMoonPhase, 3600000); // Update every hour
});
