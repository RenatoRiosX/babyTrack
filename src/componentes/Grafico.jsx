import React from "react";
import Chart from "react-apexcharts";

const Grafico = ({ datosEjeX, datosEjeY }) => {
  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: datosEjeX,
    },
  };

  const series = [
    {
      name: "series-1",
      data: datosEjeY,
    },
  ];

  return (
    <Chart
      className="grafico"
      options={options}
      series={series}
      type="bar"
      width={500}
      height={320}
    />
  );
};

export default Grafico;
