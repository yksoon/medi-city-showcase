import React, { useEffect, useState } from "react";
import { BarChart, pieArcLabelClasses, PieChart } from "@mui/x-charts";

const EntryManageChart = (props) => {
    const dashboardInfo = props.dashboardInfo;

    const [totalData, setTotalData] = useState([]);

    useEffect(() => {
        Object.keys(dashboardInfo).length !== 0 && setDataFunc();
    }, []);

    const setDataFunc = () => {
        const totalDataArr = [
            {
                value: Number(dashboardInfo.institution_total_count),
                label: "총 사전등록 수",
            },
            {
                value: Number(dashboardInfo.entry_total_count),
                label: "총 참가자 수",
            },
        ];
        console.log(totalDataArr);
        setTotalData(totalDataArr);
    };

    const size = {
        width: 500,
        height: 300,
    };

    return (
        <>
            <div>
                {/*{totalData.length !== 0 && (*/}
                {/*    <PieChart*/}
                {/*        series={[*/}
                {/*            {*/}
                {/*                totalData,*/}
                {/*                highlightScope: {*/}
                {/*                    faded: "global",*/}
                {/*                    highlighted: "item",*/}
                {/*                },*/}
                {/*                faded: {*/}
                {/*                    innerRadius: 30,*/}
                {/*                    additionalRadius: -30,*/}
                {/*                    color: "gray",*/}
                {/*                },*/}
                {/*            },*/}
                {/*        ]}*/}
                {/*        height={200}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </>
    );
};

export default EntryManageChart;
