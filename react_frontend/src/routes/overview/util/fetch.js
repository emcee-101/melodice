

// url  example: "http://localhost:10092/matcher/mongoose"
// method example: "POST"

export function standardFetch(url, method='GET'){

    let response = null;

    try{
        return fetch(url,
                        {
                            mode: 'cors',
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                    
                        
                        }).json();
    } catch(e) {

        console.log('Error ocurred:' + e);
        return { error: 'e'}
    
    }    

}