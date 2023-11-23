import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { emailPattern } from "common/js/Pattern";

const CheckEntryMain = () => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const [registrationInfo, setRegistrationInfo] = useState([]);

    const institutionName = useRef(null);
    const email = useRef(null);

    useEffect(() => {
        getRegistration();
    }, []);

    // 사전등록 정보 받아오기 REST
    const getRegistration = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_reg + registration_idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                setRegistrationInfo(result_info);

                setIsSpinner(false);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });

                setIsSpinner(false);
            }
        };
    };

    // 엔터키
    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            doCheck(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const doCheck = () => {
        if (validation()) {
            setIsSpinner(true);

            const url = apiPath.api_admin_get_reg_confirm;
            const data = {
                institution_name_ko: institutionName.current.value,
                institution_name_en: institutionName.current.value,
                email: email.current.value,
            };

            // 파라미터
            const restParams = {
                method: "post",
                url: url,
                data: data,
                err: err,
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);

            const responsLogic = (res) => {
                if (res.headers.result_code === successCode.success) {
                    const result_info = res.data.result_info;

                    // setRegistrationInfo(result_info);
                    // console.log(result_info);
                    setIsSpinner(false);

                    navigate(routerPath.web_signup_confirmation_url, {
                        state: result_info,
                    });
                } else if (res.headers.result_code === successCode.noData) {
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        // message: res.headers.result_message_ko,
                        message: "The entered information does not match.",
                    });

                    setIsSpinner(false);
                } else {
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        // message: res.headers.result_message_ko,
                        message: "잠시후 다시 시도해주세요",
                    });

                    setIsSpinner(false);
                }
            };
        }
    };

    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref.current.focus();
            };
        };

        if (!institutionName.current.value) {
            noti(
                institutionName,
                "Please enter Plastic & Aesthetic Clinic Name",
            );

            return false;
        }

        if (!email.current.value) {
            noti(email, "Please enter E-mail");

            return false;
        }

        if (!emailPattern.test(email.current.value)) {
            noti(email, "Enter the E-mail that you applied with.");

            return false;
        }

        return true;
    };

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            <div id="subvisual">
                <div className="sub_txt">
                    <div className="sub_txt_in">
                        <h2>
                            <img
                                src="img/web/sub/sub_txt.png"
                                alt="Medi-City Medical Showcase"
                            />
                        </h2>
                        <h3>{registrationInfo.registration_sub_title_en}</h3>
                        <h4 className="long">
                            Plastic & Aesthetic Clinics
                            <br />
                            SIGN-UP
                        </h4>
                    </div>
                </div>
            </div>

            {/*서브 container //S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div id="leftmenu">
                        <Link to={routerPath.web_participation_guideline_url}>
                            Guideline
                        </Link>
                        <Link to={routerPath.web_signup_signup_url}>
                            Online Sign-up
                        </Link>
                        <Link
                            to={routerPath.web_signup_check_entry_url}
                            className="active"
                        >
                            Sign-up Confirmation
                        </Link>
                    </div>
                    <div id="subtitle">
                        <h3>SIGN-UP CONFIRMATION</h3>
                    </div>

                    <div className="nm_login">
                        <h4 className="txt">
                            <b>
                                Please enter the email of the clinic
                                representative you applied with,
                            </b>{" "}
                            <br />
                            not participant's email
                        </h4>
                        <div className="loginbox">
                            <p className="inp">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Plastic & Aesthetic Clinic Name"
                                    ref={institutionName}
                                    onKeyDown={handleOnKeyPress}
                                />
                            </p>
                            <p className="inp">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="E-mail"
                                    ref={email}
                                    onKeyDown={handleOnKeyPress}
                                />
                            </p>

                            <input
                                type="submit"
                                value="SUBMIIT"
                                onClick={doCheck}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*서브 container //E*/}

            {/*footer //S*/}
            <FooterSub />
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default CheckEntryMain;
