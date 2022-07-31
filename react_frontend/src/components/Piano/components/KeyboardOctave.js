import { memo } from "react";
import Key from "./Key";
import { NOTES } from "../globals/constants";
const KeyboardOctave = ({ octave, notesPlaying, playNote, stopNote, }) => {
    const createKeys = () => {
        return NOTES.map((note) => {
            return (<Key key={`${note}${octave}`} note={note} octave={octave} notesPlaying={notesPlaying} playNote={playNote} stopNote={stopNote}/>);
        });
    };
    const keys = createKeys();
    return <>{keys}</>;
};
export default memo(KeyboardOctave);
