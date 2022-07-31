import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Overview from "../../components/Overview/overview.js";

// tracksPassed is a List of Songs, that can be passed by search component


export default function OverviewRoot({tracksPassed = null}) {

      let params = useParams()
      let singleTrack = "false"
      let requestedTrackID = ""

      if(params.trackid) {
            singleTrack = "true"
            requestedTrackID = params.trackid;
      }

      return (<>
                  <Overview
                  tracksPassed = {tracksPassed}
                  singleTrack = {singleTrack}
                  requestedTrackID = {requestedTrackID} />
            </>)

}


