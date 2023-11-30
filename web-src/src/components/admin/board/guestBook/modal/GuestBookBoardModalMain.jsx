import React, { useEffect, useRef } from "react";
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

const GuestBookBoardModalMain = (props) => {
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
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const email = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const affiliation = useRef(null);

    useEffect(() => {
        // 수정일 경우 디폴트 세팅
        isModData && setDefaultValue();
    }, []);


    // !TODO 오류확인 필요
    const setDefaultValue = () => {
        // nameFirstEn.current.value = modData.user_name_first_en ?? "";
        // nameLastEn.current.value = modData.user_name_last_en ?? "";
        // email.current.value = modData.email ?? "";
        // mobile1.current.value = modData.mobile1 ?? "";
        // mobile2.current.value = modData.mobile2 ?? "";
        // mobile3.current.value = modData.mobile3 ?? "";
        // affiliation.current.value = modData.content_en ?? "";
    };

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
                boardType: boardType.guestBook,
                categoryType: categoryTypeVal,
                subjectKo: modData.subject_ko,
                subTitleKo: modData.sub_title_ko,
                userNameFirstEn: nameFirstEn.current.value,
                userNameLastEn: nameLastEn.current.value,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                email: email.current.value,
                contentKo: affiliation.current.value,
                contentEn: affiliation.current.value,
                regUserNameEn: nameFirstEn.current.value + ' ' + nameLastEn.current.value,
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
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
                                ? "방명록 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "방명록 수정이 완료 되었습니다"
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
            message: "방명록을 삭제 하시겠습니까?",
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
                    message: "방명록이 삭제 되었습니다.",
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

        return true;
    };

    return (
        <>
            <div className="admin">
                <table className="table_bb">
                    <colgroup>
                        <col width="*" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                NAME <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={nameFirstEn}
                                    placeholder="First Name"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={nameLastEn}
                                    placeholder="Last Name"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                TEL <span className="red">*</span>
                            </th>
                            <td colSpan>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mobile1}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mobile2}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mobile3}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                E-MAIL <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={email}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                AFFILIATION <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={affiliation}
                                ></input>
                            </td>
                        </tr>
                        
                        {isModData && (
                            <>
                                <tr>
                                    <th>등록자</th>
                                    <td colSpan="3">{ modData.reg_user_name_en }</td>
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

export default GuestBookBoardModalMain;
