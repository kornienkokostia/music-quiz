const canvas = document.querySelector(".main-bg");
const context = canvas.getContext("2d");
let time = 0;
const interval = 0.03

const color = (x, y, r, g, b) => {
  context.fillStyle = `rgb(${r}, ${g}, ${b})`;
  context.fillRect(x, y, 10, 10);
};
const R = (x, y, time) => Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time));

const G = (x, y, time) => Math.floor(192 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300));

const B = (x, y, time) => Math.floor(192 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100));


const BgAnimation = () => {
  for (let x = 0; x <= 30; x++) {
    for (let y = 0; y <= 30; y++) {
      color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
    }
  }
  time = time + interval;
  if (document.querySelector('.main-bg').getAttribute('active') === 'true' &&
  document.querySelector('.main-bg').getAttribute('forced-off') === 'false') {
    window.requestAnimationFrame(BgAnimation);
  }
};
const startBgAnimation = () => {
  document.querySelector('.main-bg').setAttribute('active', 'true')
  BgAnimation()
}
const stopBgAnimation = () => {
  document.querySelector('.main-bg').setAttribute('active', 'false')
  BgAnimation()
}

const setBgForceOffOnLoad = () => {
  if (localStorage.getItem('live-bg') === 'false') {
    document.querySelector('.main-bg').setAttribute('forced-off', 'true')
    document.querySelector('.bg-checkbox').checked = false
  } else {
    document.querySelector('.main-bg').setAttribute('forced-off', 'false')
    document.querySelector('.bg-checkbox').checked = true
  }
}

const onBgSettingChange = () => {
  if (document.querySelector('.bg-checkbox').checked) {
    document.querySelector('.main-bg').setAttribute('forced-off', 'false')
    localStorage.setItem('live-bg', 'true')
  } else {
    document.querySelector('.main-bg').setAttribute('forced-off', 'true')
    localStorage.setItem('live-bg', 'false')
  }
}

export {startBgAnimation, stopBgAnimation, setBgForceOffOnLoad, onBgSettingChange}