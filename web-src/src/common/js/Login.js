import { routerPath } from "webPath";
import { RestServer } from "./Rest";
import { CommonConsole, CommonNotify } from "./Common";
import { successCode } from "resultCode";

export default function Login(
    url,
    data,
    resultCode,
    // dispatch,
    setIsSpinner,
    alert,
    setUserInfo,
    setUserToken
) {
    RestServer("post", url, data)
        .then(function (response) {
            // response
            let user_info;

            let result_code = response.headers.result_code;

            if (result_code === successCode.success) {
                user_info = response.data.result_info;

                // 블랙리스트 (추가한것은 제외)
                let deleteKey = [
                    "md_licenses_number",
                    "signin_policy",
                    "signin_policy_cd",
                    "user_idx",
                    "user_pwd",
                    "user_role",
                    "user_role_cd",
                    "user_salt",
                ];

                for (let i = 0; i < deleteKey.length; i++) {
                    delete user_info[deleteKey[i]];
                }

                // user_info
                // dispatch(set_user_info(JSON.stringify(user_info)));
                setUserInfo(user_info);

                // user_token
                // dispatch(set_user_token(JSON.stringify(user_info)));
                setUserToken(user_info.token);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);

                window.location.replace(routerPath.web_main_url);
            } else if (result_code === "1003") {
                CommonConsole("log", response);

                CommonConsole("decLog", response);
                // CommonConsole("alertMsg", response);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: response.headers.result_message_ko,
                });

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);
            }
        })
        .catch(function (error) {
            // 오류발생시 실행
            CommonConsole("decLog", error);
            // CommonConsole("alertMsg", error);

            CommonNotify({
                type: "alert",
                hook: alert,
                message: error.response.headers.result_message_ko
                    ? error.response.headers.result_message_ko
                    : "잠시 후 다시 시도해주세요.",
            });

            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );
            setIsSpinner(false);
        });
}
