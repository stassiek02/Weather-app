
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

function getData(city){
    let data={};
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}`)
    .then(resp => resp.json())
    .then(resp =>{
        setData(resp);
    })
    .catch(err =>console.log('Just write full city name ;)'))
        
    
    };

function setData(resp){
    clearData();
    const data = resp;
    const basicInfo= data.main;
    const city = data.name;
    const temperature = (basicInfo.temp-273).toFixed(1).toString();
    var emoi ='';

    
    cityName.innerHTML=`<span>${city}</span>`;
    temp.innerHTML= `<span>${temperature}℃<br>${tempChange((basicInfo.temp-273))}</span>`;
    hum.innerHTML = `<span>${basicInfo.humidity}%</span>`;

}

function clearData(){
    temp.innerHTML = '';
    hum.innerHTML = '';
    cityName.innerHTML ='';
}

function tempChange(temperature,emoi){
    
    if(temperature < 0){
        temp.style.backgroundColor='#00a8ff';
        emoi ='🥶';
        console.log(emoi);

    }else if (temperature>=10 &&temperature<=20){
        temp.style.backgroundColor='#e1b12c';
        emoi ='😎';
    }else if(temperature>20){
        temp.style.backgroundColor='#e84118';
        emoi ='🥵';
    }
    return emoi;
}