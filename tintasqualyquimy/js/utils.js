// Utilitários compartilhados - Reduz código duplicado
(function() {
    'use strict';

    // Namespace para utilitários
    window.QualyQuimy = window.QualyQuimy || {};

    // Função de sanitização segura
    window.QualyQuimy.sanitize = function(str) {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    // Função segura para criar elementos
    window.QualyQuimy.setHTML = function(element, content) {
        if (!element) return;
        
        if (typeof content === 'string') {
            if (!content.includes('<')) {
                element.textContent = content;
                return;
            }
            const temp = document.createElement('div');
            temp.innerHTML = content;
            while (temp.firstChild) {
                element.appendChild(temp.firstChild);
            }
        } else if (content instanceof Node) {
            element.appendChild(content);
        }
    };

    // Debounce para performance
    window.QualyQuimy.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle para performance
    window.QualyQuimy.throttle = function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Animação suave de scroll
    window.QualyQuimy.smoothScroll = function(target, duration = 500) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop - 80; // Header offset
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Validação de formulários
    window.QualyQuimy.validateForm = function(form) {
        if (!form) return false;
        
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            const isEmpty = !value;
            const isInvalid = input.type === 'email' && !isValidEmail(value);
            
            input.classList.toggle('is-invalid', isEmpty || isInvalid);
            
            if (isEmpty || isInvalid) {
                isValid = false;
            }
        });

        return isValid;
    };

    // Validação de email
    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    // Formatação de moeda
    window.QualyQuimy.formatCurrency = function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Formatação de telefone
    window.QualyQuimy.formatPhone = function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    };

    // API para WhatsApp
    window.QualyQuimy.sendWhatsApp = function(message, phone = '5511954950044') {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Cache para performance
    window.QualyQuimy.cache = {
        data: new Map(),
        get: function(key) {
            return this.data.get(key);
        },
        set: function(key, value, ttl = 300000) { // 5 minutos default
            this.data.set(key, {
                value: value,
                expiry: Date.now() + ttl
            });
        },
        has: function(key) {
            const item = this.data.get(key);
            if (!item) return false;
            if (Date.now() > item.expiry) {
                this.data.delete(key);
                return false;
            }
            return true;
        }
    };

    // Logger para debug
    window.QualyQuimy.log = function(message, type = 'info') {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const timestamp = new Date().toLocaleTimeString();
            console.log(`[${timestamp}] [${type.toUpperCase()}] QualyQuimy:`, message);
        }
    };

    // Detectar dispositivo
    window.QualyQuimy.isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Copiar para clipboard
    window.QualyQuimy.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve(successful);
            } catch (err) {
                document.body.removeChild(textArea);
                return Promise.reject(err);
            }
        }
    };

    // Inicialização
    window.QualyQuimy.init = function() {
        // Adicionar classes de device
        document.body.classList.toggle('mobile', window.QualyQuimy.isMobile());
        document.body.classList.toggle('desktop', !window.QualyQuimy.isMobile());
        
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    window.QualyQuimy.smoothScroll(href);
                }
            });
        });

        window.QualyQuimy.log('Utils initialized');
    };

    // Auto-inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.QualyQuimy.init);
    } else {
        window.QualyQuimy.init();
    }

})();
