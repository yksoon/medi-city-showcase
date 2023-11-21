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
                
                let renderPopupList = result_info.filter((popup) => (renderPopup(popup)));

                console.log(renderPopupList);
                setPopupList(renderPopupList);
            } else {
                // CommonNotify({
                //     type: "alert",
                //     hook: alert,
                //     // message: res.headers.result_message_ko,
                //     message: "잠시후 다시 시도해주세요",
                // });
            }
        };
    };

    // 팝업을 필터링하는 함수
    const renderPopup = (popup) => {
        const today = new Date();
        const startDate = new Date(popup.start_date);
        const endDate = new Date(popup.end_date);
        const storageCheck = popupOpenTime(popup.popup_idx, popup.option_24_hours_yn)

        // 노출여부, 시작일&종료일 기간체크, 24시간보지않기 기능 사용 중일 경우 로컬스토리지 기간체크
        if (popup.show_yn === 'Y' && startDate <= today && endDate >= today && storageCheck) {
            return popup;
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

    // 메인 팝업 시간
    const popupOpenTime = (popupIdx, option24HoursYn) => {
        const viewedTime = localStorage.getItem(`popup_viewed_${popupIdx}`);

        console.log(viewedTime);
        
        if (option24HoursYn === "N" || !viewedTime) {
            return true; // 저장된 시간이 없으면 팝업을 보여줌
        } else {
            const currentTime = new Date().getTime();
            // 현재 시간과 저장된 시간을 비교하여 24시간이 지났는지 확인
            return currentTime - parseInt(viewedTime, 10) > 24 * 60 * 60 * 1000;
        }
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
            {popupList.length && popupList.map((popup) => (
                popup.isOpen !== false && (
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
            )))}
        </>
    );
}

export default Main;
