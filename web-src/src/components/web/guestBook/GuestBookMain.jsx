import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { boardModel } from "models/board/board";
import { boardType } from "common/js/static";
import { routerPath } from "webPath";

// ------------------- import End --------------------

const GuestBookMain = () => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // refs
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const email = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const affiliation = useRef(null);

    // 등록
    const regBoard = () => {
        if (validation()) {
            setIsSpinner(true);

            const model = boardModel;
            const formData = new FormData();

            // /v1/_board
            // POST MULTI
            // 게시판 등록
            let url = apiPath.api_admin_reg_board;
            let data = {};

            data = {
                ...model,
                boardType: boardType.guestBook,
                subjectKo: "방명록",
                subjectEn: "GuestBook",
                subTitleKo: "방명록",
                subTitleEn: "GuestBook",
                interPhoneNumber: "62",
                userNameFirstEn: nameFirstEn.current.value,
                userNameLastEn: nameLastEn.current.value,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                email: email.current.value,
                contentKo: affiliation.current.value,
                contentEn: affiliation.current.value,
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const restParams = {
                method: "post_multi",
                url: url,
                data: formData,
                err: err,
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
                        message: "Guestbook registration has been completed.",
                        callback: () => handleNeedUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "Please try again in a few minutes",
                    });
                }
            };
        }
    };

    // 리스트 새로고침
    const handleNeedUpdate = () => {
        // 입력값 초기화
        nameLastEn.current.value = null;
        nameFirstEn.current.value = null;
        email.current.value = null;
        mobile1.current.value = null;
        mobile2.current.value = null;
        mobile3.current.value = null;
        affiliation.current.value = null;
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

        // !TODO 영문 피드백 확인 필요
        if (!nameFirstEn.current.value) {
            noti(nameFirstEn, "Please enter your first name");

            return false;
        }

        if (!nameLastEn.current.value) {
            noti(nameLastEn, "Please enter your last name");

            return false;
        }

        if (!mobile1.current.value || !mobile2.current.value || !mobile3.current.value) {
            noti(mobile1, "Please enter your phone number");

            return false;
        }

        if (!email.current.value) {
            noti(email, "Please enter your e-mail");

            return false;
        }

        if (!affiliation.current.value) {
            noti(affiliation, "Please enter your affiliation");

            return false;
        }

        return true;
    };

    return (
        <div id="guest">
            <div id="guest_book">
                <Link to={routerPath.web_main_url} className="guest_home_btn">
                    ■
                </Link>
                <div>
                    <div className="signup">
                        <div className="boxing">
                            <table>
                                <colgroup>
                                    <col width="20%" />
                                    <col width="*" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>NAME</th>
                                        <td>
                                            <input
                                                type="text"
                                                ref={nameFirstEn}
                                                className="input_h"
                                                placeholder="First Name"
                                                required
                                            />
                                            &nbsp;
                                            <input
                                                type="text"
                                                ref={nameLastEn}
                                                className="input_h"
                                                placeholder="Last Name"
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>TEL</th>
                                        <td>
                                            <input
                                                type="text"
                                                ref={mobile1}
                                                className="input_m"
                                                required
                                            />
                                            &nbsp;-&nbsp;
                                            <input
                                                type="text"
                                                ref={mobile2}
                                                className="input_m"
                                                required
                                            />
                                            &nbsp;-&nbsp;
                                            <input
                                                type="text"
                                                ref={mobile3}
                                                className="input_m"
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>E-MAIL</th>
                                        <td>
                                            <input
                                                type="text"
                                                ref={email}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>AFFILIATION</th>
                                        <td>
                                            <input
                                                type="text"
                                                ref={affiliation}
                                                className=""
                                                placeholder=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn_box">
                            <input
                                type="submit"
                                value="SUBMIT"
                                name=""
                                onClick={regBoard}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestBookMain;
