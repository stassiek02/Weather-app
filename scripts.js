
const appKey='f24f40b1c24505685fce3b8acd0fcffc';
const searchBtn = document.querySelector('#search-btn')
const search = document.querySelector('#search-text');
const cityName = document.querySelector('.city-name');
const temp = document.querySelector('.temp');
const hum = document.querySelector('.hum');

search.addEventListener('keyup',enterPressed);
searchBtn.addEventListener('click',weatherDetails);

function enterPressed(){
    weatherDetails();
}
function weatherDetails(){
    const city = search.value;
    if(city === ''){

    }else{
        getData(city);
    }
}
//get data from API
function getData(city){
    let data={};
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`)
    .then(resp => resp.json())
    .then(resp =>{
        setData(resp);
    })
    .catch(err =>console.log('Just write full city name ;)'))
        
    
    };
//set data to UI
function setData(resp){
    clearData();
    const data = resp;
    const basicInfo= data.main;
    const city = data.name;
    //farenheit to celcius
    const temperature = (basicInfo.temp-273).toFixed(1).toString();
    var emoi ='';

    
    cityName.innerHTML=`<span>${city}</span>`;
    temp.innerHTML= `<span>${temperature}℃<br>${tempChange((basicInfo.temp-273))}</span>`;
    hum.innerHTML = `<span>${basicInfo.humidity}%</span>`;

}
//clear data
function clearData(){
    temp.innerHTML = '';
    hum.innerHTML = '';
    cityName.innerHTML ='';
}
//change background color and emoi
function tempChange(temperature,emoi){
    
    if(temperature < 5){
        temp.style.backgroundColor='#00a8ff';
        emoi ='🥶';

    }else if (temperature>=5 &&temperature<=20){
        temp.style.backgroundColor='#fbc531';
        emoi ='😎';
    }else if(temperature>20){
        temp.style.backgroundColor='#e84118';
        emoi ='🥵';
    }
    return emoi;
}


//get geolocaction 





//iffe to set deafult loaction from geolocation

(function () {
   //geo loc function 
   geoLoc();
   //geoloc function 
    function geoLoc(){

        if(!navigator.geolocation){
            console.log('Geolocation is not supported by your browser');
        }else{
          navigator.geolocation.getCurrentPosition(success,error);
        }
        
      async function success(position){
        lat  = await position.coords.latitude;
        lon =  await position.coords.longitude;
          //  cords.push(lat,lon);
         getDataLoc(lat,lon);
        }
        
    
        function error(){
            console.log('Error happened')
        }
    
    }
    //get data with location coords and invoke function to set data
   async function getDataLoc(lat,lon){
       await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appKey}`)
        .then(resp => resp.json())
        .then(resp =>{
            setData(resp);
        })
        .catch(err =>console.log('Something went wrong'))
            
        
        };



})();


