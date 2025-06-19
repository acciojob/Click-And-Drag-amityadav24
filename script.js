const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX, offsetY;
let containerRect = container.getBoundingClientRect();

// Position cubes initially in a grid layout manually
const spacing = 100; // cube (80px) + margin (10px * 2)
cubes.forEach((cube, index) => {
  const row = Math.floor(index / 2);
  const col = index % 2;
  cube.style.left = `${col * spacing + 10}px`;
  cube.style.top = `${row * spacing + 10}px`;
});

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = 1000;
  });
});

document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Constrain within container
    const maxX = container.clientWidth - selectedCube.offsetWidth;
    const maxY = container.clientHeight - selectedCube.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = "";
    selectedCube = null;
  }
});
