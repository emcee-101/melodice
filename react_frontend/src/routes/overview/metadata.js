import React from "react";





export default function Metadata({index = 1, songData = {}}) {


    return(<p>
        {index}. Element im Bunde: {songData.name}
    </p>)


}
