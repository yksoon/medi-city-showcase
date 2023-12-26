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
    const [institutionPaymentStatusInfo, setInstitutionPaymentStatusInfo] =
        useState([]);
    const [entryDutyInfo, setEntryDutyInfo] = useState([]);
    const [institutionTypeInfo, setInstitutionTypeInfo] = useState([]);

    useEffect(() => {
        console.log("111111111112222");
        Object.keys(dashboardInfo).length !== 0 && setDataFunc();
    }, [dashboardInfo]);

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

        // 직급
        entryPositionInfoFunc();

        // 참가상태
        institutionEntryStatusInfoFunc();

        // 결제상태
        institutionPaymentStatusInfoFunc();

        // 직책
        entryDutyInfoFunc();

        // 기관 타입
        institutionTypeInfoFunc();
    };

    // total
    const totalDataFunc = () => {
        const totalDataArr = [
            {
                id: 0,
                value: dashboardInfo.institution_total_count,
                label: "총 사전등록기관 수",
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

    // 직급
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

    // 참가상태
    const institutionEntryStatusInfoFunc = () => {
        const institutionEntryStatusInfoArr =
            dashboardInfo.institution_entry_status_info;
        const length = institutionEntryStatusInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: institutionEntryStatusInfoArr[i].institution_entry,
                value: institutionEntryStatusInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setInstitutionEntryStatusInfo(newArr);
    };

    // 결제상태
    const institutionPaymentStatusInfoFunc = () => {
        const institutionPaymentStatusInfoArr =
            dashboardInfo.institution_payment_status_info;
        const length = institutionPaymentStatusInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: institutionPaymentStatusInfoArr[i].institution_payment,
                value: institutionPaymentStatusInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setInstitutionPaymentStatusInfo(newArr);
    };

    // 직책
    const entryDutyInfoFunc = () => {
        const entryDutyInfoArr = dashboardInfo.entry_duty_info;
        const length = entryDutyInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: entryDutyInfoArr[i].entry_duty,
                value: entryDutyInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setEntryDutyInfo(newArr);
    };

    // 기관타입
    const institutionTypeInfoFunc = () => {
        const institutionTypeInfoArr = dashboardInfo.institution_type_info;
        const length = institutionTypeInfoArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            let newObj = {
                label: institutionTypeInfoArr[i].institution_type,
                value: institutionTypeInfoArr[i].count,
            };

            newArr.push(newObj);
        }
        setInstitutionTypeInfo(newArr);
    };

    return (
        <>
            {Object.keys(dashboardInfo).length !== 0 && (
                <>
                    <div style={{ display: "flex" }}>
                        {total.length !== 0 && (
                            <CommonBarChart
                                data={total}
                                width={550}
                                height={330}
                                title={"총 사전등록기관/참가자 수"}
                            />
                        )}

                        {genderInfo.length !== 0 && (
                            <CommonBarChart
                                data={genderInfo}
                                width={550}
                                height={330}
                                title={"성별"}
                            />
                        )}

                        {entryAgeInfo.length !== 0 && (
                            <CommonPieChart
                                data={entryAgeInfo}
                                width={550}
                                height={330}
                                title={"연령"}
                            />
                        )}
                    </div>
                    <div style={{ display: "flex" }}>
                        {institutionInfo.length !== 0 && (
                            <CommonBarChart
                                data={institutionInfo}
                                width={550}
                                height={330}
                                title={"참가기관"}
                            />
                        )}
                        {institutionEntryInfo.length !== 0 && (
                            <CommonPieChart
                                data={institutionEntryInfo}
                                width={550}
                                height={330}
                                title={"참가기관 (인원)"}
                            />
                        )}
                        {entryDutyInfo.length !== 0 && (
                            <CommonPieChart
                                data={entryDutyInfo}
                                width={550}
                                height={330}
                                title={"직책"}
                            />
                        )}
                    </div>
                    <div style={{ display: "flex" }}>
                        {institutionEntryStatusInfo.length !== 0 && (
                            <CommonBarChart
                                data={institutionEntryStatusInfo}
                                width={550}
                                height={330}
                                title={"참가 상태"}
                            />
                        )}
                        {institutionPaymentStatusInfo.length !== 0 && (
                            <CommonBarChart
                                data={institutionPaymentStatusInfo}
                                width={550}
                                height={330}
                                title={"결제 상태"}
                            />
                        )}
                        {institutionTypeInfo.length !== 0 && (
                            <CommonBarChart
                                data={institutionTypeInfo}
                                width={550}
                                height={330}
                                title={"기관타입"}
                            />
                        )}
                    </div>
                    <div style={{ display: "flex" }}>
                        {entryPositionInfo.length !== 0 && (
                            <CommonPieChart
                                data={entryPositionInfo}
                                width={550}
                                height={330}
                                margin={{
                                    top: 20,
                                    bottom: 60,
                                    left: 30,
                                    right: 30,
                                }}
                                title={"관심분야"}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default EntryManageChart;
