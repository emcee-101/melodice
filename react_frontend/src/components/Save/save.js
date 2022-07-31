import React, {
    useState,
    useEffect
  } from "react";
import { standardFetch } from '../../util/fetch'
import { IP, post_new_service, rapid_api_audiodb_host } from '../../util/config'
import { useNavigate } from "react-router-dom";


  // gets passed the audio data (preferably in mp3 :)) also has standardvalue "Bogus"
export default function Save({parentData={"audio": "Bogus"}}){

    let style = {padding: "20px"}
    let formData = {author: null, name: null, origauthor: null, origtitle: null, lyrics: null}
    let log = ""
    const [outputLog, setOutputLog] = useState("");                 /* rerender in case there is something filled out wrong*/

    const [isCover, setAsCover] = useState(false);
    const [audioDBID, setaudioDBID] = useState(null);

    let navigation = useNavigate();

    // check for data corresponding to origtitle and origauthor in the audioDB
    async function checkEntriesAudioDB(){

        let audioDBresponse = await standardFetch(`https://theaudiodb.p.rapidapi.com/searchtrack.php?s=${formData.origauthor}&t=${formData.origtitle}`, "GET",{}, {type: "rapidapi", rapid_api_host: rapid_api_audiodb_host})
        
        //selects first match as fitting one that gets added to db... please add logic, so that this can be chosen on screen
        if(!audioDBresponse.message){setaudioDBID(audioDBresponse.track[0].idTrack) } 
        else {log = log + "couldnt find original track in audioDB please ty again acheck for mistakes; "}
        console.log("message:" + audioDBresponse.message)
        console.log(audioDBresponse)
        //setAudioDBEntries = audioDBresponse
    } 

    // submit to db
    async function submit(){ 

        let data = {
            name: formData.name,                    /*  String */
            author: formData.author,                /*  String */
            lyrics: formData.lyrics,                /*  String */                       /* typescript next time :_-) */
            typeOfPost: null,                       /*  audio, lyrics, add, both */
            type: null,                             /*  audio,lyrics, both */
            audiodata: parentData.audio,            /*  binary data */
            cover: isCover.toString()};             /*  true, false */
                        

        if ((isCover && audioDBID)||(!isCover && (audioDBID==null))) {
            
            
            if(isCover) data.audiodbid = audioDBID;              /*  String */ 


            console.log(data)

            if(data && (data.author&&(data.author!="")) && (data.name&&(data.name!="")) && data.cover){
    
                if (data.lyrics && (data.audiodata!="Bogus") && data.audiodata){
                    data.type = "both"
                    data.typeOfPost = "both"
                } else if ((data.audiodata!="Bogus") && data.audiodata) {
                    data.type = "audio"
                    data.typeOfPost = "audio"
                } else {
                    data.type = "lyrics"
                    data.typeOfPost = "lyrics"
                }
                console.log(data)
                console.log(data.audiodata)
                
                let result = await standardFetch(IP+post_new_service, 'POST', data,{})
    
                console.log(result.message)
                
                // refer to LandingPage if sucessfully pushed to DB
                if(result._id) {
                    navigation("/landingpage/" + result._id);
                }
            
            } else {
    
                log = log + "a necessary value of the form is not filled, Please Check anew!; "
                setOutputLog(log)
                log=""
    
            }


        } else if(isCover && !audioDBID)  {
            setOutputLog(log)
            log=""
        }         


    }

    console.log(isCover + "RENDER TRIGGERED")

    return <>
            <form>
                <ul className="form-style-1">

                    <li>
                        <label>Your Name: <span className="required">*</span></label>
                        <input type="text" name="field1" className="field-divided" placeholder="Full" onChange={(event) => formData.author=event.target.value}/> 
                    </li>
                
                    <li>
                        <label>Name Of Song: <span className="required">*</span></label>
                        <input type="text" name="field2" className="field-divided" placeholder="Full" onChange={(event) => formData.name=event.target.value}/> 
                    </li>

                    <li>
                        <label>Lyrics: <span className="required"></span></label>
                        <input type="text" name="field3" className="field-divided" placeholder="Full" onChange={(event) => formData.lyrics=event.target.value}/> 
                    </li>             
                
                <br />
                <br />
                    <li>
                Is this Song a cover of a already existing Song?   
                    </li> 
                <br />
                    <li> 
                <button type='button' onClick={()=>{ isCover ? setAsCover(false) : setAsCover(true)}}> { isCover.toString() }</button>
                    </li> 
                <br />
                    <li style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <label>Original Author: <span className="required"></span></label>
                        <input type="text" name="field4" className="field-divided" placeholder="Full" onChange={(event) => formData.origauthor=event.target.value}/> 
                    </li>
                    <li style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <label>Original Name: <span className="required"></span></label>
                        <input type="text" name="field5" className="field-divided" placeholder="Full" onChange={(event) => formData.origtitle=event.target.value}/> 
                    </li>
         
                <br />
                <li>
                <button type='button' onClick={checkEntriesAudioDB}> Check for AudioDB-Entries!</button>
                </li> <li>
                    {`Found an Object in theaudiodb: ${audioDBID}`}
                </li> <li>
                <button type='button' onClick={submit}> Submit</button>
                </li>
                <br />
            </ul>
            </form>

            <code> 
                {outputLog}
            </code>
        </>


  }