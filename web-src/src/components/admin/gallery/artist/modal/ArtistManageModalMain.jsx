import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import CountrySelect from "common/js/countryAutocomplete";

const ArtistManageModalMain = (props) => {
    const { confirm } = useConfirm();
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

    // select box options
    const [peopleTypeOptions, setPeopleTypeOptions] = useState([]);
    // select box options End

    // state
    const [selectedCountry, setSelectedCountry] = useState("82");
    // state End

    // refs
    const nameFirstKo = useRef(null);
    const nameLastKo = useRef(null);
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const peopleType = useRef(null);
    const email = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    // refs End

    useEffect(() => {
        // 국가코드, 등등 옵션 초기화
        setSelectOption();
    }, [countryBank, codes]);

    const setSelectOption = () => {
        // 인물타입
        const peopleTypeArr = codes.filter(
            (el) => el.code_type === "PEOPLE_TYPE",
        );

        setPeopleTypeOptions(peopleTypeArr);
    };

    return (
        <>
            <div className="admin">
                <h4 className="mo_subtitle">아티스트 정보</h4>
                <table className="table_bb">
                    <colgroup>
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="30%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이름(국문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w140"
                                    ref={nameFirstKo}
                                    placeholder="성"
                                />{" "}
                                <input
                                    type="text"
                                    className="input w140"
                                    ref={nameLastKo}
                                    placeholder="이름"
                                />
                            </td>
                            <th>이름(영문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w140"
                                    ref={nameFirstEn}
                                    placeholder="First Name"
                                />{" "}
                                <input
                                    type="text"
                                    className="input w140"
                                    ref={nameLastEn}
                                    placeholder="Last Name"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select className="wp100" ref={peopleType}>
                                    <option>- 선택 -</option>
                                    {peopleTypeOptions.length !== 0 &&
                                        peopleTypeOptions.map((item, idx) => (
                                            <option
                                                key={`peopleTypeOptions_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={email}
                                    placeholder="이메일"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>국가번호</th>
                            <td>
                                <CountrySelect
                                    onChange={(e, value) =>
                                        setSelectedCountry(value)
                                    }
                                    defaultValue={selectedCountry}
                                />
                            </td>
                            <th>휴대전화</th>
                            <td>
                                <input
                                    type="text"
                                    className="input w100"
                                    ref={mobile1}
                                />
                                {" - "}
                                <input
                                    type="text"
                                    className="input w120"
                                    ref={mobile2}
                                />
                                {" - "}
                                <input
                                    type="text"
                                    className="input w120"
                                    ref={mobile3}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="subbtn_box">
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

export default ArtistManageModalMain;
