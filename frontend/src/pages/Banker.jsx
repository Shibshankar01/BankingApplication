import React from "react";
import { useLocation } from "react-router-dom";

const Banker = () => {

    const {state} = useLocation()

    console.log(state);
    return (
        <div>Banker page</div>
    )
}

export default Banker