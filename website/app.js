// Global Variables 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api = '&appid=c270e5e4eb91cd58315a2968d4bd4fc5';
const zipCode = document.querySelector('#zip').value;
const finalURl = baseURL+zipCode+api;
const button = document.getElementById('generate');
const userInput = document.getElementById('feelings').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// reterive data from open weather map
const getWeather = async (baseURL, zipCode, api) => {
  const req = await fetch (baseURL+ zipCode+ api);
  const recivedInfo = await req.json();
  return recivedInfo;
}

function getzipWeather() {

  //gets the zip data from the zip text field
  let zip = document.getElementById('zip').value + ",";
  console.log(zip);
  
  let weather = getWeather(baseURL, zip, api);
  
  return weather;
  
  }

//add EventLisenter to button
button.addEventListener('click', action)
function action() {
  getzipWeather()
  .then(function(data){

    //gets the text from the feelings text box
    let feelings = document.getElementById('feelings').value;

    //post data to the server
    postData('/weather', {date: d, temp: data.main.temp, feeling: feelings});

    updateUI({date: newDate, temp: data.main.temp, feeling: feelings});

  });
}

// post data to server 
const postData = async(url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const lastInfo = await res.json();
    return lastInfo;
  }
  catch (error) {
    console.log('error', error)
  }
}
// update userInterface 
const updateUI = async (data={}) => {
  const req = await fetch ('/all');
  try {
    const finalData = await req.json();
    // update most recent entry 
    // date
    document.getElementById('date').innerHTML = `Date is : ${data.temp}`; 
    // temp
    document.getElementById('temp').innerHTML = `Temprature is : ${data.temp} `
    // content
    document.getElementById('content').innerHTML = `feelings is : ${data.feeling}`
    

    //reset zip and feelings for next entry
    document.getElementById('zip').value = "";
    document.getElementById('feelings').value = "";
  
  
  }
  catch(error) {
  console.log('error', error);
  }
}
