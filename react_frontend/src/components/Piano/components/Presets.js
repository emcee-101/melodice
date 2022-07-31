import { useState } from "react";
import { defaults, supersaw, waterTemple, sleepy } from "../presets";
import "../styles/Presets.css";
const Presets = ({ changePreset }) => {
    const [selected, setSelected] = useState(defaults.name);
    const presets = [defaults, supersaw, waterTemple, sleepy];
    const handleSelect = (event) => {
        const name = event.target.value;
        const preset = presets.find((preset) => preset.name === name);
        if (preset)
            changePreset(preset);
        setSelected(name);
    };
    return (<div className="presets-container">
      <label className="unselectable" htmlFor="presetsSelect">
        PRESET
      </label>
      <select className="presets-select unselectable" name="presetsSelect" onChange={handleSelect}>
        {presets.map((preset) => {
            return (<option key={preset.name} value={preset.name}>
              {preset.name}
            </option>);
        })}
      </select>
    </div>);
};
export default Presets;
