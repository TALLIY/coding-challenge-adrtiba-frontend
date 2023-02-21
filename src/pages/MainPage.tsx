import { Console } from "console";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { Navigation } from "../components";
import api from "../services/api";
import PolarAreaChart from "../charts/PolarAreaChart";

const MainPage: React.FunctionComponent<{}> = (props) => {
  const [state, setState] = useState<any>({});
  const [sources, setSources] = useState<string[]>([]);
  const [conversionsPerSource, setConversionsPerSource] = useState<any>([]);
  const [revenuePerSource, setReveuePerSource] = useState<any>([]);

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
            state.results?.map((e: any) => e.source).indexOf(value) === index
        )
    );

    setReveuePerSource(
      state.results
        ?.filter((value: any) => value.source)
        .map((e: any) => e.source)
    );

    setConversionsPerSource(
      state.results
        ?.map((e: any) => e.source)
        .filter(
          (value: any, index: number) =>
            state.results?.map((e: any) => e.source).indexOf(value) === index
        )
    );

    const result_conversions = state.results
      ?.map((value: any) => ({
        source: value.source,
        attributed_conversions: value.attributed_conversions,
      }))
      .reduce((acc: any, curr: any) => {
        const { source, attributed_conversions } = curr;
        acc[source] = (acc[source] || 0) + attributed_conversions;
        return acc;
      }, {});
    setConversionsPerSource(result_conversions);

    const result_revenue = state.results
      ?.map((value: any) => ({
        source: value.source,
        attributed_revenue: value.attributed_revenue,
      }))
      .reduce((acc: any, curr: any) => {
        const { source, attributed_revenue } = curr;
        acc[source] = (acc[source] || 0) + attributed_revenue;
        return acc;
      }, {});
    setReveuePerSource(result_revenue);
  }, [state]);

  return (
    <Navigation
      drawerItems={sources}
      title="Open the drawer for more detailed vizualisations!"
    >
      <div
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      ></div>
      <div
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {conversionsPerSource && (
            <PolarAreaChart
              series={Object.values(conversionsPerSource)}
              title="Conversions per source"
              labels={sources?.map((value: any) => value.replace(/_/g, " "))}
            />
          )}
        </div>
        <div
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {revenuePerSource && (
            <PolarAreaChart
              series={Object.values(revenuePerSource)}
              title="Revenue per source"
              labels={sources?.map((value: any) => value.replace(/_/g, " "))}
            />
          )}
        </div>
      </div>
    </Navigation>
  );
};

export default MainPage;
