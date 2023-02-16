import React from "react";

const padTo2Digits = (num) => num.toString().padStart(2, "0");

const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(".");
};

export default formatDate;
