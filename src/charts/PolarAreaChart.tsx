import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IPolarAreaChartProps } from "../constants/types/components";

const PolarAreaChart: React.FunctionComponent<IPolarAreaChartProps> = (
  props
) => {
  const [state, setState] = useState<any>({
    series: props.series,
    options: {
      chart: {
        with: "70%",
        type: "polarArea",
      },
      labels: props.labels,
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      title: {
        text: props.title,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="polarArea"
      />
    </div>
  );
};

export default PolarAreaChart;
