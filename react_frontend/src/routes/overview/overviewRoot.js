import React, {useState} from 'react';
import Overview from "../../components/Overview/overview.js";



export default function OverviewRoot() {

      const [singleTrack, setSingleTrack] = useState("false");
      const [requestedTrackID, setRequestedTrackID] = useState(null);

      return (<Overview
                  singleTrack = {singleTrack}
                  requestedTrackID = {requestedTrackID} />)

}

