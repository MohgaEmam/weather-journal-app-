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
const getWeather = async (finalURl) => {
  const req = await fetch (finalURl);
  const recivedInfo = await req.json();
  return recivedInfo;
}

//add EventLisenter to button
button.addEventListener('click', action)
function action() {
  getWeather(finalURl)
  .then(
    postData('/weather', {
      temp: data.main.temp,
      date: d,
      feel: userInput,
    })
  )
  .then(
    updateUI()
  )
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
const updateUI = async () => {
  const req = await fetch ('/all');
  try {
    const finalData = await req.json();
    // update most recent entry 
    // date
    document.getElementById('date').innerHTML = `Date is : ${finalData.date}`; 
    // temp
    document.getElementById('temp').innerHTML = `Temprature is : ${finalData.temp} `
    // content
    document.getElementById('content').innerHTML = `feelings is : ${finalData.feel}`
  }
  catch(error) {
  console.log('error', error);
  }
}