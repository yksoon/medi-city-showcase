import React, { useEffect, useState } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "resultCode";
import { registration_idx } from "common/js/static";
import { Skeleton } from "@mui/material";
import { commaOfNumber } from "common/js/Pattern";

const Guideline = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [registrationInfo, setRegistrationInfo] = useState([]);

    useEffect(() => {
        getRegistration();
    }, []);

    // 정보 받아오기 REST
    const getRegistration = () => {
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
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });
            }
        };
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
                        {registrationInfo.length !== 0 ? (
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                        ) : (
                            <h3>
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

                        <h4>PARTICIPATION SIGN-UP</h4>
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
                        <Link to="signup.html">Online Sign-up</Link>
                        <Link to="">Sign-up Confirmation</Link>
                    </div>
                    <div id="subtitle">
                        <h3>GUIDELINE</h3>
                    </div>

                    <div className="guideline">
                        <div className="top">
                            Welcome all of you for joining the{" "}
                            <b>{registrationInfo.registration_sub_title_en}.</b>
                            <br />
                            This Sign-up page pertains to South Korean Plastic
                            Surgery clinics interested in participating in the
                            upcoming event.
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Period</h3>
                            <div className="pbox">
                                ~ December 22, 2023 (Fri)
                            </div>
                            <p className="l_noti">
                                * If an adjustment to the application deadline
                                is needed, Please Inquire at{" "}
                                {/*sunyoung.eom@medi-city.co.kr.*/}
                                {registrationInfo.email} .
                            </p>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Procedure</h3>
                            <ul
                                className="steps"
                                data-aos="fade-up"
                                data-aos-duration="800"
                            >
                                <li className="c01">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon01.png"
                                            alt=""
                                        />
                                    </p>
                                    Log-in
                                </li>
                                <li className="c02">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon02.png"
                                            alt=""
                                        />
                                    </p>
                                    Click to
                                    <br />
                                    "Participation Sign-up"
                                </li>
                                <li className="c03">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon03.png"
                                            alt=""
                                        />
                                    </p>
                                    Follow a procedure of
                                    <br />
                                    online Sign-up
                                </li>
                                <li className="c04">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon04.png"
                                            alt=""
                                        />
                                    </p>
                                    Finalize
                                    <br />
                                    payment
                                </li>
                                <li className="c05">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon05.png"
                                            alt=""
                                        />
                                    </p>
                                    Receive
                                    <br />
                                    Confirmation E-mail
                                </li>
                                <li className="c06">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon06.png"
                                            alt=""
                                        />
                                    </p>
                                    Complete
                                </li>
                            </ul>
                            <p className="l_noti">
                                * The confirmation of Sign-up will be directly
                                sent via e-mail. If not, please contact at{" "}
                                {registrationInfo.email} .
                                {/*sunyoung.eom@medi-city.co.kr .{" "}*/}
                            </p>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Sign-up Fee</h3>
                            <div className="pbox">
                                {registrationInfo.length !== 0 ? (
                                    // ￦ 12,000,000 (Including VAT)
                                    <>
                                        {`￦ ${registrationInfo.entry_cost
                                            .toString()
                                            .replace(
                                                commaOfNumber,
                                                ",",
                                            )} (Including VAT)`}
                                    </>
                                ) : (
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                        }}
                                        width={"30%"}
                                    />
                                )}
                            </div>
                            <dl>
                                <dt>Account Transfer</dt>
                                <dd>
                                    <p className="dot">
                                        <b className="pink">
                                            Domestic Bank Information :{" "}
                                            {registrationInfo.length !== 0 &&
                                                `${registrationInfo.payment_bank_name} ${registrationInfo.payment_account} (예금주: ${registrationInfo.name_first_ko} ${registrationInfo.name_last_ko})`}
                                            {/*신한은행*/}
                                            {/*140-013-748158 (예금주: 주식회사*/}
                                            {/*메디씨티 박성민)*/}
                                        </b>
                                    </p>
                                    <p className="dot">
                                        The sender's name should be the
                                        registrant's name. If the registrant's
                                        name and the sender's name are not
                                        identical, please notify us by e-mail or
                                        phone call.{" "}
                                    </p>
                                </dd>
                                <dt>Credit Card</dt>
                                <dd>
                                    <p className="dot">
                                        <b className="pink">
                                            Credit card payments are accepted,
                                            and you can provide the necessary
                                            card information via{" "}
                                            {/*sunyoung.eom@medi-city.co.kr.*/}
                                            {registrationInfo.email} .
                                        </b>
                                    </p>
                                    <p className="dot">
                                        The following credit cards will be
                                        accepted : VISA , Mastercard and
                                        American Express.{" "}
                                    </p>
                                    <p className="dot">
                                        The merchant name on your credit card
                                        statement will be "(주)케이원피에스".{" "}
                                    </p>
                                </dd>
                            </dl>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">
                                Cancellation & Refund Policy
                            </h3>
                            <p className="dot">
                                Once you completed the payment,{" "}
                                <b className="pink">
                                    the fee is non- refundable.
                                </b>
                            </p>
                            <p className="dot">
                                If you have any questions, please contact at{" "}
                                {/*sunyoung.eom@medi-city.co.kr .{" "}*/}
                                {registrationInfo.email} .
                            </p>
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

export default Guideline;