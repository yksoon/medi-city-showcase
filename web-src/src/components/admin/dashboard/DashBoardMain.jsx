import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonErrorCatch,
    CommonRest,
} from "common/js/Common";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPath } from "webPath";
import DashBoardChart from "./components/DashBoardChart";
import axios from "axios";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { successCode } from "resultCode";
import { commaOfNumber } from "common/js/Pattern";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    ipInfoAtom,
    isSpinnerAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "recoils/atoms";

const DashBoardMain = (props) => {
    // const { alert } = useAlert();
    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);
    // const err = { dispatch, alert, resetUserInfoAdmin, resetUserTokenAdmin };

    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();
    const fileBaseUrl = apiPath.api_file;

    // const userTokenAdmin = useSelector(
    //     (state) => state.userInfoAdmin.userTokenAdmin
    // );
    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);

    // const ip = useSelector((state) => state.ipInfo.ipInfo);
    const ip = useRecoilValue(ipInfoAtom);

    const [totalCountInfo, setTotalCountInfo] = useState({});
    const [totalListInfo, setTotalListInfo] = useState([]);
    const [additionalList, setAdditionalList] = useState([]);
    // const [excelPath, setExcelPath] = useState("");

    const isRefresh = props.isRefresh;

    useEffect(() => {
        if (userTokenAdmin) {
            getAdditional();
            getDashboard();
        }
    }, [isRefresh]);

    // 참여프로그램 리스트 받아오기
    const getAdditional = () => {
        // /v1/meta/_additionals
        // GET
        const restParams = {
            method: "get",
            url: apiPath.api_get_additional,
            data: {},
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            console.log(res);

            const result_code = res.headers.result_code;
            // 성공
            if (result_code === successCode.success) {
                let result_info = res.data.result_info;

                setAdditionalList(result_info);
            } else {
                // 에러
                CommonConsole("log", res);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);
            }
        };
    };

    // 대시보드
    const getDashboard = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        // 대시보드
        // /v1/dashboard
        // POST
        const restParams = {
            method: "post",
            url: apiPath.api_admin_dashboard, // /v1/_user
            data: {
                file_download_yn: "N",
            },
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            const resultCode = res.headers.result_code;

            if (resultCode === successCode.success) {
                const resultInfo = res.data.result_info;

                // console.log("###############", res);

                // 통계 카운트 인포
                setTotalCountInfo(resultInfo.total_count_info);

                // 리스트 인포
                setTotalListInfo(resultInfo.total_list_info);

                // downloadExcel();

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);
            }
        };
    };

    const downloadExcel = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        // 대시보드
        // /v1/dashboard
        // POST
        // !!!!!!!!!!!!! 엑셀 다운로드만 blob으로 response를 받아야하기때문에 rest 함수 사용하지 않고 따로 axios로 호출
        axios({
            method: "POST",
            url: apiPath.api_admin_dashboard,
            responseType: "blob",
            headers: {
                "Content-Type": "application/json",
                "Jobara-Token": userTokenAdmin,
                "Jobara-Src": ip,
            },
            data: {
                file_download_yn: "Y",
            },
        })
            .then((response) => {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);

                console.log(response);

                // window 객체의 createObjuctURL을 이용해서 blob:http://~~~ 식의 url을 만들어 준다.
                const url = window.URL.createObjectURL(
                    // Blob은 배열 객체 안의 모든 데이터를 합쳐 blob으로 반환하기 때문에 []안에 담는다!
                    new Blob([response.data], {
                        type: response.headers["content-type"],
                    })
                );

                // link 안에 위에서 만든 url을 가지고 있는 a 태그를 만들고 보이지 않도록 해준다.
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", excelName());
                document.body.appendChild(link);
                link.style.display = "none";
                link.click();
            })
            .catch((error) => {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);

                CommonErrorCatch(
                    error,
                    // dispatch,
                    setIsSpinner,
                    alert,
                    resetUserInfoAdmin,
                    resetUserTokenAdmin
                );
            });
    };

    // 엑셀 이름
    const excelName = () => {
        const now = new Date();
        const year = String(now.getFullYear());

        let month = String(now.getMonth() + 1);
        if (month.length === 1) {
            month = "0" + month;
        }

        let day = String(now.getDate());
        if (day.length === 1) {
            day = "0" + day;
        }

        const nowDate = `${year}${month}${day}`;

        const xlsName = `${nowDate}_잡아라_통계자료`;

        return xlsName;
    };

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>대시보드</h3>
                </div>
                <div className="con_area">
                    <div className="adm_search">
                        <div></div>
                        <div>
                            {/* {excelPath && ( */}
                            <Link
                                className="btn btn01"
                                title="#memberInsert"
                                onClick={downloadExcel}
                            >
                                엑셀 다운로드
                            </Link>
                            {/* )} */}
                        </div>
                    </div>

                    {/* 표영역 */}
                    <div style={{ marginTop: 20 }}>
                        <table className="table_a">
                            <colgroup>
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>총 사전등록 수</th>
                                </tr>
                                <tr>
                                    <td>
                                        {Object.keys(totalCountInfo).length !==
                                            0 &&
                                            String(
                                                totalCountInfo.total_registration_count
                                            ).replace(commaOfNumber, ",")}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* 표영역 END */}
                    {/* 차트영역 */}
                    <DashBoardChart totalCountInfo={totalCountInfo} />
                    {/* 차트영역 END */}

                    {totalListInfo.length !== 0 && (
                        <div className="adm_table">
                            <table className="table_a">
                                <colgroup>
                                    {/* <col width="4%" /> */}
                                    <col width="6%" />
                                    <col width="5%" />
                                    <col width="6%" />
                                    <col width="7%" />
                                    <col width="8%" />
                                    <col width="8%" />
                                    <col width="8%" />
                                    <col width="6%" />
                                    <col width="6%" />
                                    <col width="6%" />
                                    <col width="6%" />
                                    <col width="6%" />
                                    <col width="6%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        {/* <th rowSpan="2">고유번호</th> */}
                                        <th rowSpan="2">ID</th>
                                        <th rowSpan="2">이름</th>
                                        <th rowSpan="2">연락처</th>
                                        <th rowSpan="2">생년월일</th>
                                        <th rowSpan="2">학교</th>
                                        <th rowSpan="2">학과</th>
                                        <th rowSpan="2">희망직종</th>
                                        <th
                                            colSpan={`${additionalList.length}`}
                                        >
                                            참여프로그램
                                        </th>
                                        <th rowSpan="2">등록일</th>
                                        <th rowSpan="2">이력서 보기</th>
                                    </tr>
                                    <tr>
                                        {additionalList.map((item, idx) => (
                                            <th
                                                key={`admin_additional_${idx}`}
                                                style={{
                                                    borderRight:
                                                        "1px solid #ddd",
                                                }}
                                            >
                                                {item.additional_name_ko}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalListInfo &&
                                        totalListInfo.map((item, idx) => (
                                            <tr key={`list_${idx}`}>
                                                {/* <td>{item.user_key}</td> */}
                                                <td>{item.user_id}</td>
                                                <td>{item.user_name_ko}</td>
                                                <td>{`${item.mobile1}-${item.mobile2}-${item.mobile3}`}</td>
                                                <td>
                                                    {item.birth_yyyy === null
                                                        ? "-"
                                                        : `${item.birth_yyyy}-${item.birth_mm}-${item.birth_dd}`}
                                                </td>
                                                <td>
                                                    {item.organization_name_ko
                                                        ? item.organization_name_ko
                                                        : "-"}
                                                </td>
                                                <td>
                                                    {item.department_name_ko
                                                        ? item.department_name_ko
                                                        : "-"}
                                                </td>
                                                <td>
                                                    {item.specialized_name_ko
                                                        ? item.specialized_name_ko
                                                        : "-"}
                                                </td>
                                                {additionalList.map(
                                                    (item2, idx2) => (
                                                        <td
                                                            className="checkicon"
                                                            key={`add_chk_${idx2}`}
                                                        >
                                                            {item.additional_info.filter(
                                                                (e) =>
                                                                    e.additional_idx ===
                                                                    item2.additional_idx
                                                            ).length !== 0 ? (
                                                                <CheckCircleOutlineOutlinedIcon />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </td>
                                                    )
                                                )}
                                                <td>
                                                    {item.reg_dttm
                                                        ? item.reg_dttm.split(
                                                              " "
                                                          )[0]
                                                        : "-"}
                                                </td>
                                                <td className="filebtn">
                                                    {item.file_info !== 0 &&
                                                        item.file_info.map(
                                                            (item2, idx2) => (
                                                                <Link
                                                                    to={`${fileBaseUrl}${item2.file_path_enc}`}
                                                                    key={`file_${idx2}`}
                                                                >
                                                                    <img
                                                                        src="img/common/file.svg"
                                                                        alt={
                                                                            item2.file_name
                                                                        }
                                                                        title={
                                                                            item2.file_name
                                                                        }
                                                                    />
                                                                </Link>
                                                            )
                                                        )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashBoardMain;
