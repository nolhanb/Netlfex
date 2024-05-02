import React from "react";
import { Link } from "react-router-dom";
import Détails from "./FilmsDetails";

function Entrance () {
    return (
        <div>
        <Link to={"/a" }>
        <li>NETFLEX</li>
        </Link>
        </div>
    )
}

export default Entrance;