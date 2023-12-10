const deviceIdSelect = document.getElementById('deviceId');
const onBtn = document.getElementById('onBtn');
const offBtn = document.getElementById('offBtn');

const bodyData = {
  "request": {
    "state": 1, // Initial state (ON)
    "brightness": 0 // Brightness level
  },
  "deviceNumber": 3 // Device number
};

const bodyDataOff = {
  "request": {
    "state": 0 // Turn device off
  },
  "deviceNumber": 3 // Device number
};

function updateButtonTexts(deviceId) {
  if (deviceId === '646838f4ea1d1bf0bd4a01a5') {
    onBtn.textContent = 'Tubelight 1 On';
    offBtn.textContent = 'Tubelight 1 Off';
  } else if (deviceId === '648c5ff203543e4e86c0d086') {
    onBtn.textContent = 'Tubelight 2 On';
    offBtn.textContent = 'Tubelight 2 Off';
  } else {
    // Fallback for unknown devices
    onBtn.textContent = 'Turn ON';
    offBtn.textContent = 'Turn OFF';
  }
}

function sendRequest(method, url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Use the pre-defined bearer token directly
  xhr.setRequestHeader('Authorization', `Bearer 68300e1918276185d6a748322ae161319f93bd36`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Device state updated successfully.');
      } else {
        console.error('Error:', xhr.responseText);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

deviceIdSelect.addEventListener('change', () => {
  const deviceId = deviceIdSelect.value;

  // Update button texts based on selected device ID
  updateButtonTexts(deviceId);
});

onBtn.addEventListener('click', () => {
  sendRequest('POST', `https://backend.tinxy.in/v2/devices/${deviceIdSelect.value}/toggle`, {
    ...bodyData, // Spread existing data
    toggle: 1 // Add toggle property for turning ON
  });
});

offBtn.addEventListener('click', () => {
  sendRequest('POST', `https://backend.tinxy.in/v2/devices/${deviceIdSelect.value}/toggle`, bodyDataOff); // Use specific bodyDataOff object for turning off
});
