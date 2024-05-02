import React from "react";
import { Link } from "react-router-dom";
import Détails from "../pages/FilmsDetails";

const Header = () => {
  return (
    <header>

      <div className="wrapper header">
        <Link to={"/"}>
          <li>NETFLEX</li>
        </Link>
      </div>
    </header>
  );
};
export default Header;
