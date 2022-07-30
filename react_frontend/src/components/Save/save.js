import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
import { Button } from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


  // gets passed the audio data (preferably in mp3)
export function save({parentData}){

    const [isCover, setAsCover] = useState(false);

    useEffect(()=>{/*  code to make components visible that make input of original data possible */},[isCover]);

    function submit(){ /* use ParentData and formInput and Call fetch */}

    return <>
            <form onsubmit={submit()}>
                <Button variant="outline-primary" type="input" onClick={()=>{isCover ? setAsCover(false) : setAsCover(true)}}>
                    { isCover.toString() }
                </Button>{' '}
                <InputGroup className="mb-3" id="generalData">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Your Name"
                            aria-describedby="inputGroup-sizing-default"
                        />
                
                        <InputGroup.Text id="inputGroup-sizing-default">
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Name Of The Song"
                            aria-describedby="inputGroup-sizing-default"
                        />
                </InputGroup>

                <InputGroup className="mb-3" id="coverData" style={{ visibility: isCover ? "visible" : "hidden" }}>
                        <InputGroup.Text id="inputGroup-sizing-default">
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Original Song Name"
                            aria-describedby="inputGroup-sizing-default"
                        />
                
                        <InputGroup.Text id="inputGroup-sizing-default">
                            </InputGroup.Text>
                        <Form.Control
                            aria-label="Original Song Author"
                            aria-describedby="inputGroup-sizing-default"
                        />
                </InputGroup>

                <Button variant="primary" type="submit">Submit</Button>{' '}
            </form>
        </>


  }