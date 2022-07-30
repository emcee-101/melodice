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

    if((method=='POST'||method=='PUT') && (data))
        config.body = JSON.stringify(data);

    if(additionalParams.specialCallType){
        switch(additionalParams.specialCallType){
            case("rapidapi"):
                break;

        }
    }
    
    return fetch(url, config)
                        .then( (response) => { return response.json(); })
                        .then( (jsonObj) => {return jsonObj})
                        .catch((e)=>{(console.log(e)); return {message: "there has been an error"}})
    
    }    

