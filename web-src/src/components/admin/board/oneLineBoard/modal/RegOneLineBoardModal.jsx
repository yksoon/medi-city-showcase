import { Link } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useRef, useState } from "react";
import { apiPath } from "webPath";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import useAlert from "hook/useAlert";
import { boardModel } from "models/board/board";
import { successCode } from "resultCode";
import useConfirm from "hook/useConfirm";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, userInfoAdminAtom } from "recoils/atoms";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RegOneLineBoardModal = (props) => {
    // const dispatch = useDispatch();
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [img, setImg] = useState({});
    const imgUrl = apiPath.api_captcha_img;
    // const [boardData, setBoardData] = useState("");

    // const userInfoAdmin = useSelector(
    //     (state) => state.userInfoAdmin.userInfoAdmin
    // );
    const userInfoAdmin = useRecoilValue(userInfoAdminAtom);

    const inputTitle = useRef(null);
    const inputCaptcha = useRef(null);
    const inputName = useRef(null);
    const inputMobile1 = useRef(null);
    const inputMobile2 = useRef(null);
    const inputMobile3 = useRef(null);

    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        content: props.content,
        handleModalClose: props.handleModalClose,
    };

    const modOneLine = props.modOneLine ? props.modOneLine : null;

    const handleNeedUpdate = props.handleNeedUpdate;

    useEffect(() => {
        // 캡차이미지
        setImg({
            imageSrc: imgUrl,
            imageHash: Date.now(),
        });

        getDefaultValue();
    }, []);

    // 수정일경우 디폴트 세팅
    const getDefaultValue = () => {
        // 내용
        inputTitle.current.value = modOneLine.subject;

        inputName.current.value = modOneLine.reg_user_name_ko;

        inputMobile1.current.value = modOneLine.mobile1;
        inputMobile2.current.value = modOneLine.mobile2;
        inputMobile3.current.value = modOneLine.mobile3;
    };

    // 캡차이미지 새로고침
    const refreshCaptcha = () => {
        setImg({
            imageSrc: imgUrl,
            imageHash: Date.now(),
        });
    };

    // 수정, 등록 완료 로직
    const requestBoardList = () => {
        // 리스트 새로고침
        handleNeedUpdate();

        // 모달 닫기
        modalOption.handleModalClose();
    };

    // 등록
    const regBoard = () => {
        // console.log(boardData);

        if (validation()) {
            // dispatch(
            //     set_spinner({
            //         isLoading: true,
            //     })
            // );

            setIsSpinner(true);

            const formData = new FormData();
            const model = boardModel;

            let data = {};

            let fileArr = [];

            data = {
                ...model,
                boardType: "400",
                mainSubject: inputTitle.current.value,
                subTitle: "",
                mainContent: "",
                showYn: "Y",
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // 파일 formData append
            // fileArr = Array.from(inputAttachmentFile.current.files);
            // let len = fileArr.length;
            // for (let i = 0; i < len; i++) {
            //     formData.append("attachmentFile", fileArr[i]);
            // }

            // 등록
            // /v1/board
            // POST mulit
            const url = apiPath.api_admin_board;

            const restParams = {
                method: "post_multi",
                url: url, // /v1/_user
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);

            const responsLogic = (res) => {
                let result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "게시글 등록이 완료 되었습니다",
                        callback: () => requestBoardList(),
                    });
                } else {
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

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
        if (!modOneLine) {
            // 내용
            if (!inputTitle.current.value) {
                inputTitle.current.blur();
                boardAlert({
                    msg: "내용을 입력해주세요",
                    ref: inputTitle,
                });
                return false;
            }

            // 캡차
            if (!inputCaptcha.current.value) {
                inputCaptcha.current.blur();
                boardAlert({
                    msg: "자동입력방지 코드를 입력해주세요",
                    ref: inputCaptcha,
                });
                return false;
            }
        } else {
            // 내용
            if (!inputTitle.current.value) {
                inputTitle.current.blur();
                boardAlert({
                    msg: "내용을 입력해주세요",
                    ref: inputTitle,
                });
                return false;
            }
        }

        return true;
    };

    // 알럿
    const boardAlert = (params) => {
        CommonNotify({
            type: "alert",
            hook: alert,
            message: params.msg,
            callback: () => focusFunc(params.ref),
        });
    };

    // 포커스
    const focusFunc = (ref) => {
        ref.current.focus();
    };

    // 수정
    const modBoard = () => {
        if (validation()) {
            // dispatch(
            //     set_spinner({
            //         isLoading: true,
            //     })
            // );

            setIsSpinner(true);

            const formData = new FormData();
            const model = boardModel;
            let data = {};

            let fileArr = [];

            data = {
                ...model,
                showYn: "Y",
                boardIdx: modOneLine.board_idx,
                boardType: "400",
                channelType: "000",
                categoryType: "900",
                subject: inputTitle.current.value,
                subTitle: inputTitle.current.value,
                alimYn: "N",
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const responsLogic = (res) => {
                let result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "게시물 수정이 완료 되었습니다",
                        callback: () => requestBoardList(),
                    });
                } else {
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }
            };

            // 수정
            // /v1/board
            // PUT MULTI
            const restParams = {
                method: "put_multi",
                url: apiPath.api_admin_mod_board, // /v1/board
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);
        }
    };

    // 삭제
    const removeBoard = (board_idx) => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "게시글을 삭제하시겠습니까?",
            callback: () => removeLogic(),
        });

        const removeLogic = () => {
            // dispatch(
            //     set_spinner({
            //         isLoading: true,
            //     })
            // );

            setIsSpinner(true);

            const data = {};
            const url = apiPath.api_admin_remove_board + `/${board_idx}`;

            // console.log(url);
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
                    // dispatch(
                    //     set_spinner({
                    //         isLoading: false,
                    //     })
                    // );

                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: `게시글이 삭제 되었습니다.`,
                        callback: () => requestBoardList(),
                    });
                }
            };
        };
    };

    return (
        <>
            <div className="admin">
                <table className="table_bb">
                    <colgroup>
                        <col width="30%" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td>
                                {modOneLine ? (
                                    <input
                                        type="text"
                                        className="input hold wp100"
                                        ref={inputName}
                                        readOnly
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className="input wp100"
                                        ref={inputName}
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>
                                {modOneLine ? (
                                    <>
                                        <input
                                            type="tel"
                                            className="input hold w120"
                                            id="phone_num1"
                                            defaultValue="010"
                                            ref={inputMobile1}
                                            readOnly
                                        />
                                        <input
                                            type="tel"
                                            className="input hold w120"
                                            id="phone_num2"
                                            ref={inputMobile2}
                                            readOnly
                                        />
                                        <input
                                            type="tel"
                                            className="input hold w120"
                                            id="phone_num3"
                                            ref={inputMobile3}
                                            readOnly
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="tel"
                                            className="input w120"
                                            id="phone_num1"
                                            defaultValue="010"
                                            ref={inputMobile1}
                                        />
                                        <input
                                            type="tel"
                                            className="input w120"
                                            id="phone_num2"
                                            ref={inputMobile2}
                                        />
                                        <input
                                            type="tel"
                                            className="input w120"
                                            id="phone_num3"
                                            ref={inputMobile3}
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name=""
                                    id=""
                                    className="talk_txt"
                                    ref={inputTitle}
                                ></textarea>
                            </td>
                        </tr>
                        {!modOneLine && (
                            <tr>
                                <th>자동등록방지</th>
                                <td>
                                    <div className="cap_wrap">
                                        <div>
                                            <span className="cap">
                                                <img
                                                    className="imgClass"
                                                    id="captchaImg"
                                                    src={`${img.imageSrc}?${img.imageHash}`}
                                                    alt=""
                                                    decoding="async"
                                                    style={{
                                                        background: "white",
                                                    }}
                                                />
                                            </span>
                                            <span className="cap_refresh">
                                                <Link
                                                    onClick={(e) => {
                                                        refreshCaptcha();
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    <RefreshIcon />
                                                    새로고침
                                                </Link>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input_s"
                                            ref={inputCaptcha}
                                        />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {modOneLine && (
                            <tr>
                                <th>등록일</th>
                                <td>{modOneLine.reg_dttm}</td>
                            </tr>
                        )}
                        {modOneLine ? (
                            modOneLine.mod_dttm ? (
                                <tr>
                                    <th>수정일</th>
                                    <td>{modOneLine.mod_dttm}</td>
                                </tr>
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
                <div className="btn_box">
                    {modOneLine ? (
                        <>
                            <Link className="btn btn01" onClick={modBoard}>
                                수정
                            </Link>
                            {userInfoAdmin.user_role_cd === "000" && (
                                <Link
                                    className="btn btn02"
                                    onClick={() =>
                                        removeBoard(modOneLine.board_idx)
                                    }
                                >
                                    삭제
                                </Link>
                            )}
                        </>
                    ) : (
                        <Link className="btn btn01" onClick={regBoard}>
                            등록
                        </Link>
                    )}

                    <Link
                        className="btn btn02"
                        onClick={modalOption.handleModalClose}
                    >
                        취소
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegOneLineBoardModal;
