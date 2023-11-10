import React, {useEffect, useState} from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {CommonErrModule, CommonNotify, CommonRest} from "common/js/Common";
import {useSetRecoilState} from "recoil";
import {isSpinnerAtom} from "recoils/atoms";
import {apiPath} from "webPath";
import {successCode} from "resultCode";
import {Skeleton} from "@mui/material";
import {commaOfNumber} from "common/js/Pattern";

const Section01 = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [registrationInfo, setRegistrationInfo] = useState([])

    useEffect(() => {
        getRegistration()
    }, []);

    // 정보 받아오기 REST
    const getRegistration = () => {
        const url = apiPath.api_admin_get_reg + "2";
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
                    message: "잠시후 다시 시도해주세요"
                });
            }
        };
    }

    return (
        <>
            <div className="section01">
                <div className="sec01_in">
                    <div
                        className="free"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        <div className="free_in">
                            <p className="tit">
                                <img src="img/web/main/free_tit.png" alt="" />
                            </p>
                            <h3>For all 24-25 event participants</h3>
                            <ul>
                                <li>
                                    <span className="date">1/24</span>Westin
                                    Hotel <b>Lunch buffet</b>
                                    <span className="icon">
                                        <img
                                            src="img/web/main/f_icon01.png"
                                            alt=""
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span className="date">1/24-25</span>Westin
                                    Hotel <b>Coffee Break</b>
                                    <span className="icon">
                                        <img
                                            src="img/web/main/f_icon02.png"
                                            alt=""
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span className="date">1/24-25</span>
                                    <b>Gifts</b>
                                    <span className="icon">
                                        <img
                                            src="img/web/main/f_icon03.png"
                                            alt=""
                                        />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3>Overview</h3>
                    <ul className="overview">
                        <li>
                            <span>DATE</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>January 24 (Wed) ~ 25 (Thu), 2024</p>
                                <p>{registrationInfo.target_date}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"40%"} /></p>
                            )}
                            {/*<p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={300} /></p>*/}

                        </li>
                        <li>
                            <span>VENUE</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>The Westin Jakarta, Indonesia (Grandballroom)</p>
                                <p>{registrationInfo.target_place}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"70%"} /></p>
                            )}
                        </li>
                        <li>
                            <span>HOST</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>Medi-City</p>
                                <p>{registrationInfo.target_host}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"30%"} /></p>
                            )}

                        </li>
                        <li>
                            <span>PARTNERS</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>SUMMITS, ARTBUDDY</p>
                                <p>{registrationInfo.target_supervision}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"40%"} /></p>
                            )}
                        </li>
                        <li>
                            <span>Sign-up Fee</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>￦12,000,000 (Including VAT)</p>
                                <p>{`￦${registrationInfo.entry_cost.toString().replace(commaOfNumber, ",")} (Including VAT)`}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"45%"} /></p>
                            )}
                        </li>
                        <li>
                            <span>Inquiry</span>
                            {registrationInfo.length !== 0 ? (
                                    // <p>
                                    //     Sunyoung Oeom (M. sunyoung.eom@medi-city.co.kr /
                                    //     T. 031-926-3181)
                                    // </p>
                                <p>{registrationInfo.target_contactus}</p>
                            ) : (
                                <p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={"80%"} /></p>
                            )}

                        </li>
                    </ul>

                    <h3>Welcome Message</h3>
                    <p
                        className="txt"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        We would like to extend a warm invitation for everyone
                        to join us at "K-Aesthetic & ART Indonesia 2024".
                        <br />
                        <br />
                        K- Aesthetic& ART Indonesia 2024 is an official event
                        being organized for the first time in Jakarta, Indonesia
                        by Medi-City,<br/>
                        a company based and headquartered in South
                        Korea.
                        <br />
                        <br />
                        Medi-City initiated the launch of the "K-Medi Platform"
                        in 2022 with the purpose of introducing globally
                        recognized medical technology
                        <br />
                        from South Korea to the world as well providing medical
                        educational content. <br />
                        In 2023, we established PT. MEDI CITY INDONESIA , with
                        the aim of serving as a medical business hub between
                        South Korea and Indonesia
                        <br />
                        which is the world's fourth most populous nation, having
                        recognized its almost limitless growth potential.
                        <br />
                        <br />
                        The first showcase, which will take place in January
                        2024, revolves around the theme:{" "}
                        <strong>"K-Aesthetic & ART 2024".</strong>
                        <br />
                        It will introduce South Korea's specialized plastic
                        surgery and beauty clinics to the people of Indonesia,
                        providing the opportunity for
                        <br />
                        direct consultation with customers aspiring to have
                        plastic surgery in South Korea. Influencers at the
                        forefront of global market trends will participate,
                        <br />
                        and it will be an invaluable time to engage with clients
                        with real needs.
                        <br />
                        <br />
                        This event is a collaboration with SUMMITS, which has
                        already been attracting Indonesian patients to South
                        Korean plastic surgery hospitals through the
                        <br />
                        "My Venus" Application service. Additionally, a Korean
                        art exhibition by ARTBUDDY will be held with the
                        intention of promoting K-ART. <br />
                        <br />
                        "K-Aesthetic & ART Indonesia 2024" is markedly different
                        from many previous K-Beauty Expos or Exhibitions that
                        mainly focused on hospital promotion
                        <br />
                        without significant foreign patient attraction.
                        "K-Aesthetic & ART Indonesia 2024" is distinct in that
                        it provides tangible results in patient attraction
                        on-site.
                        <br />
                        <br />
                        We invite you to take the first step of your global
                        journey in 2024 with us. <br />
                        <br />
                        Sincerely,
                        <br />
                        <b>Steve Lee</b>
                    </p>

                    <div className="hostbox">
                        <span className="tit">HOST</span>
                        <span className="logobox">
                            <img src="img/web/main/host_logo.png" alt="" />
                        </span>
                        <span className="tit">PARTNERS</span>
                        <span className="logobox">
                            <img src="img/web/main/orga_logo01.png" alt="" />
                        </span>
                        <span className="logobox">
                            <img src="img/web/main/orga_logo02.png" alt="" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Section01;
