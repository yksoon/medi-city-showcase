import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify } from "common/js/Common";
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
    const inputThumbFile = useRef(null);
    const inputAttachmentFile = useRef(null);
    const previewThumb = useRef(null);
    const previewAttachment = useRef(null);
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

    // 이미지 업로드 시 미리보기
    const readURL = (input, imageType) => {
        if (isFileImage(input.files)) {
            if (imageType === "thumb" && !fileSize(input.files)) {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "1mb 이하의 이미지만 업로드 가능합니다.",
                });
                input.value = "";

                return false;
            } else {
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        // 썸네일일경우
                        if (imageType === "thumb") {
                            previewThumb.current.src = e.target.result;
                        } else if (imageType === "origin") {
                            previewAttachment.current.src = e.target.result;
                        }
                        // document.getElementById("preview").src = e.target.result;
                    };
                    reader.readAsDataURL(input.files[0]);
                } else {
                    document.getElementById("preview").src = "";
                }
            }
        } else {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "이미지만 업로드 가능합니다.",
            });

            input.value = "";

            return false;
        }
    };

    const isFileImage = (file) => {
        if (file) {
            for (let i = 0; i < file.length; i++) {
                return file[i] && file[i]["type"].split("/")[0] === "image";
            }
        }
    };

    const fileSize = (file) => {
        let maxSize = 1024 * 1024;
        if (file) {
            for (let i = 0; i < file.length; i++) {
                const fileSize = file[i] && file[i]["size"];

                return maxSize > fileSize;
            }
        }
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
                        <tr>
                            <th>썸네일 사진</th>
                            <td>
                                <div className="hotel_thumb_wrap">
                                    <span className="hotel_thumb">
                                        <img
                                            src=""
                                            alt=""
                                            id="preview"
                                            ref={previewThumb}
                                        />
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    onChange={(e) => readURL(e.target, "thumb")}
                                    accept="image/*"
                                    id="inputThumbFile"
                                    ref={inputThumbFile}
                                />
                            </td>
                            <th>원본 사진</th>
                            <td>
                                <div className="hotel_thumb_wrap">
                                    <span className="hotel_thumb">
                                        <img
                                            src=""
                                            alt=""
                                            id="preview"
                                            ref={previewAttachment}
                                        />
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        readURL(e.target, "origin")
                                    }
                                    accept="image/*"
                                    id="inputAttachmentFile"
                                    ref={inputAttachmentFile}
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
