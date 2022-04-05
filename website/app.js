const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=6ba99be139236509bfd64d4a07918cdf&units=metric";
const d = new Date();
const newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//adding EventListener to the button generate
document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feel = document.getElementById("feelings").value;

  //if condition in case of not entering zip code
  if (zipCode === "") {
    alert("Please, enter a zip code");
  } else {
    //calling async functions
    getData(baseUrl, zipCode, apikey)
      .then(function (data) {
      postData("/add", {
        city:data.name,
        date: newDate,
        temperature: Math.round(data.main.temp),
        content: feel,
      }).then(updateUi());
    });
  }
}

const getData = async (url, code, key) => {
  //feching route baseUrl, zipCode and apikey
  const response = await fetch(url + code + key);

  try {
    //converting json response to js
    const data = await response.json();
    console.log(data);

    return data;
    //loging error if it happened
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  // feching route url and post method
  const response = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    //converting json response to js
    const newData = await response.json();
    console.log(newData);
    return newData;
    //loging error if it happened
  } catch (error) {
    console.log("error", error);
  }
};

const updateUi = async () => {
  //fetching data from server using url from get rout
  const request = await fetch("/all");

  try {
    //converting json response to js
    const allData = await request.json();
   //adding data to HTML
    document.getElementById("city").innerHTML =
      "City name: " + allData.cityName;
    
    document.getElementById("date").innerHTML =
      "Date: " + allData.currentDate;
    
    document.getElementById("temp").innerHTML =
      "temperature: " + allData.currentTemp + " °C";
    
    document.getElementById("content").innerHTML =
      "you feel: " + allData.currentFelling;

    //loging error if it happened
  } catch (error) {
    console.log("error", error);
  }
};
