import { useCallback, memo, useContext } from "react";
import RadioButtonGroup from "./RadioButtonGroup";
import { OptionsContext } from "../contexts/OptionsContext";
import "../styles/FilterControls.css"; 
const Record = ({ recorder, startRecording, stopRecording }) => {
    let state = "stopped";
    const handleRecorderStatusChange = useCallback((e) => {
        const value = e.target.value;
        if (value == "stopped") {
            console.log('stop recording')
            stopRecording()
        };
        if (value == "started") {
            console.log('start recording')
            startRecording()
        };
        
    }, [recorder]);
    return (
        <div className="presets-container row">
            <label className="unselectable" htmlFor="presetsSelect">RECORDER</label>
            <RadioButtonGroup items={["started", "stopped"]} id={"recorder status"}  buttonSize="large" onValueChange={handleRecorderStatusChange}/>
        </div>);
};
export default memo(Record);