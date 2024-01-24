// script.js
async function uploadImage() {
  var formData = new FormData(document.getElementById('upload-form'));

  try {
      const clarifaiApiKey = 'd37e2b44a081440592f7bdb3d3726e39'; // Replace with your Clarifai API key

      const clarifaiResponse = await fetch('https://api.clarifai.com/v2/models/d16f390eb32cad478c7ae150069bd2c6/outputs', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${clarifaiApiKey}`
          },
          body: formData
      });

      const clarifaiData = await clarifaiResponse.json();
      const recognizedObjects = clarifaiData.outputs[0].data.concepts.map(concept => concept.name);

      document.getElementById('result').innerText = 'Recognized Objects: ' + recognizedObjects.join(', ');
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').innerText = 'Error occurred during recognition.';
  }
}
