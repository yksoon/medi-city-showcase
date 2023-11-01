import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
);

const DashBoardChart = (props) => {
    const totalCountInfo = props.totalCountInfo;
    const [ageChartData, setAgeChartData] = useState({});
    const [organizationChartData, setOrganizationChartData] = useState({});
    const [departmentChartData, setDepartmentChartData] = useState({});
    const [specializedChartData, setSpecializedChartData] = useState({});
    const [additionalChartData, setAdditionalChartData] = useState({});

    useEffect(() => {
        setChartData(totalCountInfo);
    }, [totalCountInfo]);

    const setChartData = () => {
        if (Object.keys(totalCountInfo).length !== 0) {
            // 연령별
            setAgeChart(totalCountInfo.total_age_count);

            // 소속기관
            setOrganizationChart(totalCountInfo.total_organization_count);

            // 전공과
            setDepartmentChart(totalCountInfo.total_department_count);

            // 전공분야
            setSpecializedChart(totalCountInfo.total_specialized_count);

            // 참여프로그램
            setAdditionalChart(totalCountInfo.total_additional_count);
        }
    };

    // 연령별 차트
    const setAgeChart = (total_age_count) => {
        let ageTitleArr = [];
        let ageDataArr = [];
        let color = [];

        const length = total_age_count.length;
        for (let i = 0; i < length; i++) {
            ageTitleArr.push(total_age_count[i]["age"]);
            ageDataArr.push(total_age_count[i]["count"]);
            color.push(dynamicColors());
        }

        let data = {
            labels: ageTitleArr,
            datasets: [
                {
                    label: "# 등록 수",
                    data: ageDataArr,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                },
            ],
        };

        setAgeChartData(data);
    };

    // 소속기관
    const setOrganizationChart = (total_organization_count) => {
        let orgTitleArr = [];
        let orgDataArr = [];
        let color = [];

        const length = total_organization_count.length;
        for (let i = 0; i < length; i++) {
            orgTitleArr.push(total_organization_count[i]["organization_name"]);
            orgDataArr.push(total_organization_count[i]["count"]);
            color.push(dynamicColors());
        }

        let data = {
            labels: orgTitleArr,
            datasets: [
                {
                    label: "# 소속기관 수",
                    data: orgDataArr,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                },
            ],
        };

        setOrganizationChartData(data);
    };

    // 전공과
    const setDepartmentChart = (total_department_count) => {
        let dptTitleArr = [];
        let dptDataArr = [];
        let color = [];

        const length = total_department_count.length;
        for (let i = 0; i < length; i++) {
            dptTitleArr.push(total_department_count[i]["department_name"]);
            dptDataArr.push(total_department_count[i]["count"]);
            color.push(dynamicColors());
        }

        let data = {
            labels: dptTitleArr,
            datasets: [
                {
                    label: "# 전공과 수",
                    data: dptDataArr,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                },
            ],
        };

        setDepartmentChartData(data);
    };

    // 전공분야
    const setSpecializedChart = (total_specialized_count) => {
        let spcTitleArr = [];
        let spcDataArr = [];
        let color = [];

        const length = total_specialized_count.length;
        for (let i = 0; i < length; i++) {
            spcTitleArr.push(total_specialized_count[i]["specialized_name"]);
            spcDataArr.push(total_specialized_count[i]["count"]);
            color.push(dynamicColors());
        }

        let data = {
            labels: spcTitleArr,
            datasets: [
                {
                    label: "# 전공분야 수",
                    data: spcDataArr,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                },
            ],
        };

        setSpecializedChartData(data);
    };

    // 참여프로그램
    const setAdditionalChart = (total_additional_count) => {
        let addTitleArr = [];
        let addDataArr = [];
        let color = [];

        const length = total_additional_count.length;
        for (let i = 0; i < length; i++) {
            addTitleArr.push(total_additional_count[i]["additional_name"]);
            addDataArr.push(total_additional_count[i]["count"]);
            color.push(dynamicColors());
        }

        let data = {
            labels: addTitleArr,
            datasets: [
                {
                    label: "# 참여프로그램 수",
                    data: addDataArr,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                },
            ],
        };

        setAdditionalChartData(data);
    };

    // 차트 색깔
    const dynamicColors = () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ",0.6)";
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ width: "20%" }}>
                    {Object.keys(ageChartData).length !== 0 && (
                        <Pie
                            data={ageChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "연령별 등록 수",
                                        align: "center",
                                        padding: {
                                            top: 10,
                                            bottom: 10,
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                },
                            }}
                        />
                    )}
                </div>
                <div style={{ width: "20%" }}>
                    {Object.keys(organizationChartData).length !== 0 && (
                        <Pie
                            data={organizationChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "학교",
                                        align: "center",
                                        padding: {
                                            top: 10,
                                            bottom: 10,
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                },
                            }}
                        />
                    )}
                </div>
                <div style={{ width: "20%" }}>
                    {Object.keys(departmentChartData).length !== 0 && (
                        <Pie
                            data={departmentChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "학과",
                                        align: "center",
                                        padding: {
                                            top: 10,
                                            bottom: 10,
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                },
                            }}
                        />
                    )}
                </div>
                <div style={{ width: "20%" }}>
                    {Object.keys(specializedChartData).length !== 0 && (
                        <Pie
                            data={specializedChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "희망직종",
                                        align: "center",
                                        padding: {
                                            top: 10,
                                            bottom: 10,
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                },
                            }}
                        />
                    )}
                </div>
                <div style={{ width: "20%" }}>
                    {Object.keys(additionalChartData).length !== 0 && (
                        <Pie
                            data={additionalChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "참여프로그램",
                                        align: "center",
                                        padding: {
                                            top: 10,
                                            bottom: 10,
                                        },
                                    },
                                    legend: {
                                        display: true,
                                        position: "right",
                                    },
                                },
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DashBoardChart;
