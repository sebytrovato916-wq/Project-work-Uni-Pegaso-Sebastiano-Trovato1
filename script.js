/*Script usato per equalizzare l'altezza delle card nella sezione "Punti di Forza"*/
function equalizzaAltezzaCard() {
    const cards = document.querySelectorAll('#forza .card');
    if (!cards.length) return;

    // Se una card ha il collapse aperto non ricalcoliamo: altrimenti la sua
    // altezza "espansa" verrebbe presa come massimo e allungherebbe anche le altre.
    const collapseAperto = document.querySelector('#forza .collapse.show');
    if (collapseAperto) return;

    cards.forEach(card => card.style.minHeight = '');

    const maxHeight = Math.max(...Array.from(cards, card => card.offsetHeight));

    cards.forEach(card => card.style.minHeight = maxHeight + 'px');
}

// Debounce sul resize: senza, il ricalcolo partirebbe decine di volte durante il drag della finestra
let resizeTimer;
window.addEventListener('load', equalizzaAltezzaCard);
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizzaAltezzaCard, 150);
});

/*Chiude il menu a tendina mobile quando si clicca una voce del menu*/
document.querySelectorAll('#navbarSupportedContent .nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        const menu = document.getElementById('navbarSupportedContent');

        if (menu.classList.contains('show') && target) {
            event.preventDefault();
            menu.addEventListener('hidden.bs.collapse', () => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, { once: true });
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});
