
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const whatsappBtn = document.getElementById('whatsapp');
const goToBack = document.getElementById('goBack');
const voice = document.getElementById('speech');
const checkbox = document.getElementById('checkbox');



let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  //window.setTimeout( quoteContainer, 5000000000000 );
};

// hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quote
function newQuote()  {
  
  loading();
    // pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
    
    // check whether author name is blank and replace it with unknown
      if(!quote.author) {
        authorText.textContent = 'Unknown';
      }else{
        authorText.textContent = quote.author;
      }

      //check whether quotes are long or short for minimizing the text size
      if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
      }else {
        quoteText.classList.remove('long-quote');
      }
      // set code and hide
      quoteText.textContent = quote.text;
     
      complete();
}



//go back
const i = quote; 
function goBack() {
  if (i == quote) { 
    document.getElementsByClassName('goBack').disabled = true; 

    document.getElementsByClassName('newQuote').disabled = false; 
} else { 
    i--; 
    return goBack(); 
} 
      newQuote();
} 
      
// for speech or voice
//const j = "hi, i am here";
function speech() {
  var msg = new SpeechSynthesisUtterance(quote.textContent);

  window.speechSynthesis.speak(msg); 

  var msg1 = new SpeechSynthesisUtterance("              by  " + author.textContent);

  window.speechSynthesis.speak(msg1); 
//  console.log(quote.textContent);
}


// Get Quote from API
async function getQuotes(){
 
  loading();
  //  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl ='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl); 
       // const data = await response.json();
       apiQuotes = await response.json();
       newQuote();
       goBack();
       
      console.log(quote);
    }catch(error){
      // getQuotes();
              
    }
    
    
   
}

//tweet code
function tweetQuote()  {
   const tweeterUrl =  `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(tweeterUrl, '_blank');
}

//whatsapp code
// var yourNumber = "{{ your number in string}}";
// var yourMessage = "{{ your message in string }}";

function whatsappQuote() {
  // number = yourNumber;
  // message = yourMessage.split(' ').join('%20');
  const whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.textContent} - ${authorText.textContent}`;
  //return console.log('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message);
  window.open(whatsappUrl, '_blank');
}


//whatsappQuote();

//Event Listener
newQuoteBtn.addEventListener('click', newQuote );
twitterBtn.addEventListener('click', tweetQuote);
whatsappBtn.addEventListener('click', whatsappQuote);
goToBack.addEventListener('click',goBack);
voice.addEventListener('click', speech);

checkbox.addEventListener('change', () =>{
  document.body.classList.toggle('dark');
}
);


// on load
getQuotes();

/*
console.log (Notification.permission);
if(Notification.permission === "granted") {
  alert("we have permission");
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
      console.log (permission);
  });
}

function showNotification () {
  const notification = new Notification("New Message Incoming", {
    body: "Hi there. You can see new Quote here."
  })
}

console.log(Notification.permission);
if(Notification.permission === "granted") {
  showNotification();
}else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
    if(permission === "granted") {
      showNotification();
    }
  });
}
*/