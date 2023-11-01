import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
// import Select from "react-select";
import { apiPath } from "webPath";
import useAlert from "hook/useAlert";
import { signupMultiModel } from "models/user/signUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { successCode } from "resultCode";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";

const RegUserModal = (props) => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        content: props.content,
        handleModalClose: props.handleModalClose,
    };

    const modUserData = props.modUserData ? props.modUserData : null;

    const handleNeedUpdate = props.handleNeedUpdate;

    const [idStatus, setIdStatus] = useState(false);
    const [programInfo, setProgramInfo] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [img, setImg] = useState({});
    const imgUrl = apiPath.api_captcha_img;
    const fileBaseUrl = apiPath.api_file;

    const inputID = useRef(null);
    const inputFirstNameKo = useRef(null);
    const inputLastNameKo = useRef(null);
    const inputMobile1 = useRef(null);
    const inputMobile2 = useRef(null);
    const inputMobile3 = useRef(null);
    const inputOrganization = useRef(null);
    const inputDepartment = useRef(null);
    const inputSpecialized = useRef(null);
    const inputBirth = useRef(null);
    const inputAttachmentFile = useRef(null);
    const inputCaptcha = useRef(null);
    const inputMemo = useRef(null);

    useEffect(() => {
        // 캠차이미지
        setImg({
            imageSrc: imgUrl,
            imageHash: Date.now(),
        });

        // 참여프로그램
        getInfo();

        // mod인경우
        if (modUserData) {
            getDefaultValue();
        }
    }, []);

    // 참여프로그램 받아오기
    const getInfo = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        const responsLogic = (res) => {
            let resultInfo = res.data.result_info;

            setProgramInfo(resultInfo);

            // dispatch(
            //     set_spinner({
            //         isLoading: false,
            //     })
            // );

            setIsSpinner(false);

            if (modUserData) {
                // 참여프로그램 세팅
                let additionalArr = [];
                let length = modUserData.additional_info.length;

                for (let i = 0; i < length; i++) {
                    additionalArr.push(
                        modUserData.additional_info[i].additional_idx
                    );
                }

                setCheckItems(additionalArr);
            }
        };

        const restParams = {
            method: "get",
            url: apiPath.api_get_additional,
            data: {},
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);
    };

    // 수정일경우 디폴트 세팅
    const getDefaultValue = () => {
        // 생일 가공
        const year = modUserData.birth_yyyy;
        const month = modUserData.birth_mm;
        const day = modUserData.birth_dd;
        const birthday = year + "-" + month + "-" + day;

        inputBirth.current.value = birthday;

        // 파일
        const files = modUserData ? modUserData.file_info : [];

        setFileList(files);

        inputID.current.value = modUserData.user_id;
        inputFirstNameKo.current.value = modUserData.user_name_first_ko;
        inputLastNameKo.current.value = modUserData.user_name_last_ko;
        inputMobile1.current.value = modUserData.mobile1;
        inputMobile2.current.value = modUserData.mobile2;
        inputMobile3.current.value = modUserData.mobile3;
        inputOrganization.current.value = modUserData.organization_name_ko;
        inputDepartment.current.value = modUserData.department_name_ko;
        inputSpecialized.current.value = modUserData.specialized_name_ko;
        inputMemo.current.value = modUserData.user_memo;
    };

    // 회원등록
    const signupUser = () => {
        if (checkValidation("signup")) {
            idDuplicateCheck();
        }
    };

    // 아이디 중복 체크
    const idDuplicateCheck = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        // /user/_check
        // POST
        const user_chk_url = apiPath.api_user_check;
        const data = {
            signup_type: "000",
            user_id: `${inputID.current.value}`,
        };

        const restParams = {
            method: "put_multi",
            url: user_chk_url, // /user/_check
            data: data,
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            // console.log(res);

            if (res.headers.result_code === successCode.success) {
                // setIdStatus(true);
                console.log(res);

                regUser();
            } else if (res.headers.result_code === "1000") {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });

                // setIdStatus(false);
                console.log(res);
            }
        };
    };

    // 신규등록
    const regUser = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        const formData = new FormData();
        const model = signupMultiModel;
        let data = {};

        let fileArr = [];

        // 생년월일 가공
        const birthArr = inputBirth.current.value
            ? inputBirth.current.value.split("-")
            : "";

        data = {
            ...model,
            userId: inputID.current.value,
            // userPwd: signUpRefs.inputPW.current.value,
            userNameFirstKo: inputFirstNameKo.current.value,
            userNameLastKo: inputLastNameKo.current.value,
            mobile1: inputMobile1.current.value,
            mobile2: inputMobile2.current.value,
            mobile3: inputMobile3.current.value,
            organizationNameKo: inputOrganization.current.value,
            departmentNameKo: inputDepartment.current.value,
            birthYyyy: birthArr[0],
            birthMm: birthArr[1],
            birthDd: birthArr[2],
            specializedNameKo: inputSpecialized.current.value,
            additionalIdxs: checkItems.join(),
            securityCode: inputCaptcha.current.value,
            userMemo: inputMemo.current.value,
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
                    message: "사전등록이 완료 되었습니다",
                    callback: () => requestUserInfo(),
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

        // 등록
        // /v1/user
        // POST mulit
        const url = apiPath.api_auth_reg_user;

        const restParams = {
            method: "post_multi",
            url: url, // /v1/_user
            data: formData,
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);
    };

    // 등록된거 수정
    const modUser = () => {
        if (checkValidation("mod")) {
            // dispatch(
            //     set_spinner({
            //         isLoading: true,
            //     })
            // );

            setIsSpinner(true);

            const formData = new FormData();
            const model = signupMultiModel;
            let data = {};

            let fileArr = [];

            // 생년월일 가공
            const birthArr = inputBirth.current.value
                ? inputBirth.current.value.split("-")
                : "";

            data = {
                ...model,
                signupType: "000",
                userIdx: modUserData.user_idx,
                userId: inputID.current.value,
                userNameFirstKo: inputFirstNameKo.current.value,
                userNameLastKo: inputLastNameKo.current.value,
                interPhoneNumber: "82",
                mobile1: inputMobile1.current.value,
                mobile2: inputMobile2.current.value,
                mobile3: inputMobile3.current.value,
                birthYyyy: birthArr[0],
                birthMm: birthArr[1],
                birthDd: birthArr[2],
                additionalIdxs: checkItems.join(),
                organizationNameKo: inputOrganization.current.value,
                departmentNameKo: inputDepartment.current.value,
                specializedNameKo: inputSpecialized.current.value,
                organizationIdx: modUserData.organization_idx,
                specializedIdx: modUserData.specialized_idx,
                departmentIdx: modUserData.department_idx,
                userMemo: inputMemo.current.value,
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
                        message: "사전등록 수정이 완료 되었습니다",
                        callback: () => requestUserInfo(),
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
            // /v1/user
            // PUT
            const restParams = {
                method: "put_multi",
                url: apiPath.api_auth_reg_user, // /v1/_user
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);
        }
    };

    // 수정, 등록 완료 로직
    const requestUserInfo = () => {
        // 리스트 새로고침
        handleNeedUpdate();

        // 모달 닫기
        modalOption.handleModalClose();
    };

    // 검증 (signup/mod)
    const checkValidation = (type) => {
        // 등록
        if (type === "signup") {
            // 아이디
            if (!inputID.current.value) {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "아이디를 입력해주세요",
                });

                inputMobile2.current.focus();
                return false;
            }
        }
        // 등록 END

        // 휴대전화
        if (
            !inputMobile1.current.value ||
            !inputMobile2.current.value ||
            !inputMobile3.current.value
        ) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "휴대전화를 입력해주세요",
            });

            inputMobile2.current.focus();
            return false;
        }

        // 성명
        if (!inputFirstNameKo.current.value || !inputLastNameKo.current.value) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "성명을 입력해주세요",
            });
            inputFirstNameKo.current.focus();
            return false;
        }

        return true;
    };

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 캠차이미지 새로고침
    const refreshCaptcha = () => {
        setImg({
            imageSrc: imgUrl,
            imageHash: Date.now(),
        });
    };

    // 파일 첨부시
    const attachFile = (input) => {
        console.log(input.files);
        const maxFileCnt = 5; // 첨부파일 최대 개수

        if (input.files.length > maxFileCnt) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "이미지는 5장까지 업로드 가능합니다.",
            });

            input.value = "";

            return false;
        }
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
                            <th>ID</th>
                            <td>
                                {modUserData ? (
                                    <input
                                        type="email"
                                        className="input hold w180"
                                        ref={inputID}
                                        readOnly
                                    />
                                ) : (
                                    <input
                                        type="email"
                                        className="input w180"
                                        ref={inputID}
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input
                                    type="name"
                                    className="input w120"
                                    placeholder="성"
                                    ref={inputFirstNameKo}
                                />
                                <input
                                    type="name"
                                    className="input w120"
                                    placeholder="이름"
                                    ref={inputLastNameKo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>
                                <div id="phone_num" className="m0">
                                    <input
                                        type="tel"
                                        className="input w120"
                                        id="phone_num1"
                                        defaultValue="010"
                                        ref={inputMobile1}
                                        readOnly
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
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>학교</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    ref={inputOrganization}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>학과</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    ref={inputDepartment}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>학번</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    ref={inputMemo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>
                                <input
                                    type="date"
                                    name=""
                                    className="input input_date"
                                    ref={inputBirth}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>희망직종</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    ref={inputSpecialized}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>참여프로그램</th>
                            <td>
                                {programInfo &&
                                    programInfo.map((item, idx) => (
                                        <div
                                            key={`programsLabel_${idx}`}
                                            style={{ padding: "3px 0" }}
                                        >
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={item.additional_idx}
                                                    onChange={(e) =>
                                                        handleSingleCheck(
                                                            e.target.checked,
                                                            item.additional_idx
                                                        )
                                                    }
                                                    checked={
                                                        checkItems.includes(
                                                            item.additional_idx
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                />{" "}
                                                <b>{item.additional_name_ko}</b>{" "}
                                                ({item.additional_memo})
                                            </label>
                                        </div>
                                    ))}
                            </td>
                        </tr>

                        <tr>
                            <th>이력서업로드</th>
                            <td className="fileicon">
                                <div style={{ marginBottom: 5 }}>
                                    <b>
                                        여러 파일 선택이 가능합니다. 여러 파일
                                        선택 시 ctrl 누른 후 선택하시면 됩니다.
                                    </b>
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        ref={inputAttachmentFile}
                                        multiple
                                        onChange={(e) => attachFile(e.target)}
                                    />
                                </div>
                                <div>
                                    {fileList.length !== 0 &&
                                        fileList.map((item, idx) => (
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
                        {modUserData && (
                            <tr>
                                <th>등록일</th>
                                <td>{modUserData.reg_dttm}</td>
                            </tr>
                        )}
                        {modUserData ? (
                            modUserData.mod_dttm ? (
                                <tr>
                                    <th>수정일</th>
                                    <td>{modUserData.mod_dttm}</td>
                                </tr>
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )}
                        {modUserData ? (
                            <></>
                        ) : (
                            <tr>
                                <th>자동입력방지</th>
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
                        {/* <tr>
                        <th>국적</th>
                        <td>
                            <Select
                                className="select"
                                options={selectCountryOptions}
                                defaultValue={
                                    modUserData
                                        ? selectCountryOptions.find(
                                              (e) =>
                                                  e.value ===
                                                  modUserData.inter_phone_number
                                          )
                                        : selectCountryOptions.find(
                                              (e) => e.value === "82"
                                          )
                                }
                                key={
                                    modUserData
                                        ? modUserData.inter_phone_number
                                        : "82"
                                }
                                styles={customStyles}
                                onChange={(e) => {
                                    setSelectedCountry(e.value);
                                }}
                            />
                        </td>
                    </tr> */}
                    </tbody>
                </table>
                <div className="btn_box">
                    {modUserData ? (
                        <Link className="btn btn01" onClick={modUser}>
                            수정
                        </Link>
                    ) : (
                        <Link className="btn btn01" onClick={signupUser}>
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

export default RegUserModal;
