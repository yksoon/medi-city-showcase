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
                        <Link href="/">
                            <img src="img/web/main/logo2.png" alt="" />
                        </Link>
                    </h1>
                    <div id="gnb">
                        <ul>
                            <li>
                                <Link href="program.html">PROGRAM</Link>
                            </li>
                            <li>
                                <Link href="guideline.html">
                                    PARTICIPATION SIGN-UP
                                </Link>
                                <div className="submenu">
                                    <Link href="guideline.html">Guideline</Link>
                                    <Link href="signup.html">
                                        Online Sign-up
                                    </Link>
                                    <Link href="">Sign-up Confirmation</Link>
                                </div>
                            </li>
                            <li className="left_p">
                                <Link href="">ARTBUDDY, K-ART</Link>
                                <div className="submenu">
                                    <Link href="">K-ART Exhibition</Link>
                                    <Link href="">Gallery</Link>
                                </div>
                            </li>
                            <li>
                                <Link href="#section03">VENUE INFORMATION</Link>
                                <div className="submenu">
                                    <Link href="#section03">Venue</Link>
                                    <Link href="">Booth Map</Link>
                                </div>
                            </li>
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
