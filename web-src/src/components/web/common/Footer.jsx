import { CommonSpinner } from "common/js/Common";
import React from "react";
import { useRecoilValue } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";

function Footer() {
    const isSpinner = useRecoilValue(isSpinnerAtom);

    return (
        <>
            {/* footer //S */}
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
