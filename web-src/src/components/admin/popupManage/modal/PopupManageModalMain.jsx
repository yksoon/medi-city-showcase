import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { popupModel } from "models/popup/popup";

const PopupManageModalMain = (props) => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    // refs
    const selectShowYn = useRef(null);
    const popupTitle = useRef(null);
    const popupContent = useRef(null);
    const popupWidth = useRef(null);
    const popupHeight = useRef(null);
    const popupTop = useRef(null);
    const popupLeft = useRef(null);
    const selectScrollYn = useRef(null);
    const select24HoursYn = useRef(null);
    const startDate = useRef(null);
    const startTime = useRef(null);
    const endDate = useRef(null);
    const endTime = useRef(null);
    const inputAttachmentFile = useRef(null);
    const viewContent = useRef(null);
    
    const fileBaseUrl = apiPath.api_file;
    const [fileList, setFileList] = useState([]);
    const [htmlContent, sethtmlContent] = useState([]);

    useEffect(() => {
        // 수정일 경우 디폴트 세팅
        isModData && setDefaultValue();
    });

    const setDefaultValue = () => {
        selectShowYn.current.value = modData.show_yn;
        popupTitle.current.value = modData.title ?? "";
        popupContent.current.value = modData.content ?? "";
        popupWidth.current.value = modData.size_width;
        popupHeight.current.value = modData.size_height;
        popupTop.current.value = modData.position_top;
        popupLeft.current.value = modData.position_left;
        selectScrollYn.current.value = modData.option_scroll_yn;
        select24HoursYn.current.value = modData.option_24_hours_yn;
        startDate.current.value = modData.start_date.split(' ')[0];
        startTime.current.value = modData.start_date.split(' ')[1];
        endDate.current.value = modData.end_date.split(' ')[0];
        endTime.current.value = modData.end_date.split(' ')[1];
        setFileList(modData.file_info);
        htmlConversion(modData.content);
    };

    // html 변환
    const htmlConversion = (content) => {
        const div = document.createElement('div');
        div.innerHTML = content;
        
        const decodedHTML = div.innerText;

        sethtmlContent(decodedHTML);
    }

    // 파일 첨부시
    const attachFile = (input) => {
        // console.log(input.files);
        const maxFileCnt = 1; // 첨부파일 최대 개수
        if (isFileImage(input.files)) {
            if (input.files.length > maxFileCnt) {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "이미지는 5장까지 업로드 가능합니다.",
                });

                input.value = "";

                return false;
            }
        } else {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "이미지만 업로드 가능합니다.",
            });

            input.value = "";

            return false;
        }
    };

    // 이미지파일인지
    function isFileImage(file) {
        if (file) {
            for (let i = 0; i < file.length; i++) {
                return file[i] && file[i]["type"].split("/")[0] === "image";
            }
        }
    }

    // 등록
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            const model = popupModel;
            const formData = new FormData();
            let url;
            let data = {};
            let fileArr = [];

            let startDateVal = startTime.current.value ? startDate.current.value + ' ' + startTime.current.value : startDate.current.value + ' 00:00';
            let endDateVal = endTime.current.value ? endDate.current.value + ' ' + endTime.current.value : endDate.current.value + ' 23:59';
            let popupIdxVal = method === "mod" ? modData.popup_idx : "";

            if (method === "reg") {
                // /v1/popup
                // POST MULTI
                // 팝업 정보 등록
                url = apiPath.api_admin_reg_popup;
            } else if (method === "mod") {
                // /v1/popup
                // PUT MULTI
                // 팝업 정보 수정
                url = apiPath.api_admin_mod_popup;
            }

            data = {
                ...model,
                showYn: selectShowYn.current.value,
                title: popupTitle.current.value,
                content: popupContent.current.value,
                sizeWidth: popupWidth.current.value,
                sizeHeight: popupHeight.current.value,
                positionTop: popupTop.current.value,
                positionLeft: popupLeft.current.value,
                optionScrollYn: selectScrollYn.current.value,
                option24HoursYn: select24HoursYn.current.value,
                startDate: startDateVal,
                endDate: endDateVal,
                popupIdx: popupIdxVal,
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // 파일 formData append
            fileArr = Array.from(inputAttachmentFile.current.files);
            let len = fileArr.length;
            for (let i = 0; i < len; i++) {
                formData.append("attachmentFile", fileArr[i]);
            }

            const restParams = {
                method:
                    method === "reg" ? "post_multi" : method === "mod" ? "put_multi" : "",
                url: url,
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responseLogic(res),
            };

            CommonRest(restParams);

            const responseLogic = (res) => {
                let result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message:
                            method === "reg"
                                ? "팝업 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "팝업 수정이 완료 되었습니다"
                                : "",
                        callback: () => handleNeedUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }
            };
        }
    };

    // 검증
    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref.current.focus();
            };
        };

        if (!popupTitle.current.value) {
            noti(popupTitle, "제목을 입력해주세요");

            return false;
        }

        if (!popupContent.current.value && inputAttachmentFile.current.files.length === 0) {
            noti(popupContent, "내용을 입력해주세요");

            return false;
        }

        if (!startDate.current.value) {
            noti(startDate, "시작일을 입력해주세요");

            return false;
        }

        if (!endDate.current.value) {
            noti(endDate, "종료일을 입력해주세요");

            return false;
        }

        return true;
    };

    return (
        <>
            <div className="admin">
                <table className="table_bb">
                    <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                노출여부
                            </th>
                            <td colSpan="3">
                                <select class="wp100" ref={selectShowYn}>
                                    <option value="Y">노출</option>
                                    <option value="N">비노출</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                제목 <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupTitle}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                내용 <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <textarea
                                    class="textarea_basic"
                                    ref={popupContent}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>파일</th>
                            <td colSpan="3" className="fileicon">
                                <div style={{ marginBottom: 5 }}>
                                    <b>
                                        여러 파일 선택이 가능합니다. 여러 파일 선택
                                        시 ctrl 누른 후 선택하시면 됩니다.
                                    </b>
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={inputAttachmentFile}
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => attachFile(e.target)}
                                    />
                                </div>
                                <div>
                                    {fileList.length !== 0 &&
                                        fileList.map((item, idx) => (
                                            <div key={`fileList_${idx}`}>
                                                <Link
                                                    to={`${fileBaseUrl}${item.file_path_enc}`}
                                                >
                                                    <img
                                                        src="/img/common_old/file.svg"
                                                        alt=""
                                                    />
                                                    {item.file_name}
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>팝업 너비</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupWidth}
                                />
                            </td>
                            <th>팝업 높이</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupHeight}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>팝업 Top</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupTop}
                                />
                            </td>
                            <th>팝업 Left</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupLeft}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>스크롤 사용</th>
                            <td colSpan="3">
                                <select class="wp100" ref={selectScrollYn}>
                                    <option value="N">사용안함</option>
                                    <option value="Y">사용함</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>24시간동안 띄우지 않기</th>
                            <td colSpan="3">
                                <select class="wp100" ref={select24HoursYn}>
                                    <option value="N">사용안함</option>
                                    <option value="Y">사용함</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                시작일 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={startDate}
                                />
                            </td>
                            <th>시작시간</th>
                            <td>
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={startTime}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                종료일 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={endDate}
                                />
                            </td>
                            <th>종료시간</th>
                            <td>
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={endTime}
                                />
                            </td>
                        </tr>
                        
                        {isModData && (
                            <>
                                <tr>
                                    <th>등록자</th>
                                    <td colSpan="3">{ modData.reg_user_name_ko }</td>
                                </tr>
                                <tr>
                                    <th>등록일</th>
                                    <td colSpan="3">{ modData.reg_dttm }</td>
                                </tr>
                                <tr>
                                    <th>
                                        View Content
                                    </th>
                                    <td colSpan="3">
                                        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                                        <div>
                                            { fileList.length !== 0 && fileList.map((file) => <img src={`${fileBaseUrl + file.file_path_enc}`} alt={file.file_name} key={file.file_idx} style={{width: '100%', height: 'auto'}} />)}
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
                <div className="subbtn_box">
                    {isModData ? (
                        <>
                            <Link
                                to=""
                                className="subbtn del"
                                // onClick={clickRemove}
                            >
                                삭제
                            </Link>
                            <Link
                                to=""
                                className="subbtn on"
                                onClick={() => regModBoard("mod")}
                            >
                                수정
                            </Link>
                        </>
                    ) : (
                        <Link
                            to=""
                            className="subbtn on"
                            onClick={() => regModBoard("reg")}
                        >
                            등록
                        </Link>
                    )}

                    <Link
                        to=""
                        className="subbtn off"
                        onClick={handleModalClose}
                    >
                        취소
                    </Link>
                </div>
            </div>
        </>
    );
};

export default PopupManageModalMain;
