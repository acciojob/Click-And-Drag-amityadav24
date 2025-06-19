// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Constrain within container
  newX = Math.max(0, Math.min(newX, container.clientWidth - selectedCube.offsetWidth));
  newY = Math.max(0, Math.min(newY, container.clientHeight - selectedCube.offsetHeight));

  selectedCube.style.left = `${newX}px`;
  selectedCube.style.top = `${newY}px`;
});

document.addEventListener('mouseup', () => {
  selectedCube = null;
});