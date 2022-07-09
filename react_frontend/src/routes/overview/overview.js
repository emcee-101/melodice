
import React, { useState, useEffect } from "react";
import SongElement from "./songElement.js"
import { standardFetch } from "./util/fetch.js";


export default function Overview({singleTrack = "false", requestedTrackID = null}) {

    const [currentData, setData] = useState([{}]);

    async function fetchData(){

        let data = null;

        if ((singleTrack == "true") && (requestedTrackID)){

            data = await standardFetch('http://localhost:10098/getfulldata/' + requestedTrackID, "GET");
            
        } else {
        
            // gets all ID-entries for Songs in DB
            data = await standardFetch('http://localhost:10098/getfulldata/', "GET");

        }

        console.log(data)
        setData(data)

    } 
     
    // run only once when component mounted
    useEffect(() => { fetchData(); }, []);

    if(currentData == {}){
        return ( <div className="overview">Loading...</div> )

    } else if (currentData[0]._id){
        return (
            <div className="overview">
                
                {currentData.map((set, index) => (
                    
                        // songElement gets ID from Array of IDs currentData which resembles all tracks in the Database
                        <SongElement
                            key={index}
                            songData={set}
                        />
                    
                ))}
                                

            </div>
        );}
    else {
        return (
            <div className="overview">
                There is an error! 
            </div>
    );}
}