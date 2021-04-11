import React from "react";
import { makePrettyer2 } from "./utils";

function NewTable(countries) {
  return (
    <div className="table">
      <table>
        {countries.countries.map(({ country, cases }, key) => (
          <tbody key={key}>
          <tr >
            <td>{country}</td>
            <td>
              <strong>{makePrettyer2(cases)}</strong> 
          
            </td>
          </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default NewTable;
