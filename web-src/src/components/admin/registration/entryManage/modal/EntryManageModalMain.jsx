import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import useConfirm from "hook/useConfirm";
import CountrySelect from "common/js/countryAutocomplete";
import { registration_idx } from "common/js/static";

const EntryManageModalMain = (props) => {
    const { alert } = useAlert();
    const { confirm } = useConfirm();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // 다음 주소검색
    const open = useDaumPostcodePopup();

    const countryBank = useRecoilValue(countryBankAtom);
    const codes = useRecoilValue(codesAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    const [paymentTypeOption, setPaymentTypeOption] = useState([]);
    const [paymentStatusOption, setPaymentStatusOption] = useState([]);
    const [additionalStatusOption, setAdditionalStatusOption] = useState([]);
    const [institutionTypeOption, setInstitutionTypeOption] = useState([]);
    const [genderOption, setGenderOption] = useState([]);
    const [relationshipTypeOption, setRelationshipTypeOption] = useState([]);

    const [selectCountryOptions, setSelectCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("82");

    // 참가자
    const [entryInfo, setEntryInfo] = useState([]);

    // 사전등록정보
    const [registrationInfo, setRegistrationInfo] = useState([]);

    // refs
    const registrationIdx = useRef(null);
    const registrationTitleKo = useRef(null);
    const registrationTitleEn = useRef(null);
    const registrationSubTitleKo = useRef(null);
    const registrationSubTitleEn = useRef(null);
    const paymentStatusCd = useRef(null);
    const additionalStatusCd = useRef(null);
    const institutionTypeCd = useRef(null);
    const secretKey = useRef(null);
    const institutionNameKo = useRef(null);
    const institutionNameEn = useRef(null);
    const addrKo = useRef(null);
    const addrEn = useRef(null);
    const addr1Ko = useRef(null);
    const addr2Ko = useRef(null);
    const addr1En = useRef(null);
    const addr2En = useRef(null);
    const zipcode = useRef(null);
    const zipcodeEn = useRef(null);
    const tel1 = useRef(null);
    const tel2 = useRef(null);
    const tel3 = useRef(null);
    const fax1 = useRef(null);
    const fax2 = useRef(null);
    const fax3 = useRef(null);
    const nameFirstKo = useRef(null);
    const nameLastKo = useRef(null);
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const email = useRef(null);
    const interPhoneNumber = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const mobile = useRef(null);
    const institutionMemo = useRef(null);
    const entryCount = useRef(null);
    const institutionIdx = useRef(null);
    const interpretationCostYn = useRef(null);

    useEffect(() => {
        // 결제타입, 은행 초기화
        setPaymentSelectOption();
    }, [countryBank, codes]);

    useEffect(() => {
        if (paymentTypeOption.length !== 0) {
            // 수정일 경우 디폴트 세팅 등록일경우 베이직
            isModData ? setDefaultValue() : setBasicSetting();
        }
    }, [paymentTypeOption]);

    const setPaymentSelectOption = () => {
        // 결제타입
        const paymentTypeArr = codes.filter(
            (el) => el.code_type === "PAYMENT_TYPE",
        );

        // 결제상태
        const paymentStatusArr = codes.filter(
            (el) => el.code_type === "PAYMENT_STATUS",
        );

        // 참가상태
        const additionalStatusArr = codes.filter(
            (el) => el.code_type === "ADDITIONAL_STATUS",
        );

        // 기관타입
        const institutionTypeArr = codes.filter(
            (el) => el.code_type === "INSTITUTION_TYPE",
        );

        // 성별
        const genderArr = codes.filter((el) => el.code_type === "GENDER");

        // 관계타입
        const relationshipTypeArr = codes.filter(
            (el) => el.code_type === "RELATIONSHIP_TYPE",
        );

        setPaymentStatusOption(paymentStatusArr);
        setPaymentTypeOption(paymentTypeArr);
        setAdditionalStatusOption(additionalStatusArr);
        setInstitutionTypeOption(institutionTypeArr);
        setGenderOption(genderArr);
        setRelationshipTypeOption(relationshipTypeArr);
    };

    const setDefaultValue = () => {
        registrationTitleKo.current.value = modData.registration_title_ko;
        registrationTitleEn.current.value = modData.registration_title_en;
        registrationSubTitleKo.current.value =
            modData.registration_sub_title_ko;
        registrationSubTitleEn.current.value =
            modData.registration_sub_title_en;

        // registrationIdx.current.value = modData.registration_idx ?? "";
        paymentStatusCd.current.value = modData.payment_status_cd;
        additionalStatusCd.current.value = modData.additional_status_cd;
        institutionTypeCd.current.value = modData.institution_type_cd;
        secretKey.current.value = modData.secret_key;
        institutionNameKo.current.value = modData.institution_name_ko;
        institutionNameEn.current.value = modData.institution_name_en;
        addr1Ko.current.value = modData.addr1_ko;
        addr2Ko.current.value = modData.addr2_ko;
        addr1En.current.value = modData.addr1_en;
        addr2En.current.value = modData.addr2_en;
        zipcode.current.value = modData.zipcode;
        zipcodeEn.current.value = modData.zipcode;
        tel1.current.value = modData.tel1;
        tel2.current.value = modData.tel2;
        tel3.current.value = modData.tel3;
        fax1.current.value = modData.fax1;
        fax2.current.value = modData.fax2;
        fax3.current.value = modData.fax3;
        mobile1.current.value = modData.mobile1;
        mobile2.current.value = modData.mobile2;
        mobile3.current.value = modData.mobile3;
        nameFirstKo.current.value = modData.name_first_ko;
        nameLastKo.current.value = modData.name_last_ko;
        nameFirstEn.current.value = modData.name_first_en;
        nameLastEn.current.value = modData.name_last_en;
        email.current.value = modData.email;
        institutionMemo.current.value = modData.institution_memo;
        // institutionIdx.current.value = modData.institution_idx;
        interpretationCostYn.current.value = modData.interpretation_cost_yn;

        // 국가코드
        setSelectedCountry(modData.inter_phone_number);

        // 참가자 정보
        if (modData.entry_info.length !== 0) {
            setEntryInfoFunc();
        }
    };

    // 등록일 경우 베이직 세팅
    const setBasicSetting = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_reg + registration_idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;

                registrationTitleKo.current.value =
                    result_info.registration_title_ko;
                registrationTitleEn.current.value =
                    result_info.registration_title_en;
                registrationSubTitleKo.current.value =
                    result_info.registration_sub_title_ko;
                registrationSubTitleEn.current.value =
                    result_info.registration_sub_title_en;

                // 사전등록정보
                setRegistrationInfo(result_info);

                // 참가자 정보
                setEntryInfoFunc();

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    // 참가자 인덱스 재정의
    const setEntryInfoFunc = () => {
        let newArr = [];

        const len = isModData ? modData.entry_info.length : 1;
        for (let i = 0; i < len; i++) {
            let newObj = {
                birth: isModData ? modData.entry_info[i].birth : "",
                birth_yyyy: isModData ? modData.entry_info[i].birth_yyyy : "",
                birth_mm: isModData ? modData.entry_info[i].birth_mm : "",
                birth_dd: isModData ? modData.entry_info[i].birth_dd : "",
                duty: isModData ? modData.entry_info[i].duty : "",
                email: isModData ? modData.entry_info[i].email : "",
                gender: isModData ? modData.entry_info[i].gender_cd : "",
                inter_phone_number: isModData
                    ? modData.entry_info[i].inter_phone_number
                    : "82",
                mobile1: isModData ? modData.entry_info[i].mobile1 : "",
                mobile2: isModData ? modData.entry_info[i].mobile2 : "",
                mobile3: isModData ? modData.entry_info[i].mobile3 : "",
                name_first_ko: isModData
                    ? modData.entry_info[i].name_first_ko
                    : "",
                name_last_ko: isModData
                    ? modData.entry_info[i].name_last_ko
                    : "",
                name_first_en: isModData
                    ? modData.entry_info[i].name_first_en
                    : "",
                name_last_en: isModData
                    ? modData.entry_info[i].name_last_en
                    : "",
                people_memo: isModData ? modData.entry_info[i].people_memo : "",
                position: isModData ? modData.entry_info[i].position : "",
                user_idx: isModData ? modData.entry_info[i].user_idx : "",
                relationship_type: isModData
                    ? modData.entry_info[i].relationship_type_cd
                    : "",
                idx: i + 1,
            };
            newArr.push(newObj);
        }

        setEntryInfo(newArr);
    };

    // 참가자 정보 삭제
    const removeEntry = (idx) => {
        if (entryInfo.length <= 1) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "참가자 1명 이상은 필수입니다.",
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
            user_idx: "",
            relationship_type: "",
            idx: entryInfo[entryInfo.length - 1].idx + 1,
        };

        setEntryInfo([...entryInfo, newItem]);
    };

    const changeEntry = (e, idx, param) => {
        let newArr = entryInfo.filter((el) => el.idx !== idx);
        let orgItem = entryInfo.filter((el) => el.idx === idx)[0];

        if (param === "birth") {
            const val = e.target.value;
            orgItem = { ...orgItem };
            const birth = val;
            orgItem["birth_yyyy"] = birth.split("-")[0];
            orgItem["birth_mm"] = birth.split("-")[1];
            orgItem["birth_dd"] = birth.split("-")[2];
            orgItem["birth"] = birth;
        } else if (param === "inter_phone_number") {
            const val = e.value;
            orgItem = { ...orgItem };
            orgItem[param] = val;
        } else {
            const val = e.target.value;
            orgItem = { ...orgItem };
            orgItem[param] = val;
        }

        newArr = [...newArr, orgItem];

        // 정렬
        newArr = newArr.sort((a, b) => {
            return a.idx - b.idx;
        });

        console.log(newArr);
        setEntryInfo([...newArr]);
    };

    const changeEntryCountry = (e, value, idx) => {
        console.log(e, value, idx);
        let newArr = entryInfo.filter((el) => el.idx !== idx);
        let orgItem = entryInfo.filter((el) => el.idx === idx)[0];

        orgItem = { ...orgItem };
        orgItem["inter_phone_number"] = value ? value : "";

        newArr = [...newArr, orgItem];

        // 정렬
        newArr = newArr.sort((a, b) => {
            return a.idx - b.idx;
        });

        setEntryInfo([...newArr]);
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
            zipcodeEn.current.value = data.zonecode;
            addr1Ko.current.value = data.address;
            addr1En.current.value = data.addressEnglish;
        },
    };

    // 등록
    const regModBoard = (method) => {
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
            url = apiPath.api_admin_mod_reg_user;
        }

        const data = {
            registration_title_ko: registrationTitleKo.current.value,
            registration_title_en: registrationTitleEn.current.value,
            payment_status: paymentStatusCd.current.value,
            additional_status: additionalStatusCd.current.value,
            institution_type: institutionTypeCd.current.value,
            secret_key: secretKey.current.value,
            institution_name_ko: institutionNameKo.current.value,
            institution_name_en: institutionNameEn.current.value,
            addr1_ko: addr1Ko.current.value,
            addr2_ko: addr2Ko.current.value,
            addr1_en: addr1En.current.value,
            addr2_en: addr2En.current.value,
            zipcode: zipcode.current.value,
            tel1: tel1.current.value,
            tel2: tel2.current.value,
            tel3: tel3.current.value,
            fax1: fax1.current.value,
            fax2: fax2.current.value,
            fax3: fax3.current.value,
            mobile1: mobile1.current.value,
            mobile2: mobile2.current.value,
            mobile3: mobile3.current.value,
            name_first_ko: nameFirstKo.current.value,
            name_last_ko: nameLastKo.current.value,
            name_first_en: nameFirstEn.current.value,
            name_last_en: nameLastEn.current.value,
            email: email.current.value,
            institution_memo: institutionMemo.current.value,
            institution_idx: method === "mod" ? modData.institution_idx : "",
            inter_phone_number: selectedCountry,
            entry_info: entryInfo,
            show_yn: method === "mod" ? modData.show_yn : "Y",
            registration_idx:
                method === "mod"
                    ? modData.registration_idx
                    : registrationInfo.registration_idx,
            interpretation_cost_yn: interpretationCostYn.current.value,
        };

        const restParams = {
            method: method === "reg" ? "post" : method === "mod" ? "put" : "",
            url: url,
            data: data,
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
                            ? "참가자 등록이 완료 되었습니다"
                            : method === "mod"
                            ? "참가자 수정이 완료 되었습니다"
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
    };

    const clickRemove = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "삭제하시겠습니까?",
            callback: () => doRemove(),
        });

        const doRemove = () => {
            setIsSpinner(true);

            const url = `${apiPath.api_admin_remove_reg_users}${modData.registration_idx}/${modData.institution_idx}`;

            const restParams = {
                method: "delete",
                url: url,
                data: {},
                err: err,
                admin: "Y",
                callback: (res) => responsLogic(res),
            };

            CommonRest(restParams);

            const responsLogic = (res) => {
                const result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "삭제가 완료 되었습니다",
                        callback: () => pageUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }

                const pageUpdate = () => {
                    handleNeedUpdate();
                };
            };
        };
    };

    return (
        <>
            <div className="admin">
                <h4 className="mo_subtitle">사전등록 정보</h4>
                <table className="table_bb">
                    <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="30%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>사전등록명(국문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationTitleKo}
                                    disabled={true}
                                />
                            </td>
                            <th>사전등록명(영문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationTitleEn}
                                    disabled={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>부제목(국문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationSubTitleKo}
                                    disabled={true}
                                />
                            </td>
                            <th>부제목(영문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationSubTitleEn}
                                    disabled={true}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div hidden={modData.institution_type_cd === "400"}>
                    <h4 className="mo_subtitle">참가기관 정보</h4>
                    <table className="table_bb">
                        <colgroup>
                            <col width="20%" />
                            <col width="30%" />
                            <col width="20%" />
                            <col width="30%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>결제상태</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={paymentStatusCd}
                                    >
                                        {paymentStatusOption.length !== 0 &&
                                            paymentStatusOption.map(
                                                (item, idx) => (
                                                    <option
                                                        key={`paymentStatusOption_${idx}`}
                                                        value={item.code_key}
                                                    >
                                                        {`${
                                                            item.code_value_ko
                                                        } ${
                                                            item.code_value_en &&
                                                            `(${item.code_value_en})`
                                                        }`}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </td>
                                <th>참가상태</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={additionalStatusCd}
                                    >
                                        {additionalStatusOption.length !== 0 &&
                                            additionalStatusOption.map(
                                                (item, idx) => (
                                                    <option
                                                        key={`additionalStatusOption_${idx}`}
                                                        value={item.code_key}
                                                    >
                                                        {`${
                                                            item.code_value_ko
                                                        } ${
                                                            item.code_value_en &&
                                                            `(${item.code_value_en})`
                                                        }`}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>기관</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={institutionTypeCd}
                                        // disabled={true}
                                    >
                                        {institutionTypeOption.length !== 0 &&
                                            institutionTypeOption.map(
                                                (item, idx) => (
                                                    <option
                                                        key={`institutionTypeOption_${idx}`}
                                                        value={item.code_key}
                                                    >
                                                        {`${
                                                            item.code_value_ko
                                                        } ${
                                                            item.code_value_en &&
                                                            `(${item.code_value_en})`
                                                        }`}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </td>
                                <th>인증키</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input wp100"
                                        ref={secretKey}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>기관명(국문)</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input wp100"
                                        ref={institutionNameKo}
                                    />
                                </td>
                                <th>기관명(영문)</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input wp100"
                                        ref={institutionNameEn}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>주소(국문)</th>
                                <td>
                                    <div>
                                        {/* 우편번호 */}
                                        <input
                                            type="text"
                                            className="input w120 hold"
                                            id="zipcode"
                                            ref={zipcode}
                                            onClick={handle.openPost}
                                            readOnly
                                        />{" "}
                                        <Link
                                            className="tablebtn"
                                            onClick={handle.openPost}
                                        >
                                            우편번호찾기
                                        </Link>
                                    </div>
                                    <div>
                                        <input
                                            type="name"
                                            className="input wp100 hold"
                                            id="addr1Ko"
                                            ref={addr1Ko}
                                            onClick={handle.openPost}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="name"
                                            className="input wp100"
                                            id="addr2Ko"
                                            ref={addr2Ko}
                                            placeholder="상세 주소 (선택사항)"
                                        />
                                    </div>
                                </td>
                                <th>주소(영문)</th>
                                <td>
                                    <div>
                                        {/* 우편번호 */}
                                        <input
                                            type="text"
                                            className="input w120 hold"
                                            id="zipcode"
                                            ref={zipcodeEn}
                                            onClick={handle.openPost}
                                            readOnly
                                        />{" "}
                                        <Link
                                            className="tablebtn"
                                            onClick={handle.openPost}
                                        >
                                            우편번호찾기
                                        </Link>
                                    </div>
                                    <div>
                                        <input
                                            type="name"
                                            className="input wp100 hold"
                                            id="addr1Ko"
                                            ref={addr1En}
                                            onClick={handle.openPost}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="name"
                                            className="input wp100"
                                            id="addr2Ko"
                                            ref={addr2En}
                                            placeholder="상세 주소 (선택사항)"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={tel1}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={tel2}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={tel3}
                                    />
                                </td>
                                <th>팩스번호</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={fax1}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={fax2}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={fax3}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>국가코드</th>
                                <td>
                                    {/*<Select*/}
                                    {/*    className="select"*/}
                                    {/*    id="interPhoneNumber"*/}
                                    {/*    options={selectCountryOptions}*/}
                                    {/*    value={selectedCountry}*/}
                                    {/*    key={selectedCountry}*/}
                                    {/*    styles={customStyles}*/}
                                    {/*    onChange={(e) => {*/}
                                    {/*        setSelectedCountry(*/}
                                    {/*            selectCountryOptions.find(*/}
                                    {/*                (event) =>*/}
                                    {/*                    event.value === e.value,*/}
                                    {/*            ),*/}
                                    {/*        );*/}
                                    {/*        // handleSelectedCountry(e.value);*/}
                                    {/*    }}*/}
                                    {/*    ref={interPhoneNumber}*/}
                                    {/*/>*/}
                                    {isModData ? (
                                        <CountrySelect
                                            onChange={(e, value) =>
                                                setSelectedCountry(value)
                                            }
                                            defaultValue={selectedCountry}
                                            mode={"full"}
                                        />
                                    ) : (
                                        <CountrySelect
                                            onChange={(e, value) =>
                                                setSelectedCountry(value)
                                            }
                                            defaultValue={selectedCountry}
                                            mode={"full"}
                                        />
                                    )}
                                </td>
                                <th>휴대전화</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={mobile1}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={mobile2}
                                    />
                                    {` - `}
                                    <input
                                        type="text"
                                        className="input w100"
                                        ref={mobile3}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>담당자명(국문)</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input w140"
                                        ref={nameFirstKo}
                                        placeholder="성"
                                    />
                                    <input
                                        type="text"
                                        className="input w140"
                                        ref={nameLastKo}
                                        placeholder="이름"
                                    />
                                </td>
                                <th>담당자명(영문)</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input w140"
                                        ref={nameFirstEn}
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        className="input w140"
                                        ref={nameLastEn}
                                        placeholder="Last Name"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>E-MAIL</th>
                                <td>
                                    <input
                                        type="text"
                                        className="input wp100"
                                        ref={email}
                                    />
                                </td>
                                <th>통역 여부</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={interpretationCostYn}
                                    >
                                        <option value="Y">있음</option>
                                        <option value="N">없음</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>메모</th>
                                <td colSpan={3}>
                                    <textarea
                                        className="input wp100"
                                        ref={institutionMemo}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div hidden={modData.institution_type_cd !== "400"}>
                    <h4 className="mo_subtitle">참가 상태 정보</h4>
                    <table className="table_bb">
                        <colgroup>
                            <col width="20%" />
                            <col width="30%" />
                            <col width="20%" />
                            <col width="30%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>결제상태</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={paymentStatusCd}
                                    >
                                        {paymentStatusOption.length !== 0 &&
                                            paymentStatusOption.map(
                                                (item, idx) => (
                                                    <option
                                                        key={`paymentStatusOption_${idx}`}
                                                        value={item.code_key}
                                                    >
                                                        {`${
                                                            item.code_value_ko
                                                        } ${
                                                            item.code_value_en &&
                                                            `(${item.code_value_en})`
                                                        }`}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </td>
                                <th>참가상태</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={additionalStatusCd}
                                    >
                                        {additionalStatusOption.length !== 0 &&
                                            additionalStatusOption.map(
                                                (item, idx) => (
                                                    <option
                                                        key={`additionalStatusOption_${idx}`}
                                                        value={item.code_key}
                                                    >
                                                        {`${
                                                            item.code_value_ko
                                                        } ${
                                                            item.code_value_en &&
                                                            `(${item.code_value_en})`
                                                        }`}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className="mo_subtitle">참가자 정보</h4>
                {modData.institution_type_cd !== "400" && (
                    <Link
                        to=""
                        className="subbtn on"
                        onClick={() => addEntry()}
                    >
                        추가
                    </Link>
                )}
                {entryInfo.length !== 0 &&
                    entryInfo.map((item, idx) => (
                        <table
                            className="table_bb"
                            key={`entryInfo_${idx}`}
                            style={{ margin: "10px 0" }}
                        >
                            <colgroup>
                                <col width="20%" />
                                <col width="30%" />
                                <col width="20%" />
                                <col width="30%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>참가자명(국문)</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="input w140"
                                            value={item.name_first_ko}
                                            placeholder="성"
                                            key={`${item.idx}_name_first_ko`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "name_first_ko",
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="input w140"
                                            value={item.name_last_ko}
                                            placeholder="이름"
                                            key={`${item.idx}_name_last_ko`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "name_last_ko",
                                                )
                                            }
                                        />
                                    </td>
                                    <th>참가자명(영문)</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="input w140"
                                            value={item.name_first_en}
                                            placeholder="First Name"
                                            key={`${item.idx}_name_first_en`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "name_first_en",
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="input w140"
                                            value={item.name_last_en}
                                            placeholder="Last Name"
                                            key={`${item.idx}_name_last_en`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "name_last_en",
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>성별</th>
                                    <td>
                                        <select
                                            className="wp100"
                                            value={item.gender}
                                            key={`${item.idx}_gender`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "gender",
                                                )
                                            }
                                        >
                                            <option value="">- 선택 -</option>
                                            {genderOption.length !== 0 &&
                                                genderOption.map(
                                                    (item2, idx2) => (
                                                        <option
                                                            key={`genderOption_${idx}_${idx2}`}
                                                            value={
                                                                item2.code_key
                                                            }
                                                        >
                                                            {`${
                                                                item2.code_value_ko
                                                            } ${
                                                                item2.code_value_en &&
                                                                `(${item2.code_value_en})`
                                                            }`}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                    </td>
                                    <th>생년월일</th>
                                    <td>
                                        <input
                                            type="date"
                                            className="input wp100"
                                            value={item.birth}
                                            key={`${item.idx}_birth`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "birth",
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>국가코드</th>
                                    <td>
                                        <CountrySelect
                                            onChange={(e, value) =>
                                                changeEntryCountry(
                                                    e,
                                                    value,
                                                    item.idx,
                                                )
                                            }
                                            defaultValue={
                                                item.inter_phone_number ?? "82"
                                            }
                                            mode={"full"}
                                        />
                                    </td>
                                    <th>휴대전화</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="input w100"
                                            value={item.mobile1}
                                            key={`${item.idx}_mobile1`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "mobile1",
                                                )
                                            }
                                        />
                                        {` - `}
                                        <input
                                            type="text"
                                            className="input w100"
                                            value={item.mobile2}
                                            key={`${item.idx}_mobile2`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "mobile2",
                                                )
                                            }
                                        />
                                        {` - `}
                                        <input
                                            type="text"
                                            className="input w100"
                                            value={item.mobile3}
                                            key={`${item.idx}_mobile3`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "mobile3",
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>관심분야</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="input wp100"
                                            value={item.position}
                                            key={`${item.idx}_position`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "position",
                                                )
                                            }
                                            disabled={
                                                modData.institution_type_cd ===
                                                "400"
                                            }
                                        />
                                    </td>
                                    {modData.institution_type_cd !== "400" ? (
                                        <>
                                            <th>직책</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input wp100"
                                                    value={item.duty}
                                                    key={`${item.idx}_duty`}
                                                    onChange={(e) =>
                                                        changeEntry(
                                                            e,
                                                            item.idx,
                                                            "duty",
                                                        )
                                                    }
                                                />
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <th>관심분야 기타</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input wp100"
                                                    value={
                                                        item.position.split(
                                                            ",",
                                                        )[
                                                            item.position.split(
                                                                ",",
                                                            ).length - 1
                                                        ]
                                                    }
                                                    key={`${item.idx}_position_other`}
                                                    onChange={(e) =>
                                                        changeEntry(
                                                            e,
                                                            item.idx,
                                                            "position_other",
                                                        )
                                                    }
                                                    disabled={
                                                        modData.institution_type_cd ===
                                                        "400"
                                                    }
                                                />
                                            </td>
                                        </>
                                    )}
                                </tr>
                                <tr>
                                    <th>본인여부</th>
                                    <td>
                                        <select
                                            className="wp100"
                                            value={item.relationship_type}
                                            key={`${item.idx}_gender`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "relationship_type",
                                                )
                                            }
                                        >
                                            <option value="">- 선택 -</option>
                                            {relationshipTypeOption.length !==
                                                0 &&
                                                relationshipTypeOption.map(
                                                    (item2, idx2) => (
                                                        <option
                                                            key={`relationshipTypeOption_${idx}_${idx2}`}
                                                            value={
                                                                item2.code_key
                                                            }
                                                        >
                                                            {`${
                                                                item2.code_value_ko
                                                            } ${
                                                                item2.code_value_en &&
                                                                `(${item2.code_value_en})`
                                                            }`}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                    </td>
                                    <th>이메일</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="input wp100"
                                            value={item.email}
                                            key={`${item.idx}_email`}
                                            onChange={(e) =>
                                                changeEntry(
                                                    e,
                                                    item.idx,
                                                    "email",
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                {modData.institution_type_cd !== "400" && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            style={{ textAlign: "right" }}
                                        >
                                            <Link
                                                to=""
                                                className="subbtn del"
                                                onClick={() =>
                                                    removeEntry(item.idx)
                                                }
                                            >
                                                삭제
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ))}

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

export default EntryManageModalMain;
