import React from "react";

interface G {
    a: number;
    b: string;
}

const g = React.createContext<G>({
    a: undefined,
    b: undefined,
});
export default g;
