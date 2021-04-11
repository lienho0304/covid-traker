
import numeral from "numeral";

import "./Map.css";

export const makePrettyer =(number) => {

  return number?numeral(number).format('+0,000'):'0'
}
export const makePrettyer2 =(number) => {

  return number?numeral(number).format('0,000'):'0'
}

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};
