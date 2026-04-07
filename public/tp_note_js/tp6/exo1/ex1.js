        let secondes = 0;
        let timer = null;

        const chrono = document.getElementById('chrono');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');

        function updateChrono() {
            secondes++;
            chrono.textContent = `${secondes} s`;
        }

        startBtn.onclick = function() {
            if (timer === null) {
                timer = setInterval(updateChrono, 1000);
            }
        };

        stopBtn.onclick = function() {
            clearInterval(timer);
            timer = null;
        };

        resetBtn.onclick = function() {
            clearInterval(timer);
            timer = null;
            secondes = 0;
            chrono.textContent = '0 s';
        };