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
                        <b>MEDY-CITY</b>
                        <br />
                        사업자 : (주)메디씨티{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> 대표자:
                        박성민 <img src="img/web/main/f_bar.jpg" alt="" />{" "}
                        사업자등록번호 : 588-86-02555{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> 주소 :
                        경기도 고양시 일산동구 무궁화로 43-55, 302호{" "}
                        <img src="img/web/main/f_bar.jpg" alt="" /> 문의 :
                        sunyoung.eom@medi-city.co.kr, 031-926-3181
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
