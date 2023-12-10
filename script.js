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
    sofaLightOnBtn.hidden = true;
    sofaLightOffBtn.hidden = true;
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
  xhr.setRequestHeader('Authorization', 'Bearer <YOUR_BEARER_TOKEN>');
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
  sendRequest('POST', '/api/devices/tubelight/toggle', {
    "request": {
      "state": 1, // Turn on
      "brightness": 0 // Brightness level
    }
  });
});

tubelightOffBtn.addEventListener('click', () => {
  sendRequest('POST', '/api/devices/tubelight/toggle', {
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
