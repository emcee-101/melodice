import { useEffect, useRef, memo, useState } from "react";
import { context } from "tone";
import { getXofFrequency, getFrequencyOfX, dbToY } from "../utils";
import "../styles/FilterDisplay.css";
const FilterDisplay = ({ type, rolloff, q, freq, gain, isPlaying, fft, }) => {
    const width = 256;
    const height = 156;
    const dbScale = 40;
    const canvas = useRef(null);
    const canvas2 = useRef(null);
    const [audioData, setAudioData] = useState();
    const rafId = useRef(0);
    useEffect(() => {
        var _a;
        const tick = () => {
            const data = fft.getValue();
            setAudioData(data);
            rafId.current = requestAnimationFrame(tick);
        };
        if (isPlaying)
            rafId.current = requestAnimationFrame(tick);
        else {
            const context = (_a = canvas2.current) === null || _a === void 0 ? void 0 : _a.getContext("2d");
            if (context) {
                context.clearRect(0, 0, width, height);
            }
        }
        return () => {
            cancelAnimationFrame(rafId.current);
        };
    }, [fft, isPlaying]);
    useEffect(() => {
        const draw = () => {
            var _a;
            const middle = height / 2;
            const pixelsPerDb = middle / dbScale;
            const context = (_a = canvas2.current) === null || _a === void 0 ? void 0 : _a.getContext("2d");
            if (context && audioData) {
                context.lineWidth = 1;
                context.clearRect(0, 0, width, height);
                let path = new Path2D();
                path.moveTo(0, height);
                for (let i = 0; i < audioData.length; i++) {
                    const db = audioData[i] + dbScale;
                    const y = dbToY(db, middle, pixelsPerDb);
                    let x = getXofFrequency(fft.getFrequencyOfIndex(i), width);
                    if (x < 0)
                        x = 0;
                    path.lineTo(x, y);
                }
                path.lineTo(width, height);
                path.lineTo(0, height);
                path.closePath();
                const gradient = context.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, "darkblue");
                gradient.addColorStop(0.5, "blue");
                gradient.addColorStop(0.95, "deepskyblue");
                context.fillStyle = gradient;
                context.fill(path);
            }
        };
        draw();
    }, [audioData, fft]);
    useEffect(() => {
        var _a;
        const middle = height / 2;
        const pixelsPerDb = middle / dbScale;
        const response = getFreqResponse(width, type, rolloff, q, freq, gain);
        const context = (_a = canvas.current) === null || _a === void 0 ? void 0 : _a.getContext("2d");
        if (context) {
            //draw box
            context.imageSmoothingEnabled = false;
            context.clearRect(0, 0, width, height);
            //draw frequency scale
            context.lineWidth = 1;
            context.strokeStyle = "gray";
            context.beginPath();
            for (let i = 100; i <= 10000; i = i * 10) {
                const freqX = getXofFrequency(i, width);
                context.moveTo(freqX, 0);
                context.lineTo(freqX, height - 12);
                context.stroke();
                let unit = "Hz";
                let value = i;
                if (i >= 1000) {
                    value = value / 1000;
                    unit = "KHz";
                }
                context.font = "9px Helvetica";
                context.fillStyle = "lightgray";
                context.textAlign = "center";
                context.fillText(value + unit, freqX, height - 3);
            }
            //draw dbScale
            context.lineWidth = 1;
            context.strokeStyle = "gray";
            context.beginPath();
            for (let i = -dbScale + 10; i < dbScale; i = i + 10) {
                let y = dbToY(i, middle, pixelsPerDb);
                context.moveTo(0, y);
                context.lineTo(width, y);
                context.stroke();
            }
            //draw frequency response graph
            context.strokeStyle = "cyan";
            context.lineWidth = 2;
            context.beginPath();
            for (let i = 0; i < width; i++) {
                const db = dbScale * Math.log10(response[i]);
                context.lineTo(i, dbToY(db, middle, pixelsPerDb));
            }
            context.stroke();
        }
    }, [type, rolloff, q, freq, gain]);
    return (<div className="filter-display-container">
      <div className="holder"/>
      <canvas className="filter-display" ref={canvas} width={width} height={height}/>
      <canvas className="visualiser" ref={canvas2} width={width} height={height}/>
    </div>);
};
const getFreqResponse = (len, type, rolloff, q, freq, gain) => {
    const freqValues = new Float32Array(len);
    for (let i = 0; i < len; i++) {
        freqValues[i] = getFrequencyOfX(i, len);
    }
    //setup filter clone and get frequency response
    const magValues = new Float32Array(len);
    const phaseValues = new Float32Array(len);
    const filterClone = context.createBiquadFilter();
    filterClone.type = type;
    filterClone.Q.value = q;
    filterClone.frequency.value = freq;
    filterClone.gain.value = gain;
    filterClone.getFrequencyResponse(freqValues, magValues, phaseValues);
    //get number of times to nest filter response to handle rolloff
    const numFilters = Math.log(Math.abs(rolloff) / 12) / Math.log(2) + 1;
    //collect total response of all the filters
    const totalResponse = new Float32Array(len).map(() => 1);
    for (let x = 1; x <= numFilters; x++) {
        magValues.forEach((val, i) => (totalResponse[i] *= val));
    }
    return totalResponse;
};
export default memo(FilterDisplay);
