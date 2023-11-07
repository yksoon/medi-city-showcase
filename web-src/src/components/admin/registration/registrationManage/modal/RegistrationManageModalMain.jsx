import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import Select from "react-select";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";

const RegistrationManageModalMain = (props) => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const countryBank = useRecoilValue(countryBankAtom);
    const codes = useRecoilValue(codesAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    const [paymentTypeOption, setPaymentTypeOption] = useState([]);
    const [bankOption, setBankOption] = useState([]);
    const [selectCountryOptions, setSelectCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    // refs
    const registrationTitleKo = useRef(null);
    const registrationTitleEn = useRef(null);
    const startDate = useRef(null);
    const startTime = useRef(null);
    const endDate = useRef(null);
    const endTime = useRef(null);
    const entryCost = useRef(null);
    const additionalCost = useRef(null);
    const interpretationCost = useRef(null);
    const paymentType = useRef("000");
    const paymentBankCd = useRef(null);
    const paymentAccount = useRef(null);
    const nameFirstKo = useRef(null);
    const nameLastKo = useRef(null);
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const email = useRef(null);
    const interPhoneNumber = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const registrationMemo = useRef(null);
    const targetDate = useRef(null);
    const targetScale = useRef(null);
    const targetPlace = useRef(null);
    const targetHost = useRef(null);
    const targetSupervision = useRef(null);
    const targetContactus = useRef(null);

    useEffect(() => {
        // 결제타입, 은행 초기화
        setPaymentSelectOption();
    }, [countryBank, codes]);

    useEffect(() => {
        if (paymentTypeOption.length !== 0 && bankOption.length !== 0) {
            // 수정일 경우 디폴트 세팅
            isModData && setDefaultValue();
        }
    }, [paymentTypeOption, bankOption]);

    const setPaymentSelectOption = () => {
        const paymentTypeArr = codes.filter(
            (el) => el.code_type === "PAYMENT_TYPE",
        );
        const paymentBankArr = countryBank.filter(
            (el) => el.code_type === "BANK_TYPE",
        );

        setPaymentTypeOption(paymentTypeArr);
        setBankOption(paymentBankArr);

        let options = [];
        const country = countryBank.filter(
            (e) => e.code_type === "INTER_PHONE_TYPE",
        );

        for (let i = 0; i < country.length; i++) {
            let newObj = {
                value: country[i].code_key,
                label: country[i].code_value,
            };

            options.push(newObj);
        }

        setSelectCountryOptions(options);

        // 기본
        const defaultObj = options.find((e) => e.value === "82");
        setSelectedCountry(defaultObj);
    };

    const setDefaultValue = () => {
        registrationTitleKo.current.value = modData.registration_title_ko ?? "";
        registrationTitleEn.current.value = modData.registration_title_en ?? "";
        startDate.current.value = modData.start_date ?? "";
        startTime.current.value = modData.start_time ?? "";
        endDate.current.value = modData.end_date ?? "";
        endTime.current.value = modData.end_time ?? "";
        entryCost.current.value = modData.entry_cost ?? "";
        additionalCost.current.value = modData.additional_cost ?? "";
        interpretationCost.current.value = modData.interpretation_cost ?? "";
        paymentType.current.value = modData.payment_type_cd ?? "";
        paymentBankCd.current.value = modData.payment_bank_cd ?? "";
        paymentAccount.current.value = modData.payment_account ?? "";
        nameFirstKo.current.value = modData.name_first_ko ?? "";
        nameLastKo.current.value = modData.name_last_ko ?? "";
        nameFirstEn.current.value = modData.name_first_en ?? "";
        nameLastEn.current.value = modData.name_last_en ?? "";
        email.current.value = modData.email ?? "";
        mobile1.current.value = modData.mobile1 ?? "";
        mobile2.current.value = modData.mobile2 ?? "";
        mobile3.current.value = modData.mobile3 ?? "";
        registrationMemo.current.value = modData.registration_memo ?? "";
        targetDate.current.value = modData.target_date ?? "";
        targetScale.current.value = modData.target_scale ?? "";
        targetPlace.current.value = modData.target_place ?? "";
        targetHost.current.value = modData.target_host ?? "";
        targetSupervision.current.value = modData.target_supervision ?? "";
        targetContactus.current.value = modData.target_contactus ?? "";

        setSelectedCountry(
            selectCountryOptions.find(
                (e) => e.value === modData.inter_phone_number,
            ),
        );
    };

    // 등록
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            let url;
            if (method === "reg") {
                // /v1/reg
                // POST
                // 사전등록 등록
                url = apiPath.api_admin_reg_regs;
            } else if (method === "mod") {
                // /v1/reg
                // PUT
                // 사전등록 수정
                url = apiPath.api_admin_mod_regs;
            }

            const data = {
                registration_title_ko: registrationTitleKo.current.value,
                registration_title_en: registrationTitleEn.current.value,
                start_date: startDate.current.value,
                start_time: startTime.current.value,
                end_date: endDate.current.value,
                end_time: endTime.current.value,
                entry_cost: entryCost.current.value,
                additional_cost: additionalCost.current.value,
                interpretation_cost: interpretationCost.current.value,
                payment_type: paymentType.current.value,
                payment_bank_cd: paymentBankCd.current.value,
                payment_account: paymentAccount.current.value,
                name_first_ko: nameFirstKo.current.value,
                name_last_ko: nameLastKo.current.value,
                name_first_en: nameFirstEn.current.value,
                name_last_en: nameLastEn.current.value,
                email: email.current.value,
                inter_phone_number: selectedCountry.value,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                registration_memo: registrationMemo.current.value,
                target_date: targetDate.current.value,
                target_scale: targetScale.current.value,
                target_place: targetPlace.current.value,
                target_host: targetHost.current.value,
                target_supervision: targetSupervision.current.value,
                target_contactus: targetContactus.current.value,
                registration_idx:
                    method === "mod" ? modData.registration_idx : "",
            };

            const restParams = {
                method:
                    method === "reg" ? "post" : method === "mod" ? "put" : "",
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
                                ? "사전등록 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "사전등록 수정이 완료 되었습니다"
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
        }
    };

    // 국적 SELECT 스타일
    const customStyles = {
        control: () => ({
            width: "inherit",
            height: "inherit",
            lineHeight: "28px",
        }),
        valueContainer: () => ({
            height: "28px",
            lineHeight: "28px",
            padding: "0",
            display: "block",
        }),
        indicatorsContainer: () => ({
            display: "none",
        }),
        input: () => ({
            height: "inherit",
            lineHeight: "28px",
            gridArea: "0",
            display: "block",
            position: "absolute",
            top: "0",
            width: "85%",
        }),
    };

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

        if (!registrationTitleKo.current.value) {
            noti(registrationTitleKo, "사전등록명(국문)을 입력해주세요");

            return false;
        }

        if (!registrationTitleEn.current.value) {
            noti(registrationTitleEn, "사전등록명(영문)을 입력해주세요");

            return false;
        }

        if (!startDate.current.value) {
            noti(startDate, "시작일을 입력해주세요");

            return false;
        }

        if (!startTime.current.value) {
            noti(startTime, "시작시간을 입력해주세요");

            return false;
        }

        if (!endDate.current.value) {
            noti(endDate, "종료일을 입력해주세요");

            return false;
        }

        if (!endTime.current.value) {
            noti(endTime, "종료시간을 입력해주세요");

            return false;
        }

        if (
            !nameFirstKo.current.value ||
            !nameLastKo.current.value ||
            !nameFirstEn.current.value ||
            !nameLastEn.current.value
        ) {
            noti(nameFirstKo, "담당자명을 입력해주세요");

            return false;
        }

        if (!email.current.value) {
            noti(email, "이메일을 입력해주세요");

            return false;
        }

        if (
            !mobile1.current.value ||
            !mobile2.current.value ||
            !mobile3.current.value
        ) {
            noti(email, "연락처를 입력해주세요");

            return false;
        }

        return true;
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
                            <th>
                                사전등록명(국문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationTitleKo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                사전등록명(영문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={registrationTitleEn}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                시작일(시간) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={startDate}
                                />
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={startTime}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                종료일(시간) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={endDate}
                                />
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={endTime}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>참가비용</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={entryCost}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>추가비용</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={additionalCost}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>통역비용</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={interpretationCost}
                                />
                            </td>
                        </tr>
                        {paymentTypeOption.length !== 0 && (
                            <tr>
                                <th>결제방법</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={paymentType}
                                        // disabled={true}
                                    >
                                        {paymentTypeOption.map((item, idx) => (
                                            <option
                                                key={`paymentTypeOption_${idx}`}
                                                value={item.code_key}
                                            >
                                                {item.code_value}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        )}
                        {bankOption.length !== 0 && (
                            <tr>
                                <th>은행</th>
                                <td>
                                    <select
                                        className="wp100"
                                        ref={paymentBankCd}
                                        // disabled={true}
                                    >
                                        {bankOption.map((item, idx) => (
                                            <option
                                                key={`bankOption_${idx}`}
                                                value={item.code_key}
                                            >
                                                {item.code_value}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th>계좌번호</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={paymentAccount}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                예금주명 or 담당자명
                                <br />
                                (국문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    placeholder="성"
                                    ref={nameFirstKo}
                                />
                                <input
                                    type="text"
                                    className="input w180"
                                    placeholder="이름"
                                    ref={nameLastKo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                예금주명 or 담당자명
                                <br />
                                (영문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input w180"
                                    placeholder="First Name"
                                    ref={nameFirstEn}
                                />
                                <input
                                    type="text"
                                    className="input w180"
                                    placeholder="Last Name"
                                    ref={nameLastEn}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                이메일 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={email}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>국가코드</th>
                            <td>
                                <Select
                                    className="select"
                                    id="interPhoneNumber"
                                    options={selectCountryOptions}
                                    value={selectedCountry}
                                    key={selectedCountry}
                                    styles={customStyles}
                                    onChange={(e) => {
                                        setSelectedCountry(
                                            selectCountryOptions.find(
                                                (event) =>
                                                    event.value === e.value,
                                            ),
                                        );
                                        // handleSelectedCountry(e.value);
                                    }}
                                    ref={interPhoneNumber}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                연락처 <span className="red">*</span>
                            </th>
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
                            <th>메모</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={registrationMemo}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>실행일자</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetDate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>규모</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetScale}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>장소</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetPlace}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주최</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetHost}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주관</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetSupervision}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>문의처</th>
                            <td>
                                <textarea
                                    className="input wp100"
                                    ref={targetContactus}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="subbtn_box">
                    {isModData ? (
                        <>
                            <Link
                                to=""
                                className="subbtn del"
                                // onClick={clickRemove}
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

export default RegistrationManageModalMain;
