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
import { codesAtom, isSpinnerAtom, registrationInfoAtom } from "recoils/atoms";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { Checkbox, Skeleton } from "@mui/material";
import { commaOfNumber } from "common/js/Pattern";
import { useLocation } from "react-router";
import CountrySelect from "common/js/commonComponents/CountrySelect";

// 참가상태 코드 영어
const additional_status_en = {
    "000": "Registration",
    100: "Waitlisted",
    200: "Confirmed participation",
    300: "Cancellation",
    900: "Other",
};

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
    // 페이지 정보
    const location = useLocation();
    const isSignup = location.pathname === "/local/signup";
    const isConfirmation = location.pathname === "/local/confirmation";

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

    const registrationInfo = useRecoilValue(registrationInfoAtom);

    // ------------------------------------------------------------------------------------------------------------------------

    const interestsOther = useRef(null);
    const additionalStatus = useRef(null);

    // 참가자 정보
    const [entryInfo, setEntryInfo] = useState([]);

    // 성별 옵션
    const [genderOption, setGenderOption] = useState([]);

    const [checkItems, setCheckItems] = useState([]);
    const [otherItem, setOtherItem] = useState("");

    const [selectedCountry, setSelectedCountry] = useState("62");

    useEffect(() => {
        if (isConfirmation) {
            if (Object.keys(location.state).length !== 0) {
                codes.length !== 0 && setDefaultEntryInfoFunc();
            } else {
                navigate(routerPath.web_signup_check_entry_url);
            }
        } else {
            setModData({});
            setEntryInfo([]);
            setCheckItems([]);
            setOtherItem("");

            // interestsOther.current.value = "";
            setEntryInfoFunc();
        }
    }, [location.pathname, codes]);

    useEffect(() => {
        if (!isConfirmation) {
            if (interestsOther.current) {
                interestsOther.current.value = "";
            }
        }
    }, [otherItem]);

    // 사전등록 확인일 경우
    const setDefaultEntryInfoFunc = () => {
        // console.log(modData);

        // 성별
        let genderArr = codes.filter((el) => el.code_type === "GENDER");
        genderArr = genderArr.filter(
            (el) => el.code_key === "0" || el.code_key === "1",
        );
        setGenderOption(genderArr);

        setModData(location.state ?? {});

        setEntryInfo(location.state.entry_info);

        setCheckItems(location.state.entry_info[0].position.split(","));

        const lastIndex =
            location.state.entry_info[0].position.split(",").length - 1;
        if (
            location.state.entry_info[0].position
                .split(",")
                [lastIndex].includes("|")
        ) {
            let other =
                location.state.entry_info[0].position.split(",")[lastIndex];

            other = other.replace("|", "");

            setOtherItem(other);
        }
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
        let genderArr = codes.filter((el) => el.code_type === "GENDER");
        genderArr = genderArr.filter(
            (el) => el.code_key === "0" || el.code_key === "1",
        );
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

        // console.log(newArr);
        setEntryInfo([...newArr]);
    };

    // 사전등록 버튼
    const regEntry = (method) => {
        console.log(selectedCountry);
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
                    interestsOther.current.value
                        ? "|" + interestsOther.current.value
                        : "",
                ];

                let entryInfoArr = entryInfo[0];
                entryInfoArr = {
                    ...entryInfoArr,
                    position: checkItemsArr.join(),
                };

                let newArr = [];
                newArr.push(entryInfoArr);

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
                    payment_status: "010", // 결제상태 000: 결제대기, 010: 결제완료
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
                    inter_phone_number: selectedCountry,
                    show_yn: "Y",
                    registration_idx: registrationInfo.registration_idx,
                    interpretation_cost_yn: "N",
                    entry_info: newArr,
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
                            message: res.headers.result_message_en,
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
                        {Object.keys(registrationInfo).length !== 0 ? (
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                        ) : (
                            <h3
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        fontSize: "1rem",
                                        textAlign: "center",
                                    }}
                                    width={"60%"}
                                />
                            </h3>
                        )}
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
                        <Link to={routerPath.web_local_guideline_url}>
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
                                                                ) => {
                                                                    return <option
                                                                        key={`genderOption_${idx}_${idx2}`}
                                                                        value={
                                                                            item2.code_key
                                                                        }
                                                                    >
                                                                        {
                                                                            item2.code_value_en
                                                                        }
                                                                    </option>;
                                                                },
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
                                                <td
                                                    colSpan={
                                                        isConfirmation ? 0 : 3
                                                    }
                                                >
                                                    {!isConfirmation ? (
                                                        <CountrySelect
                                                            onChange={(
                                                                e,
                                                                value,
                                                            ) =>
                                                                setSelectedCountry(
                                                                    value
                                                                        ? value
                                                                        : "",
                                                                )
                                                            }
                                                            defaultValue={
                                                                selectedCountry ??
                                                                ""
                                                            }
                                                            mode={"en"}
                                                        />
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="input_m"
                                                                value={`+${modData.inter_phone_number}`}
                                                                key={`${item.idx}_inter_phone_number`}
                                                                readOnly={
                                                                    isConfirmation
                                                                }
                                                            />{" "}
                                                            -{" "}
                                                        </>
                                                    )}
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
                                            </tr>
                                            <tr>
                                                <th>
                                                    E-mail{" "}
                                                    {isSignup && (
                                                        <span className="red">
                                                            *
                                                        </span>
                                                    )}
                                                </th>
                                                <td
                                                    colSpan={
                                                        isConfirmation ? 0 : 3
                                                    }
                                                >
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
                                                <td
                                                    colSpan={
                                                        isConfirmation ? 0 : 3
                                                    }
                                                >
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
                                                {isConfirmation && (
                                                    <>
                                                        <th>
                                                            Additional Status
                                                        </th>
                                                        <td>
                                                            <p
                                                                ref={
                                                                    additionalStatus
                                                                }
                                                            >
                                                                {Object.keys(
                                                                    modData,
                                                                ).length !== 0
                                                                    ? additional_status_en[
                                                                          modData
                                                                              .additional_status_cd
                                                                      ]
                                                                    : ""}
                                                            </p>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                            <tr>
                                                <th>Interests</th>
                                                <td colSpan="3">
                                                    {interestsItems.map(
                                                        (item2, idx) => (
                                                            <div
                                                                className="interbox"
                                                                key={`interests_items_${idx}`}
                                                            >
                                                                <b>
                                                                    {
                                                                        item2.title
                                                                    }
                                                                </b>
                                                                <div className="op_box">
                                                                    {item2
                                                                        .values
                                                                        .length !==
                                                                        0 &&
                                                                        item2.values.map(
                                                                            (
                                                                                item3,
                                                                                idx2,
                                                                            ) => (
                                                                                <div
                                                                                    key={`${item.title}_${item3}`}
                                                                                >
                                                                                    <label>
                                                                                        <Checkbox
                                                                                            value={
                                                                                                item3
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                handleSingleCheck(
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                                    item3,
                                                                                                )
                                                                                            }
                                                                                            checked={checkItems.includes(
                                                                                                item3,
                                                                                            )}
                                                                                            disabled={
                                                                                                isConfirmation
                                                                                            }
                                                                                        />{" "}
                                                                                        {
                                                                                            item3
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
                                                                    // readOnly={
                                                                    //     isConfirmation
                                                                    // }
                                                                    disabled={
                                                                        isConfirmation
                                                                    }
                                                                    defaultValue={
                                                                        otherItem ??
                                                                        ""
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
