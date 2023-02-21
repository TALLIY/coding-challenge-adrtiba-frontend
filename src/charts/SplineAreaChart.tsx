import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ISplineAreaChartProps } from "../constants/types/components";

const SplineAreaChart: React.FunctionComponent<ISplineAreaChartProps> = (
  props
) => {
  const [state, setState] = useState<any>({
    series: props.series,
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      title: {
        text: props.title,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: props.categories,
      },
      yaxis: {
        decimalsInFloat: 3,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default SplineAreaChart;
