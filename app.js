const viewer = document.querySelector('#apartmentViewer');
const progress = document.querySelector('.progress');
const progressFill = document.querySelector('#progressFill');
const progressLabel = document.querySelector('#progressLabel');
const fullscreenButton = document.querySelector('#fullscreenButton');
const viewButtons = [...document.querySelectorAll('[data-view]')];

const views = {
  plan: {
    target: '7200m 550m 4450m',
    orbit: '-3deg 2deg 32000m',
    fov: '32deg'
  },
  overall: {
    target: '6915m 550m 4100m',
    orbit: '-138deg 32deg 26900m',
    fov: '32deg'
  },
  living: {
    target: '4300m 900m 3500m',
    orbit: '-138deg 46deg 8200m',
    fov: '48deg'
  },
  bedroom: {
    target: '12300m 850m 3000m',
    orbit: '-138deg 46deg 6200m',
    fov: '48deg'
  }
};

function setView(name) {
  const view = views[name];
  if (!view) return;
  viewer.cameraTarget = view.target;
  viewer.cameraOrbit = view.orbit;
  viewer.fieldOfView = view.fov;
  viewer.jumpCameraToGoal();
  viewButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === name);
  });
}

viewButtons.forEach((button) => {
  button.addEventListener('click', () => setView(button.dataset.view));
});

viewer.addEventListener('progress', (event) => {
  const value = Math.round(event.detail.totalProgress * 100);
  progressFill.style.width = `${value}%`;
  progressLabel.textContent = value < 100 ? `载入 ${value}%` : '正在生成空间';
});

viewer.addEventListener('load', () => {
  progress.classList.add('loaded');
  setView('overall');
});

fullscreenButton.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (_) {
    fullscreenButton.hidden = true;
  }
});

document.addEventListener('fullscreenchange', () => {
  fullscreenButton.textContent = document.fullscreenElement ? '退出' : '全屏';
});
