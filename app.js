/* Global Variables */
const openWeatherurl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const openWeatherApiKey = '&appid=759b5d8ba3e7567a4e89201b361c5b9b';
const unit = "&units=metric";
//click event
document.getElementById('generate').addEventListener('click', function ()  {
    let ZipCode = document.getElementById('zip');
    let Feelings = document.getElementById('feelings');
    let countryCode = document.getElementById('country-code');
    // Check if User add zip-code and countrycode
    if (ZipCode.value && countryCode.value) {
       
        //getting the data
        getData(openWeatherurl  + ZipCode.value + "," + countryCode.value + openWeatherApiKey+ unit ).then(function (data)  {
            //check if the data is working 
            if (data.cod == 200) {
                //post the data to the root on the server side
                postProjectData('/postData',
                    { name: data.name, temp: data.main.temp, date: newDate, userResponse: Feelings.value }
                ).then(function (resData) {
                    // Update UI with the new data
                    document.getElementById('Your-city').innerHTML = data.name;
                    document.getElementById('temp').innerText = data.main.temp + '°C'
                    document.getElementById('date').innerText = newDate
                    document.getElementById('content').innerText = Feelings.value + '°C'
                })
            } else {
                document.querySelector('.viewer').innerHTML = "ERORR ZIPCODE OR COUNTRY CODE IS WRONG &#10060;";
                document.querySelector('.viewer').style.color = "#fd3535";
                 
            }
            //handle error
        }).catch(function (error)  {
            console.log(error)
        })

    } 
    else if(!ZipCode.value && !countryCode.value){
        // Handle the empty field of zipcode and countrycode 
        Swal.fire('please enter the Zipcode and  enter the country code')
    }
    else if(ZipCode.value && !countryCode.value){
        // Handle the empty field of countrycode 
        Swal.fire('please enter the country code');
    }
    else if (!ZipCode.value && countryCode.value){
        // Handle the empty field of zipcode 
      
        Swal.fire('please enter the Zipcode')
    } 
   
    
})

// API's async functions
const getData = async function (url = '')  {
    try {
        let request = await fetch(url)
        return await request.json()
    } catch (error) {
        console.log("error", error)
    }
}

// Post Data to server
const postProjectData = async function (url = '', data = { temp: 0, date: '', userResponse: '' })  {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const resData = await response.json()
        return resData
    } catch (error) {
        console.log("error", error)
    }
}


// Create a new date instance dynamically 
let date = new Date()
let newDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
