  // Mengatur tahun saat ini secara otomatis
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Logika scroll progress dan tombol back to top
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let progress = (scrollTop / height) * 100;
            document.getElementById('progress-bar').style.width = progress + '%';

            const btn = document.getElementById('backToTop');
            btn.style.display = scrollTop > 300 ? 'block' : 'none';

            document.querySelectorAll('.content p').forEach(el => {
                let position = el.getBoundingClientRect().top;
                if (position < window.innerHeight - 100) {
                    el.classList.add('show');
                }
            });
        });

        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Animasi bunga jatuh
        function createFallingFlower() {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            flower.innerHTML = "🌸";
            flower.style.left = Math.random() * window.innerWidth + 'px';
            flower.style.animationDuration = (5 + Math.random() * 5) + 's';
            document.body.appendChild(flower);
            setTimeout(() => flower.remove(), 10000);
        }
        setInterval(createFallingFlower, 800);

        // Efek rotasi ember
        window.addEventListener('scroll', () => {
            const bucket = document.querySelector('.rotating-bucket');
            const section = document.querySelector('.rotating-bucket-section');
            const sectionRect = section.getBoundingClientRect();
            const sectionCenter = sectionRect.top + sectionRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = sectionCenter - viewportCenter;
            const rotation = distance * -0.6;
            bucket.style.transform = `rotate(${rotation}deg)`;
        });

        // Logika pemutar musik
        const music = document.getElementById('background-music');
        const musicToggleBtn = document.getElementById('music-toggle');
        const musicIcon = musicToggleBtn.querySelector('i');
        const soundToggleMusic = document.getElementById('sound-toggle-music');

        musicToggleBtn.addEventListener('click', () => {
            if (soundToggleMusic) {
                soundToggleMusic.currentTime = 0;
                soundToggleMusic.play();
            }
            
            if (music.paused) {
                music.play();
                musicIcon.classList.remove('fa-play-circle');
                musicIcon.classList.add('fa-pause-circle');
            } else {
                music.pause();
                musicIcon.classList.remove('fa-pause-circle');
                musicIcon.classList.add('fa-play-circle');
            }
        });

        // Logika untuk tombol next/prev
        document.querySelectorAll('.music-player-controls .fa-step-backward, .music-player-controls .fa-step-forward').forEach(button => {
            button.parentElement.addEventListener('click', () => {
                alert("cuma ini,ga ada lagi yang lebih cantik dari kamu :p");
            });
        });

        // Logika popup notes
        const notesButton = document.getElementById('notes-button');
        const notesPopupOverlay = document.getElementById('notes-popup-overlay');
        const closeNotesButton = document.getElementById('close-notes');
        const soundNotesPopup = document.getElementById('sound-notes-popup');

        notesButton.addEventListener('click', () => {
            notesPopupOverlay.classList.add('show');
            setTimeout(() => {
                if (soundNotesPopup) {
                    soundNotesPopup.currentTime = 0;
                    soundNotesPopup.play();
                }
            }, 50);
        });

        closeNotesButton.addEventListener('click', () => {
            notesPopupOverlay.classList.remove('show');
            setTimeout(() => {
                if (soundNotesPopup) {
                    soundNotesPopup.currentTime = 0;
                    soundNotesPopup.play();
                }
            }, 50);
        });

        notesPopupOverlay.addEventListener('click', (e) => {
            if (e.target === notesPopupOverlay) {
                notesPopupOverlay.classList.remove('show');
                setTimeout(() => {
                    if (soundNotesPopup) {
                        soundNotesPopup.currentTime = 0;
                        soundNotesPopup.play();
                    }
                }, 50);
            }
        });

        // Logika animasi bunga dan rumput footer
        const canvas = document.getElementById('flower-canvas');
        const ctx = canvas.getContext('2d');
        let plants = [];
        const flowerColors = ['#ff69b4', '#ff1493', '#c71585'];
        const leafColor = '#556b2f';
        const grassColor = '#8bc34a';
        let windForce = 0;
        let windDirection = 0;

        function resizeCanvas() {
            const footer = document.querySelector('footer');
            canvas.width = footer.offsetWidth;
            canvas.height = footer.offsetHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Plant {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                this.type = type;
                this.initialY = this.y;
                this.baseAngle = (Math.random() - 0.5) * 0.2;
                this.swayAngle = 0;
                this.swaySpeed = Math.random() * 0.05 + 0.02;
                this.swayMagnitude = Math.random() * 0.1 + 0.05;
                this.size = Math.random() * 15 + 10;
                this.stemHeight = 0;
                this.growth = 0;
                this.isBloomed = false;
                if (this.type === 'flower') {
                    this.petalCount = Math.floor(Math.random() * 3) + 5;
                    this.petalColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                }
            }
            drawStem(currentHeight) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.initialY);
                const endX = this.x + Math.sin(this.baseAngle + this.swayAngle) * currentHeight;
                const endY = this.initialY - Math.cos(this.baseAngle + this.swayAngle) * currentHeight;
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = this.type === 'flower' ? leafColor : grassColor;
                ctx.lineWidth = this.type === 'flower' ? (1 + Math.random()) : (0.5 + Math.random() * 0.5);
                ctx.stroke();
                return { x: endX, y: endY };
            }
            drawFlower(stemEndX, stemEndY) {
                const centerRadius = this.size * 0.3;
                ctx.fillStyle = this.petalColor;
                for (let i = 0; i < this.petalCount; i++) {
                    const angle = (i * 360 / this.petalCount) * Math.PI / 180;
                    ctx.beginPath();
                    const petalX = stemEndX + Math.sin(angle + this.swayAngle) * this.size * 0.7 * this.growth;
                    const petalY = stemEndY + Math.cos(angle + this.swayAngle) * this.size * 0.7 * this.growth;
                    ctx.arc(petalX, petalY, this.size * 0.7 * this.growth * 0.5, 0, 2 * Math.PI);
                    ctx.fill();
                }
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(stemEndX, stemEndY, centerRadius * this.growth, 0, 2 * Math.PI);
                ctx.fill();
            }
            update() {
                this.swayAngle = Math.sin(performance.now() * this.swaySpeed + this.x * 0.01) * (this.swayMagnitude + windForce);
                if (this.stemHeight < this.size * (this.type === 'flower' ? 2 : 1.5)) {
                    this.stemHeight += (this.type === 'flower' ? 0.8 : 0.5);
                } else if (this.type === 'flower' && this.growth < 1) {
                    this.growth += 0.03;
                } else if (this.type === 'flower') {
                    this.isBloomed = true;
                }
                const stemEnd = this.drawStem(this.stemHeight);
                if (this.type === 'flower' && this.stemHeight > this.size * 2 * 0.5) {
                    this.drawFlower(stemEnd.x, stemEnd.y);
                }
            }
        }
        function animatePlants() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            plants.forEach((plant, index) => {
                if (plant.y > -50) {
                    plant.update();
                } else {
                    plants.splice(index, 1);
                }
            });
            requestAnimationFrame(animatePlants);
        }
        function createPlant() {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            const type = Math.random() < 0.3 ? 'flower' : 'grass';
            plants.push(new Plant(x, y, type));
        }
        setInterval(createPlant, 100);
        setInterval(() => {
            windForce = (Math.random() - 0.5) * 0.1;
        }, 1000);
        animatePlants();