import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { boardModel } from "models/board/board";
import { boardType } from "common/js/static";
import { routerPath } from "webPath";
import CountrySelect from "common/js/commonComponents/CountrySelect";

// ------------------- import End --------------------

const GuestBookMain = () => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // states
    const [selectedCountry, setSelectedCountry] = useState("62");

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

            // !TODO 소속(AFFILIATION) 데이터 어디 파라미터로 넘길지 확인
            data = {
                ...model,
                boardType: boardType.guestBook,
                subjectKo: "방명록",
                subjectEn: "GuestBook",
                subTitleKo: "방명록",
                subTitleEn: "GuestBook",
                userNameFirstEn: nameFirstEn.current.value,
                userNameLastEn: nameLastEn.current.value,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                email: email.current.value,
                contentKo: affiliation.current.value,
                contentEn: affiliation.current.value,
                regUserNameEn:
                    nameFirstEn.current.value + " " + nameLastEn.current.value,
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

        // !TODO 영문 피드백 작성 부탁드립니다.
        // if (!nameFirstEn.current.value) {
        //     noti(nameFirstEn, "제목을 입력해주세요");

        //     return false;
        // }

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
                                            <CountrySelect
                                                onChange={(e, value) =>
                                                    setSelectedCountry(value)
                                                }
                                                defaultValue={selectedCountry}
                                                mode={"en"}
                                            />
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
