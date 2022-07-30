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

    const [isCover, setAsCover] = useState('false');

    useEffect(()=>{/*  code to make components visible that make input of original data possible */},[isCover]);

    function submit(){ /* use ParentData and formInput and Call fetch */}

    return <>
            <form onsubmit={submit()}>
                <Button variant="outline-primary" type="input" onClick={()=>{if(isCover!='false')setAsCover('false');else setAsCover('true')}}>
                    {isCover}
                </Button>{' '}
                <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Your Name
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                
                    <InputGroup.Text id="inputGroup-sizing-default">
                            Name Of The Song
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <Button variant="primary" type="submit" onClick={submit()}>Submit</Button>{' '}
            </form>
        </>


  }