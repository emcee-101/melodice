import React, { useState } from "react"
import { useParams } from "react-router-dom"
import {IP, ownPort} from "../../util/config"
 

export default function LandingPage({}){

    const [parameters, setParameter] = useState(null)

    setParameter(useParams());

    function fetchFromAPIs(){}

    return(
        <>

            <p>Your Song was created: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p>
        
        </>
    )

}