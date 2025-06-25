const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

let selected = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selected = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
  });
});

function drag(e) {
  if (!selected) return;
  const containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundaries
  newLeft = Math.max(0, Math.min(newLeft, container.scrollWidth - selected.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.offsetHeight - selected.offsetHeight));

  selected.style.left = `${newLeft}px`;
  selected.style.top = `${newTop}px`;
}

function drop() {
  selected = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', drop);
}
