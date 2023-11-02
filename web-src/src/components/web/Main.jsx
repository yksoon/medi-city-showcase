import React, {useEffect, useRef, useState} from "react";
import MainContents from "./main/mainComponents/MainContents";
import Aos from "aos";
import MainPopupModal from "./main/mainComponents/contents/modal/MainPopupModal";
import Header from "components/web/common/Header";
import MainMainvisual from "components/web/main/mainComponents/MainMainvisual";
import Footer from "components/web/common/Footer";


function Main() {
    useEffect(() => {
        Aos.init();
    });

    const popupTime = localStorage.getItem("popupTime");
    const [isOpen, setIsOpen] = useState(false);

    const checkBoxRef = useRef(null);

    useEffect(() => {
        popupOpenTime();
    }, []);

    // 메인 팝업 시간
    const popupOpenTime = () => {
        const nowDate = new Date();
        const openDate = new Date("2023-09-20 00:00:00");

        if (nowDate > openDate) {
            const today = new Date();

            if (popupTime && popupTime > today) {
                // 현재 date가 localStorage의 시간보다 크면 return
                setIsOpen(false);
                return;
            }
            if (!popupTime || popupTime < today) {
                // 저장된 date가 없거나 today보다 작다면 popup 노출
                setIsOpen(true);
            }
        } else {
            setIsOpen(false);
        }
    };

    // 팝업 닫기 핸들러
    const handleModalClose = () => {
        const checked = checkBoxRef.current.checked;
        if (checked) {
            let expires = new Date();
            expires = expires.setHours(expires.getHours() + 24);

            localStorage.setItem("popupTime", expires);

            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
        // console.log(checkBoxRef.current.checked);
    };

    return (
        <>
            {/* 헤더 */}
            <Header />

            {/* 메인비주얼 */}
            <MainMainvisual />

            {/* 메인컨텐츠 */}
            <MainContents />

            {/* 푸터 */}
            <Footer />

            {/* 팝업모달 */}
            <MainPopupModal
                isOpen={isOpen}
                title={""}
                width={"1000"}
                handleModalClose={handleModalClose}
                ref={checkBoxRef}
            />
        </>
    );
}

export default Main;
