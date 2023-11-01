import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { routerPath } from "webPath";

function MobileNav() {
    useEffect(() => {
        $("#nav").hide();
    }, []);

    const menuClick = () => {
        $("#nav").slideToggle();
        $("#menu-icon2").toggleClass("open");
    };

    const menuDepth = (e) => {
        e.preventDefault();
        $(".nav_2depth").slideUp();
        $(e.target).siblings(".nav_2depth").slideToggle();
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
                            <Link to={routerPath.web_main_url} id="nav5">
                                홈
                            </Link>
                        </li>
                        <li>
                            <Link
                                id="nav1"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                박람회안내
                            </Link>
                            <ul className="nav_2depth">
                                <li>
                                    <Link to={routerPath.web_intro_url}>
                                        행사소개
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_intro_location_url}
                                    >
                                        행사장소
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                id="nav2"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                프로그램
                            </Link>
                            <ul className="nav_2depth">
                                <li>
                                    <Link to={routerPath.web_program_url}>
                                        행사일정
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routerPath.web_program_detail_url}
                                    >
                                        세부 프로그램
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routerPath.web_program_event_url}>
                                        이벤트 프로그램
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                id="nav3"
                                onClick={(e) => {
                                    menuDepth(e);
                                    e.preventDefault();
                                }}
                            >
                                사전등록
                            </Link>
                            <ul className="nav_2depth">
                                <li>
                                    <Link to={routerPath.web_signup_url}>
                                        사전등록
                                    </Link>
                                </li>
                                <li>
                                    <Link to={routerPath.web_signupchk_url}>
                                        사전등록확인
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                // onClick={() =>
                                //     openUrl(
                                //         "https://lincplus.jejunu.ac.kr/programs/notice.htm?act=view&seq=1364"
                                //     )
                                // }
                                to={`${routerPath.web_company_url}/list`}
                                id="nav4"
                            >
                                참여기업
                            </Link>
                        </li>
                        <li>
                            <Link to={routerPath.web_notice_url} id="nav5">
                                공지사항
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* 모바일메뉴 // E */}
        </>
    );
}

export default MobileNav;
