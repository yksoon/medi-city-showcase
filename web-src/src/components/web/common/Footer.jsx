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
                        <p className="flogo">
                            <img src="img/web/main/logo.png" alt="" />
                        </p>
                        63243 제주특별자치도 제주시 제주대학로 102 산학협력관
                        4층 410-1호 Tel. 064)754-3125~6, 064)754-4412~5 Fax.
                        064-751-3127, 070-4170-4127
                        <br />
                        Copyright © 2013 JEJU NATIONAL UNIVERSITY Leaders in
                        INdustry-university Cooperation.
                        <br />본 웹사이트에 게시된 이메일 주소가 전자우편 수집
                        프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로
                        수집되는 것을 거부하며, 이를 위반시 정보통신망법에 의해
                        형사 처벌됨을 유념하시기 바랍니다.
                    </address>
                </div>
            </div>
            {/* footer //E */}
            {isSpinner && <CommonSpinner />}
        </>
    );
}

export default Footer;
