// const apiKey = "49ede647392d36d625057c2bc3a24f17";


// async function renderWeatherInfo(data) {
    
//     let newPara = document.createElement("p");
//     newPara.textContent = `City: ${data.name}, Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;

//     document.body.appendChild(newPara);
// }


// async function showWeather()
//  {
//  try
//  {
//     const city = "Jalandhar";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     const response = await fetch(url);

//     //convert the response to JSON
//     const data = await response.json();
//     console.log("Weather Data:", data);

//     renderWeatherInfo(data);
// }
//     catch (error)
//     {
//         console.error("Error fetching weather data:", error);
//         let errorPara = document.createElement("p");
//         errorPara.textContent = "Failed to fetch weather data.";
//         document.body.appendChild(errorPara);
//     }
// }



// async function getWeatherDetails() 
// {
//     try {
//     let latitude=15.6333;
//     let longitude=18.3333;

//     let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

//     let data=await response.json();

//     console.log(data);
//     }
//     catch (error) {
//         console.error("Error fetching weather data:", error);
//         let errorPara = document.createElement("p");
//         errorPara.textContent = "Failed to fetch weather data.";
//         document.body.appendChild(errorPara);
//     }
// }

// function switchTab(clickedTab)
// {
//     apiErrorContainer.classList.remove("active");

//     if(clickedTab !== currentTab)
//     {
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active"))
//        {
//             userInformationContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else
//         {
//             searchForm.classList.remove("active");
//             userInformationContainer.classList.add("active");
//             getFromSessionStorage();
//         }
//     }
// }

// function getLocation()
// {
//     if(navigator.geolocation)
//     {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else
//     {
//         alert("Your browser does not support geolocation.");
//     }
// }

// function showPosition(position)
// {
//     const lat = position.coords.latitude;
//     const longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }


const usertab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");

//initially variable needs to be defined

let currentTab = usertab;
const API_KEY = "49ede647392d36d625057c2bc3a24f17";
//current tab k andr kuch properties hote hain jo current tab ko represent karte hain
currentTab.classList.add("current-tab");//current tab ko current-tab class add karte hain

//ek kaam or pending hai

function switchTab(clickedTab) {
    
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

    //agr searchform contains active class nahi hai toh uss case me search form ko active class add karte hain
    if(!searchForm.classList.contains("active"))
    {
        //kya search form wala container is invisible hai if yes make it visible if no then make it invisible
     userInfoContainer.classList.remove("active");
     grantAccessContainer.classList.remove("active");
     searchForm.classList.add("active");
    }
   else
    //main pehle search waale tab pr tha ab user waale tab pr aa gaya
    {
     searchForm.classList.remove("active");
     userInfoContainer.classList.remove("active");
     //ab main your weather tab pr aa gaya
     //toh weather v display karna hoga so lets check local storage first for coordinates if we have saved them or not
     //if we have saved them then we will get the data from session storage and display it
      getFromSessionStorage();
    }

  }  
}

// Add event listeners to the tabs
//user tab and search tab ko click event listener add karte hain    
usertab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(usertab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

//check if cooredinates are already present in session storage
function getFromSessionStorage() {
     const localCoordinates =sessionStorage.getItem("user-coordinates");
     if(!localCoordinates)
     {
        //agr local coordinates nahi mile toh grant access wale page ko visible kraao
        grantAccessContainer.classList.add("active");
     }
     else
     {
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
     }
}

async function fetchUserWeatherInfo(coordinates)
{
    const {lat, longi} = coordinates;
    //make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader active
    loadingScreen.classList.add("active");

    //API CALL
    try
    {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    }
    catch(err)
    {
        loadingScreen.classList.remove("active");
        //show error on UI
        alert("Failed to fetch weather data. Please try again later.");
        console.error("Error fetching weather data:", err);
    }
}

function renderWeatherInfo(weatherInfo) {
    //firstly, we have to fetch the elements

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const pressure = document.querySelector("[data-pressure]");

    //fetch values from weatherInfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    pressure.innerText = weatherInfo?.clouds?.all;

}

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        alert("Your browser does not support geolocation.");
    }
}

function showPosition(position)
{
   const userCoordinates = {
        lat: position.coords.latitude,
        longi: position.coords.longitude
    };

    //save user coordinates in session storage
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

    //fetch weather info using user coordinates
    fetchUserWeatherInfo(userCoordinates);
}



const grantAccessButton = document.querySelector("[data-grantAccess]");

grantAccessButton.addEventListener("click",getLocation);

let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    //jo v current form hai uska default behaviour ko rok do
    e.preventDefault();
    if(searchInput.value === "")
    {
        return;
    }
    //fetch weather info using city name
    fetchSearchWeatherInfo(searchInput.value);
});

async function fetchSearchWeatherInfo(city) {
    //loader ko active karo
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try
    {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
     const data = await response.json();
     
     loadingScreen.classList.remove("active");
     userInfoContainer.classList.add("active");
     renderWeatherInfo(data);
     //clear the search input field
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //show error on UI
        alert("Failed to fetch weather data. Please try again later.");
        console.error("Error fetching weather data:", err);
    }
} 