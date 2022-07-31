import React from "react";
import { defaults } from "../presets";
export const OptionsContext = React.createContext({
    options: defaults,
    setOptions: (options) => { },
});
