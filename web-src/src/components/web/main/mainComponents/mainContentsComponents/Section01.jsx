import React, { useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { Skeleton } from "@mui/material";
import { commaOfNumber } from "common/js/Pattern";

const Section01 = (props) => {
    const registrationInfo = props.registrationInfo;

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
                            <h3>For All of you</h3>
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
                                    <span className="date">1/24-25</span>Gifts
                                    <br />
                                    <b className="long">
                                        (Only for Sign-up Participants)
                                    </b>

                                    <span className="icon">
                                        <img
                                            src="img/web/main/f_icon03.png"
                                            alt=""
                                        />
                                    </span>
                                </li>
                                <li>
                                    <span className="date">1/24-25</span>Free
                                    Admission
                                    <br />
                                    <b className="long">
                                        (Only for Indonesian Participants)
                                    </b>
                                    <span className="icon">
                                        <img
                                            src="img/web/main/f_icon04.png"
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
                                <p>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            bgcolor: "lightgray !important",
                                        }}
                                        width={"40%"}
                                    />
                                </p>
                            )}
                            {/*<p><Skeleton variant="text" sx={{ fontSize: '1rem' }} width={300} /></p>*/}
                        </li>
                        <li>
                            <span>VENUE</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>The Westin Jakarta, Indonesia (Grandballroom)</p>
                                <p>{registrationInfo.target_place}</p>
                            ) : (
                                <p>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            bgcolor: "lightgray !important",
                                        }}
                                        width={"70%"}
                                    />
                                </p>
                            )}
                        </li>
                        <li>
                            <span>HOST</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>Medi-City</p>
                                <p>{registrationInfo.target_host}</p>
                            ) : (
                                <p>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            bgcolor: "lightgray !important",
                                        }}
                                        width={"30%"}
                                    />
                                </p>
                            )}
                        </li>
                        <li>
                            <span>PARTNERS</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>SUMMITS, ARTBUDDY</p>
                                <p>{registrationInfo.target_supervision}</p>
                            ) : (
                                <p>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            bgcolor: "lightgray !important",
                                        }}
                                        width={"40%"}
                                    />
                                </p>
                            )}
                        </li>
                        {/*<li>*/}
                        {/*    <span>Sign-up Fee</span>*/}
                        {/*    {registrationInfo.length !== 0 ? (*/}
                        {/*        // <p>￦12,000,000 (Including VAT)</p>*/}
                        {/*        <p>{`￦${registrationInfo.entry_cost*/}
                        {/*            .toString()*/}
                        {/*            .replace(*/}
                        {/*                commaOfNumber,*/}
                        {/*                ",",*/}
                        {/*            )} (Including VAT)`}</p>*/}
                        {/*    ) : (*/}
                        {/*        <p>*/}
                        {/*            <Skeleton*/}
                        {/*                variant="text"*/}
                        {/*                sx={{*/}
                        {/*                    fontSize: "1rem",*/}
                        {/*                    bgcolor: "lightgray !important",*/}
                        {/*                }}*/}
                        {/*                width={"45%"}*/}
                        {/*            />*/}
                        {/*        </p>*/}
                        {/*    )}*/}
                        {/*</li>*/}
                        <li>
                            <span>Inquiry</span>
                            {registrationInfo.length !== 0 ? (
                                // <p>
                                //     Sunyoung Oeom (M. sunyoung.eom@medi-city.co.kr /
                                //     T. 031-926-3181)
                                // </p>
                                <p>{registrationInfo.target_contactus}</p>
                            ) : (
                                <p>
                                    <Skeleton
                                        variant="text"
                                        sx={{
                                            fontSize: "1rem",
                                            bgcolor: "lightgray !important",
                                        }}
                                        width={"80%"}
                                    />
                                </p>
                            )}
                        </li>
                    </ul>

                    <h3>Welcome Message</h3>
                    <p
                        className="txt"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        “K-Aesthetic & ART Indonesia 2024” is the first
                        “Medi-City Medical Showcase” hosted by Medi-City,
                        headquartered in South Korea,
                        <br />
                        which established its overseas corporation in Indonesia
                        in 2023.
                        <br />
                        <br />
                        In 2022, Medi-City took its initial steps by globally
                        introducing South Korea’s recognized medical technology
                        and launching
                        <br />
                        the “K-Medi Platform” to supply medical education video
                        content worldwide. Additionally in 2023, we established
                        “PT. MEDI CITY INDONESIA”,
                        <br />
                        with the aim of serving as a medical business hub
                        between South Korea and Indonesia which is the world’s
                        fourth most populous nation,
                        <br />
                        having recognized its almost limitless growth potential.
                        <br />
                        <br />
                        The first showcase, which will take place in January
                        2024, revolves around the theme: "K-Aesthetic & ART
                        2024". It will introduce South Korea's specialized
                        plastic surgery and beauty clinics to the people of
                        Indonesia, providing the opportunity for direct
                        consultation with customers aspiring to have plastic
                        surgery in South Korea. Influencers at the forefront of
                        global market trends will participate, and it will be an
                        invaluable time to engage with clients with real needs.{" "}
                        <br />
                        <br />
                        The showcase is conducted in collaboration with
                        “SUMMITS”, which has been attracting Indonesian clients
                        to South Korean Plastic & Aesthetic Clinics
                        <br />
                        through the “My Venus” Application service.
                        Additionally, a Korean art exhibition by ARTBUDDY will
                        be held with the intention of promoting K-ART. <br />
                        <br />
                        Participating Plastic & Aesthetic Clinics can expect
                        more than just promotion; the focus is on tangible
                        results.
                        <br />
                        Unlike many previous Plastic Surgery Expos that did not
                        yield significant results in attracting foreign clients,
                        <br />
                        “K-Aesthetic & ART Indonesia 2024” provides a unique
                        opportunity to directly observe the outcomes of client
                        attraction efforts on-site. <br />
                        <br />
                        We invite you to take the first step of your global
                        journey in 2024 with us.
                        <br />
                        Sincerely,
                        <br />
                        <br />
                        <b>Steve Lee</b>
                    </p>

                    <div className="hostbox">
                        <span className="tit">HOST</span>
                        <span className="logobox">
                            <img src="img/web/main/host_logo.png" alt="" />
                        </span>
                        <span className="logobox">
                            <img src="img/web/main/host_logo02.png" alt="" />
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
