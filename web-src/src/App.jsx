import React, { useEffect } from "react";
import { apiPath } from "webPath";
import { RestServer } from "common/js/Rest";
import axios from "axios";
import Router from "Router";
import { useLocation, useNavigate } from "react-router";
import { ConfirmContextProvider } from "context/ContextProvider";
import { AlertContextProvider } from "context/ContextProvider";
import ConfirmModal from "common/js/commonNoti/ConfirmModal";
import AlertModal from "common/js/commonNoti/AlertModal";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    checkScheduleAtom,
    codesAtom,
    countryBankAtom,
    ipInfoAtom,
    registrationInfoAtom,
    resultCodeAtom,
    userInfoAtom,
    userTokenAtom,
    viewScheduleAtom,
} from "recoils/atoms";
import Aos from "aos";
import { registration_idx } from "common/js/static";
import { CommonNotify, CommonRest } from "common/js/Common";
import { successCode } from "resultCode";

let currentPath = "";
function App() {
    useEffect(() => {
        Aos.init();
    });
    // let ipInfo = useSelector((state) => state.ipInfo.ipInfo);
    const [ipInfo, setIpInfo] = useRecoilState(ipInfoAtom);

    // const ipInfo = useRecoilValue(ipInfoAtom);
    // const setIpInfo = useSetRecoilState(ipInfoAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const resetUserInfo = useResetRecoilState(userInfoAtom);
    const resetUserToken = useResetRecoilState(userTokenAtom);

    const userToken = useRecoilValue(userTokenAtom);
    // const userToken = useSelector((state) => state.userInfo.userToken);
    // const userInfo = useSelector((state) => state.userInfo.userInfo);

    const setResultCode = useSetRecoilState(resultCodeAtom);
    const setCodes = useSetRecoilState(codesAtom);
    const setCountryBank = useSetRecoilState(countryBankAtom);
    const setViewSchedule = useSetRecoilState(viewScheduleAtom);
    const setCheckSchedule = useSetRecoilState(checkScheduleAtom);
    const setRegistrationInfo = useSetRecoilState(registrationInfoAtom);

    useEffect(() => {
        if (ipInfo === "") {
            getIpInfo();
        } else {
            getResultCode();
            getCodes();
            getCountryBank();
            getRegistrationInfo();
            setInterval(getResultCode, 3600000);
            setInterval(getCodes, 3600000);
        }
    }, []);

    // 사전등록 페이지 벗어날 시 로그아웃처리
    useEffect(() => {
        const pathname = location.pathname;

        if (pathname !== "/signup_mod" && userToken === " ") {
            RestServer("post", apiPath.api_auth_signout, {})
                .then((response) => {
                    if (response.data.result_info === true) {
                        // dispatch(init_user_info(null));
                        resetUserInfo();
                        resetUserToken();
                    } else {
                        // dispatch(init_user_info(null));
                        resetUserInfo();
                        resetUserToken();
                    }
                })
                .catch((error) => {
                    // 오류발생시 실행
                    // console.log(decodeURI(error));
                    // dispatch(init_user_info(null));
                    resetUserInfo();
                    resetUserToken();
                });
        }

        if (currentPath === pathname) window.location.reload();
        currentPath = location.pathname;
    }, [location]);

    // Spinner
    // const spinnerOption = useSelector((state) => state.common_old.spinner);

    // IP
    const getIpInfo = async () => {
        let ip;

        await axios
            .get("https://geolocation-db.com/json/")
            .then((res) => {
                ip = res.data.IPv4;
                setIpInfo(ip);
                sessionStorage.setItem("ipInfo", ip);

                // console.log("@@@@@@@@@@@", ip);
                getResultCode();
                getCodes();
                getCountryBank();
                getRegistrationInfo();
                setInterval(getResultCode, 3600000);
                setInterval(getCodes, 3600000);

                // callback(ip);
                // dispatch(set_ip_info(ip));
            })
            .catch((error) => {
                ip = "";
                setIpInfo(ip);
                sessionStorage.setItem("ipInfo", ip);
                // callback(ip);
                // dispatch(set_ip_info(ip));
            });

        return ip;
    };

    // result code
    const getResultCode = () => {
        RestServer("get", apiPath.api_result, {})
            .then((response) => {
                // console.log("result_code", response);

                setResultCode(response.data.result_info);
                // dispatch(
                //     set_result_code(JSON.stringify(response.data.result_info))
                // );
            })
            .catch((error) => {
                // 오류발생시 실행
                console.log(decodeURI(error));
            });
    };

    // codes
    const getCodes = () => {
        RestServer("post", apiPath.api_codes, {
            code_types: [],
            exclude_code_types: [
                "INTER_PHONE_TYPE",
                "BANK_TYPE",
                "LANGUAGE_TYPE",
                "CURRENCY_TYPE",
            ],
        })
            .then((response) => {
                // console.log("codes", response);

                // dispatch(set_codes(JSON.stringify(response.data.result_info)));
                setCodes(response.data.result_info);
            })
            .catch((error) => {
                // 오류발생시 실행
                console.log(decodeURI(error));
            });
    };

    // codes
    const getCountryBank = () => {
        RestServer("post", apiPath.api_codes, {
            code_types: [
                "INTER_PHONE_TYPE",
                "BANK_TYPE",
                "LANGUAGE_TYPE",
                "CURRENCY_TYPE",
            ],
            exclude_code_types: [],
        })
            .then((response) => {
                // console.log("codesCountryBank", response);

                // dispatch(
                //     set_country_bank(JSON.stringify(response.data.result_info))
                // );

                setCountryBank(response.data.result_info);
            })
            .catch((error) => {
                // 오류발생시 실행
                console.log(decodeURI(error));
            });
    };

    const getRegistrationInfo = () => {
        RestServer("get", apiPath.api_admin_get_reg + registration_idx, {})
            .then((response) => {
                // console.log("result_code", response);

                setRegistrationInfo(response.data.result_info);
                // dispatch(
                //     set_result_code(JSON.stringify(response.data.result_info))
                // );
            })
            .catch((error) => {
                // 오류발생시 실행
                console.log(decodeURI(error));
            });
    };

    return (
        <>
            <div className="wrapper">
                <ConfirmContextProvider>
                    <AlertContextProvider>
                        <Router />
                        <AlertModal />
                        <ConfirmModal />
                    </AlertContextProvider>
                </ConfirmContextProvider>
                {/* {isSpinner && <CommonSpinner />} */}
            </div>
            {/* <div>{spinnerOption.isLoading && <CommonSpinner />}</div> */}
        </>
    );
}

export default App;
