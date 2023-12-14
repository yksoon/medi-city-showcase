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

// ------------------- import End --------------------

const ConsultingBoardModalMain = (props) => {
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
    const inputSubjectKo = useRef(null);
    const inputSubTitleKo = useRef(null);
    const inputContentKo = useRef(null);
    const inputAnswerContent = useRef(null);
    const inputAttachmentFile = useRef(null);

    const fileBaseUrl = apiPath.api_file;
    const [fileList, setFileList] = useState([]);
    const [commentFileList, setCommentFileList] = useState([]);

    useEffect(() => {
        // 수정일 경우 디폴트 세팅
        isModData && setDefaultValue();
    }, []);

    const setDefaultValue = () => {
        selectShowYn.current.value = modData.show_yn;
        inputSubjectKo.current.value = modData.subject_ko;
        inputSubTitleKo.current.value = modData.sub_title_ko;
        inputContentKo.current.value = modData.content_ko;
        setFileList(modData.file_info);

        if (modData.comment_info.length != 0) {
            inputAnswerContent.current.value = modData.comment_info[0].content;
            setCommentFileList(modData.comment_info[0].file_info ?? []);
        }
    };

    // 파일 첨부시
    const attachFile = (input) => {
        const maxFileCnt = 5; // 첨부파일 최대 개수

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

    // 등록 or 수정
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            const formData = new FormData();
            let url;
            let data = {};
            let fileArr = [];
             

             data = {
                 boardIdx: isModData && modData.board_idx,
                 commentType : "100",
                 showYn: selectShowYn.current.value,
                 //boardType: boardType.consulting,
                 //categoryType: isModData && modData.category_type_cd,
                 subject: inputSubjectKo.current.value,
                 subTitle: inputSubTitleKo.current.value,
                 content: inputAnswerContent.current.value,
 
             };
 
             if (method === "reg") {
                 // /v1/_comment
                 // POST MULTI
                 // 문의 답변 등록
                 data.targetIdx = modData.board_idx;
                 url = apiPath.api_admin_reg_comment;
             } else if (method === "mod") {
                // 상담게시판 답변은 1개이기때문에.. 지정했는데 좋은방법이있다면 해주세요
                let commentIdxVal = modData.comment_info[0].comment_idx;
                 // /v1/_comment
                 // PUT MULTI
                 // 문의 답변 수정
                 data.commentIdx = commentIdxVal;
                 url = apiPath.api_admin_mod_comment;
             }

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
                method: method === "reg" ? "post_multi" : method === "mod" ? "put_multi" : "",
                url: url, // /v1/board
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
                                ? "답변 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "답변 수정이 완료 되었습니다"
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
            message: "답변을 삭제 하시겠습니까?",
            callback: () => removeBoard(),
        });
    };

    // 삭제
    const removeBoard = () => {
        setIsSpinner(true);

        // /v1/board/{board_idx}
        // DELETE
        // 게시판 삭제
        let url = apiPath.api_admin_remove_comment + modData.comment_info[0].comment_idx;

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
                    message: "답변이 삭제 되었습니다.",
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

        if (!inputAnswerContent.current.value && inputAttachmentFile.current.files.length === 0) {
            noti(inputAnswerContent, "내용을 입력해주세요");

            return false;
        }

        return true;
    };

    return (
        <div className="admin">
            <table className="table_bb">
                <colgroup>
                    <col width="30%" />
                    <col width="*" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>노출여부</th>
                        <td>
                            <select
                                className="wp100"
                                ref={selectShowYn}
                                disabled={true}
                            >
                                <option value="Y">노출</option>
                                <option value="N">비노출</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input
                                type="text"
                                className="input wp100"
                                readOnly={true}
                                disabled={true}
                                ref={inputSubjectKo}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>부제목</th>
                        <td>
                            <input
                                type="text"
                                className="input wp100"
                                readOnly={true}
                                disabled={true}
                                ref={inputSubTitleKo}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea
                                className="textarea_basic"
                                ref={inputContentKo}
                                readOnly={true}
                                disabled={true}
                            ></textarea>
                        </td>
                    </tr>
                    {isModData && (
                        <>
                            <tr>
                                <th>조회수</th>
                                <td>{modData.view_count}</td>
                            </tr>
                            <tr>
                                <th>등록자</th>
                                <td>{modData.reg_user_name_ko}</td>
                            </tr>
                            <tr>
                                <th>등록일</th>
                                <td>{modData.reg_dttm}</td>
                            </tr>
                            <tr>
                                <th>파일</th>
                                <td className="fileicon">
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
                        </>
                    )}
                </tbody>
            </table>

            <h4 className="mo_subtitle">답변내용</h4>
            <table className="table_bb">
                <colgroup>
                    <col width="30%" />
                    <col width="*" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>상태</th>
                        <td>{modData.process_status}</td>
                    </tr>
                    <tr>
                        <th>답변 내용</th>
                        <td>
                            <textarea
                                className="textarea_basic"
                                ref={inputAnswerContent}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>파일</th>
                        <td className="fileicon">
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
                                {commentFileList.length !== 0 &&
                                    commentFileList.map((item, idx) => (
                                        <div key={`file_${idx}`}>
                                            <Link
                                                to={`${fileBaseUrl}${item.file_path_enc}`}
                                            >
                                                <img
                                                    src="img/common/file.svg"
                                                    alt=""
                                                />
                                                {item.file_name}{" "}
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="subbtn_box">
                {modData.process_status_cd === "100" ? (
                    <Link className="subbtn on" onClick={() => regModBoard("reg")}>
                        등록
                    </Link>
                ) : (
                    <>
                        <Link
                            className="subbtn del"
                            onClick={clickRemove}
                        >
                            삭제
                        </Link>
                        <Link className="subbtn on" onClick={() => regModBoard("mod")}>
                            수정
                        </Link>
                    </>
                )}

                <Link className="subbtn off" onClick={handleModalClose}>
                    취소
                </Link>
            </div>
        </div>
    );
};

export default ConsultingBoardModalMain;
