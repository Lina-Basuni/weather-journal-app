/* Global Variables */

let projectData = {};
let counter = 0;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear() ;
let newData = {
  date : newDate,
  zip_code: '',
  temp : '',
  feeling: ''
};

// Personal API Key for OpenWeatherMap API

const apiKey = '&appid=055a4c60736b8c55132433ecc454fe20';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const unit = '&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);



/* Function called by event listener */

function performAction(e){
  const zipCode = 'zip='+ document.getElementById('zip').value;
  let zipVal = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  getData(baseURL,zipCode, apiKey, unit)
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addEntry', {date:newDate, zip_code: zipVal , temp:data.main.temp, feeling: feelings} );
  })
  .then(function(data){
    updateUI();
  })
};

/* Function to GET Web API Data*/
const getData = async (baseURL, zipCode, apiKey, unit)=>{

  const res = await fetch(baseURL+zipCode+apiKey+unit);
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// /* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        let newData = await response.text();
        console.log(newData);
        return newData;
      }
      catch(error) {
        console.log(error);
      }
  };

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML ="Date: " + allData[counter].date;
    document.getElementById('temp').innerHTML = "Temprature: " + allData[counter].temp;
    document.getElementById('content').innerHTML = "I Feel: " + allData[counter].feeling;
    counter++;
  }catch(error){
    console.log("error", error);
  }
}
