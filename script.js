const deviceIdSelect = document.getElementById('deviceId');
const apiKey = document.getElementById('apiKey');
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

function sendRequest(method, url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${apiKey.value}`);
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

onBtn.addEventListener('click', () => {
  sendRequest('POST', `https://backend.tinxy.in/v2/devices/${deviceIdSelect.value}/toggle`, {
    ...bodyData, // Spread existing data
    toggle: 1 // Add toggle property for turning ON
  });
});

offBtn.addEventListener('click', () => {
  sendRequest('POST', `https://backend.tinxy.in/v2/devices/${deviceIdSelect.value}/toggle`, bodyDataOff); // Use specific bodyDataOff object for turning off
});
