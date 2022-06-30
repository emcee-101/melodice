
import React, { useState } from "react";
import songElement from "songElement.js"




export default function overview(props) {

    const [currentData, setData] = useState([]);

    async function getDBData(){

        if (props.singleTrack == 1){
            
            // prepare Data Structure to be compatible with the return value of the fetch in the else-branch
            let singleID = [
                {
                    id: props.requestedTrackID
                }
            ] 
            return singleID

        } else {
        
            // gets all ID-entries for Song in DB
            fetch('194.94.204.27:10098/getfulldata/')
            .then(response => response.json())
            .then(data => {console.log(data); 
                return data});
        }
    } 
    
    await getDBData().then(data => setData(data)) 
    

    return (
        <div>

            {createArray(currentData).map((n, i) => (
                
                // songElement gets ID from Array of IDs currentData which resembles all tracks in the Database
                <songElement
                    key={i}
                    id={currentData.id}
                />
            ))}

        </div>
    );
}