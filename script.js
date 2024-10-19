// Efeito suave no carregamento da página
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Adicione qualquer outro efeito que você desejar
