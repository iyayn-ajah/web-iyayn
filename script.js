const themeToggleBtn = document.getElementById('themeToggle');
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        const html = document.documentElement;
        const body = document.body;

        const savedTheme = localStorage.getItem('theme') || 'dark';

        if (savedTheme === 'light') {
            enableLightMode();
        }

        themeToggleBtn.addEventListener('click', toggleTheme);

        function toggleTheme() {
            if (html.classList.contains('dark')) {
                enableLightMode();
                localStorage.setItem('theme', 'light');
            } else {
                enableDarkMode();
                localStorage.setItem('theme', 'dark');
            }
        }

        function enableLightMode() {
            html.classList.remove('dark');
            body.classList.add('light-mode');
            body.classList.remove('bg-black', 'text-white');
            body.classList.add('bg-whitish', 'text-blackish');
            
            const header = document.getElementById('mainHeader');
            if (header) {
                header.classList.remove('bg-black', 'border-white');
                header.classList.add('bg-white', 'border-blackish');
            }
            
            document.querySelectorAll('header a').forEach(link => {
                link.classList.remove('border-white', 'hover:bg-white', 'hover:text-black');
                link.classList.add('border-blackish', 'hover:bg-blackish', 'hover:text-white');
            });
            
            const headerTitle = document.querySelector('header a.text-xl');
            if (headerTitle) {
                headerTitle.classList.add('text-blackish');
            }
            
            document.querySelectorAll('section .border-white').forEach(element => {
                element.classList.remove('border-white');
                element.classList.add('border-blackish');
            });
            
            document.querySelectorAll('a.border-white').forEach(link => {
                link.classList.remove('border-white', 'hover:bg-white', 'hover:text-black');
                link.classList.add('border-blackish', 'hover:bg-blackish', 'hover:text-white');
            });
            
            document.querySelectorAll('.badge').forEach(badge => {
                badge.classList.remove('border-white');
                badge.classList.add('border-blackish');
            });
            
            document.querySelectorAll('.private-btn').forEach(btn => {
                btn.classList.remove('border-444', 'bg-222');
                btn.classList.add('border-ccc', 'bg-eee');
            });
            
            const footer = document.getElementById('mainFooter');
            if (footer) {
                footer.classList.remove('bg-black', 'border-white');
                footer.classList.add('bg-white', 'border-blackish');
                footer.classList.add('text-blackish');
            }
            
            themeToggleBtn.classList.remove('bg-black', 'border-white');
            themeToggleBtn.classList.add('bg-white', 'border-blackish');
            
            themeToggleDarkIcon.classList.add('hidden');
            themeToggleLightIcon.classList.remove('hidden');
        }

        function enableDarkMode() {
            html.classList.add('dark');
            body.classList.remove('light-mode');
            body.classList.remove('bg-whitish', 'text-blackish');
            body.classList.add('bg-black', 'text-white');
            
            const header = document.getElementById('mainHeader');
            if (header) {
                header.classList.remove('bg-white', 'border-blackish');
                header.classList.add('bg-black', 'border-white');
            }
            
            document.querySelectorAll('header a').forEach(link => {
                link.classList.remove('border-blackish', 'hover:bg-blackish', 'hover:text-white');
                link.classList.add('border-white', 'hover:bg-white', 'hover:text-black');
            });
            
            const headerTitle = document.querySelector('header a.text-xl');
            if (headerTitle) {
                headerTitle.classList.remove('text-blackish');
            }
            
            document.querySelectorAll('section .border-blackish').forEach(element => {
                element.classList.remove('border-blackish');
                element.classList.add('border-white');
            });
            
            document.querySelectorAll('a.border-blackish').forEach(link => {
                link.classList.remove('border-blackish', 'hover:bg-blackish', 'hover:text-white');
                link.classList.add('border-white', 'hover:bg-white', 'hover:text-black');
            });
            
            document.querySelectorAll('.badge').forEach(badge => {
                badge.classList.remove('border-blackish');
                badge.classList.add('border-white');
            });
            
            document.querySelectorAll('.private-btn').forEach(btn => {
                btn.classList.remove('border-ccc', 'bg-eee');
                btn.classList.add('border-444', 'bg-222');
            });
            
            const footer = document.getElementById('mainFooter');
            if (footer) {
                footer.classList.remove('bg-white', 'border-blackish', 'text-blackish');
                footer.classList.add('bg-black', 'border-white', 'text-white');
            }
            
            themeToggleBtn.classList.remove('bg-white', 'border-blackish');
            themeToggleBtn.classList.add('bg-black', 'border-white');
            
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
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
