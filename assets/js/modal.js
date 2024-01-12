const modalBg = document.getElementById('modalBg');

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modalBg.style.display = 'none'
    }
})

modalBg.addEventListener('click', (event) => {
    if (event.target === modalBg) {
        modalBg.style.display = 'none';
    }
})