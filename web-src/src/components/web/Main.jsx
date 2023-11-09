import React, { useEffect, useRef, useState } from "react";
import MainContents from "./main/mainComponents/MainContents";
import Aos from "aos";
import Header from "components/web/common/Header";
import MainMainvisual from "components/web/main/mainComponents/MainMainvisual";
import Footer from "components/web/common/Footer";

function Main() {
    useEffect(() => {
        Aos.init();
    });

    return (
        <>
            {/*헤더*/}
            <Header />

            {/*메인비주얼*/}
            <MainMainvisual />

            {/*메인 컨텐츠*/}
            <MainContents />

            {/* 푸터 */}
            <Footer />
        </>
    );
}

export default Main;
