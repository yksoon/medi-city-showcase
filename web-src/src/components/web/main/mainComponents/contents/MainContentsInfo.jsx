import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { viewScheduleAtom } from "recoils/atoms";

const MainContentsInfo = () => {
    const viewSchedule = useRecoilValue(viewScheduleAtom);
    const [date, setDate] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [spot, setSpot] = useState("");

    useEffect(() => {
        parseSchedule();
    }, [viewSchedule]);

    const parseSchedule = () => {
        if (Object.keys(viewSchedule).length !== 0) {
            setDate(viewSchedule.start_date.replace("-", "."));
            setDayOfWeek(viewSchedule.start_week);

            let startTimeArr = viewSchedule.start_time.split(":");
            setStartTime(startTimeArr[0] + ":" + startTimeArr[1]);

            let endTimeArr = viewSchedule.end_time.split(":");
            setEndTime(endTimeArr[0] + ":" + endTimeArr[1]);

            setSpot(viewSchedule.spot);
        }
    };

    return (
        <>
            <div className="section01">
                <h3 data-aos="fade-up">
                    <span>2023 잡아라 페스티벌</span>에 당신을 초대합니다!
                </h3>
                <p className="txt">
                    LINC 3.0 사업단에서 도내 청년 및 재학생을 대상으로 양질의
                    취업처 및 성공 취업을 위해 맞춤형 취업 정보 제공하는 다양한
                    프로그램으로 여러분을 기다립니다!
                </p>
                <ul>
                    <li className="c01">
                        <span>행사명</span>2023 잡아라 페스티벌
                    </li>
                    <li className="c02">
                        <span>장 소</span>
                        {spot}
                    </li>
                    <li className="c03">
                        <span>일 시</span>
                        {date ? (
                            <>
                                {date} ({dayOfWeek}) {startTime} ~ {endTime}
                            </>
                        ) : (
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "1rem",
                                    textAlign: "center",
                                }}
                                width={300}
                            />
                        )}
                    </li>
                    <li className="c04">
                        <span>문 의</span>LINC3.0사업단 이수민 064-754-4470
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MainContentsInfo;
