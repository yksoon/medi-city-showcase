// Create By YKSoon_

import { React } from "react";
import { CircularProgress, Modal, Typography } from "@mui/material";
import tokenExpire from "./tokenExpire";
import { RestServer } from "./Rest";
import { errorCode } from "resultCode";
import useAlert from "hook/useAlert";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
    isSpinnerAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "recoils/atoms";
import useConfirm from "hook/useConfirm";
import ConsultingBoardModalMain from "components/admin/board/consultingBoard/modal/ConsultingBoardModalMain";
import NoticeBoardModalMain from "components/admin/board/notice/modal/NoticeBoardModalMain";
import GuestBookBoardModalMain from "components/admin/board/guestBook/modal/GuestBookBoardModalMain";
import RegistrationManageModalMain from "components/admin/registration/registrationManage/modal/RegistrationManageModalMain";
import EntryManageModalMain from "components/admin/registration/entryManage/modal/EntryManageModalMain";
import PopupManageModalMain from "components/admin/popupManage/modal/PopupManageModalMain";
import { BarChart, PieChart } from "@mui/x-charts";
import ArtistManageModalMain from "components/admin/gallery/artist/modal/ArtistManageModalMain";
import QrListModalMain from "components/admin/gallery/artist/modal/QrListModalMain";
import GalleryManageModalMain from "components/admin/gallery/gallery/modal/GalleryManageModalMain";
import { commaOfNumber } from "common/js/Pattern";

