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

        if (modData.comment_info !== null) {
            inputAnswerContent.current.value = modData.comment_info.content;
            setCommentFileList(modData.comment_info.file_info ?? []);
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

    // 등록
    // const regBoarTest = (method) => {
    //     if (validation()) {
    //         setIsSpinner(true);

    //         const model = boardModel;
    //         const formData = new FormData();
    //         let data = {};
    //         let fileArr = [];

    //         // /v1/_board
    //         // POST MULTI
    //         // 게시판 등록
    //         let url = apiPath.api_admin_reg_board;

    //         data = {
    //             ...model,
    //             showYn: selectShowYn.current.value,
    //             boardType: boardType.consulting,
    //             categoryType: "900",
    //             subjectKo: inputSubjectKo.current.value,
    //             subTitleKo: inputSubTitleKo.current.value,
    //             contentKo: inputContentKo.current.value,
    //         };

    //         // 기본 formData append
    //         for (const key in data) {
    //             formData.append(key, data[key]);
    //         }

    //         // 파일 formData append
    //         fileArr = Array.from(inputAttachmentFile.current.files);
    //         let len = fileArr.length;
    //         for (let i = 0; i < len; i++) {
    //             formData.append("attachmentFile", fileArr[i]);
    //         }

    //         const restParams = {
    //             method:
    //                 method === "reg" ? "post_multi" : method === "mod" ? "put_multi" : "",
    //             url: url,
    //             data: formData,
    //             err: err,
    //             admin: "Y",
    //             callback: (res) => responseLogic(res),
    //         };

    //         CommonRest(restParams);

    //         const responseLogic = (res) => {
    //             let result_code = res.headers.result_code;
    //             if (result_code === successCode.success) {
    //                 setIsSpinner(false);

    //                 CommonNotify({
    //                     type: "alert",
    //                     hook: alert,
    //                     message:
    //                         method === "reg"
    //                             ? "게시글 등록이 완료 되었습니다"
    //                             : method === "mod"
    //                             ? "게시글 수정이 완료 되었습니다"
    //                             : "",
    //                     callback: () => handleNeedUpdate(),
    //                 });
    //             } else {
    //                 setIsSpinner(false);

    //                 CommonNotify({
    //                     type: "alert",
    //                     hook: alert,
    //                     message: "잠시 후 다시 시도해주세요",
    //                 });
    //             }
    //         };
    //     }
    // };


    // 등록
    const regBoard = () => {
        setIsSpinner(true);

        const formData = new FormData();
        let data = {};

        let fileArr = [];

        data = {
            showYn: selectShowYn.current.value,
            boardType: boardType.consulting,
            boardIdx: isModData && modData.board_idx,
            categoryType: isModData && modData.category_type_cd,
            subject: inputSubjectKo.current.value,
            subTitle: inputSubTitleKo.current.value,
            content: inputAnswerContent.current.value,
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
            method: "post_multi",
            url: apiPath.api_admin_reg_comment, // /v1/board
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
                    message: "답변 등록이 완료 되었습니다",
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
    };

    // 수정
    const modBoard = () => {
        setIsSpinner(true);

        const formData = new FormData();
        let data = {};

        let fileArr = [];

        data = {
            showYn: selectShowYn.current.value,
            boardType: boardType.consulting,
            boardIdx: isModData && modData.board_idx,
            categoryType: isModData && modData.category_type_cd,
            subject: inputSubjectKo.current.value,
            subTitle: inputSubTitleKo.current.value,
            content: inputAnswerContent.current.value,
            commentIdx: modData.comment_info.comment_idx,
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
            method: "put_multi",
            url: apiPath.api_admin_reg_comment, // /v1/board
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
                    message: "답변 수정이 완료 되었습니다",
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
                {/*{isModData ? (*/}
                {/*    <>*/}
                {/*        <Link*/}
                {/*            className="subbtn del"*/}
                {/*            // onClick={clickRemove}*/}
                {/*        >*/}
                {/*            삭제*/}
                {/*        </Link>*/}
                {/*        <Link*/}
                {/*            className="subbtn on"*/}
                {/*            onClick={modBoard}*/}
                {/*        >*/}
                {/*            수정*/}
                {/*        </Link>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <Link*/}
                {/*        className="subbtn on"*/}
                {/*        // onClick={regTerms}*/}
                {/*    >*/}
                {/*        등록*/}
                {/*    </Link>*/}
                {/*)}*/}
                {modData.process_status_cd === "100" ? (
                    <Link className="subbtn on" onClick={regBoard}>
                        등록
                    </Link>
                ) : (
                    <>
                        <Link
                            className="subbtn del"
                            // onClick={clickRemove}
                        >
                            삭제
                        </Link>
                        <Link className="subbtn on" onClick={modBoard}>
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
