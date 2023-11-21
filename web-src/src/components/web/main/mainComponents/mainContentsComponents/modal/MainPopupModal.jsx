import React, { useEffect, useState } from "react";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { apiPath } from "webPath";
import { successCode } from "resultCode";

const MainPopupModal = (props) => {
    const [popupInfo, setPopupInfo] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    const handleClose = () => {
        props.onClose(); // 부모 컴포넌트에서 전달된 닫기 함수 호출
    };

    const err = CommonErrModule();

    const fileBaseUrl = apiPath.api_file;

    // 브라우저의 창 크기를 기반으로 모바일 여부를 확인
    const handleResize = () => {
        setIsMobile(props.windowSize < 768); // 예시로 768px 미만을 모바일로 간주
    };

    useEffect(() => {
        getPopupDetail(props.popupIdx);
    }, []);
    
    useEffect(() => {
        handleResize();
    }, [props.windowSize])

    const popupStyle = {
        width: isMobile ? '90%' : (props.width ? props.width : 300),
        height: isMobile ? 'auto' : (props.height ? props.height : 500),
        position: 'absolute',
        top: isMobile ? 100 : (props.top ? props.top : 0),
        left: isMobile ? '5%' : (props.left ? props.left : 0),
    };

    const mobileImgStyle = {
        width: '100%',
        height: 'auto',
    }

    // 팝업 정보 상세
    const getPopupDetail = (popup_idx) => {

        // /v1/_popup/{popup_idx}
        // GET
        // 팝업 정보 상세
        const url = apiPath.api_admin_get_popup + popup_idx;

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: {},
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;
                
                // html 변환
                const div = document.createElement('div');
                div.innerHTML = result_info.content;
                
                const decodedHTML = div.innerText;

                result_info.content = decodedHTML;

                setPopupInfo(result_info);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    const closePopup = (popupIdx) => {
        let closeTime = new Date().getTime(); // 현재 시간
        let expires = closeTime + 24 * 60 * 60 * 1000; // 현재 시간으로부터 24시간 뒤

        localStorage.setItem(`popup_viewed_${popupIdx}`, expires);

        handleClose();
    };

    return (
        <>
            {popupInfo && (
                <div className="popup_wrap" id="modal_wrap" style={popupStyle}>
                    <div className="popup" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", widht: "100%", height: "100%"}}>
                        <div className="form">
                            {/* 팝업 컨텐츠 START */}
                            {/* <div id="transition-modal-description"> */}
                            <div dangerouslySetInnerHTML={{ __html: popupInfo.content }}>
                            </div>
                            <div id="transition-modal-popup-content">
                                {/* { popupInfo.content && popupInfo.content } */}
                                { popupInfo.file_info && popupInfo.file_info.map((file) => <img style={isMobile ? mobileImgStyle : {}} src={`${fileBaseUrl + file.file_path_enc}`} alt={file.file_name} key={file.file_idx} />)}
                            </div>
                            {/* 팝업 컨텐츠 END */}
                        </div>
                        <div className="popup_btm">
                            { popupInfo.option_24_hours_yn === "Y" ? (
                                <div>
                                    <input
                                        type="checkbox"
                                        id="popup_24"
                                        value="Y"
                                        onClick={() => closePopup(props.popupIdx)}
                                    />
                                    <label htmlFor="popup_24">
                                        24시간동안 보지 않기
                                    </label>
                                </div>
                            ) : <div></div> }
                            <div onClick={handleClose}>
                                {/* <img src="img/common/modal_close.png" alt="" /> */}
                                X 닫기
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPopupModal;
