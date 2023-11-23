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

const interestsItems = [
    {
        title: "Mata (Eyes)",
        values: [
            "Operasi Mata jahitan",
            "Operasi Mata Sayatan",
            "Upper Blepharoplasty",
            "Koreksi Otot Mata",
        ],
    },
    {
        title: "Operasi Hidung (Nose)",
        values: ["Augmentasi Hidung", "Jenis Operasi Hidung", "Reduksi Hidung"],
    },
    {
        title: "ANTI-AGING",
        values: [
            "Elastic Band Lifting",
            "Lifting Dahi Endoskopi",
            "Lifting Wajah Area Tengah",
            "Lifting Wajah",
        ],
    },
    {
        title: "Payudara (BREAST)",
        values: ["Augmentasi Payudara", "Reduksi Payudara"],
    },
    {
        title: "Tubuh (Body)",
        values: [
            "Liposuction Seluruh Tubuh",
            "Liposuction Individual",
            "Dual-Slim",
            "Lifting Tubuh",
        ],
    },
];
const SignUpIndonesia = (props) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [modData, setModData] = useState({});
    const [checkItems, setCheckItems] = useState([]);
    // 페이지 정보
    const location = useLocation();
    const isSignup = location.pathname === "/local/signup";
    const isConfirmation = location.pathname === "/signup/confirmation";

    // let modData;
    //
    // if (isConfirmation) {
    //     modData = location.state ?? {};
    // } else {
    //     modData = {};
    // }

    const navigate = useNavigate();

    const codes = useRecoilValue(codesAtom);

    // 다음 주소검색
    const open = useDaumPostcodePopup();

    const [registrationInfo, setRegistrationInfo] = useState([]);

    useEffect(() => {
        // isConfirmation && setModData(location.state ?? {});
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
    const paymentStatus = useRef(null);
    const additionalStatus = useRef(null);

    const interestsOther = useRef(null);

    // 참가자 정보
    const [entryInfo, setEntryInfo] = useState([]);

    // 성별 옵션
    const [genderOption, setGenderOption] = useState([]);

    useEffect(() => {
        if (isConfirmation) {
            if (Object.keys(location.state).length !== 0) {
                setDefaultEntryInfoFunc();
            } else {
                navigate(routerPath.web_signup_check_entry_url);
            }
        } else {
            setModData({});
            setEntryInfoFunc();
        }
    }, [location.pathname]);

    // 사전등록 확인일 경우
    const setDefaultEntryInfoFunc = () => {
        // console.log(modData);

        // 성별
        const genderArr = codes.filter((el) => el.code_type === "GENDER");

        // console.log(genderArr);
        setGenderOption(genderArr);

        // institutionNameEn.current.value = modData.institution_name_en;
        // zipcode.current.value = modData.zipcode;
        // addr1En.current.value = modData.addr1_en;
        // addr2En.current.value = modData.addr2_en;
        // nameFirstEn.current.value = modData.name_first_en;
        // nameLastEn.current.value = modData.name_last_en;
        // mobile1.current.value = modData.mobile1;
        // mobile2.current.value = modData.mobile2;
        // mobile3.current.value = modData.mobile3;
        // email.current.value = modData.email;
        // fax1.current.value = modData.fax1;
        // fax2.current.value = modData.fax2;
        // fax3.current.value = modData.fax3;
        // paymentStatus.current.innerText =
        //     payment_status_en[modData.payment_status_cd];
        // additionalStatus.current.innerText =
        //     additional_status_en[modData.additional_status_cd];
        //
        // interpretationCostCheck.current.checked =
        //     modData.interpretation_cost_yn === "Y";

        setModData(location.state ?? {});

        setEntryInfo(location.state.entry_info);
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
            inter_phone_number: "62",
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
            inter_phone_number: "62",
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

                let checkItemsArr = checkItems;
                checkItemsArr = [
                    ...checkItemsArr,
                    interestsOther.current.value,
                ];

                let entryInfoArr = entryInfo[0];
                entryInfoArr = {
                    ...entryInfoArr,
                    position: checkItemsArr.join(),
                };

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
                    institution_type: "400", // 000: 병원, 400: 개인
                    institution_name_ko: "Local Personal Institution",
                    institution_name_en: "Local Personal Institution",
                    addr1_ko: "Indonesia Address 1 ko",
                    addr2_ko: "Indonesia Address 2 en",
                    addr1_en: "Indonesia Address 1 en",
                    addr2_en: "Indonesia Address 2 en",
                    zipcode: "Indonesia Zipcode",
                    // fax1: fax1.current.value,
                    // fax2: fax2.current.value,
                    // fax3: fax3.current.value,
                    mobile1: "XXXX",
                    mobile2: "XXXX",
                    mobile3: "XXXX",
                    name_first_ko: "Local Personal name",
                    name_last_ko: "Local Personal name",
                    name_first_en: "Local Personal name",
                    name_last_en: "Local Personal name",
                    email: "Local Personal email",
                    inter_phone_number: "62",
                    show_yn: "Y",
                    registration_idx: registrationInfo.registration_idx,
                    interpretation_cost_yn: "N",
                    entry_info: entryInfoArr,
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

        const length = entryInfo.length;
        for (let i = 0; i < length; i++) {
            if (
                !entryInfo[i]["name_first_en"] ||
                !entryInfo[i]["name_last_en"]
            ) {
                notiEntry("Please enter participant name");

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

    const handleRegistrationInput = (e, inputName) => {
        setModData({
            ...modData,
            [inputName]: e.target.value,
        });
    };

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가

            let newArr = checkItems;
            newArr.push(id);

            newArr = newArr.filter((element, index) => {
                return newArr.indexOf(element) === index;
            });

            console.log([...newArr]);
            setCheckItems(newArr);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    return (
        <>
            {/*<div key={location.key}>*/}
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
                        <h3>{registrationInfo.registration_sub_title_en}</h3>
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
                        <Link to={routerPath.web_participation_guideline_url}>
                            Guideline
                        </Link>
                        <Link
                            to={routerPath.web_local_signup_url}
                            className={isSignup ? "active" : ""}
                        >
                            Online Sign-up
                        </Link>
                        <Link
                            to={
                                isSignup
                                    ? routerPath.web_local_check_entry_url
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
                            <h3 className="c_tit">Participant Information</h3>
                            {isSignup && (
                                <p className="r_noti">
                                    (<span className="red">*</span>) Required
                                </p>
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
                                            {/*<col width="3%" />*/}
                                        </colgroup>

                                        <tbody>
                                            <tr>
                                                <th>
                                                    Name{" "}
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
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
                                                    {/*{isSignup && (*/}
                                                    {/*    <p className="rednoti">*/}
                                                    {/*        {" "}*/}
                                                    {/*        Must Match the*/}
                                                    {/*        English Spelling on*/}
                                                    {/*        the Passport.*/}
                                                    {/*    </p>*/}
                                                    {/*)}*/}
                                                </td>
                                                <th>
                                                    Gender{" "}
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
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
                                                                            item2.code_value_en
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    TEL{" "}
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
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
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
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
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
                                                </th>
                                                <td colSpan={3}>
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
                                            </tr>
                                            <tr>
                                                <th>Interests</th>
                                                <td colSpan="3">
                                                    {interestsItems.map(
                                                        (item, idx) => (
                                                            <div
                                                                className="interbox"
                                                                key={`interests_items_${idx}`}
                                                            >
                                                                <b>
                                                                    {item.title}
                                                                </b>
                                                                <div className="op_box">
                                                                    {item.values
                                                                        .length !==
                                                                        0 &&
                                                                        item.values.map(
                                                                            (
                                                                                item2,
                                                                                idx2,
                                                                            ) => (
                                                                                <div
                                                                                    key={`${item.title}_${item2}`}
                                                                                >
                                                                                    <label>
                                                                                        <Checkbox
                                                                                            value={
                                                                                                item2
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                handleSingleCheck(
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                                    item2,
                                                                                                )
                                                                                            }
                                                                                            checked={checkItems.includes(
                                                                                                item2,
                                                                                            )}
                                                                                        />{" "}
                                                                                        {
                                                                                            item2
                                                                                        }
                                                                                    </label>
                                                                                    <br />
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                    <div className="interbox">
                                                        <b>OTHER</b>
                                                        <div className="op_box">
                                                            <label>
                                                                <input
                                                                    type="text"
                                                                    ref={
                                                                        interestsOther
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                ))}
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
            {/*</div>*/}
        </>
    );
};

export default SignUpIndonesia;
