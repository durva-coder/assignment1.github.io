const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//disable/enable button
function toggleButton() {
   button.disabled = !button.disabled;
  
}

//passing joke to voiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke);
    var msg = new SpeechSynthesisUtterance();
    msg.text = joke;
    window.speechSynthesis.speak(msg);

}

//get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup ) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;

        }
        // text-to-speech

        tellMe(joke);
        //disabled button
      // toggleButton();
    } catch (error) {
        //catch errors here
        console.log('whoops', error);
    }
}

// event listiners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);