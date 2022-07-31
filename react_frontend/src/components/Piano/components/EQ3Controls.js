import { useCallback, memo, useContext } from "react";
import Knob from "./Knob";
import "../styles/EQ3Controls.css";
import { OptionsContext } from "../contexts/OptionsContext";
const EQ3Controls = ({ eq3 }) => {
    const low = eq3.low.value;
    const mid = eq3.mid.value;
    const high = eq3.high.value;
    const lowFreq = eq3.lowFrequency.value;
    const highFreq = eq3.highFrequency.value;
    const optionsContext = useContext(OptionsContext);
    const handleLowChange = useCallback((value) => {
        eq3.set({ low: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.eq3.low = value;
        optionsContext.setOptions(optionsCopy);
    }, [eq3, optionsContext]);
    const handleMidChange = useCallback((value) => {
        eq3.set({ mid: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.eq3.mid = value;
        optionsContext.setOptions(optionsCopy);
    }, [eq3, optionsContext]);
    const handleHighChange = useCallback((value) => {
        eq3.set({ high: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.eq3.high = value;
        optionsContext.setOptions(optionsCopy);
    }, [eq3, optionsContext]);
    const handleLowFreqChange = useCallback((value) => {
        eq3.set({ lowFrequency: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.eq3.lowFrequency = value;
        optionsContext.setOptions(optionsCopy);
    }, [eq3, optionsContext]);
    const handleHighFreqChange = useCallback((value) => {
        eq3.set({ highFrequency: value });
        const optionsCopy = Object.assign({}, optionsContext.options);
        optionsCopy.eq3.highFrequency = value;
        optionsContext.setOptions(optionsCopy);
    }, [eq3, optionsContext]);
    return (<div className="control-container EQ3-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">EQUALIZER</label>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column hasTooltip">
          <Knob min={-60} max={6} value={low} onValueChange={handleLowChange} width={50} height={50} step={1}/>
          <label className="unselectable title-small">Low</label>
          <span className="tooltip unselectable value">{`${Math.round(low)}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob min={-60} max={6} value={mid} onValueChange={handleMidChange} width={50} height={50} step={1}/>
          <label className="unselectable title-small">Mid</label>
          <span className="tooltip unselectable value">{`${Math.round(mid)}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob min={-60} max={6} value={high} onValueChange={handleHighChange} width={50} height={50} step={1}/>
          <label className="unselectable title-small">High</label>
          <span className="tooltip unselectable value">{`${Math.round(high)}db`}</span>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column eq-freq-knob hasTooltip">
          <Knob min={50} max={5000} value={lowFreq} onValueChange={handleLowFreqChange} width={50} height={50} step={1}/>
          <label className="unselectable title-small">FreqLow</label>
          <span className="tooltip unselectable value">{`${Math.round(lowFreq)}hz`}</span>
        </div>
        <div className="column eq-freq-knob hasTooltip">
          <Knob min={200} max={18000} value={highFreq} onValueChange={handleHighFreqChange} width={50} height={50} step={1}/>
          <label className="unselectable title-small">FreqHigh</label>
          <span className="tooltip unselectable value">{`${Math.round(highFreq)}hz`}</span>
        </div>
      </div>
    </div>);
};
export default memo(EQ3Controls);
