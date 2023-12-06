import React from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";
import { Skeleton } from "@mui/material";
import { useRecoilValue } from "recoil";
import { registrationInfoAtom } from "recoils/atoms";

const GuidelineIndonesia = () => {
    const registrationInfo = useRecoilValue(registrationInfoAtom);
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
                        <h4 className="long">Peserta Pameran SIGN-UP</h4>
                    </div>
                </div>
            </div>

            {/*서브 container //S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div id="leftmenu">
                        <Link
                            to={routerPath.web_local_guideline_url}
                            className="active"
                        >
                            Guideline
                        </Link>
                        <Link to={routerPath.web_local_signup_url}>
                            Online Sign-up
                        </Link>
                        <Link to={routerPath.web_local_check_entry_url}>
                            Sign-up Confirmation
                        </Link>
                    </div>
                    <div id="subtitle">
                        <h3>GUIDELINE</h3>
                    </div>

                    <div className="guideline_indo">
                        <div className="top">
                            Welcome all of you for joining the K-Aesthetic & ART
                            Indonesia 2024.
                            <h4>
                                This Sign-up page is your ticket to the ultimate
                                makeover experience!
                                <br />
                                <mark>
                                    <span className="big">"</span>Sign-up now
                                    for the showcase and unlock the secrets to
                                    your dream transformation!!
                                    <span className="big">"</span>
                                </mark>
                            </h4>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Sign-up Period</h3>
                            <div className="pbox">
                                <span className="black">Early Sign-up</span> by
                                January23, 2024
                            </div>
                            <div className="pbox">
                                <span className="black">On-Site Sign-up</span>{" "}
                                January24~25, 2024
                            </div>
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
                                            src="img/web/sub/step_icon02.png"
                                            alt=""
                                        />
                                    </p>
                                    Click to
                                    <br />
                                    "Participation Sign-up"
                                </li>
                                <li className="c02">
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

                                <li className="c03">
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
                                <li className="c04">
                                    <p>
                                        <img
                                            src="img/web/sub/step_icon06.png"
                                            alt=""
                                        />
                                    </p>
                                    Complete
                                </li>
                            </ul>

                            <ul className="check">
                                <li>
                                    To complete your registration, make sure to{" "}
                                    <span className="pink">
                                        receive the confirmation email.
                                    </span>
                                </li>
                                <li>
                                    On the day of the event,{" "}
                                    <span className="pink">
                                        <b>
                                            <mark>
                                                visit the registration desk to
                                                pick up your name tag and enjoy
                                                a special gift.
                                            </mark>
                                        </b>
                                    </span>
                                </li>
                                <li>
                                    The confirmation of Sign-up will be directly
                                    sent via e-mail. If not, please contact at
                                    sunyoung.eom@medi-city.co.kr.
                                </li>
                            </ul>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Sign-up Fee</h3>
                            <div className="pbox_free">
                                <img
                                    src="img/web/sub/free_tit.png"
                                    alt=""
                                    className="free_tit"
                                />
                                Only for Indonesian Participants !
                            </div>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Benefits</h3>

                            <ul className="blist">
                                <li>
                                    <span className="icon">
                                        <img
                                            src="img/web/sub/gift_box.png"
                                            alt=""
                                        />
                                    </span>
                                    Westin Hotel Lunch Buffet on 24 January
                                </li>
                                <li>
                                    <span className="icon">
                                        <img
                                            src="img/web/sub/gift_box.png"
                                            alt=""
                                        />
                                    </span>
                                    Westin Hotel Coffee Break on 24- 25 January
                                </li>
                                <li>
                                    <span className="icon">
                                        <img
                                            src="img/web/sub/gift_box.png"
                                            alt=""
                                        />
                                    </span>
                                    Gifts
                                </li>
                                <li>
                                    <span className="icon">
                                        <img
                                            src="img/web/sub/gift_box.png"
                                            alt=""
                                        />
                                    </span>
                                    Join our exclusive talk show with a{" "}
                                    <span className="pink">
                                        mega influencer “Jessica Iskandar”
                                    </span>{" "}
                                    who has undergone plastic surgery in Korea!
                                    <br />
                                    Get ready for a Q&A session and enjoy
                                    special perks just for you!
                                </li>
                            </ul>
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

export default GuidelineIndonesia;
