import React, { useEffect, useState } from "react";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";

const MainPopupModal = (props) => {
    const [popupInfo, setPopupInfo] = useState({});

    const handleClose = () => {
        props.onClose(); // 부모 컴포넌트에서 전달된 닫기 함수 호출
    };

    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const fileBaseUrl = apiPath.api_file;

    useEffect(() => {
        getPopupDetail(props.popupIdx);
    }, []);

    const popupStyle = {
        width: props.width ? props.width : 300,
        height: props.height ? props.height: 500,
        position: 'fixed',
        top: props.top ? props.top : 0,
        left: props.left ? props.left : 0,
    };

    // 팝업 정보 상세
    const getPopupDetail = (popup_idx) => {
        // setIsSpinner(true);

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

                setPopupInfo(result_info);

                // setIsSpinner(false);
            } else {
                // setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    // 쿠키 설정 함수
    const setCookie = (name, value, days) => {
        // const expires = new Date();

        // expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        // document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;

        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    const closePopup = (popupIdx) => {
        // 사용자가 '24시간동안 보지 않기'를 클릭한 경우, 해당 팝업을 본 시각을 쿠키에 저장
        const currentTime = Date.now();
        setCookie(`popup_viewed_${popupIdx}`, currentTime, 1); // 쿠키에 1일 동안 저장
        // window.close();
        handleClose();
    };

    return (
        <>
            {popupInfo && (
                <div className="popup_wrap" id="modal_wrap" style={popupStyle}>
                    <div className="popup" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", widht: "100%", height: "100%"}}>
                        <div className="form">
                            {/* 팝업 컨텐츠 START */}
                            <div id="transition-modal-description">
                                { popupInfo.content }
                                { popupInfo.file_info && popupInfo.file_info.map((file) => <img src={`${fileBaseUrl + file.file_path_enc}`} alt={file.file_name} key={file.file_idx} />)}
                            </div>
                            {/* 팝업 컨텐츠 END */}
                        </div>
                        <div className="popup_btm">
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
