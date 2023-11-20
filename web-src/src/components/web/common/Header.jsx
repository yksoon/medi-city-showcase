import React, { useEffect } from "react";
import $ from "jquery";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";
import { CommonOpenUrl } from "common/js/Common";

function Header() {
    return (
        <>
            <div id="header">
                <div
                    id="header_content"
                    data-aos="fade-down"
                    data-aos-duration="1100"
                >
                    <h1 className="logo">
                        <Link to={routerPath.web_main_url}>
                            <img src="img/web/main/logo2.png" alt="" />
                        </Link>
                    </h1>
                    <div id="gnb">
                        <ul>
                            <li>
                                <Link to={routerPath.web_main_url}>HOME</Link>
                            </li>
                            <li>
                                <Link to={routerPath.web_program_url}>
                                    PROGRAM
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={
                                        routerPath.web_participation_guideline_url
                                    }
                                >
                                    PLASTIC&AESTHETIC CLINICS SIGN-UP
                                </Link>
                                <div className="submenu">
                                    <Link
                                        to={
                                            routerPath.web_participation_guideline_url
                                        }
                                    >
                                        Guideline
                                    </Link>
                                    <Link to={routerPath.web_signup_signup_url}>
                                        Online Sign-up
                                    </Link>
                                    <Link
                                        to={
                                            routerPath.web_signup_check_entry_url
                                        }
                                    >
                                        Sign-up Confirmation
                                    </Link>
                                </div>
                            </li>
                            <li className="left_p">
                                <Link href="">ARTBUDDY, K-ART</Link>
                                <div className="submenu">
                                    <Link
                                        to={
                                            routerPath.web_artbuddy_exhibition_url
                                        }
                                    >
                                        K-ART Exhibition
                                    </Link>
                                    <Link
                                        to={
                                            routerPath.web_artbuddy_gallery_list_url
                                        }
                                    >
                                        Gallery
                                    </Link>
                                </div>
                            </li>
                            {/* <li>
                                <Link href="#section03">VENUE INFORMATION</Link>
                                <div className="submenu">
                                    <Link href="#section03">Venue</Link>
                                    <Link href="">Booth Map</Link>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    {/* 모바일 메뉴 // S */}
                    <MobileNav />
                    {/* 모바일메뉴 // E */}
                </div>
            </div>
        </>
    );
}

export default Header;
