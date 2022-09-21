const form =document.getElementsByTagName('form')[0];

const city=document.getElementById("city");
const cityError=document.querySelector("#city + span.error");
const success=document.querySelector("span.success");

city.addEventListener("input", (event)=>{
    if(city.validity.valid){
        cityError.textContent="";
        cityError.className="error";
    }
    else{
        showError();
    }
});

form.addEventListener('submit', (event)=>{
    success.textContent="";
    if(!city.validity.valid){
        showError();
        event.preventDefault();
    }
    else{
        event.preventDefault();
        success.textContent="Success";
        
        callApi();
    }
})

function showError(){
    if(city.validity.valueMissing){
        cityError.textContent="Please enter a city";
    }
    else if(city.validity.typeMismach){
        cityError.textContent="Must be letters";
    }
    cityError.className="error active";
}

async function callApi(){
    //http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6273be273b9a4f71422e771ee538b543
    const key='6273be273b9a4f71422e771ee538b543'
    let cityName=city.value;
    let link=`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${key}`;
    try{
        let response= await fetch(link,{mode:"cors"});
        let cityInfo=await response.json();
        console.log(cityInfo);
    }
    catch(error){
        console.log(error);
    }
}