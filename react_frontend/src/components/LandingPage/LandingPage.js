import React, { useState } from "react"
import { useParams } from "react-router-dom"
import {IP, ownPort} from "../../util/config"
 

export default function LandingPage({}){

    const [parameters, setParameter] = useState(useParams())

    function fetchFromAPIs(){}

    return(
        <>

            <p>Your Song was created: {parameter.trackid}, Link should be {IP+ownPort+"overview?track="+parameter.trackid}</p>
        
        </>
    )

}