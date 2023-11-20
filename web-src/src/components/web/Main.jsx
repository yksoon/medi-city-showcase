import React, { useEffect, useRef, useState } from "react";
import MainContents from "./main/mainComponents/MainContents";
import Aos from "aos";
import Header from "components/web/common/Header";
import MainMainvisual from "components/web/main/mainComponents/MainMainvisual";
import Footer from "components/web/common/Footer";
import MainPopupModal from "./main/mainComponents/mainContentsComponents/modal/MainPopupModal";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { ConstructionOutlined } from "@mui/icons-material";

function Main() {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [registrationInfo, setRegistrationInfo] = useState([]);
    const [popupList, setPopupList] = useState([]);

    useEffect(() => {
        getRegistration();
        getPopupList(1, 20, "");
    }, []);

    // 정보 받아오기 REST
    const getRegistration = () => {
        const url = apiPath.api_admin_get_reg + registration_idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                setRegistrationInfo(result_info);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });
            }
        };
    };

    // 팝업 리스트 가져오기
    const getPopupList = (pageNum, pageSize, searchKeyword) => {

        // /v1/_popups
        // POST
        // 팝업 정보 목록
        const url = apiPath.api_admin_popups;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                setPopupList(result_info);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });
            }
        };
    };

    // 팝업을 렌더링하는 함수
    const renderPopup = (popup) => {
        const today = new Date();
        const startDate = new Date(popup.start_date);
        const endDate = new Date(popup.end_date);

        if (
            popup.show_yn === 'Y' &&
            startDate <= today &&
            endDate >= today &&
            popup.isOpen !== false &&
        (
            (popup.option_24_hours_yn === 'Y' && shouldDisplayPopup(popup.popup_idx)) ||
            popup.option_24_hours_yn === 'N'
        )
        ) {
            return (
                <MainPopupModal
                    key={popup.popup_idx}
                    popupIdx={popup.popup_idx}
                    onClose={() => closePopup(popup.popup_idx)}
                    width={popup.size_width}
                    height={popup.size_height}
                    top={popup.position_top}
                    left={popup.position_left}
                    scrollbars={popup.option_scroll_yn}
                />
            );
        } else {
            return false;
        }
    };

    // 팝업 닫기 함수
    const closePopup = (popupIdx) => {
        setPopupList(prevPopups => prevPopups.map(popup => {
            if (popup.popup_idx === popupIdx) {
                return { ...popup, isOpen: false }; // 해당 팝업을 닫음
            }
                return popup;
            }
        ));
    };

    const shouldDisplayPopup = (popupIdx) => {
        // 사용자가 해당 팝업을 24시간 이내에 보지 않기 선택하지 않은 경우 true 반환
        return !hasViewedRecently(popupIdx);
    };

    const hasViewedRecently = (popupIdx) => {
        // 쿠키에서 사용자의 팝업 조회 기록을 확인
        const viewedCookie = getCookie(`popup_viewed_${popupIdx}`);

        console.log(viewedCookie);
    
        if (viewedCookie) {
            // 팝업을 이미 본 경우, 저장된 시각을 파싱하여 24시간 이내인지 확인
            const viewedTimestamp = parseInt(viewedCookie, 10);
            const currentTime = Date.now();
    
            return currentTime - viewedTimestamp <= 24 * 60 * 60 * 1000; // 24시간(밀리초) 이내
        }
        return false;
    };
    
    // 쿠키 읽기 함수
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
    
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
    
        return null;
    };

    return (
        <>
            {/*헤더*/}
            <Header />

            {/*메인비주얼*/}
            <MainMainvisual registrationInfo={registrationInfo} />

            {/*메인 컨텐츠*/}
            <MainContents registrationInfo={registrationInfo} />

            {/* 푸터 */}
            <Footer />

            {/* 팝업 렌더링 */}
            {popupList.length && popupList.map((popup) => (renderPopup(popup)))}
        </>
    );
}

export default Main;
