import React, {useState} from 'react';
import Overview from './overview.js'


export default function OverviewRoot() {

      const [singleTrack, setSingleTrack] = useState("false");
      const [requestedTrackID, setRequestedTrackID] = useState(null);

      return (<Overview
                  singleTrack = {singleTrack}
                  requestedTrackID = {requestedTrackID} />)

}

