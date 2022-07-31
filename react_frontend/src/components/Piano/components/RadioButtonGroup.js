import { memo } from "react";
import RadioButton from "./RadioButton";
const RadioButtonGroup = ({ items, id, comparator, buttonSize, onValueChange, }) => {
    return (<>
      {items.map((item) => {
            return (<RadioButton key={`${id}${item}`} name={id} value={item} selected={comparator === item} size={buttonSize} onValueChange={onValueChange}/>);
        })}
    </>);
};
export default memo(RadioButtonGroup);
