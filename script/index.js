        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile hamburger menu
        function initMobileMenu() {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');

            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            nav.insertBefore(hamburger, navLinks);

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }

        if (window.innerWidth <= 768) {
            initMobileMenu();
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.style.padding = window.scrollY > 100 ? '0.6rem 2rem' : '1rem 2rem';
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .section-title').forEach(el => {
            observer.observe(el);
        });

        // Counter animation
        function animateCounter(element) {
            const target = parseFloat(element.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target % 1 === 0 ? target : target.toFixed(1);
                }
            };

            updateCounter();
        }

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Lightbox gallery
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-lightbox');

        if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn) {
            galleryItems.forEach(img => {
                img.addEventListener('click', function() {
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', e => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });
        }

        document.getElementById('contactForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
                        
            this.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';

            setTimeout(() => {
                this.reset();
                this.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        });

        // Search form with validation
        const searchForm = document.getElementById('searchForm');
        const searchResults = document.getElementById('searchResults');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const newSearchBtn = document.getElementById('newSearchBtn');

        if (searchForm && searchResults) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const locationField = this.querySelector('[name="location"]');
                let isValid = true;

                if (!locationField.value) {
                    locationField.classList.add('error');
                    locationField.nextElementSibling.style.display = 'block';
                    isValid = false;
                } else {
                    locationField.classList.remove('error');
                    locationField.nextElementSibling.style.display = 'none';
                }

                if (!isValid) return;

                if (loadingSpinner) loadingSpinner.style.display = 'block';
                searchForm.style.display = 'none';

                setTimeout(() => {
                    if (loadingSpinner) loadingSpinner.style.display = 'none';

                    const fakeCount = Math.floor(Math.random() * 60) + 15;
                    document.getElementById('resultCount').textContent = fakeCount;

                    searchResults.style.display = 'block';
                    searchResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1500);
            });

            if (newSearchBtn) {
                newSearchBtn.addEventListener('click', function() {
                    searchForm.style.display = 'block';
                    searchResults.style.display = 'none';
                    searchForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }