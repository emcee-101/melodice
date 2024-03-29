import { useEffect, useRef, useState, memo } from "react";
import { getBarCoordinates, calculateSliderNewValue, drawSliderTickCoordinates, } from "../utils";
const Slider = ({ min, max, step, value, width, height, onValueChange, }) => {
    const middle = width / 2;
    const trackWidth = 10;
    const trackHeight = height;
    const barWidth = 40;
    const barHeight = 12;
    const barCoordinates = getBarCoordinates(value, middle, min, max, barHeight, height);
    const slider = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    useEffect(() => {
        const handleWheel = (event) => {
            event.preventDefault();
            let newValue;
            if (event.deltaY < 0) {
                //scrolling up
                if (value === max)
                    return; //value is at max
                //scroll faster holding shift
                event.shiftKey
                    ? (newValue = value + step * 4)
                    : (newValue = value + step);
                if (newValue > max)
                    newValue = max; //set newValue to max if it went over
            }
            else {
                //scrolling down
                if (value === min)
                    return; //value is at min
                //scroll faster holding shift
                event.shiftKey
                    ? (newValue = value - step * 4)
                    : (newValue = value - step);
                if (newValue < min)
                    newValue = min; //set newValue to min if it went over
            }
            if (newValue !== value) {
                onValueChange(newValue);
            }
        };
        const handleTouchStart = (event) => {
            var _a;
            if (event.cancelable) {
                event.preventDefault();
                event.stopPropagation();
            }
            const bounding = (_a = slider.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            let newValue = calculateSliderNewValue(event, min, max, barHeight, bounding);
            if (newValue !== value) {
                onValueChange(newValue);
            }
        };
        const handleTouchMove = (event) => {
            var _a;
            if (event.cancelable) {
                event.preventDefault();
            }
            const bounding = (_a = slider.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            let newValue = calculateSliderNewValue(event, min, max, barHeight, bounding);
            if (newValue !== value) {
                onValueChange(newValue);
            }
        };
        const handleMouseDown = (event) => {
            var _a;
            event.preventDefault();
            const bounding = (_a = slider.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            setIsDragging(true);
            let newValue = calculateSliderNewValue(event, min, max, barHeight, bounding);
            if (newValue !== value) {
                onValueChange(newValue);
            }
        };
        const handleMouseMove = (event) => {
            var _a;
            event.preventDefault();
            const bounding = (_a = slider.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (isDragging) {
                let newValue = calculateSliderNewValue(event, min, max, barHeight, bounding);
                if (newValue !== value) {
                    onValueChange(newValue);
                }
            }
        };
        const handleMouseUp = (event) => {
            event.preventDefault();
            if (isDragging) {
                setIsDragging(false);
            }
        };
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        if (slider) {
            const current = slider.current;
            if (current) {
                current.addEventListener("wheel", handleWheel);
                current.addEventListener("touchstart", handleTouchStart);
                current.addEventListener("touchmove", handleTouchMove);
                current.addEventListener("mousedown", handleMouseDown);
                return () => {
                    current.removeEventListener("wheel", handleWheel);
                    current.removeEventListener("touchstart", handleTouchStart);
                    current.removeEventListener("touchmove", handleTouchMove);
                    current.removeEventListener("mousedown", handleMouseDown);
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mouseup", handleMouseUp);
                };
            }
        }
    }, [min, max, onValueChange, step, value, isDragging]);
    return (<svg width={width} height={height} ref={slider} data-testid="slider">
      <path d={drawSliderTickCoordinates(barHeight, height, width)} stroke="white" strokeWidth={2}/>
      <rect x={middle - trackWidth / 2} y={0} width={trackWidth} height={trackHeight} fill="black" rx={6}/>
      <rect x={barCoordinates.x - barWidth / 2} y={barCoordinates.y} width={barWidth} height={barHeight} fill="black" rx={1}/>
      <line stroke="white" strokeWidth={2} x1={barCoordinates.x - barWidth / 2 + 2} y1={barCoordinates.y + barHeight / 2} x2={barCoordinates.x + barWidth / 2 - 2} y2={barCoordinates.y + barHeight / 2}/>
    </svg>);
};
export default memo(Slider);
