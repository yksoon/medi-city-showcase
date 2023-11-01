import { Link } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";
import { routerPath } from "webPath";
import MobileNav from "./MobileNav";
import { CommonOpenUrl } from "common/js/Common";

const SubHeader = () => {
    useEffect(() => {
        $("#nav").hide();
    }, []);

    return (
        <>
            {/* header//S */}
            <div id="header">
                <div id="header_content">
                    <h1 className="logo">
                        <Link to={routerPath.web_main_url}>
                            <img src="img/web/main/logo_job.png" alt="" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("https://lincplus.jejunu.ac.kr/")
                            }
                        >
                            <img src="img/web/main/logo_linc.png" alt="" />
                        </Link>
                    </h1>

                    {/* 서브페이지용 상단메뉴(pc) //  S  */}

                    <div id="gnb">
                        <ul>
                            <li>
                                <Link to={routerPath.web_intro_url}>
                                    박람회안내
                                </Link>
                                <div className="submenu">
                                    <Link to={routerPath.web_intro_url}>
                                        행사소개
                                    </Link>
                                    {/* <Link href="">인사말</Link> */}
                                    <Link
                                        to={routerPath.web_intro_location_url}
                                    >
                                        행사장소
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link to={routerPath.web_program_url}>
                                    프로그램
                                </Link>
                                <div className="submenu">
                                    <Link to={routerPath.web_program_url}>
                                        행사일정
                                    </Link>
                                    <Link
                                        to={routerPath.web_program_detail_url}
                                    >
                                        세부 프로그램
                                    </Link>
                                    <Link to={routerPath.web_program_event_url}>
                                        이벤트 프로그램
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link to={routerPath.web_signup_url}>
                                    사전등록
                                </Link>
                                <div className="submenu">
                                    <Link to={routerPath.web_signup_url}>
                                        사전등록
                                    </Link>
                                    <Link to={routerPath.web_signupchk_url}>
                                        사전등록 확인
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <Link
                                    // onClick={() =>
                                    //     CommonOpenUrl(
                                    //         "https://lincplus.jejunu.ac.kr/programs/notice.htm?act=view&seq=1364"
                                    //     )
                                    // }
                                    to={`${routerPath.web_company_url}/list`}
                                >
                                    참여기업
                                </Link>
                            </li>
                            <li>
                                <Link to={routerPath.web_notice_url}>
                                    공지사항
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 서브페이지용 상단메뉴(pc) // E */}

                    {/* 모바일 메뉴 // S */}
                    <MobileNav />
                    {/* 모바일메뉴 // E */}
                </div>
            </div>
            {/* header//E */}
        </>
    );
};

export default SubHeader;
