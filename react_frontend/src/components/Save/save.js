import React, {
    useState,
    useEffect
  } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { standardFetch } from '../../util/fetch'
import { IP, post_new_service, rapid_api_audiodb_host } from '../../util/config'
import { useNavigate } from "react-router-dom";


  // gets passed the audio data (preferably in mp3 :)) also has standardvalue "Bogus"
export default function Save({parentData={"audio": "Bogus"}}){

    let style = {padding: "20px"}
    let formData = {author: null, name: null, origauthor: null, origtitle: null, lyrics: null}
    let audioDBID = null
    let log = ""
    const [outputLog, setOutputLog] = useState("");                 /* rerender in case there is something filled out wrong*/

    const [isCover, setAsCover] = useState(false);
    const [audioDBEntries, setAudioDBEntries] = useState({});       /* <--- this is for when there is a selection like which one is it? */

    let navigation = useNavigate();

    // check for data corresponding to origtitle and origauthor in the audioDB
    async function checkEntriesAudioDB(){

        let audioDBresponse = await standardFetch(`https://theaudiodb.p.rapidapi.com/searchtrack.php?s=${formData.origauthor}&t=${formData.origtitle}`, "GET",{}, {type: "rapidapi", rapid_api_host: rapid_api_audiodb_host})
        
        //selects first match as fitting one that gets added to db... please add logic, so that this can be chosen on screen
        if(!audioDBresponse.message){audioDBID = audioDBresponse.track[0].idTrack} 
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
            <Form id="saveForm" style={style}>
                
                <InputGroup className="mb-3" controlId="author" >
                        <InputGroup.Text id="inputGroup-sizing-default">Your Name:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" 
                            placeholder="Name" 
                            onChange={(event) => formData.author=event.target.value}
                            aria-label="Your Name"
                        /> 
                </InputGroup>
                
                <InputGroup className="mb-3" controlId="name" >                            
                        <InputGroup.Text id="inputGroup-sizing-default">Name of the Song:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" 
                            placeholder="Title" 
                            onChange={(event) => formData.name=event.target.value}
                            aria-label="Name Of The Song"
                        />  
                        <br />
                </InputGroup>

                <InputGroup className="mb-3" controlId="lyrics" >                            
                        <InputGroup.Text id="inputGroup-sizing-default">Lyrics of Song:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" 
                            placeholder="Lyrics" 
                            onChange={(event) => formData.lyrics=event.target.value}
                            aria-label="Name Of The Song"
                        />  
                        <br />
                </InputGroup>

                <br />
                <br />

                Is this Song a cover of a already existing Song?   
                
                <br />
         
                <Button variant="outline-primary" onClick={()=>{isCover ? setAsCover(false) : setAsCover(true)}}>
                    { isCover.toString() }
                </Button>           {' '}
                
                <br />

                <InputGroup className="mb-3" controlId="origauthor" style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <InputGroup.Text id="inputGroup-sizing-default">Original Author:
                            </InputGroup.Text>
                        <Form.Control
                            type="text"    
                            placeholder="Original Author" 
                            onChange={(event) => formData.origauthor=event.target.value}
                            aria-label="Original Author Name"
                        />  
                        <br />
                </InputGroup>
                
                <InputGroup className="mb-3" controlId="origname" style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <InputGroup.Text id="inputGroup-sizing-default">Original Title:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" 
                            placeholder="Song Name"  
                            onChange={(event) => formData.origtitle=event.target.value}
                            aria-label="Original Song Name"
                        />  
                        <br />
                </InputGroup>                            
                
                <br />
                
                <Button variant="outline-primary" onClick={checkEntriesAudioDB}>
                    Check for AudioDB-Entries!
                </Button>{' '}<br />

                <br />

                <Button variant="primary" onClick={submit}>Submit</Button>{' '}

            </Form>

            <code> 
                {outputLog}
            </code>
        </>


  }