// Alert (props)
// isOpen = state 상태값
// title = 제목
// content = 내용
// btn = 확인버튼
// closeModal = 닫기 (state를 변경할 수 있는 handler)
const CommonModal = (props) => {
    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        handleModalClose: props.handleModalClose,
        width: props.width,
    };

    const component = props.component;

    const handleNeedUpdate = props.handleNeedUpdate
        ? props.handleNeedUpdate
        : null;

    // 모달 컴포넌트 렌더
    const renderComponent = (component) => {
        switch (component) {
            // case "RegUserModalMain":
            //     return (
            //         <RegUserModalMain
            //             handleNeedUpdate={handleNeedUpdate}
            //             handleModalClose={modalOption.handleModalClose}
            //             modUserData={props.modUserData}
            //         />
            //     );

            // 상담문의
            case "ConsultingBoardModalMain":
                return (
                    <ConsultingBoardModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 사전등록관리
            case "RegistrationManageModalMain":
                return (
                    <RegistrationManageModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 참가자 관리
            case "EntryManageModalMain":
                return (
                    <EntryManageModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 공지사항 관리
            case "NoticeBoardModalMain":
                return (
                    <NoticeBoardModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 방명록 관리
            case "GuestBookBoardModalMain":
                return (
                    <GuestBookBoardModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 팝업 관리
            case "PopupManageModalMain":
                return (
                    <PopupManageModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // 아티스트 관리
            case "ArtistManageModalMain":
                return (
                    <ArtistManageModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            // QR
            case "QrListModalMain":
                return (
                    <QrListModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        title={props.title}
                        modData={props.modData}
                    />
                );

            // 갤러리 관리
            case "GalleryManageModalMain":
                return (
                    <GalleryManageModalMain
                        handleNeedUpdate={handleNeedUpdate}
                        handleModalClose={modalOption.handleModalClose}
                        modData={props.modData}
                    />
                );

            default:
                return;
        }
    };
    return (
        <>
            <Modal
                open={modalOption.isOpen}
                onClose={modalOption.handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal_wrap" id="modal_wrap">
                    <div className={`modal w${modalOption.width}`}>
                        <div
                            className="modal_content form hotel"
                            id="hotelInsert"
                        >
                            <div className="mo_title">
                                <h4>{modalOption.title}</h4>
                                <div
                                    className="modal_close"
                                    onClick={modalOption.handleModalClose}
                                >
                                    <img
                                        src="img/common/modal_close.png"
                                        alt=""
                                    />
                                </div>
                            </div>

                            {/* 모달 컨텐츠 드가자 */}

                            {renderComponent(component)}

                            {/* 모달 컨텐츠 드가자 END */}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

// -- 디버깅용 콘솔 --
// 파라미터:
// type - String
// responseData - 객체
const CommonConsole = (type, responseData) => {
    let result_message_ko;
    let result_message_en;
    let result_code;
    let message;

    // response 설정
    let response;
    !responseData.response
        ? (response = responseData)
        : (response = responseData.response);

    if (response.headers) {
        result_message_ko = response.headers.result_message_ko;
        result_message_en = response.headers.result_message_en;
        result_code = response.headers.result_code;
        message = response.headers.message;
    } else {
        response = responseData;
    }

    switch (type) {
        case "log":
            return console.log(responseData);

        case "decLog":
            // 규격상 http request header는 영어밖에 안되기때문에 디코딩 해준다
            return console.log(
                decodeURI(result_message_ko),
                decodeURI(result_message_en),
                decodeURI(result_code),
                decodeURI(message),
            );

        case "alertMsg":
            return alert(decodeURI(result_message_ko).replace("%20", " "));

        case "alert":
            return alert(responseData);

        default:
            break;
    }
};

// 스피너
const CommonSpinner = (props) => {
    return (
        <>
            <div className="spinner">
                <CircularProgress />
            </div>
        </>
    );
};

// --에러처리--
// 파라미터:
// error - error객체
// dispatch - useDispatch()
// alert - useAlert()
const CommonErrorCatch = async (
    error,
    setIsSpinner,
    alert,
    resetUserInfoAdmin,
    resetUserTokenAdmin,
) => {
    // 오류발생시 실행
    CommonConsole("log", error);

    if (error.response) {
        if (
            error.response.status === errorCode.timeOut || // 타임아웃 - 500
            error.response.status === errorCode.timeOut2 // 타임아웃 - 503
        ) {
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: "잠시 후 다시 시도해주세요",
            });
        }
        // 비정상접근 or 비정상토큰
        else if (
            error.response.headers.result_code === errorCode.abnormalApproach || // 비정상 접근 - "9995"
            error.response.headers.result_code === errorCode.emptyToken || // 토큰이 없음 - "2000"
            error.response.headers.result_code === errorCode.tokenExpired || // 토큰 만료 - "2001"
            error.response.headers.result_code === errorCode.tokenTamperWith || // 올바른 토큰 아닐 시 - "2002"
            error.response.headers.result_code === errorCode.invalidToken // 올바른 토큰 아닐 시 - "2003"
        ) {
            tokenExpire(
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfoAdmin,
                resetUserTokenAdmin,
            );
        }
        // 에러
        else {
            setIsSpinner(false);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.result_message_en,
            });
        }
    } else {
        setIsSpinner(true);
    }

    // TODO: 타임아웃 전역 사용 가능하도록
    const timeOut = 20000;

    // 타임아웃 (axios 타임아웃 걸릴경우)
    if (error.message === `timeout of ${timeOut}ms exceeded`) {
        setIsSpinner(false);

        CommonNotify({
            type: "alert",
            hook: alert,
            message: "잠시 후 다시 시도해주세요",
        });
    }
};

// 알림창
const CommonNotify = async (option) => {
    const type = option.type;
    const hook = option.hook;
    const message = option.message;
    const callback = option.callback ? option.callback : null;

    switch (type) {
        case "confirm":
            const resultConfirm = await hook({
                message: message,
                buttons: {
                    ok: "확인",
                    cancel: "취소",
                },
            });

            if (resultConfirm) {
                if (callback) {
                    const type = typeof callback;

                    if (type === "function") {
                        callback();
                    }
                }
            }

            break;

        case "alert":
            const resultAlert = await hook({
                message: message,
                buttons: {
                    ok: "Ok",
                    cancel: "cancel",
                },
            });

            if (resultAlert) {
                if (callback) {
                    const type = typeof callback;

                    if (type === "function") {
                        callback();
                    }
                }
            }

            break;
        default:
            break;
    }
};

// 공용 REST
/* 
-- restParams --
dispatch : useDispatch
alert : useAlert
method : "post", "get", "delete", "put", "post_multi", "put_multi"
url : ""
data : {}
callback : callback()
admin: ""
*/
const CommonRest = async (restParams = {}) => {
    // const dispatch = restParams.err.dispatch;
    const setIsSpinner = restParams.err.setIsSpinner;
    const alert = restParams.err.alert ? restParams.err.alert : "";
    const resetUserInfoAdmin = restParams.err.resetUserInfoAdmin;
    const resetUserTokenAdmin = restParams.err.resetUserTokenAdmin;

    const method = restParams.method;
    const url = restParams.url;
    const data = restParams.data;
    const admin = restParams.admin;
    const file = restParams.file;

    await RestServer(method, url, data, admin, file)
        .then((response) => {
            restParams.callback(response);
        })
        .catch((error) => {
            CommonErrorCatch(
                error,
                // dispatch,
                setIsSpinner,
                alert,
                resetUserInfoAdmin,
                resetUserTokenAdmin,
            );
        });
};

// 공용 날짜 체킹
/* 
-- restParams --
dispatch : useDispatch
alert : useAlert
type: ""
callback : callback()
*/
const CommonCheckDate = async (
    checkSchedule,
    ip,
    alert,
    callbackFunc,
    // dispatch
    setIsSpinner,
) => {
    setIsSpinner(true);

    if (Object.keys(checkSchedule).length !== 0) {
        const allowedIp = checkSchedule.allowed_ip;
        // TODO: 추후 아이디 추가, role 추가
        // const allowedId = checkSchedule.allowed_id;

        const nowDate = new Date();

        const startDate = checkSchedule.start_date;
        const startTime = checkSchedule.start_time;
        const endDate = checkSchedule.end_date;
        const endTime = checkSchedule.end_time;

        const startDateTime = new Date(startDate + " " + startTime);
        const endDateTime = new Date(endDate + " " + endTime);

        if (nowDate > startDateTime && nowDate < endDateTime) {
            // 사전등록기간 내
            console.log("checkSchedule OK");

            return true;
        } else {
            // 사전등록기간 외
            if (allowedIp.indexOf(ip) === -1) {
                // 예외 아이피가 없으면
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "사전등록 기간이 아닙니다",
                    callback: callbackFunc,
                });

                return false;
            }
        }
    } else {
        callbackFunc();

        return false;
    }

    return true;
};

// 공용 url 열기
// 파라미터 : url(string)
const CommonOpenUrl = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
};

const CommonErrModule = () => {
    const { alert } = useAlert();
    // const { confirm } = useConfirm();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);
    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);
    const err = {
        setIsSpinner,
        alert,
        resetUserInfoAdmin,
        resetUserTokenAdmin,
    };

    return err;
};

const CommonPieChart = (props) => {
    const data = props.data ?? [];
    const title = props.title ?? "";

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <Typography variant="h5" align="center">
                    {title}
                </Typography>
                <PieChart
                    series={[
                        {
                            data: data,
                            highlightScope: {
                                faded: "global",
                                highlighted: "item",
                            },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                cornerRadius: 0,
                                color: "gray",
                            },
                        },
                    ]}
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: {
                                vertical: "bottom",
                                horizontal: "middle",
                            },
                            padding: 0,
                        },
                    }}
                    margin={{
                        top: 20,
                        bottom: 100,
                        left: 50,
                        right: 50,
                    }}
                    {...props}
                />
            </div>
        </>
    );
};

