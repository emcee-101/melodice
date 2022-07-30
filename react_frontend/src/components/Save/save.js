import React, {
    useEffect,
    useState,
  } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


  // gets passed the audio data (preferably in mp3)
export default function Save({parentData}){

    let style = {padding: "20px"}

    const [isCover, setAsCover] = useState(false);

    function submit(){ /* use ParentData and formInput and Call fetch */}

    console.log(isCover + "RENDER TRIGGERED")

    return <>
            <form onSubmit={submit()} id="saveForm" style={style}>
                
                <InputGroup className="mb-3" id="author" >
                        <InputGroup.Text id="inputGroup-sizing-default">Your Name:
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Your Name"
                        /> </InputGroup>
                <InputGroup className="mb-3" id="name" >                            
                        <InputGroup.Text id="inputGroup-sizing-default">Name of the Song:
                            </InputGroup.Text>
                        <Form.Control
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

                <InputGroup className="mb-3" id="origauthor" style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <InputGroup.Text id="inputGroup-sizing-default">Original Author:
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Original Author Name"
                        />  <br />
                </InputGroup>
                <InputGroup className="mb-3" id="origname" style={{ visibility: isCover ? "visible" : "hidden" }}>
                    <InputGroup.Text id="inputGroup-sizing-default">Original Title:
                                </InputGroup.Text>
                            <Form.Control
                                aria-label="Original Song Name"
                            />  <br />
                </InputGroup>                            <br />

                <Button variant="primary" type="submit">Submit</Button>{' '}
            </form>
        </>


  }