import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, registrationInfoAtom } from "recoils/atoms";
import { useNavigate } from "react-router";
import { apiPath, routerPath } from "webPath";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { emailPattern } from "common/js/Pattern";
import Header from "components/web/common/Header";
import { Link } from "react-router-dom";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Skeleton } from "@mui/material";

const CheckEntryIndonesia = () => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const navigate = useNavigate();

    const registrationInfo = useRecoilValue(registrationInfoAtom);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);

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
                name_first_ko: firstName.current.value,
                name_last_ko: lastName.current.value,
                name_first_en: firstName.current.value,
                name_last_en: lastName.current.value,
                // inter_phone_number: "62",
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
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

                    navigate(routerPath.web_local_confirmation_url, {
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

        if (!firstName.current.value) {
            noti(
                firstName,
                "Please enter the name of the person making the reservation",
            );

            return false;
        }

        if (!lastName.current.value) {
            noti(
                lastName,
                "Please enter the name of the person making the reservation",
            );

            return false;
        }

        if (!mobile1.current.value) {
            noti(
                mobile1,
                "Please enter the mobile phone number of the person making the reservation",
            );

            return false;
        }
        if (!mobile2.current.value) {
            noti(
                mobile2,
                "Please enter the mobile phone number of the person making the reservation",
            );

            return false;
        }
        if (!mobile3.current.value) {
            noti(
                mobile3,
                "Please enter the mobile phone number of the person making the reservation",
            );

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
                        {Object.keys(registrationInfo).length !== 0 ? (
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                        ) : (
                            <h3
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        fontSize: "1rem",
                                        textAlign: "center",
                                    }}
                                    width={"60%"}
                                />
                            </h3>
                        )}
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
                        <Link to={routerPath.web_local_guideline_url}>
                            Guideline
                        </Link>
                        <Link to={routerPath.web_local_signup_url}>
                            Online Sign-up
                        </Link>
                        <Link
                            to={routerPath.web_local_check_entry_url}
                            className="active"
                        >
                            Sign-up Confirmation
                        </Link>
                    </div>
                    <div id="subtitle">
                        <h3>SIGN-UP CONFIRMATION</h3>
                    </div>

                    <div className="nm_login">
                        {/*  <h4 className="txt">
                            <b>
                                Please enter the email of the clinic
                                representative you applied with,
                            </b>{" "}
                            <br />
                            not participant's email
                        </h4>*/}
                        <div className="loginbox">
                            <p className="inp">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="First Name"
                                    ref={firstName}
                                    onKeyDown={handleOnKeyPress}
                                    className="input_n"
                                />
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Last Name"
                                    ref={lastName}
                                    onKeyDown={handleOnKeyPress}
                                    className="input_n"
                                />
                            </p>
                            <p className="inp">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="mobile1"
                                    ref={mobile1}
                                    onKeyDown={handleOnKeyPress}
                                    className="input_m"
                                />
                                &nbsp; - &nbsp;
                                <input
                                    type="text"
                                    name=""
                                    placeholder="mobile2"
                                    ref={mobile2}
                                    onKeyDown={handleOnKeyPress}
                                    className="input_m"
                                />
                                &nbsp; - &nbsp;
                                <input
                                    type="text"
                                    name=""
                                    placeholder="mobile3"
                                    ref={mobile3}
                                    onKeyDown={handleOnKeyPress}
                                    className="input_m"
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

export default CheckEntryIndonesia;
