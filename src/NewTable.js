import React from "react";

function NewTable(countries) {
  return (
    <div className="table">
      <table>
        {countries.countries.map(({ country, cases }, key) => (
          <tr key={key}>
            <td>{country}</td>
            <td>
              <strong>{cases}</strong>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default NewTable;
