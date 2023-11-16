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
        setTotalData(totalDataArr);
    };

    const size = {
        width: 500,
        height: 300,
    };

    return (
        <>
            <div>
                {/*<PieChart*/}
                {/*    series={[*/}
                {/*        {*/}
                {/*            arcLabel: (item) => `${item.label} (${item.value})`,*/}
                {/*            arcLabelMinAngle: 45,*/}
                {/*            totalData,*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*    sx={{*/}
                {/*        [`& .${pieArcLabelClasses.root}`]: {*/}
                {/*            fill: "white",*/}
                {/*            fontWeight: "bold",*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    {...size}*/}
                {/*/>*/}
            </div>
        </>
    );
};

export default EntryManageChart;
