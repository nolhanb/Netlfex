import React from "react";

function convertDate(date_str) {
  const date = new Date(date_str);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const date_locale = date.toLocaleDateString("en-US", options);
  return date_locale;
}

function ShowDate({ date }) {
  const dateConvertie = convertDate(date);
  return <div>{dateConvertie}</div>;
}

export default ShowDate;
