import { useCallback, memo, useContext } from "react";
import RadioButtonGroup from "./RadioButtonGroup";
import { OptionsContext } from "../contexts/OptionsContext";
import "../styles/FilterControls.css";
const Record = ({ recorder, startRecording, stopRecording }) => {
    const status = recorder.status;
    const optionsContext = useContext(OptionsContext);
    const handleRecorderStatusChange = useCallback((e) => {
        const value = e.target.value;
        if (value === "stopped") {
            console.log('trueeeeee')
            stopRecording()
        };
        if (value === "recording") {
            startRecording()
        };
        recorder.set({ status: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.filter.status = value;
        optionsContext.setOptions(optionsCopy);
    }, [recorder, optionsContext]);
    return (
        <div className="type-buttons">
          <RadioButtonGroup items={["recording", "stopped"]} id={"recorder status"} comparator={status} buttonSize="large" onValueChange={handleRecorderStatusChange}/>
        </div>);
};
export default memo(Record);