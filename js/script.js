// Mobile-friendly JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
    
    // Add event listeners for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(event.target) &&
            !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Fixed header scroll effect
    const fixedHeader = document.querySelector('.fixed-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            fixedHeader.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            fixedHeader.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Image loading and positioning
    const candidatePhoto = document.querySelector('.candidate-photo');
    if (candidatePhoto) {
        // Force the image to show the head/face
        candidatePhoto.style.objectPosition = 'top center';
        
        candidatePhoto.onload = function() {
            console.log('Image loaded successfully');
        };
        
        // If image fails to load, show fallback
        candidatePhoto.onerror = function() {
            console.error('Image failed to load');
            this.style.display = 'none';
            const fallback = document.getElementById('photo-fallback');
            if (fallback) fallback.style.display = 'flex';
        };
    }
    
    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Login modal functionality
    const loginModal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('open-login');
    const closeLoginBtn = document.getElementById('close-login');
    const mobileLoginBtn = document.querySelector('.mobile-login');
    
    function openLoginModal() {
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLoginModal() {
        if (loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', openLoginModal);
    }
    
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
            closeMobileMenu();
        });
    }
    
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', closeLoginModal);
    }
    
    // Close modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeLoginModal();
            }
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                alert('Login successful! This is a demo. In a real app, this would authenticate with the server.');
                closeLoginModal();
                loginForm.reset();
            } else {
                alert('Please enter both username and password.');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = fixedHeader ? fixedHeader.offsetHeight : 70;
                const extraOffset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + 
                                      window.pageYOffset - headerHeight - extraOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Platform cards animation
    const platformCards = document.querySelectorAll('.platform-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    platformCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to campaign updates!');
                emailInput.value = '';
            } else {
                alert('Please enter your email address.');
            }
        });
    }
    
    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        const interactiveElements = document.querySelectorAll('.platform-card, .cta-button, .login-btn, .mobile-menu-toggle');
        interactiveElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
        });
    }
});