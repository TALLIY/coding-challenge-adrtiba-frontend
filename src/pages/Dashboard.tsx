import { Console } from "console";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { Navigation } from "../components";
import api from "../services/api";
import SplineAreaChart from "../charts/SplineAreaChart";

const Dashboard: React.FunctionComponent<{}> = (props) => {
  const [state, setState] = useState<any>({});
  const [sources, setSources] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [baseline, setBaseline] = useState<string[]>([]);
  const [incrementality, setIncrementality] = useState<string[]>([]);
  const { source } = useParams();

  useEffect(() => {
    //since only one api and one page is needed for the solution I directly defined it here
    let result = async () => {
      setState(
        await fetch("http://127.0.0.1:5000")
          .then((res) => res.json())
          .catch((err) => console.log(err))
      );
    };
    result();
  }, []);

  useEffect(() => {
    setSources(
      state.results
        ?.map((e: any) => e.source)
        .filter(
          (value: any, index: number) =>
            state.results.map((e: any) => e.source).indexOf(value) === index
        )
    );
    setDates(
      state.results
        ?.filter(
          (value: any) =>
            value.source === source &&
            value.optimisation_target === "conversions"
        )
        .map((value: any) => value.date)
    );
    console.log(
      state.results
        ?.filter(
          (value: any) =>
            value.source === source &&
            value.optimisation_target === "conversions"
        )
        .map((value: any) => value.date)
    );
    setBaseline(
      state.results?.filter(
        (value: any) => value.source === source && value.type === "baseline"
      )
    );
    setIncrementality(
      state.results?.filter(
        (value: any) =>
          value.source === source && value.type === "incrementality"
      )
    );
  }, [state]);

  return (
    <Navigation drawerItems={sources} title={source}>
      {baseline?.length !== 0 && baseline && (
        <div>
          <SplineAreaChart
            title="Attributed Conversions optimizing for conversions"
            categories={dates}
            series={[
              {
                name: "baseline",
                data: baseline
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) => value.attributed_conversions),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Revenue optimizing for conversions"
            categories={dates}
            series={[
              {
                name: "baseline",
                data: baseline
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) => value.attributed_revenue),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Conversions optimizing for revenue"
            categories={dates}
            series={[
              {
                name: "baseline",
                data: baseline
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) => value.attributed_conversions),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Revenue optimizing for revenue"
            categories={dates}
            series={[
              {
                name: "baseline",
                data: baseline
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) => value.attributed_revenue),
              },
            ]}
          />
        </div>
      )}

      {incrementality?.length !== 0 && incrementality && (
        <div>
          <SplineAreaChart
            title="Attributed Conversions optimizing for conversions"
            categories={dates}
            series={[
              {
                name: "incrementality",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) => value.attributed_conversions),
              },
              {
                name: "conversions per amount spent * 100",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) =>
                    value.spends
                      ? (100 * value.attributed_conversions) / value.spends
                      : 0
                  ),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Revenue optimizing for conversions"
            categories={dates}
            series={[
              {
                name: "incrementality",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) => value.attributed_revenue),
              },
              {
                name: "revenue per amount spent * 100",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "conversions"
                  )
                  .map((value: any) =>
                    value.spends
                      ? (100 * value.attributed_revenue) / value.spends
                      : 0
                  ),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Conversions optimizing for revenue"
            categories={dates}
            series={[
              {
                name: "incrementality",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) => value.attributed_conversions),
              },
              {
                name: "conversions per amount spent * 100",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) =>
                    value.spends
                      ? (100 * value.attributed_conversions) / value.spends
                      : 0
                  ),
              },
            ]}
          />
          <SplineAreaChart
            title="Attributed Revenue optimizing for revenue"
            categories={dates}
            series={[
              {
                name: "incrementality",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) => value.attributed_revenue),
              },
              {
                name: "revenue per amount spent * 100",
                data: incrementality
                  ?.filter(
                    (value: any) => value.optimisation_target === "revenue"
                  )
                  .map((value: any) =>
                    value.spends
                      ? (100 * value.attributed_revenue) / value.spends
                      : 0
                  ),
              },
            ]}
          />
        </div>
      )}
    </Navigation>
  );
};

export default Dashboard;
