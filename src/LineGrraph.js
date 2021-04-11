import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

function LineGrraph({typeCases}) {
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const newdata = [];
  const labels = [];

  for (let date in data[typeCases]) {
    labels.push(date);
    newdata.push(data[typeCases][date]);
  }

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRadio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes :[
        {
          gridLines:{
            display:false,
          },
          ticks:{
            callback:function (value,index,values) {
              return numeral(value).format("0a")
            }
          }
        }
      ]
    },
  };

  const dataForChart = (canvas) => {

    return {
      backgroundColor:'red',
      labels,
      datasets: [
        { 
          backgroundColor:'green',
         
          label: "# of Votessasddddddddddddddddddddddd",
          data: newdata,
          borderWidth: 3,
          fill: false,
          borderColor: "green",
        },
      ],
    };
  };

  return (
    <div>
      <Line data={dataForChart} options={options} />
    </div>
  );
}

export default LineGrraph;

