//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FilterDisplay functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getXofFrequency = (freq, width) => {
    if (width <= 0) {
        throw new RangeError("width must be greater than 0");
    }
    let min_f = Math.log10(20);
    let max_f = Math.log10(20000);
    let range = max_f - min_f;
    return ((Math.log10(freq) - min_f) / range) * width;
};
export const getFrequencyOfX = (x, width) => {
    const min = 20;
    const max = 20000;
    return min * Math.pow(10, (x * Math.log10(max / min)) / width);
};
export const dbToY = (db, middle, pixelsPerDb) => {
    return middle - pixelsPerDb * db;
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Key functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const keyIsPressed = (note, octave, notesPlaying) => {
    return notesPlaying.includes(`${note}${octave}`);
};
export const keyIsSharp = (note) => {
    return note.length > 1;
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Knob and Slider functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const valueToPercentage = (value, min, max) => {
    return ((value - min) * 100) / (max - min);
};
export const percentageToValue = (percentage, min, max) => {
    return (percentage * (max - min)) / 100 + min;
};
export const polarToCartesian = (angle, radius, circleX, circleY) => {
    const a = ((angle - 270) * Math.PI) / 180.0;
    const x = circleX + radius * parseFloat(Math.cos(a).toFixed(3));
    const y = circleY + radius * parseFloat(Math.sin(a).toFixed(3));
    return { x, y };
};
export const cartesianToPolar = (x, y, circleX, circleY) => {
    return Math.round(Math.atan((y - circleY) / (x - circleX)) / (Math.PI / 180) +
        (x >= circleX ? 270 : 90));
};
export const drawKnobTickCoordinates = (radius, circleX, circleY) => {
    let tcs = new Array(7);
    for (let i = 1; i < 8; i += 1) {
        tcs[i - 1] = polarToCartesian(i * 45, radius, circleX, circleY);
    }
    let s = "";
    for (let i = 0; i < tcs.length; i += 1) {
        s += `M${circleX} ${circleY} L ${tcs[i].x} ${tcs[i].y} `;
    }
    return s;
};
export const drawSliderTickCoordinates = (barHeight, height, width) => {
    let tickY = new Array(7);
    for (let i = 0; i < tickY.length; i += 1) {
        tickY[i] = percentageToValue(valueToPercentage(i, 0, tickY.length - 1), barHeight / 2, height - barHeight / 2);
    }
    let s = "";
    for (let i = 0; i < tickY.length; i += 1) {
        s += `M${2} ${tickY[i]} L ${width - 2} ${tickY[i]} `;
    }
    return s;
};
export const getEndCoordinates = (value, min, max, minAngle, maxAngle, radius, circleX, circleY) => {
    const percentage = valueToPercentage(value, min, max);
    const angle = percentageToValue(percentage, minAngle, maxAngle);
    return polarToCartesian(angle, radius - 7, circleX, circleY);
};
export const getBarCoordinates = (value, middle, min, max, barHeight, height) => {
    const percentage = valueToPercentage(value, min, max);
    const x = middle;
    const y = percentageToValue(percentage, height - barHeight, 0);
    return { x, y };
};
export const calculateKnobNewValue = (event, min, max, circleX, circleY, minAngle, maxAngle, bounding) => {
    //initialize empty relative coords
    let relativeCoords = { x: 0, y: 0 };
    //if event is a MouseEvent
    if ("clientX" in event) {
        if (bounding)
            //calculate mouse coordinates relative to the parent SVG
            relativeCoords = {
                x: event.clientX - bounding.x,
                y: event.clientY - bounding.y,
            };
    } /*if event is a TouchEvent*/
    else {
        if (bounding)
            //calculate mouse coordinates relative to the parent SVG
            relativeCoords = {
                x: event.touches[0].clientX - bounding.x,
                y: event.touches[0].clientY - bounding.y,
            };
    }
    //convert relative mouse coordinates to polar angle
    let polar = cartesianToPolar(relativeCoords.x, relativeCoords.y, circleX, circleY);
    //convert polar angle to value
    let percentage = valueToPercentage(polar, minAngle, maxAngle);
    let newValue = percentageToValue(percentage, min, max);
    if (newValue > max)
        newValue = max;
    if (newValue < min)
        newValue = min;
    return newValue;
};
export const calculateSliderNewValue = (event, min, max, barHeight, bounding) => {
    let relativeY = 0;
    if ("clientY" in event) {
        if (bounding)
            //calculate mouse y relative to the parent SVG
            relativeY = event.clientY - bounding.y;
    }
    else {
        if (bounding)
            relativeY = event.touches[0].clientY - bounding.y;
    }
    //convert y coordinate to value
    let percentage = valueToPercentage(relativeY, 100 - barHeight / 2, 0 + barHeight / 2);
    let newValue = percentageToValue(percentage, min, max);
    if (newValue > max)
        newValue = max;
    if (newValue < min)
        newValue = min;
    return newValue;
};
