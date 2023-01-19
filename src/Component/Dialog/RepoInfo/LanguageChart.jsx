import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import Loading from "../../Common/Loading";
import NoData from "../../Common/NoData";

const LanguageChart = ({ getLanguagesResult }) => {
    // 차트 값
    const [series, setSeries] = useState([]);

    // 차트 설정
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (getLanguagesResult.isLoading) return;

        if (getLanguagesResult.data) {
            const { data } = getLanguagesResult;

            const tempSeries = [];
            const tempLabels = [];
            for (const language in data) {
                tempSeries.push(data[language]);
                tempLabels.push(language);
            }

            setSeries(tempSeries.slice(0, 5));
            setOptions({
                chart: {
                    width: 400,
                    height: 400,
                    type: "pie",
                },
                labels: tempLabels.slice(0, 5),
                fill: {
                    opacity: 1,
                },
                stroke: {
                    width: 1,
                    colors: undefined,
                },
                yaxis: {
                    show: false,
                },
                legend: {
                    position: "bottom",
                },
            });
        }
    }, [getLanguagesResult]);

    return (
        <LanguageChartBlock>
            <Typography variant="h5" color="text.primary">
                Languages
            </Typography>
            {getLanguagesResult.isLoading ? (
                <Loading />
            ) : (
                <>
                    {Object.keys(getLanguagesResult.data).length > 0 ? (
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="pie"
                        />
                    ) : (
                        <NoData />
                    )}
                </>
            )}
        </LanguageChartBlock>
    );
};

const LanguageChartBlock = styled.div`
    position: relative;
    width: 400px;
    min-height: 300px;

    margin-top: 20px;
`;
export default LanguageChart;
