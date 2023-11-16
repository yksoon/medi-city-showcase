import { CommonSpinner } from "common/js/Common";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Footer() {
    const isSpinner = useRecoilValue(isSpinnerAtom);
    const location = useLocation();
    useEffect(() => {
        // 상단으로이동 퀵버튼 등장
        // if (location.pathname === "/") {
        document.addEventListener("scroll", function () {
            let currentScrollValue = document.documentElement.scrollTop;
            let gotop = document.getElementById("go_top");

            if (currentScrollValue > 100) {
                gotop.style.opacity = "1";
            } else {
                gotop.style.opacity = "0";
            }
        });
        // }
    }, []);

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* footer //S */}
            <div id="go_top">
                <Link to="" onClick={goToTop}>
                    <img src="img/common/go_top.png" alt="상단으로 이동" />
                </Link>
            </div>

            <div id="footer">
                <div id="footer_content">
                    <address>
                        <b>Medi-City Co.,Ltd</b>
                        10364, R#302, 43-55, Mugunghwa-ro, Ilsandong-gu,
                        Goyang-si, Gyeonggi-do, Republic of Korea{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> Business
                        Registration Certificate : 588-86-02555{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> Tel :
                        +82-31-926-3181{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> E-mail :
                        sunyoung.eom@medi-city.co.kr
                        <br />
                        <b>PT MEDI CITY INDONESIA</b>
                        Graha Surveyor Indonesia Lt 15, Jl. Jend. Gatot Subroto
                        Kav.56, Jakarta 12950 - Indonesia{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> Business
                        Registration Certificate : 2305230037834{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> Tel :
                        +62-811-8881-0374{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> E-mail :
                        ceo@medi-city.co.kr
                        <br />
                        <b>Medi-City Gangwon Branch</b>
                        2165, R#315, Gyeonggang-ro, Gangneung-si, Gangwon-do,
                        Republic of Korea{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> Tel :
                        +82-33-642-3181{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> E-mail :
                        caleb.park@medi-city.co.kr
                        <br />
                        Copyright Medicity. All rights reserved.
                    </address>
                </div>
            </div>
            {/* footer //E */}
            {isSpinner && <CommonSpinner />}
        </>
    );
}

export default Footer;
