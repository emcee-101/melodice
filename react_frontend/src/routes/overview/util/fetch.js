

// url  example: "http://localhost:10092/matcher/mongoose"
// method example: "POST"

export async function standardFetch(url, method='GET'){

    try{
        fetch(url,
            {
                mode: 'cors',
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
        
            
            })
        return response.json();

    } catch(e) {

        console.log('Error ocurred:' + e);
        return { error: 'e'}
    
    }    

}