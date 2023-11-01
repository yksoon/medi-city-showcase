import React, { useEffect } from "react";
import $ from "jquery";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";
import { CommonOpenUrl } from "common/js/Common";

function Header() {
    // useEffect(() => {
    //     $("#nav").hide();
    // }, []);

    return (
        <>
            <div id="header">
                <div id="header_content">
                    <h1 className="logo">
                        <Link to={routerPath.web_main_url}>
                            <img src="img/web/main/logo_job.png" alt="" />
                        </Link>
                        <Link
                            onClick={(e) =>
                                CommonOpenUrl(
                                    "https://lincplus.jejunu.ac.kr/index.htm"
                                )
                            }
                        >
                            <img src="img/web/main/logo_linc.png" alt="" />
                        </Link>
                    </h1>
                    {/* 모바일 메뉴 // S */}
                    <MobileNav />
                    {/* 모바일메뉴 // E */}
                </div>
            </div>
        </>
    );
}

export default Header;
