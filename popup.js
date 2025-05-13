function injectCSS(tabId) {
    chrome.scripting.insertCSS({
      target: { tabId },
      css: `
        .dimmed-hide {
          opacity: 0.01 !important;
          transition: opacity 0.2s ease;
        }
        .dimmed-hide:hover {
          opacity: 1 !important;
        }
      `
    });
  }
  
  let resultDimmed = false;
  let duelDimmed = false;
  
  document.getElementById('toggleResultBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    injectCSS(tab.id);
  
    resultDimmed = !resultDimmed;
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (shouldDim) => {
        const el = document.querySelector('#result_absolute_right_block');
        if (el) {
          el.classList.toggle('dimmed-hide', shouldDim);
          el.removeAttribute('style'); // remove inline styles
        }
      },
      args: [resultDimmed]
    });
  
    document.getElementById('toggleResultBtn').textContent = resultDimmed ? 'Show' : 'Hide';
  });
  
  document.getElementById('toggleDuelBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    injectCSS(tab.id);
  
    duelDimmed = !duelDimmed;
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (shouldDim) => {
        const ids = ['#duel_table', '#result_relative_block'];
        ids.forEach(selector => {
          const el = document.querySelector(selector);
          if (el) {
            el.classList.toggle('dimmed-hide', shouldDim);
            el.removeAttribute('style'); // remove inline styles
          }
        });
      },
      args: [duelDimmed]
    });
  
    document.getElementById('toggleDuelBtn').textContent = duelDimmed ? 'Show' : 'Hide';
  });
  