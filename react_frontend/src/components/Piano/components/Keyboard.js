import { memo } from "react";
import KeyboardOctave from "./KeyboardOctave";
import "../styles/Keyboard.css";
const Keyboard = ({ notesPlaying, octave, playNote, stopNote, }) => {
    const handleMouseLeave = () => { stopNote('', true); };
    return (<div className="keyboard" onMouseLeave={handleMouseLeave}>
      <KeyboardOctave octave={octave} notesPlaying={notesPlaying} playNote={playNote} stopNote={stopNote}/>
      <KeyboardOctave octave={octave + 1} notesPlaying={notesPlaying} playNote={playNote} stopNote={stopNote}/>
      <KeyboardOctave octave={octave + 2} notesPlaying={notesPlaying} playNote={playNote} stopNote={stopNote}/>
    </div>);
};
export default memo(Keyboard);
