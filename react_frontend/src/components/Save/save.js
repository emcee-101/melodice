import React, {
    useEffect,
    useState,
  } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import standardFetch from '../../util/fetch'
import { IP, post_new_service, audio_service } from '../../util/config'


  // gets passed the audio data (preferably in mp3)
export default function Save({parentData}){

    let style = {padding: "20px"}
    let formData = {author: null, name: null, origauthor: null, origtitle: null, lyrics: null}

    const [isCover, setAsCover] = useState(false);

    function submit(){ /* use ParentData and formInput and Call fetch */

        let data = {name: formData.name, author: formData.author, typeOfPost: null, audiodata: null};
//cover(isCover, also false oder true), audiodbid (id AudioDB), typeOfPost (audio, lyrics, both, add), type (audio, lyrics, both)
//audiodata
        if (isCover) {
            data.DBID = dbID
        

        if(data && data.author && data.name && parentData){
            standardFetch(IP+post_new_service, 'POST', data)
            }   
        


        }

    }

    console.log(isCover + "RENDER TRIGGERED")

    return <>
            <Form onSubmit={submit()} id="saveForm" style={style}>
                
                <InputGroup className="mb-3" controlId="author" >
                        <InputGroup.Text id="inputGroup-sizing-default">Your Name:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" placeholder="Name" onChange={(event) => formData.author=event.target.value}
                            aria-label="Your Name"
                        /> </InputGroup>
                <InputGroup className="mb-3" controlId="name" >                            
                        <InputGroup.Text id="inputGroup-sizing-default">Name of the Song:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" placeholder="Title" onChange={(event) => formData.name=event.target.value}
                            aria-label="Name Of The Song"
                        />  <br />
                </InputGroup>
                <InputGroup className="mb-3" controlId="lyrics" >                            
                        <InputGroup.Text id="inputGroup-sizing-default">Lyrics of Song:
                            </InputGroup.Text>
                        <Form.Control
                            type="text" placeholder="Lyrics" onChange={(event) => formData.lyrics=event.target.value}
                            aria-label="Name Of The Song"
                        />  <br />
                </InputGroup>
                <br />
                <br />

                Is this Song a cover of a already existing Song?   
                <br />
         
                <Button variant="outline-primary" onClick={()=>{isCover ? setAsCover(false) : setAsCover(true)}}>
                    { isCover.toString() }
                </Button>{' '}<br />

                <InputGroup className="mb-3" controlId="origauthor" style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <InputGroup.Text id="inputGroup-sizing-default">Original Author:
                            </InputGroup.Text>
                        <Form.Control
                            type="text"    placeholder="Original Author" onChange={(event) => formData.origauthor=event.target.value}
                            aria-label="Original Author Name"
                        />  <br />
                </InputGroup>
                <InputGroup className="mb-3" controlId="origname" style={{ visibility: isCover ? "visible" : "hidden" }}>
                    <InputGroup.Text id="inputGroup-sizing-default">Original Title:
                                </InputGroup.Text>
                            <Form.Control
                                type="text" placeholder="Song Name"  onChange={(event) => formData.origtitle=event.target.value}
                                aria-label="Original Song Name"
                            />  <br />
                </InputGroup>                            <br />

                <Button variant="primary" type="submit">Submit</Button>{' '}
            </Form>
        </>


  }