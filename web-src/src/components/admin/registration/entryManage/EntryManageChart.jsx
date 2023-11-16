import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { CommonBarChart, CommonPieChart } from "common/js/Common";

const EntryManageChart = (props) => {
    const dashboardInfo = props.dashboardInfo;

    console.log(dashboardInfo);

    const [total, setTotal] = useState([]);
    const [institutionInfo, setInstitutionInfo] = useState([]);
    const [institutionEntryInfo, setInstitutionEntryInfo] = useState([]);
    const [genderInfo, setGenderInfo] = useState([]);
    const [entryPositionInfo, setEntryPositionInfo] = useState([]);
    const [entryAgeInfo, setEntryAgeInfo] = useState([]);
    const [institutionEntryStatusInfo, setInstitutionEntryStatusInfo] =
        useState([]);

    useEffect(() => {
        Object.keys(dashboardInfo).length !== 0 && setDataFunc();
    }, []);

    const setDataFunc = () => {
        // total
        totalDataFunc();

        // 참가기관
        institutionInfoFunc();

        // 참가기관 인원별
        institutionEntryInfoFunc();

        // 성별
        genderInfoFunc();

        // 연령
        entryAgeInfoFunc();

        // 직책
        entryPositionInfoFunc();
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
        setTotal(totalDataArr);
    };

    // 성별
    const genderInfoFunc = () => {
        const entryGenderInfoArr = dashboardInfo.entry_gender_info;
        const length = entryGenderInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: entryGenderInfoArr[i].entry_gender,
                value: entryGenderInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setGenderInfo(newArr);
    };

    // entry_age_info
    // 연령
    const entryAgeInfoFunc = () => {
        const entryAgeInfoArr = dashboardInfo.entry_age_info;
        const length = entryAgeInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: entryAgeInfoArr[i].entry_age,
                value: entryAgeInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setEntryAgeInfo(newArr);
    };

    // 참가기관
    const institutionInfoFunc = () => {
        const institutionInfoArr = dashboardInfo.institution_info;
        const length = institutionInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: institutionInfoArr[i].institution_name,
                value: institutionInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setInstitutionInfo(newArr);
    };

    // 참가기관 인원별
    const institutionEntryInfoFunc = () => {
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
        setInstitutionEntryInfo(newArr);
    };

    // 직책
    const entryPositionInfoFunc = () => {
        const entryPositionInfoArr = dashboardInfo.entry_position_info;
        const length = entryPositionInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: entryPositionInfoArr[i].entry_position,
                value: entryPositionInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setEntryPositionInfo(newArr);
    };

    return (
        <>
            <div style={{ display: "flex" }}>
                {total.length !== 0 && (
                    <CommonPieChart
                        data={total}
                        width={550}
                        height={300}
                        title={"총 사전등록/참가자 수"}
                    />
                )}

                {genderInfo.length !== 0 && (
                    <CommonBarChart
                        data={genderInfo}
                        width={550}
                        height={300}
                        title={"성별"}
                    />
                )}

                {entryAgeInfo.length !== 0 && (
                    <CommonPieChart
                        data={entryAgeInfo}
                        width={550}
                        height={300}
                        title={"연령"}
                    />
                )}
            </div>
            <div style={{ display: "flex" }}>
                {institutionInfo.length !== 0 && (
                    <CommonPieChart
                        data={institutionInfo}
                        width={550}
                        height={300}
                        title={"참가기관"}
                    />
                )}
                {institutionEntryInfo.length !== 0 && (
                    <CommonPieChart
                        data={institutionEntryInfo}
                        width={550}
                        height={300}
                        title={"참가기관 (인원)"}
                    />
                )}
                {entryPositionInfo.length !== 0 && (
                    <CommonPieChart
                        data={entryPositionInfo}
                        width={550}
                        height={300}
                        title={"직급"}
                    />
                )}
            </div>
            <div style={{ display: "flex" }}></div>
        </>
    );
};

export default EntryManageChart;