const CommonBarChart = (props) => {
    const data = props.data ?? [];
    const title = props.title ?? "";

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <Typography variant="h5" align="center">
                    {title}
                </Typography>
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: "band", dataKey: "label" }]}
                    series={[
                        {
                            dataKey: "value",
                        },
                    ]}
                    margin={{
                        top: 20,
                        bottom: 60,
                        left: 100,
                        right: 100,
                    }}
                    {...props}
                />
            </div>
        </>
    );
};

/**
 * 숫자 세자리 콤마
 * @param str
 * @param digit
 * @returns {string}
 * @constructor
 */
const CommonCommaPattern = (str, digit) => {
    const pattern_3 = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const pattern_4 = /\B(?<!\.\d*)(?=(\d{4})+(?!\d))/g;

    let returnValue = "";

    if (digit === 3) {
        returnValue = str.toString().replace(pattern_3, ",");
    } else if (digit === 4) {
        returnValue = str.toString().replace(pattern_4, ",");
    } else {
        returnValue = str.toString().replace(pattern_3, ",");
    }

    return returnValue;
};

export {
    CommonModal,
    CommonConsole,
    CommonSpinner,
    CommonErrorCatch,
    CommonNotify,
    CommonRest,
    CommonOpenUrl,
    CommonCheckDate,
    CommonErrModule,
    CommonPieChart,
    CommonBarChart,
    CommonCommaPattern,
};