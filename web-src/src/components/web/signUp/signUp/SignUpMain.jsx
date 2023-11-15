import React, { useEffect, useRef, useState } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, isSpinnerAtom } from "recoils/atoms";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { Checkbox } from "@mui/material";
import { commaOfNumber } from "common/js/Pattern";
import { useLocation } from "react-router";

const SignUpMain = (props) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // const [modData, setModData] = useState({});
    // 페이지 정보
    const location = useLocation();
    const isSignup = location.pathname === "/signup/signup";
    const isConfirmation = location.pathname === "/signup/confirmation";

    // console.log(location);

    let modData;
    let isModData;

    if (isConfirmation) {
        modData = location.state ?? {};
        isModData = Object.keys(modData).length !== 0;
    } else {
        modData = {};
        isModData = Object.keys(modData).length !== 0;
    }

    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);

    // 다음 주소검색
    const open = useDaumPostcodePopup();

    const [registrationInfo, setRegistrationInfo] = useState([]);

    useEffect(() => {
        getRegistration();
    }, []);

    // 사전등록 정보 받아오기 REST
    const getRegistration = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_reg + registration_idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                setRegistrationInfo(result_info);

                setIsSpinner(false);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });

                setIsSpinner(false);
            }
        };
    };

    // ------------------------------------------------------------------------------------------------------------------------

    const institutionNameKo = useRef(null);
    const institutionNameEn = useRef(null);
    const addr1Ko = useRef(null);
    const addr2Ko = useRef(null);
    const addr1En = useRef(null);
    const addr2En = useRef(null);
    const zipcode = useRef(null);
    const nameFirstKo = useRef(null);
    const nameLastKo = useRef(null);
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const interPhoneNumber = useRef("82");
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const email = useRef(null);
    const fax1 = useRef(null);
    const fax2 = useRef(null);
    const fax3 = useRef(null);
    const entryPersonNumber = useRef(null);
    const interpretationCostCheck = useRef(null);

    // 참가자 정보
    const [entryInfo, setEntryInfo] = useState([]);

    // 성별 옵션
    const [genderOption, setGenderOption] = useState([]);

    const [totalPriceState, setTotalPriceState] = useState("0");

    const [interpretationCostYn, setInterpretationCostYn] = useState("N");

    useEffect(() => {
        if (isConfirmation) {
            if (isModData) {
                setDefaultEntryInfoFunc();
            } else {
                navigate(routerPath.web_signup_check_entry_url);
            }
        } else {
            setEntryInfoFunc();
        }
    }, [location.pathname]);

    // 사전등록 확인일 경우
    const setDefaultEntryInfoFunc = () => {
        // console.log(modData);

        // 성별
        const genderArr = codes.filter((el) => el.code_type === "GENDER");

        setGenderOption(genderArr);

        institutionNameEn.current.value = modData.institution_name_en;
        zipcode.current.value = modData.zipcode;
        addr1En.current.value = modData.addr1_en;
        addr2En.current.value = modData.addr2_en;
        nameFirstEn.current.value = modData.name_first_en;
        nameLastEn.current.value = modData.name_last_en;
        mobile1.current.value = modData.mobile1;
        mobile2.current.value = modData.mobile2;
        mobile3.current.value = modData.mobile3;
        email.current.value = modData.email;
        fax1.current.value = modData.fax1;
        fax2.current.value = modData.fax2;
        fax3.current.value = modData.fax3;

        interpretationCostCheck.current.checked =
            modData.interpretation_cost_yn === "Y";

        console.log(interpretationCostCheck);

        setEntryInfo(modData.entry_info);
    };

    const handle = {
        // 버튼 클릭 이벤트
        openPost: () => {
            open({
                popupTitle: "showcase.medi-city.co.kr",
                // top: 400,
                // left: 500,
                onComplete: handle.selectAddress,
            });
        },
        // 주소 선택 이벤트
        selectAddress: (data) => {
            zipcode.current.value = data.zonecode;
            addr1Ko.current.value = data.address;
            addr1En.current.value = data.addressEnglish;
        },
    };

    // 참가자 인덱스 재정의
    const setEntryInfoFunc = () => {
        let newArr = [];
        let newObj = {
            birth: "",
            birth_yyyy: "",
            birth_mm: "",
            birth_dd: "",
            duty: "",
            email: "",
            gender: "",
            inter_phone_number: "82",
            mobile1: "",
            mobile2: "",
            mobile3: "",
            name_first_ko: "",
            name_last_ko: "",
            name_first_en: "",
            name_last_en: "",
            people_memo: "",
            position: "",
            relationship_type: "000",
            idx: 1,
        };
        newArr.push(newObj);

        setEntryInfo(newArr);

        // 성별
        const genderArr = codes.filter((el) => el.code_type === "GENDER");

        setGenderOption(genderArr);
    };

    // 담당자와 동일 체크박스 이벤트
    const changeSameInfoChk = (e) => {
        const checked = e.target.checked;
        if (checked) {
            let newArr = entryInfo.filter((el) => el.idx !== entryInfo[0].idx);
            // let orgItem = entryInfo.filter((el) => el.idx === 1)[0];
            let orgItem = entryInfo[0];

            orgItem["name_first_en"] = nameFirstEn.current.value;
            orgItem["name_last_en"] = nameLastEn.current.value;
            orgItem["name_first_ko"] = nameLastEn.current.value;
            orgItem["name_last_ko"] = nameFirstEn.current.value;
            orgItem["mobile1"] = mobile1.current.value;
            orgItem["mobile2"] = mobile2.current.value;
            orgItem["mobile3"] = mobile3.current.value;
            orgItem["email"] = email.current.value;

            newArr = [...newArr, orgItem];

            // 정렬
            newArr = newArr.sort((a, b) => {
                return a.idx - b.idx;
            });

            console.log(newArr);
            setEntryInfo([...newArr]);
        } else {
            let newArr = entryInfo.filter((el) => el.idx !== entryInfo[0].idx);
            // let orgItem = entryInfo.filter((el) => el.idx === 1)[0];
            let orgItem = entryInfo[0];

            orgItem["name_first_en"] = "";
            orgItem["name_last_en"] = "";
            orgItem["name_first_ko"] = "";
            orgItem["name_last_ko"] = "";
            orgItem["mobile1"] = "";
            orgItem["mobile2"] = "";
            orgItem["mobile3"] = "";
            orgItem["email"] = "";

            newArr = [...newArr, orgItem];

            // 정렬
            newArr = newArr.sort((a, b) => {
                return a.idx - b.idx;
            });

            console.log(newArr);
            setEntryInfo([...newArr]);
        }
    };

    // 사용자 추가
    const addEntry = () => {
        const newItem = {
            birth: "",
            birth_yyyy: "",
            birth_mm: "",
            birth_dd: "",
            duty: "",
            email: "",
            gender: "",
            inter_phone_number: "82",
            mobile1: "",
            mobile2: "",
            mobile3: "",
            name_first_ko: "",
            name_last_ko: "",
            name_first_en: "",
            name_last_en: "",
            people_memo: "",
            position: "",
            relationship_type: "100",
            idx: entryInfo[entryInfo.length - 1].idx + 1,
        };

        setEntryInfo([...entryInfo, newItem]);
    };

    // 참가자 수정
    const changeEntry = (e, idx, param) => {
        let newArr = entryInfo.filter((el) => el.idx !== idx);
        let orgItem = entryInfo.filter((el) => el.idx === idx)[0];

        const val = e.target.value;

        switch (param) {
            case "birth":
                orgItem = { ...orgItem };
                const birth = val;
                orgItem["birth_yyyy"] = birth.split("-")[0];
                orgItem["birth_mm"] = birth.split("-")[1];
                orgItem["birth_dd"] = birth.split("-")[2];
                orgItem["birth"] = birth;
                break;
            case "name_first_en":
                orgItem = { ...orgItem };
                orgItem["name_first_en"] = val;
                orgItem["name_last_ko"] = val;
                break;
            case "name_last_en":
                orgItem = { ...orgItem };
                orgItem["name_last_en"] = val;
                orgItem["name_first_ko"] = val;
                break;
            default:
                orgItem = { ...orgItem };
                orgItem[param] = val;
                break;
        }

        newArr = [...newArr, orgItem];

        // 정렬
        newArr = newArr.sort((a, b) => {
            return a.idx - b.idx;
        });

        console.log(newArr);
        setEntryInfo([...newArr]);
    };

    // 참가자 정보 삭제
    const removeEntry = (idx) => {
        if (entryInfo.length <= 1) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "At least one participant is required.",
            });

            return false;
        } else {
            const newItem = entryInfo.filter((el) => el.idx !== idx);

            let newArr = [];

            const len = newItem.length;
            for (let i = 0; i < len; i++) {
                let newObj = { ...newItem[i] };

                newArr.push(newObj);
            }

            setEntryInfo(newArr);
        }
    };

    const interpretationCostHandler = () => {
        if (interpretationCostCheck.current.checked) {
            setInterpretationCostYn("Y");
        } else {
            setInterpretationCostYn("N");
        }
    };

    const setTotalPriceFunc = () => {
        if (registrationInfo.length !== 0) {
            // 엔트리 금액
            const entryCost = Number(registrationInfo.entry_cost);

            // 인당 추가금액
            const additionalCost = Number(registrationInfo.additional_cost);

            // 추가인원
            const numberOfPeople = entryInfo.length - 1;

            // 통역가 금액
            const interpretationCost = interpretationCostCheck.current.checked
                ? Number(registrationInfo.interpretation_cost)
                : 0;

            const totalPrice =
                entryCost +
                additionalCost * numberOfPeople +
                interpretationCost;

            setTotalPriceState(String(totalPrice));
        }
    };

    // 상태변화 감지하여 총 금액 계산
    useEffect(() => {
        setTotalPriceFunc();
    }, [registrationInfo, entryInfo, interpretationCostYn]);

    // 사전등록 버튼
    const regEntry = (method) => {
        if (validation()) {
            CommonNotify({
                type: "confirm",
                hook: confirm,
                message: "Would you like to apply as a participant like this?",
                callback: () => doRegEntry(),
            });

            const doRegEntry = () => {
                setIsSpinner(true);

                let url;
                if (method === "reg") {
                    // /v1/reg
                    // POST
                    // 사전등록 등록
                    url = apiPath.api_admin_reg_reg_user;
                } else if (method === "mod") {
                    // /v1/reg
                    // PUT
                    // 사전등록 수정
                    url = apiPath.api_admin_mod_reg_users;
                }

                const data = {
                    payment_status: "000", // 결제상태 000: 결제대기
                    additional_status: "000", // 참가상태 000: 참가등록
                    institution_type: "000", // 000: 병원
                    institution_name_ko: institutionNameEn.current.value,
                    institution_name_en: institutionNameEn.current.value,
                    addr1_ko: addr1Ko.current.value,
                    addr2_ko: addr2En.current.value,
                    addr1_en: addr1En.current.value,
                    addr2_en: addr2En.current.value,
                    zipcode: zipcode.current.value,
                    fax1: fax1.current.value,
                    fax2: fax2.current.value,
                    fax3: fax3.current.value,
                    mobile1: mobile1.current.value,
                    mobile2: mobile2.current.value,
                    mobile3: mobile3.current.value,
                    name_first_ko: nameLastEn.current.value,
                    name_last_ko: nameFirstEn.current.value,
                    name_first_en: nameFirstEn.current.value,
                    name_last_en: nameLastEn.current.value,
                    email: email.current.value,
                    inter_phone_number: "82",
                    entry_info: entryInfo,
                    show_yn: "Y",
                    registration_idx: registrationInfo.registration_idx,
                    interpretation_cost_yn: interpretationCostYn,
                };

                const restParams = {
                    method:
                        method === "reg"
                            ? "post"
                            : method === "mod"
                            ? "put"
                            : "",
                    url: url,
                    data: data,
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
                            message:
                                method === "reg"
                                    ? "Participant registration application has been completed"
                                    : method === "mod"
                                    ? "Participant modification has been completed"
                                    : "",
                            callback: () => navigate(routerPath.web_main_url),
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
            };
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

        const notiEntry = (msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
            });
        };

        if (!institutionNameEn.current.value) {
            noti(
                institutionNameEn,
                "Please enter Plastic & Aesthetic Clinic Name",
            );

            return false;
        }

        if (!addr1En.current.value) {
            noti(addr1En, "Please enter your address");

            return false;
        }

        if (!addr2En.current.value) {
            noti(addr2En, "Please enter detailed address");

            return false;
        }

        if (!nameFirstEn.current.value || !nameLastEn.current.value) {
            noti(nameFirstEn, "Please enter the name of the contact person");

            return false;
        }

        if (
            !mobile1.current.value ||
            !mobile2.current.value ||
            !mobile3.current.value
        ) {
            noti(mobile1, "Please enter your phone number");

            return false;
        }

        if (!email.current.value) {
            noti(email, "Please enter your e-mail");

            return false;
        }

        const length = entryInfo.length;
        for (let i = 0; i < length; i++) {
            if (
                !entryInfo[i]["name_first_en"] ||
                !entryInfo[i]["name_last_en"]
            ) {
                notiEntry("Please enter participant name");

                return false;
            }

            if (!entryInfo[i]["duty"]) {
                notiEntry("Please enter participant title");

                return false;
            }

            if (
                !entryInfo[i]["mobile1"] ||
                !entryInfo[i]["mobile2"] ||
                !entryInfo[i]["mobile3"]
            ) {
                notiEntry("Please enter participant phone number");

                return false;
            }

            if (!entryInfo[i]["email"]) {
                notiEntry("Please enter participant email");

                return false;
            }

            if (!entryInfo[i]["birth"]) {
                notiEntry("Please enter the participant's date of birth");

                return false;
            }

            if (!entryInfo[i]["gender"]) {
                notiEntry("Please enter participant gender");

                return false;
            }
        }

        return true;
    };

    return (
        <>
            <div key={location.key}>
                {/*header//S*/}
                <Header />
                {/*header//E*/}

                <div id="subvisual">
                    <div className="sub_txt">
                        <div className="sub_txt_in">
                            <h2>
                                <img
                                    src="img/web/sub/sub_txt.png"
                                    alt="Medi-City Medical Showcase"
                                />
                            </h2>
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                            <h4 className="long">
                                Plastic & Aesthetic Clinics
                                <br />
                                SIGN-UP
                            </h4>
                        </div>
                    </div>
                </div>

                {/*서브 container //S*/}
                <div id="container" className="sub_container">
                    <div id="con_area">
                        <div id="leftmenu">
                            <Link
                                to={routerPath.web_participation_guideline_url}
                            >
                                Guideline
                            </Link>
                            <Link
                                to={routerPath.web_signup_signup_url}
                                className={isSignup ? "active" : ""}
                            >
                                Online Sign-up
                            </Link>
                            <Link
                                to={
                                    isSignup
                                        ? routerPath.web_signup_check_entry_url
                                        : ""
                                }
                                className={isConfirmation ? "active" : ""}
                            >
                                Sign-up Confirmation
                            </Link>
                        </div>
                        <div id="subtitle">
                            <h3>ONLINE SIGN-UP</h3>
                        </div>

                        <div className="signup">
                            <div className="boxing">
                                <h3 className="c_tit">
                                    Plastic & Aesthetic Clinics Information
                                </h3>
                                <p className="r_noti">
                                    (<span className="red">*</span>) Required
                                </p>
                                <table>
                                    <colgroup>
                                        <col width="30%" />
                                        <col width="*" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>
                                                Plastic & Aesthetic Clinic Name{" "}
                                                <span className="red">*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    ref={institutionNameEn}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Address{" "}
                                                <span className="red">*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input_m hold"
                                                    id="zipcode"
                                                    ref={zipcode}
                                                    onClick={
                                                        isSignup
                                                            ? handle.openPost
                                                            : () => {}
                                                    }
                                                    readOnly={true}
                                                />
                                                {isSignup && (
                                                    <Link
                                                        to=""
                                                        className="normal_btn"
                                                        onClick={
                                                            handle.openPost
                                                        }
                                                    >
                                                        Search
                                                    </Link>
                                                )}
                                                <br />
                                                <input
                                                    type="text"
                                                    ref={addr1En}
                                                    onClick={
                                                        isSignup
                                                            ? handle.openPost
                                                            : () => {}
                                                    }
                                                    readOnly={true}
                                                />
                                                <input
                                                    type="hidden"
                                                    ref={addr1Ko}
                                                    readOnly
                                                />
                                                <br />
                                                <input
                                                    type="text"
                                                    ref={addr2En}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                The name of the contact person{" "}
                                                <span className="red">*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input_n"
                                                    placeholder="First Name"
                                                    ref={nameFirstEn}
                                                    readOnly={isConfirmation}
                                                />{" "}
                                                <input
                                                    type="text"
                                                    className="input_n"
                                                    placeholder="Last Name"
                                                    ref={nameLastEn}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                TEL{" "}
                                                <span className="red">*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={mobile1}
                                                    readOnly={isConfirmation}
                                                />{" "}
                                                -{" "}
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={mobile2}
                                                    readOnly={isConfirmation}
                                                />{" "}
                                                -{" "}
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={mobile3}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                E-mail{" "}
                                                <span className="red">*</span>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    ref={email}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>FAX</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={fax1}
                                                    readOnly={isConfirmation}
                                                />{" "}
                                                -{" "}
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={fax2}
                                                    readOnly={isConfirmation}
                                                />{" "}
                                                -{" "}
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    ref={fax3}
                                                    readOnly={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="boxing">
                                <h3 className="c_tit">
                                    Participant Information
                                </h3>
                                <p className="r_noti">
                                    (<span className="red">*</span>) Required
                                </p>

                                {isSignup && (
                                    <div className="addzone">
                                        <label htmlFor="sameInfo">
                                            If the above information is same,
                                            please check{" "}
                                            <Checkbox
                                                id="sameInfo"
                                                onChange={changeSameInfoChk}
                                            />
                                        </label>
                                    </div>
                                )}

                                {isSignup && (
                                    <div className="morezone">
                                        <Link to="" onClick={addEntry}>
                                            Adding participants &nbsp;
                                            <img
                                                src="img/web/sub/add_p.png"
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                )}

                                {entryInfo.length !== 0 &&
                                    entryInfo.map((item, idx) => (
                                        <table
                                            className="add_tb"
                                            key={`entryInfo_${idx}`}
                                        >
                                            <colgroup>
                                                <col width="10%" />
                                                <col width="38.5%" />
                                                <col width="10%" />
                                                <col width="38.5%" />
                                                <col width="3%" />
                                            </colgroup>

                                            <tbody>
                                                <tr>
                                                    <th>
                                                        Name{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="input_n"
                                                            placeholder="First Name"
                                                            value={
                                                                item.name_first_en
                                                            }
                                                            key={`${item.idx}_name_first_en`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "name_first_en",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />{" "}
                                                        <input
                                                            type="text"
                                                            className="input_n"
                                                            placeholder="Last Name"
                                                            value={
                                                                item.name_last_en
                                                            }
                                                            key={`${item.idx}_name_last_en`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "name_last_en",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />
                                                        <p className="rednoti">
                                                            {" "}
                                                            Must Match the
                                                            English Spelling on
                                                            the Passport.
                                                        </p>
                                                    </td>
                                                    <th>
                                                        Title{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={item.duty}
                                                            key={`${item.idx}_duty`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "duty",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />
                                                    </td>
                                                    {isSignup && (
                                                        <td
                                                            rowSpan="3"
                                                            className="del_td"
                                                        >
                                                            <Link
                                                                to=""
                                                                title="Delete"
                                                                onClick={() =>
                                                                    removeEntry(
                                                                        item.idx,
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src="img/web/sub/del_p.png"
                                                                    alt=""
                                                                />
                                                            </Link>
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <th>
                                                        TEL{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="input_m"
                                                            value={item.mobile1}
                                                            key={`${item.idx}_mobile1`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "mobile1",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />{" "}
                                                        -{" "}
                                                        <input
                                                            type="text"
                                                            className="input_m"
                                                            value={item.mobile2}
                                                            key={`${item.idx}_mobile2`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "mobile2",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />{" "}
                                                        -{" "}
                                                        <input
                                                            type="text"
                                                            className="input_m"
                                                            value={item.mobile3}
                                                            key={`${item.idx}_mobile3`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "mobile3",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />
                                                    </td>
                                                    <th>
                                                        E-mail{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={item.email}
                                                            key={`${item.idx}_email`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "email",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Birth{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <input
                                                            type="date"
                                                            placeholder="YYYY-MM-DD"
                                                            value={item.birth}
                                                            key={`${item.idx}_birth`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "birth",
                                                                )
                                                            }
                                                            readOnly={
                                                                isConfirmation
                                                            }
                                                        />
                                                    </td>
                                                    <th>
                                                        Gender{" "}
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    </th>
                                                    <td>
                                                        <select
                                                            value={
                                                                isConfirmation
                                                                    ? item.gender_cd
                                                                    : item.gender
                                                            }
                                                            key={`${item.idx}_gender`}
                                                            onChange={(e) =>
                                                                changeEntry(
                                                                    e,
                                                                    item.idx,
                                                                    "gender",
                                                                )
                                                            }
                                                            disabled={
                                                                isConfirmation
                                                            }
                                                        >
                                                            <option value="">
                                                                - Select -
                                                            </option>
                                                            {genderOption.length !==
                                                                0 &&
                                                                genderOption.map(
                                                                    (
                                                                        item2,
                                                                        idx2,
                                                                    ) => (
                                                                        <option
                                                                            key={`genderOption_${idx}_${idx2}`}
                                                                            value={
                                                                                item2.code_key
                                                                            }
                                                                        >
                                                                            {
                                                                                item2.code_value
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
                            </div>

                            <div className="boxing">
                                <h3 className="c_tit">Sign-up details</h3>
                                <table>
                                    <colgroup>
                                        <col width="60%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan="3">
                                                Provided Information
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="center gray">
                                                Contents
                                            </th>
                                            <th className="center gray">
                                                Amount (KRW)
                                                <br />
                                                (Including VAT)
                                            </th>
                                            <th className="center gray">
                                                Select Check
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b className="per">
                                                    Per person basis
                                                </b>
                                                <p>
                                                    1. Round-trip Airfare
                                                    (January 22nd to January
                                                    26th)
                                                </p>
                                                <p>
                                                    2. 4 Nights 5Days
                                                    Accommodation (5-Star Hotel
                                                    Mulia Senayan)
                                                    <br />
                                                    <span>
                                                        - Includes Breakfast and
                                                        Additional Facilities
                                                    </span>
                                                </p>
                                                <p>
                                                    3. Meals <br />
                                                    <span>
                                                        - January 24th: Lunch
                                                        and Dinner provided{" "}
                                                        <br />- January 25th:
                                                        Dinner provided
                                                    </span>
                                                </p>
                                                <p>
                                                    4. An Exclusive Consultation
                                                    Desk
                                                </p>
                                                <p>
                                                    5. Transportation: <br />
                                                    <span>
                                                        - Jakarta Airport ↔
                                                        Accommodation (Hotel
                                                        Mulia Senayan)
                                                        <br />- Accommodation ↔
                                                        Exhibition Venue (The
                                                        Westin Jakarta)
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="center">
                                                {registrationInfo.length !==
                                                    0 &&
                                                    registrationInfo.entry_cost
                                                        .toString()
                                                        .replace(
                                                            commaOfNumber,
                                                            ",",
                                                        )}
                                            </td>
                                            <td className="center">
                                                <Checkbox
                                                    checked={true}
                                                    disabled={true}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table>
                                    <colgroup>
                                        <col width="60%" />
                                        <col width="20%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colSpan="3">
                                                Selected Options
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="center gray">
                                                Contents
                                            </th>
                                            <th className="center gray">
                                                Amount (KRW)
                                                <br />
                                                (Including VAT)
                                            </th>
                                            <th className="center gray">
                                                Select Check
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className="center">
                                                Additional Participants (per
                                                person)
                                            </th>
                                            <td className="center">
                                                {registrationInfo.length !==
                                                    0 &&
                                                    registrationInfo.additional_cost
                                                        .toString()
                                                        .replace(
                                                            commaOfNumber,
                                                            ",",
                                                        )}
                                            </td>
                                            <td className="center">
                                                {/*<select*/}
                                                {/*    name=""*/}
                                                {/*    id=""*/}
                                                {/*    value={entryInfo.length - 1}*/}
                                                {/*>*/}
                                                {/*    /!*<option value="">0</option>*!/*/}
                                                {/*    /!*<option value="">1</option>*!/*/}
                                                {/*    /!*<option value="">2</option>*!/*/}
                                                {/*    /!*<option value="">3</option>*!/*/}
                                                {/*</select>*/}
                                                <input
                                                    type="text"
                                                    className="input_m"
                                                    readOnly={true}
                                                    ref={entryPersonNumber}
                                                    value={entryInfo.length - 1}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="center">
                                                Interpretation
                                                (Korean-Indonesian) - 2 days
                                            </th>
                                            <td className="center">
                                                {registrationInfo.length !==
                                                    0 &&
                                                    registrationInfo.interpretation_cost
                                                        .toString()
                                                        .replace(
                                                            commaOfNumber,
                                                            ",",
                                                        )}
                                            </td>
                                            <td className="center">
                                                <Checkbox
                                                    inputRef={
                                                        interpretationCostCheck
                                                    }
                                                    onChange={
                                                        interpretationCostHandler
                                                    }
                                                    defaultChecked={
                                                        isConfirmation &&
                                                        modData.interpretation_cost_yn ===
                                                            "Y"
                                                    }
                                                    disabled={isConfirmation}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="boxing">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="center">
                                                <p className="total">
                                                    {totalPriceState
                                                        .toString()
                                                        .replace(
                                                            commaOfNumber,
                                                            ",",
                                                        )}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="boxing">
                                <h3 className="c_tit">Payment Information</h3>
                                <div className="gray">
                                    E-mail : {registrationInfo.email}
                                    <br />
                                    Bank Information :{" "}
                                    <b>
                                        {`${registrationInfo.payment_bank_name} ${registrationInfo.payment_account} (예금주: ${registrationInfo.name_first_ko} ${registrationInfo.name_last_ko})`}
                                    </b>
                                </div>
                            </div>

                            {isSignup && (
                                <div className="btn_box">
                                    <input
                                        type="submit"
                                        value="SUBMIT"
                                        name=""
                                        onClick={() => regEntry("reg")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/*서브 container //E*/}

                {/*footer //S*/}
                <FooterSub />
                <Footer />
                {/*footer //E*/}
            </div>
        </>
    );
};

export default SignUpMain;
