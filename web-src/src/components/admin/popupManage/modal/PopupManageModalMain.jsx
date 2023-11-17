import React, { useEffect, useRef, useState } from "react";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import CountrySelect from "common/js/countryAutocomplete";

const PopupManageModalMain = (props) => {
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
    const [selectedCountry, setSelectedCountry] = useState("82");

    // refs
    const popupTitle = useRef(null);
    const popupContent = useRef(null);
    const popupWidth = useRef(null);
    const popupHeight = useRef(null);
    const popupTop = useRef(null);
    const popupLeft = useRef(null);
    const selectScrollYn = useRef(null);
    const select24HoursYn = useRef(null);
    const startDate = useRef(null);
    const startTime = useRef(null);
    const endDate = useRef(null);
    const endTime = useRef(null);




    const registrationSubTitleKo = useRef(null);
    const registrationSubTitleEn = useRef(null);
    // const startDate = useRef(null);
    // const startTime = useRef(null);
    // const endDate = useRef(null);
    // const endTime = useRef(null);
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
    };

    const setDefaultValue = () => {
        popupTitle.current.value = modData.title ?? "";
        popupContent.current.value = modData.content ?? "";
        popupWidth.current.value = modData.size_width;
        popupHeight.current.value = modData.size_height;
        popupTop.current.value = modData.position_top;
        popupLeft.current.value = modData.position_left;
        selectScrollYn.current.value = modData.option_scroll_yn;
        select24HoursYn.current.value = modData.option_24_hours_yn;
        startDate.current.value = modData.start_date.split(' ')[0];
        startTime.current.value = modData.start_date.split(' ')[1];
        endDate.current.value = modData.end_date.split(' ')[0];
        endTime.current.value = modData.end_date.split(' ')[1];
        // startDate.current.value = modData.start_date ?? "";
        // startTime.current.value = modData.start_time ?? "";
        // endDate.current.value = modData.end_date ?? "";
        // endTime.current.value = modData.end_time ?? "";

        registrationSubTitleKo.current.value =
            modData.registration_sub_title_ko ?? "";
        registrationSubTitleEn.current.value =
            modData.registration_sub_title_en ?? "";

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

        setSelectedCountry(modData.inter_phone_number);
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
                title: popupTitle.current.value,
                content: popupContent.current.value,
                size_width: popupWidth.value.value,
                size_height: popupHeight.value.value,
                position_top: popupTop.value.value,
                position_left: popupLeft.value.value,
                option_scroll_yn: selectScrollYn.value.value,
                option_24_hours_yn: select24HoursYn.value.value,
                start_date: startTime.value.value ? startDate.value.value + ' ' + startTime.value.value : startDate.value.value + ' 00:00',
                end_date: endTime.value.value ? endDate.value.value + ' ' + endTime.value.value : endDate.value.value + ' 23:59',

                registration_sub_title_ko: registrationSubTitleKo.current.value,
                registration_sub_title_en: registrationSubTitleEn.current.value,
                // start_date: startDate.current.value,
                start_time: startTime.current.value,
                // end_date: endDate.current.value,
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
                inter_phone_number: selectedCountry,
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

        if (!popupTitle.current.value) {
            noti(popupTitle, "제목을 입력해주세요");

            return false;
        }

        if (!popupContent.current.value) {
            noti(popupContent, "내용을 입력해주세요");

            return false;
        }

        if (!startDate.current.value) {
            noti(startDate, "시작일을 입력해주세요");

            return false;
        }

        if (!endDate.current.value) {
            noti(endDate, "종료일을 입력해주세요");

            return false;
        }

        return true;
    };

    return (
        <>
            <div className="admin">
                <table className="table_bb">
                    <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                제목 <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupTitle}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                내용 <span className="red">*</span>
                            </th>
                            <td colSpan="3">
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupContent}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>팝업 너비</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupWidth}
                                />
                            </td>
                            <th>팝업 높이</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupHeight}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>팝업 Top</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupTop}
                                />
                            </td>
                            <th>팝업 Left</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={popupLeft}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>스크롤 사용</th>
                            <td colSpan="3">
                                <select class="wp100" ref={selectScrollYn}>
                                    <option value="N">사용안함</option>
                                    <option value="Y">사용함</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>24시간동안 띄우지 않기</th>
                            <td colSpan="3">
                                <select class="wp100" ref={select24HoursYn}>
                                    <option value="N">사용안함</option>
                                    <option value="Y">사용함</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                시작일 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={startDate}
                                />
                            </td>
                            <th>시작시간</th>
                            <td>
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={startTime}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                종료일 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="date"
                                    className="input w140"
                                    ref={endDate}
                                />
                            </td>
                            <th>종료시간</th>
                            <td>
                                <input
                                    type="time"
                                    className="input w140"
                                    ref={endTime}
                                />
                            </td>
                        </tr>
                        {isModData && (
                            <>
                                <tr>
                                    <th>등록자</th>
                                    <td colSpan="3">{ modData.reg_user_name_ko }</td>
                                </tr>
                                <tr>
                                    <th>등록일</th>
                                    <td colSpan="3">{ modData.reg_dttm }</td>
                                </tr>
                            </>
                        )}
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

export default PopupManageModalMain;
