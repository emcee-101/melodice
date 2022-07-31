import { useState, useEffect } from "react";
import { WebMidi } from "webmidi";
import "../styles/Midi.css";
const Midi = ({ playNote, stopNote }) => {
    const [inputs, setInputs] = useState([]);
    const [selectedMidi, setSelectedMidi] = useState();
    const onEnabled = () => {
        const newInputs = WebMidi.inputs.map((input) => {
            return input.name;
        });
        setInputs((prev) => {
            return [...new Set([...prev, ...newInputs])];
        });
    };
    const findMidi = () => {
        WebMidi.enable()
            .then(onEnabled)
            .catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        if (selectedMidi) {
            selectedMidi.addListener("noteon", (e) => {
                playNote(e.note.identifier, true);
            });
            selectedMidi.addListener("noteoff", (e) => {
                stopNote(e.note.identifier, true);
            });
        }
    }, [selectedMidi, playNote, stopNote]);
    const handleSelect = (event) => {
        if (selectedMidi)
            selectedMidi.removeListener();
        setSelectedMidi(WebMidi.getInputByName(event.target.value));
    };
    return (<div className="midi-container">
      <div className={`${"lightbulb"} ${(selectedMidi === null || selectedMidi === void 0 ? void 0 : selectedMidi.connection) ? "green" : "red"}`}/>
      <label className="unselectable" htmlFor="midiSelect">
        MIDI
      </label>
      <select className="midi-select unselectable" name="midiSelect" onClick={findMidi} onChange={handleSelect}>
        <option value="">None</option>
        {inputs.map((input) => {
            return (<option key={input} value={input}>
              {input}
            </option>);
        })}
      </select>
    </div>);
};
export default Midi;
