const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        function enableLightMode() {
            body.classList.remove('dark');
            themeIcon.textContent = 'light_mode';
            localStorage.setItem('theme', 'light');
        }

        function enableDarkMode() {
            body.classList.add('dark');
            themeIcon.textContent = 'dark_mode';
            localStorage.setItem('theme', 'dark');
        }

        if (localStorage.getItem('theme') === 'light') {
            enableLightMode();
        } else {
            enableDarkMode();
        }

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark')) {
                enableLightMode();
            } else {
                enableDarkMode();
            }
        });

        function openDrawer() {
            document.getElementById('drawer').classList.add('open');
            document.getElementById('drawerOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            document.getElementById('drawer').classList.remove('open');
            document.getElementById('drawerOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        function smoothScroll(selector) {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        let playlist = [];
        let currentIndex = 0;
        let isPlaying = false;
        const audio = document.getElementById('main-audio');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playPauseIcon = document.getElementById('play-pause-icon');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentTitle = document.getElementById('current-title');
        const currentArtist = document.getElementById('current-artist');
        const currentThumbnail = document.getElementById('current-thumbnail');
        const musicSelector = document.getElementById('music-selector');
        const currentTimeSpan = document.getElementById('current-time');
        const durationSpan = document.getElementById('duration');
        const progressContainer = document.getElementById('progress-container');
        const audioProgress = document.getElementById('audio-progress');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeLevel = document.getElementById('volume-level');

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function updatePlayerUI() {
            const currentSong = playlist[currentIndex];
            if (currentSong) {
                currentTitle.textContent = currentSong.title;
                currentArtist.textContent = currentSong.artist || 'Unknown Artist';
                currentThumbnail.src = currentSong.thumbnail;
                audio.src = currentSong.rawUrl;
                musicSelector.value = currentIndex;
            }
        }

        function playPause() {
            if (isPlaying) {
                audio.pause();
                playPauseIcon.textContent = 'play_arrow';
            } else {
                audio.play();
                playPauseIcon.textContent = 'pause';
            }
            isPlaying = !isPlaying;
        }

        function playNext() {
            if (playlist.length > 0) {
                currentIndex = (currentIndex + 1) % playlist.length;
                updatePlayerUI();
                audio.play();
                isPlaying = true;
                playPauseIcon.textContent = 'pause';
            }
        }

        function playPrev() {
            if (playlist.length > 0) {
                currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
                updatePlayerUI();
                audio.play();
                isPlaying = true;
                playPauseIcon.textContent = 'pause';
            }
        }

        function populateSelector() {
            musicSelector.innerHTML = '<option value="">-</option>';
            playlist.forEach((song, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = song.title;
                musicSelector.appendChild(option);
            });
            document.getElementById('total-music').textContent = playlist.length;
        }

        audio.addEventListener('timeupdate', () => {
            currentTimeSpan.textContent = formatTime(audio.currentTime);
            durationSpan.textContent = formatTime(audio.duration);
            const progress = (audio.currentTime / audio.duration) * 100 || 0;
            audioProgress.style.width = `${progress}%`;
        });

        audio.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('ended', () => {
            playNext();
        });

        playPauseBtn.addEventListener('click', playPause);
        prevBtn.addEventListener('click', playPrev);
        nextBtn.addEventListener('click', playNext);

        musicSelector.addEventListener('change', (e) => {
            if (e.target.value !== '') {
                currentIndex = parseInt(e.target.value);
                updatePlayerUI();
                audio.play();
                isPlaying = true;
                playPauseIcon.textContent = 'pause';
            }
        });

        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const seekTime = (clickX / width) * audio.duration;
            audio.currentTime = seekTime;
        });

        volumeSlider.addEventListener('click', (e) => {
            const rect = volumeSlider.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const volume = clickX / width;
            audio.volume = Math.max(0, Math.min(1, volume));
            volumeLevel.style.width = `${volume * 100}%`;
        });

        audio.volume = 1;

        async function loadMusicData() {
            try {
                const response = await fetch('music.json');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error loading music data:', error);
                return [];
            }
        }

        async function loadProjectsData() {
            try {
                const response = await fetch('project.json');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error loading projects data:', error);
                return [];
            }
        }

        function renderProjects(projects) {
            const container = document.getElementById('projects-container');
            
            if (!projects.length) {
                container.innerHTML = '<div class="loading">No projects found</div>';
                return;
            }
            
            document.getElementById('total-projects').textContent = projects.length;
            
            container.innerHTML = projects.map(project => {
                if (project.type === 'private') {
                    return `
                        <div class="border-2 border-white p-4">
                            <h3 class="text-lg font-bold mb-2">${project.name}</h3>
                            <span class="private-btn px-4 py-2 inline-block">PRIVATE</span>
                        </div>
                    `;
                } else {
                    return `
                        <div class="border-2 border-white p-4">
                            <h3 class="text-lg font-bold mb-2">${project.name}</h3>
                            <a href="${project.url}" target="_blank" class="border-2 border-white px-4 py-2 inline-block hover:bg-white hover:text-black">VISIT</a>
                        </div>
                    `;
                }
            }).join('');
        }

        async function initMusicPlayer() {
            playlist = await loadMusicData();
            if (playlist.length > 0) {
                populateSelector();
                updatePlayerUI();
            }
        }

        async function initProjects() {
            const projects = await loadProjectsData();
            renderProjects(projects);
        }

        initMusicPlayer();
        initProjects();
