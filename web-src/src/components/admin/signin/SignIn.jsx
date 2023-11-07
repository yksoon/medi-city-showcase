import useAlert from "hook/useAlert";
import {
    CommonErrModule,
    CommonNotify,
    CommonRest,
    CommonSpinner,
} from "common/js/Common";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import { successCode } from "resultCode";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    isSpinnerAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "recoils/atoms";

const SignIn = () => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const [isSpinner, setIsSpinner] = useRecoilState(isSpinnerAtom);

    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);

    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);
    const navigate = useNavigate();

    const setUserInfoAdmin = useSetRecoilState(userInfoAdminAtom);
    const setUserTokenAdmin = useSetRecoilState(userTokenAdminAtom);

    // const setPage = useSetRecoilState("page");

    const inputID = useRef(null);
    const inputPW = useRef(null);

    useEffect(() => {
        if (userTokenAdmin) {
            navigate(routerPath.admin_main_url);
        } else {
            resetUserInfoAdmin();
            resetUserTokenAdmin();

            inputID.current.focus();
        }
    }, []);

    const clickLogin = () => {
        if (!inputID.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "아이디를 입력해주세요",
            });

            inputID.current.focus();
            return false;
        }
        if (!inputPW.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "비밀번호를 입력해주세요",
            });

            inputPW.current.focus();
            return false;
        }

        login();
    };

    const login = () => {
        setIsSpinner(true);

        // /v1/signin
        // POST
        const url = apiPath.api_auth_signin;
        const data = {
            // signup_type: "000",
            user_id: inputID.current.value,
            user_pwd: inputPW.current.value,
            admin_yn: "Y",
        };

        // 처리 완료 후 로직
        const responsLogic = (res) => {
            let result_code = res.headers.result_code;

            if (result_code === successCode.success) {
                let user_info = res.data.result_info;

                // 블랙리스트
                let deleteKey = [
                    "md_licenses_number",
                    // "signin_policy",
                    // "signin_policy_cd",
                    "user_pwd",
                    "user_role",
                    "user_salt",
                ];

                for (let i = 0; i < deleteKey.length; i++) {
                    delete user_info[deleteKey[i]];
                }

                setUserInfoAdmin(user_info);
                setUserTokenAdmin(user_info.token);

                setIsSpinner(false);

                navigate(routerPath.admin_main_url);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };

        CommonRest(restParams);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            clickLogin(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    return (
        <>
            <div className="wrap">
                <div className="admin">
                    <div className="login_wrap">
                        <div className="login">
                            <h1>
                                <img
                                    src="img/common/adm_logo.png"
                                    alt=""
                                    style={{ width: "210px" }}
                                />
                            </h1>
                            <p>로그인을 해주세요</p>
                            <div className="input_id">
                                <h5>아이디</h5>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="ID"
                                    ref={inputID}
                                    onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
                                />
                            </div>
                            <div>
                                <h5>비밀번호</h5>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="PW"
                                    ref={inputPW}
                                    onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
                                />
                            </div>
                            <div className="flex login_btn">
                                <div>
                                    {/* <input type="checkbox" id="id_remember" />{" "}
                            <label htmlFor="id_remember">아이디 저장</label> */}
                                </div>
                                <div>
                                    <Link
                                        className="subbtn on"
                                        onClick={clickLogin}
                                    >
                                        로그인
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isSpinner && <CommonSpinner />}
        </>
    );
};

export default SignIn;
