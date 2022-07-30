import React, { useState } from "react"
import { useParams } from "react-router-dom"
import {IP, ownPort} from "../../util/config"
 

export default function LandingPage({match}){

    const [parameters, setParameter] = useState(useParams())

    function fetchFromAPIs(){}

    return(
        <>

            {console.log(parameters)}
            {/* Object { trackid: "t" } */}

            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p>
            

        </>
    )

}