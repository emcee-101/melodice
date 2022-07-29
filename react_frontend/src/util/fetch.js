

// url  example: "http://localhost:10092/matcher/mongoose"
// method example: "POST"

export async function standardFetch(url, method='GET', data = {}){

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
    
    return fetch(url, config)
                        .then( (response) => { return response.json(); })
                        .then( (jsonObj) => {return jsonObj})
                        .catch((e)=>{(console.log(e)); return {message: "there has been an error"}})
    
    }    

