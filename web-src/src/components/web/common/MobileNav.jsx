import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { routerPath } from "webPath";

function MobileNav() {
    useEffect(() => {
        $("#nav").hide();
        $(".nav_2depth").hide();
    }, []);

    const menuClick = () => {
        $("#nav").slideToggle();
        $("#menu-icon2").toggleClass("open");
    };

    const menuDepth = (e) => {
        e.preventDefault();
        $(".nav_2depth").slideUp();
        // $(e.target).siblings(".nav_2depth").slideToggle();

        if (
            $(e.target).siblings(`#${e.target.id}_s`)[0] &&
            $(e.target).siblings(`#${e.target.id}_s`)[0].style.display ===
                "block"
        ) {
            $(e.target).siblings(`#${e.target.id}_s`).slideUp();
        } else {
            $(e.target).siblings(`#${e.target.id}_s`).slideToggle();
        }
    };

    return (
        <>
            {/* 모바일 메뉴 // S */}
            <div id="top_right">
                <div
                    id="menu-icon2"
                    className="all_menu"
                    onClick={(e) => menuClick(e)}
                >
                    <span></span>
                    <span></span>
                    <span className="short"></span>
                </div>
                <nav>
                    <ul id="nav">
                        <li>
                            <Link
                                to={routerPath.web_program_url}
                                id="nav1"
                                // onClick={(e) => {
                                //     menuDepth(e);
                                //     e.preventDefault();
                                // }}
                            >
                                PROGRAM
                            </Link>
                        </li>
                        <li>
                            <Link
                                to=""
                                id="nav2"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                Plastic & Aesthetic Clinics SIGN-UP
                            </Link>
                            <ul
                                id="nav2_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link
                                        to={
                                            routerPath.web_participation_guideline_url
                                        }
                                    >
                                        Guideline
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routerPath.web_signup_signup_url}>
                                        Online Sign-up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={
                                            routerPath.web_signup_check_entry_url
                                        }
                                    >
                                        Sign-up Confirmation
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                to=""
                                id="nav3"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                Artbuddy, K-ART
                            </Link>
                            <ul
                                id="nav3_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link to="">K-ART Exhibition</Link>
                                </li>
                                <li>
                                    <Link href="">Gallery</Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li>
                            <Link
                                to=""
                                id="nav4"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                Venue Information
                            </Link>
                            <ul
                                id="nav4_s"
                                className="nav_2depth"
                                style={{ display: "block" }}
                            >
                                <li>
                                    <Link to="#section03">Venue</Link>
                                </li>
                                <li>
                                    <Link to="">Booth Map</Link>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </nav>
            </div>
            {/* 모바일메뉴 // E */}
        </>
    );
}

export default MobileNav;
