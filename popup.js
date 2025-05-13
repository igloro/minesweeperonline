let dimmed = false;

document.getElementById('toggleBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  dimmed = !dimmed;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (shouldDim) => {
      const el = document.querySelector('#result_absolute_right_block');
      if (el) {
        el.style.opacity = shouldDim ? '0.01' : '1';
        el.style.pointerEvents = shouldDim ? 'none' : 'auto';
      }
    },
    args: [dimmed]
  });

  document.getElementById('toggleBtn').textContent = dimmed ? 'Show' : 'Hide';
});
