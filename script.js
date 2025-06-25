const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;

    // Calculate offset between mouse position and cube top-left
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
  });
});

function drag(e) {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate new position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Apply boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selectedCube.clientWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - selectedCube.clientHeight));

  selectedCube.style.left = `${newLeft}px`;
  selectedCube.style.top = `${newTop}px`;
}

function drop() {
  selectedCube = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', drop);
}