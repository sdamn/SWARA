const deviceSelect = document.getElementById('device');
const buttonsContainer = document.querySelector('.buttons');
const tubelightOnBtn = document.getElementById('tubelightOn');
const tubelightOffBtn = document.getElementById('tubelightOff');
const sofaLightOnBtn = document.getElementById('sofaLightOn');
const sofaLightOffBtn = document.getElementById('sofaLightOff');

function updateButtonVisibility(selectedDevice) {
  if (selectedDevice === 'device1') {
    tubelightOnBtn.hidden = false;
    tubelightOffBtn.hidden = false;
    sofaLightOnBtn.hidden = false;
    sofaLightOffBtn.hidden = false;
  } else if (selectedDevice === 'sofaLight') {
    tubelightOnBtn.hidden = true;
    tubelightOffBtn.hidden = true;
    sofaLightOnBtn.hidden = false;
    sofaLightOffBtn.hidden = false;
  } else {
    buttonsContainer.hidden = true;
  }
}

function sendRequest(method, url, body) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Replace with your actual bearer token
  xhr.setRequestHeader('Authorization', 'Bearer 68300e1918276185d6a748322ae161319f93bd36');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Device state updated successfully.');
      } else {
        console.error('Error:', xhr.responseText);
      }
    }
  };
  xhr.send(JSON.stringify(body));
}

deviceSelect.addEventListener('change', () => {
  const selectedDevice = deviceSelect.value;
  buttonsContainer.hidden = false;
  updateButtonVisibility(selectedDevice);
});

tubelightOnBtn.addEventListener('click', () => {
  sendRequest('POST', 'https://backend.tinxy.in/v2/devices/646838f4ea1d1bf0bd4a01a5/toggle', {
    "request": {
      "state": 1, // Turn on
      "brightness": 0 // Brightness level
    }
  });
});

tubelightOffBtn.addEventListener('click', () => {
  sendRequest('POST', 'https://backend.tinxy.in/v2/devices/646838f4ea1d1bf0bd4a01a5/toggle', {
    "request": {
      "state": 0 // Turn off
    }
  });
});

sofaLightOnBtn.addEventListener('click', () => {
  sendRequest('POST', '/api/devices/sofaLight/toggle', {
    "request": {
      "state": 1, // Turn on
      "brightness": 0 // Brightness level
    }
  });
});

sofaLightOffBtn.addEventListener('click', () => {
  sendRequest('POST', '/api/devices/sofaLight/toggle', {
    "request": {
      "state": 0 // Turn off
    }
  });
});
