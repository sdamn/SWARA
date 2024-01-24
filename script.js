// script.js
async function uploadImage() {
    var formData = new FormData(document.getElementById('upload-form'));

    try {
        const imaggaApiKey = 'acc_a0d0c9dfc242ab1'; // Replace with your Imagga API key
        const imaggaApiSecret = 'Y1d1067268af5cb0f2e06fe8200822156'; // Replace with your Imagga API secret

        const credentials = btoa(`${imaggaApiKey}:${imaggaApiSecret}`);
        const imaggaResponse = await fetch('https://api.imagga.com/v2/tags', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`
            },
            body: formData
        });

        if (!imaggaResponse.ok) {
            throw new Error(`Imagga API request failed with status ${imaggaResponse.status}`);
        }

        const imaggaData = await imaggaResponse.json();

        // Ensure that the expected properties exist in the response
        if (imaggaData && imaggaData.result && imaggaData.result.tags) {
            const recognizedTags = imaggaData.result.tags.map(tag => tag.tag.en);
            document.getElementById('result').innerText = 'Recognized Tags: ' + recognizedTags.join(', ');
        } else {
            throw new Error('Unexpected response format from Imagga API');
        }
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('result').innerText = 'Error occurred during recognition.';
    }
}
