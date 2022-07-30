import React, {useState} from 'react';
import Overview from "../../components/Overview/overview.js";


// tracksPassed is a List of Songs, that can be passed by search component
export default function OverviewRoot({tracksPassed}) {

      const [singleTrack, setSingleTrack] = useState("false");
      const [requestedTrackID, setRequestedTrackID] = useState(null);

      return (<Overview
                  singleTrack = {singleTrack}
                  requestedTrackID = {requestedTrackID} />)

}

