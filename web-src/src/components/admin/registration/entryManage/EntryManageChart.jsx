import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { CommonPieChart } from "common/js/Common";

const EntryManageChart = (props) => {
    const dashboardInfo = props.dashboardInfo;

    console.log(dashboardInfo);

    const [totalData, setTotalData] = useState([]);
    const [institutionInfoData, setInstitutionInfoData] = useState([]);

    useEffect(() => {
        Object.keys(dashboardInfo).length !== 0 && setDataFunc();
    }, []);

    const setDataFunc = () => {
        // total
        totalDataFunc();

        // 참가기관
        institutionInfoFunc();
    };

    // total
    const totalDataFunc = () => {
        const totalDataArr = [
            {
                id: 0,
                value: dashboardInfo.institution_total_count,
                label: "총 사전등록 수",
            },
            {
                id: 1,
                value: dashboardInfo.entry_total_count,
                label: "총 참가자 수",
            },
        ];
        setTotalData(totalDataArr);
    };

    // 참가기관
    const institutionInfoFunc = () => {
        const institutionEntryInfoArr = dashboardInfo.institution_entry_info;
        const length = institutionEntryInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: institutionEntryInfoArr[i].institution_name,
                value: institutionEntryInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setInstitutionInfoData(newArr);
    };

    return (
        <>
            <div>
                {totalData.length !== 0 && (
                    <CommonPieChart data={totalData} width={700} height={300} />
                )}
                {institutionInfoData.length !== 0 && (
                    <CommonPieChart
                        data={institutionInfoData}
                        width={700}
                        height={300}
                    />
                )}
            </div>
        </>
    );
};

export default EntryManageChart;
