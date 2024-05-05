
import React from "react";
import "../style/modal.css";



const Modal = ({ img, resume, genre, title }) => {
  return (
    <div className="Infos-modal">

      <img src={img}></img>
    
      <ul>
        <li>
          <span>{genre}</span>
        </li>
        <li>
          <h3>{title}</h3>
        </li>
        <li>
          <p> {resume}</p>
        </li>
      </ul>
    </div>
  );
};




export default Modal;
