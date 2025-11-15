const text = document.getElementById('cpick-text');
const colors = document.querySelectorAll('.color-cell');

colors.forEach(cell => {
  cell.addEventListener('click', () => {
    text.style.color = cell.getAttribute('data-color');
  })
})
