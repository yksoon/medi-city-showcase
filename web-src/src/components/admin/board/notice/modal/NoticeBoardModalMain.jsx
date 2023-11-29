import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { boardModel } from "models/board/board";
import { boardType } from "common/js/static";

const NoticeBoardModalMain = (props) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    // refs
    const selectShowYn = useRef(null);
    const inputTitleKo = useRef(null);
    const inputSubTitleKo = useRef(null);
    const inputContentKo = useRef(null);
    const inputAttachmentFile = useRef(null);
    
    const fileBaseUrl = apiPath.api_file;
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        // 수정일 경우 디폴트 세팅
        isModData && setDefaultValue();
    }, [isModData]);

    const setDefaultValue = () => {
        selectShowYn.current.value = modData.show_yn;
        inputTitleKo.current.value = modData.subject_ko;
        inputSubTitleKo.current.value = modData.sub_title_ko;
        inputContentKo.current.value = modData.content_ko;
        setFileList(modData.file_info);
    };

    // 파일 첨부시
    const attachFile = (input) => {
        const maxFileCnt = 1; // 첨부파일 최대 개수

        if (isFileImage(input.files)) {
            if (input.files.length > maxFileCnt) {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: `이미지는 ${maxFileCnt}장까지 업로드 가능합니다.`,
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

    // 첨부파일 삭제
    const resetFileList = () => {
        // 각각 배열에 담긴 데이터가 있을 경우에만 초기화
        if (fileList.length) {
            setFileList(prevFileList => ([...prevFileList].splice(0, 0)));
        }
        if (inputAttachmentFile.current.files.length) {
            inputAttachmentFile.current.value = "";
        }
        return;
    }

    // 등록
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            const model = boardModel;
            const formData = new FormData();
            let url;
            let data = {};
            let fileArr = [];
            let boardIdxVal = method === "mod" ? modData.board_idx : "";
            let categoryTypeVal = method === "mod" ? modData.category_type_cd : "";

            if (method === "reg") {
                // /v1/_board
                // POST MULTI
                // 게시판 등록
                url = apiPath.api_admin_reg_board;
            } else if (method === "mod") {
                // /v1/board/
                // PUT MULTI
                // 게시판 수정
                url = apiPath.api_admin_mod_board;
            }

            data = {
                ...model,
                boardIdx: boardIdxVal,
                showYn: selectShowYn.current.value,
                boardType: boardType.notice,
                categoryType: categoryTypeVal,
                subjectKo: inputTitleKo.current.value,
                subTitleKo: inputSubTitleKo.current.value,
                contentKo: inputContentKo.current.value,
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
                                ? "게시글 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "게시글 수정이 완료 되었습니다"
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

    // 삭제 확인
    const clickRemove = () => {
        //선택여부 확인
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "게시글을 삭제 하시겠습니까?",
            callback: () => removeBoard(),
        });
    };

    // 삭제
    const removeBoard = () => {
        setIsSpinner(true);

        // /v1/board/{board_idx}
        // DELETE
        // 게시판 삭제
        let url = apiPath.api_admin_remove_board + modData.board_idx;

        let data = {};

        // 파라미터
        const restParams = {
            method: "delete",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "게시글이 삭제 되었습니다.",
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

        if (!inputTitleKo.current.value) {
            noti(inputTitleKo, "제목을 입력해주세요");

            return false;
        }

        if (!inputContentKo.current.value && inputAttachmentFile.current.files.length === 0) {
            noti(inputContentKo, "내용을 입력해주세요");

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
                                <select className="wp100" ref={selectShowYn}>
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
                                    ref={inputTitleKo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>부제목</th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={inputSubTitleKo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                내용 <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <textarea
                                    className="textarea_basic"
                                    ref={inputContentKo}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>파일</th>
                            <td colSpan="3" className="fileicon">
                                <div style={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <b>
                                        여러 파일 선택이 가능합니다. 여러 파일 선택
                                        시 ctrl 누른 후 선택하시면 됩니다.
                                    </b>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        ref={inputAttachmentFile}
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => attachFile(e.target)}
                                    />
                                    {/* <Link
                                        className="subbtn off"
                                        onClick={resetFileList}
                                    >
                                        초기화
                                    </Link> */}
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
                                onClick={clickRemove}
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

export default NoticeBoardModalMain;
