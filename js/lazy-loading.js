// Lazy Loading para imagens - Performance otimizada
(function() {
    'use strict';

    // Configuração do Intersection Observer
    const imageObserverConfig = {
        root: null, // viewport
        rootMargin: '50px 0px', // carregar 50px antes de entrar na tela
        threshold: 0.01 // começar a carregar quando 1% estiver visível
    };

    // Função para carregar imagem
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');
        
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
        
        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }
        
        // Adicionar classe de carregado
        img.classList.add('loaded');
        
        // Remover observer após carregar
        imageObserver.unobserve(img);
    }

    // Criar observer
    let imageObserver;
    
    if ('IntersectionObserver' in window) {
        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                }
            });
        }, imageObserverConfig);
    } else {
        // Fallback para navegadores antigos
        imageObserver = {
            observe: function(img) {
                // Carregar imediatamente se não suportar Intersection Observer
                loadImage(img);
            },
            unobserve: function(img) {
                // No-op
            }
        };
    }

    // Inicializar lazy loading
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src], img[data-srcset]');
        
        images.forEach(img => {
            // Adicionar classe de placeholder
            img.classList.add('lazy-loading');
            
            // Observar imagem
            imageObserver.observe(img);
            
            // Fallback: carregar se já estiver visível
            if (img.getBoundingClientRect().top < window.innerHeight) {
                loadImage(img);
            }
        });
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
        initLazyLoading();
    }

    // Expor função para uso global
    window.lazyLoad = {
        init: initLazyLoading,
        loadImage: loadImage
    };

})();
