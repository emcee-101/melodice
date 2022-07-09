import React from "react";





export default function Metadata({key = 1, songData = {}}) {


    return(<p>
        {key}. Element im Bunde: {songData.name}
    </p>)


}
