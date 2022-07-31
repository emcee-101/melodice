import {rapid_api_key} from "./config"

// url  example: "http://localhost:10092/matcher/mongoose"
// method example: "POST"


export async function standardFetch(url, method='GET', data = {}, additionalParams = {}){

    let config = {
        mode: 'cors',
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    
    console.log(rapid_api_key);
    console.log(additionalParams.rapid_api_host)
    console.log(url)

    if((additionalParams.type == "rapidapi") && additionalParams.rapid_api_host){
        config = {
            method: method,
            headers: {
                'X-RapidAPI-Key': rapid_api_key,
                'X-RapidAPI-Host': additionalParams.rapid_api_host       // can be theaudiodb.p.rapidapi.com or shazam-core.p.rapidapi.com
            }
        }
 /*       return await fetchRapidAPI(url, method, {}, additionalParams);*/  
    }
    if((method=='POST'||method=='PUT') && (data))
        config.body = JSON.stringify(data);

    return fetch(url, config)
                        .then( (response) => { return response.json(); })
                        .then( (jsonObj) => {return jsonObj})
                        .catch((e)=>{(console.log(e)); return {message: "there has been an error"}})
    
    }    

