import React, { useEffect, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import CountrySelect from "common/js/commonComponents/CountrySelect";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import imageCompression from "browser-image-compression";
import { imageResizeOptions } from "common/js/static";
import RadioGroupSelection from "common/js/commonComponents/RadioGroupSelection";

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
    const [selectedCountry, setSelectedCountry] = useState("82");
    const [profileType, setProfileType] = useState([]);
    const [genderOption, setGenderOption] = useState([]);
    // select box options End

    // state
    // const [profileInfo, setProfileInfo] = useState([]);
    const [fileInfo, setFileInfo] = useState([]);
    const [thumbnailInfo, setThumbnailInfo] = useState([]);
    const [thumbFiles, setThumbFiles] = useState([]);
    const [showYn, setShowYn] = useState("Y");
    // const [profileSection, setProfileSection] = useState([
    //     { idx: 1, sectionValue: "" },
    // ]);
    // const [selectedProfile, setSelectedProfile] = useState([]);
    const [state, setState] = useState({
        profileSection: isModData ? [] : [{ idx: 1, sectionValue: "" }], // Initialize with your actual state structure
        selectedProfile: [], // Initialize with your actual state structure
    });
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
    const gender = useRef(null);
    const birth = useRef(null);
    const peopleMemoKo = useRef(null);
    const peopleMemoEn = useRef(null);
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

        // 프로필타입
        const profileTypeArr = codes.filter(
            (el) => el.code_type === "PROFILE_TYPE",
        );
        setProfileType(profileTypeArr);

        // 성별
        const genderArr = codes.filter((el) => el.code_type === "GENDER");
        setGenderOption(genderArr);
    };

    useEffect(() => {
        isModData && setDefaultValue();
    }, [peopleTypeOptions]);

    const setDefaultValue = () => {
        nameFirstKo.current.value = modData.name_first_ko ?? "";
        nameLastKo.current.value = modData.name_last_ko ?? "";
        nameFirstEn.current.value = modData.name_first_en ?? "";
        nameLastEn.current.value = modData.name_last_en ?? "";
        peopleType.current.value = modData.people_type_cd ?? "";
        email.current.value = modData.email ?? "";
        setSelectedCountry(modData.inter_phone_number);
        mobile1.current.value = modData.mobile1 ?? "";
        mobile2.current.value = modData.mobile2 ?? "";
        mobile3.current.value = modData.mobile3 ?? "";
        gender.current.value = modData.gender_cd ?? "";
        birth.current.value = modData.birth
            ? `${modData.birth_yyyy}-${modData.birth_mm}-${modData.birth_dd}`
            : "";
        peopleMemoKo.current.value = modData.people_memo_ko ?? "";
        peopleMemoEn.current.value = modData.people_memo_en ?? "";
        setShowYn(modData.show_yn ?? "Y")
        setFileInfo(modData.file_info);
        previewAttachment.current.src =
            modData.file_info.length !== 0 &&
            apiPath.api_file + modData.file_info[0].file_path_enc;
        setThumbnailInfo(modData.thumbnail_info);

        // setProfileInfo(modData.profile_info);

        setDefaultProfile();
    };

    // 아티스트 썸네일 이미지 사이즈 조정 - 가로 세로 길이 대비
    const handleImageLoad = () => {
        if (previewAttachment) {
            const thumbWidth = previewAttachment.current.width;
            const thumbHeight = previewAttachment.current.height;

            const profileThumb = document.querySelector(".profile_thumb");

            if (thumbWidth > thumbHeight) {
                profileThumb.classList.add("width_b");
            }

            if (thumbHeight > thumbWidth) {
                profileThumb.classList.add("height_b");
            }
        }
    };

    const setDefaultProfile = () => {
        const defaultProfile = modData.profile_info;
        const defaultProfileLength = defaultProfile.length;

        if (defaultProfileLength !== 0) {
            defaultProfile.forEach((profile, i) => {
                if (
                    state.profileSection.filter(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    ).length === 0
                ) {
                    if (i === 0) {
                        setState((prevState) => ({
                            ...prevState,
                            profileSection: [
                                ...prevState.profileSection,
                                {
                                    idx: i,
                                    sectionValue: profile.profile_type_cd,
                                },
                            ],
                        }));
                    } else if (
                        defaultProfile[i - 1].profile_type_cd !==
                        defaultProfile[i].profile_type_cd
                    ) {
                        setState((prevState) => ({
                            ...prevState,
                            profileSection: [
                                ...prevState.profileSection,
                                {
                                    idx: i,
                                    sectionValue: profile.profile_type_cd,
                                },
                            ],
                        }));
                    }
                }
            });

            defaultProfile.forEach((profile, i) => {
                if (
                    state.profileSection.filter(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    ).length !== 0
                ) {
                    const parentObj = state.profileSection.find(
                        (el) => el.sectionValue === profile.profile_type_cd,
                    );
                    const obj = {
                        parentIdx: parentObj.idx,
                        profileType: parentObj.sectionValue,
                        profileContentKo: profile.profile_content_ko,
                        profileContentEn: profile.profile_content_en,
                        inputIdx: i + 1,
                    };

                    setState((prevState) => ({
                        ...prevState,
                        selectedProfile: [...prevState.selectedProfile, obj],
                    }));
                }
            });
        }
    };

    // 이미지 업로드 시 미리보기
    const readURL = (input, imageType) => {
        const imageFile = input.files[0];
        if (isFileImage(input.files)) {
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

    // 인물 프로필 핸들링 함수 (프로필 추가/삭제)
    const handelProfileSection = (handleType, idx) => {
        switch (handleType) {
            case "add":
                const lastSectionIdx =
                    state.profileSection.length !== 0
                        ? state.profileSection[state.profileSection.length - 1]
                              .idx
                        : 0;
                const addSectionIdx = lastSectionIdx + 1;

                // Update state.profileSection based on your actual state structure
                setState((prevState) => ({
                    ...prevState,
                    profileSection: [
                        ...prevState.profileSection,
                        { idx: addSectionIdx, sectionValue: "" },
                    ],
                }));

                break;

            case "remove":
                if (state.profileSection.length > 1) {
                    // Update state.profileSection based on your actual state structure
                    const updatedProfileSection = state.profileSection.filter(
                        (el) => el.idx !== idx,
                    );
                    setState((prevState) => ({
                        ...prevState,
                        profileSection: updatedProfileSection,
                    }));

                    // Update state.selectedProfile based on your actual state structure
                    const updatedSelectedProfile = state.selectedProfile.filter(
                        (el) => el.parentIdx !== idx,
                    );
                    setState((prevState) => ({
                        ...prevState,
                        selectedProfile: updatedSelectedProfile,
                    }));
                } else {
                    // Assume CommonNotify is a component for notifications
                    // You may want to replace this with your own notification logic
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "한가지 이상 필수입니다.",
                    });
                }

                break;

            default:
                break;
        }
    };

    // 인물 프로필 셀렉트 박스 선택 이벤트
    const handleProfileType = (e, sectionIdx) => {
        const val = e.target.value;

        if (
            state.profileSection.filter((el) => el.sectionValue === val)
                .length !== 0
        ) {
            // Assume CommonNotify is a component for notifications
            // You may want to replace this with your own notification logic
            // Also, handle the state updates based on your actual state structure
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "이미 선택하였습니다. 선택된 항목에서 추가해주세요",
            });

            if (
                state.selectedProfile.filter(
                    (el) => el.parentIdx === sectionIdx,
                ).length !== 0
            ) {
                // Update state.selectedProfile based on your actual state structure
                const updatedProfile = state.selectedProfile.map((el) =>
                    el.parentIdx === sectionIdx
                        ? { ...el, profileType: val }
                        : el,
                );
                setState((prevState) => ({
                    ...prevState,
                    selectedProfile: updatedProfile,
                }));
            } else {
                e.target.value = "";
            }
        } else {
            // Update state.profileSection based on your actual state structure
            const updatedProfileSection = state.profileSection.map((el) =>
                el.idx === sectionIdx ? { ...el, sectionValue: val } : el,
            );
            setState((prevState) => ({
                ...prevState,
                profileSection: updatedProfileSection,
            }));

            // Update state.selectedProfile based on your actual state structure
            const updatedSelectedProfile = state.selectedProfile.map((el) =>
                el.parentIdx === sectionIdx ? { ...el, profileType: val } : el,
            );

            if (
                updatedSelectedProfile.filter(
                    (el) => el.parentIdx === sectionIdx,
                ).length === 0
            ) {
                // Update state.selectedProfile based on your actual state structure
                const newProfile = {
                    parentIdx: sectionIdx,
                    profileType: val,
                    profileContentKo: "",
                    profileContentEn: "",
                    inputIdx: 1,
                };
                setState((prevState) => ({
                    ...prevState,
                    selectedProfile: [...updatedSelectedProfile, newProfile],
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    selectedProfile: updatedSelectedProfile,
                }));
            }
        }
    };

    const handleInputBtn = (handleType, parentIdx, inputIdx) => {
        switch (handleType) {
            case "add":
                const parentArr = state.selectedProfile.filter(
                    (el) => el.parentIdx === parentIdx,
                );

                const newItem = {
                    parentIdx: parentIdx,
                    profileType: parentArr[parentArr.length - 1].profileType,
                    profileContentKo: "",
                    profileContentEn: "",
                    inputIdx: parentArr[parentArr.length - 1].inputIdx + 1,
                };

                setState((prevState) => ({
                    ...prevState,
                    selectedProfile: [...prevState.selectedProfile, newItem],
                }));
                break;

            case "remove":
                setState((prevState) => ({
                    ...prevState,
                    selectedProfile: prevState.selectedProfile.filter(
                        (el) =>
                            !(
                                el.parentIdx === parentIdx &&
                                el.inputIdx === inputIdx
                            ),
                    ),
                }));
                break;

            default:
                break;
        }
    };

    const handleInput = (e, parentIdx, inputIdx, type) => {
        if (type === "ko") {
            setState((prevState) => ({
                ...prevState,
                selectedProfile: prevState.selectedProfile.map((profile) => {
                    if (
                        profile.parentIdx === parentIdx &&
                        profile.inputIdx === inputIdx
                    ) {
                        return {
                            ...profile,
                            profileContentKo: e.target.value,
                        };
                    }
                    return profile;
                }),
            }));
        } else if (type === "en") {
            setState((prevState) => ({
                ...prevState,
                selectedProfile: prevState.selectedProfile.map((profile) => {
                    if (
                        profile.parentIdx === parentIdx &&
                        profile.inputIdx === inputIdx
                    ) {
                        return {
                            ...profile,
                            profileContentEn: e.target.value,
                        };
                    }
                    return profile;
                }),
            }));
        } else {
            return false;
        }
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

            const url = `${apiPath.api_admin_remove_people}${modData.people_idx}`;

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

    // 등록
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            let url;
            if (method === "reg") {
                // /v1/reg
                // POST
                // 사전등록 등록
                url = apiPath.api_admin_add_people;
            } else if (method === "mod") {
                // /v1/reg
                // PUT
                // 사전등록 수정
                url = apiPath.api_admin_mod_people;
            }

            const formData = new FormData();
            let data = {};

            let fileArr = [];
            let thumbArr = [];

            data = {
                peopleType: peopleType.current.value,
                nameFirstKo: nameFirstKo.current.value,
                nameLastKo: nameLastKo.current.value,
                nameFirstEn: nameFirstEn.current.value,
                nameLastEn: nameLastEn.current.value,
                email: email.current.value,
                interPhoneNumber: selectedCountry,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                gender: gender.current.value,
                peopleMemoKo: peopleMemoKo.current.value,
                peopleMemoEn: peopleMemoEn.current.value,
                showYn: showYn,
                birthYyyy:
                    birth.current.value && birth.current.value.split("-")[0],
                birthMm:
                    birth.current.value && birth.current.value.split("-")[1],
                birthDd:
                    birth.current.value && birth.current.value.split("-")[2],
                peopleIdx: method === "mod" ? modData.people_idx : "",
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // 파일 formData append
            fileArr = Array.from(inputAttachmentFile.current.files);
            let fileLen = fileArr.length;
            for (let i = 0; i < fileLen; i++) {
                formData.append("attachmentFile", fileArr[i]);
            }

            // 프로필 formData append
            state.selectedProfile.forEach((item, idx) => {
                if (item.profileContentKo || item.profileContentEn) {
                    formData.append(
                        `profileInfo[${idx}].profileType`,
                        item.profileType,
                    );
                    formData.append(
                        `profileInfo[${idx}].profileContentKo`,
                        item.profileContentKo,
                    );
                    formData.append(
                        `profileInfo[${idx}].profileContentEn`,
                        item.profileContentEn,
                    );
                }
            });

            const restParams = {
                method:
                    method === "reg"
                        ? "post_multi"
                        : method === "mod"
                        ? "put_multi"
                        : "",
                url: url,
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responseLogic(res),
            };

            // if (inputThumbFile.current.files.length !== 0) {
            //     thumbArr = Array.from(inputThumbFile.current.files);
            //     let thumbLen = thumbArr.length;
            //     for (let i = 0; i < thumbLen; i++) {
            //         imageCompression(thumbArr[i], imageResizeOptions)
            //             .then(function (compressedFile) {
            //                 const resizingFile = new File(
            //                     [compressedFile],
            //                     thumbArr[i].name,
            //                     { type: thumbArr[i].type },
            //                 );
            //                 return addFormData(resizingFile);
            //             })
            //             .catch(function (error) {
            //                 console.log(error.message);
            //             });
            //         // formData.append("attachmentThumbnail", thumbArr[i]);
            //     }
            //
            //     const addFormData = (compressedFile) => {
            //         formData.append("attachmentThumbnail", compressedFile); // write your own logic
            //
            //         CommonRest(restParams);
            //     };
            // } else {
            //     CommonRest(restParams);
            // }

            // 인물일 경우 썸네일 생성
            if (inputAttachmentFile.current.files.length !== 0) {
                thumbArr = Array.from(inputAttachmentFile.current.files);
                let thumbLen = thumbArr.length;
                for (let i = 0; i < thumbLen; i++) {
                    imageCompression(thumbArr[i], imageResizeOptions)
                        .then(function (compressedFile) {
                            const resizingFile = new File(
                                [compressedFile],
                                thumbArr[i].name,
                                { type: thumbArr[i].type },
                            );
                            return addFormData(resizingFile);
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });
                    // formData.append("attachmentThumbnail", thumbArr[i]);
                }

                const addFormData = (compressedFile) => {
                    formData.append("attachmentThumbnail", compressedFile); // write your own logic

                    CommonRest(restParams);
                };
            } else {
                CommonRest(restParams);
            }

            const responseLogic = (res) => {
                let result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message:
                            method === "reg"
                                ? "아티스트 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "아티스트 수정이 완료 되었습니다"
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

    /**
     * validation 검증
     */
    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref && ref.current.focus();
            };
        };

        if (!nameFirstKo.current.value || !nameLastKo.current.value) {
            noti(nameFirstKo, "아티스트명(국문)을 입력해주세요");

            return false;
        }

        if (!nameFirstEn.current.value || !nameLastEn.current.value) {
            noti(nameFirstEn, "아티스트명(영문)을 입력해주세요");

            return false;
        }

        if (!peopleType.current.value) {
            noti(peopleType, "아티스트 구분을 선택해주세요");

            return false;
        }

        if (!gender.current.value) {
            noti(gender, "성별을 선택해주세요");

            return false;
        }

        if (state.selectedProfile.length === 0) {
            noti("", "한가지 이상의 프로필을 등록해주세요");

            return false;
        }

        return true;
    };

    const radioItems = [
        { value: "Y", label: "노출" },
        { value: "N", label: "비노출" },
    ];

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
                            <th>
                                이름(국문, 영문) <span className="red">*</span>
                            </th>
                            <td>
                                <div>
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
                                </div>
                                <div>
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
                                </div>
                            </td>
                            <th>
                                노출여부
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"showYn"}
                                    value={showYn}
                                    onChange={(e) =>
                                        setShowYn(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                구분 <span className="red">*</span>
                            </th>
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
                            <th>
                                국가번호 <span className="red">*</span>
                            </th>
                            <td>
                                <CountrySelect
                                    onChange={(e, value) =>
                                        setSelectedCountry(value)
                                    }
                                    defaultValue={selectedCountry}
                                    mode={"full"}
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
                            <th>
                                성별 <span className="red">*</span>
                            </th>
                            <td>
                                <select className="wp100" ref={gender}>
                                    <option>- 선택 -</option>
                                    {genderOption.length !== 0 &&
                                        genderOption.map((item, idx) => (
                                            <option
                                                key={`peopleTypeOptions_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                            <th>생년월일</th>
                            <td>
                                <input
                                    type="date"
                                    className="input w120"
                                    ref={birth}
                                />
                            </td>
                        </tr>
                        <tr>
                            {/*<th>썸네일 사진</th>*/}
                            {/*<td>*/}
                            {/*    <div className="hotel_thumb_wrap">*/}
                            {/*        {thumbnailInfo.length !== 0 ? (*/}
                            {/*            thumbnailInfo.map((item, idx) => (*/}
                            {/*                <span*/}
                            {/*                    className="hotel_thumb"*/}
                            {/*                    key={`thumbnail_info_${idx}`}*/}
                            {/*                >*/}
                            {/*                    <img*/}
                            {/*                        src={`${apiPath.api_file}${item.file_path_enc}`}*/}
                            {/*                        alt=""*/}
                            {/*                        id="preview"*/}
                            {/*                        ref={previewThumb}*/}
                            {/*                    />*/}
                            {/*                </span>*/}
                            {/*            ))*/}
                            {/*        ) : (*/}
                            {/*            <span className="hotel_thumb">*/}
                            {/*                <img*/}
                            {/*                    src=""*/}
                            {/*                    alt=""*/}
                            {/*                    id="preview"*/}
                            {/*                    ref={previewThumb}*/}
                            {/*                />*/}
                            {/*            </span>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        onChange={(e) => readURL(e.target, "thumb")}*/}
                            {/*        accept="image/*"*/}
                            {/*        id="inputThumbFile"*/}
                            {/*        ref={inputThumbFile}*/}
                            {/*    />*/}
                            {/*</td>*/}
                            <th>프로필 사진</th>
                            <td colSpan={3}>
                                <div className="profile_wrap">
                                    {/*{fileInfo.length !== 0 ? (*/}
                                    {/*    fileInfo.map((item, idx) => (*/}
                                    {/*        <span*/}
                                    {/*            className="profile_thumb"*/}
                                    {/*            key={`file_info_${idx}`}*/}
                                    {/*        >*/}
                                    {/*            <img*/}
                                    {/*                src={`${apiPath.api_file}${item.file_path_enc}`}*/}
                                    {/*                alt=""*/}
                                    {/*                id="preview"*/}
                                    {/*                className="profile_img"*/}
                                    {/*                // ref={previewAttachment}*/}
                                    {/*            />*/}
                                    {/*        </span>*/}
                                    {/*    ))*/}
                                    {/*) : (*/}
                                    {/*    <span className="profile_thumb">*/}
                                    {/*        <img*/}
                                    {/*            src=""*/}
                                    {/*            alt=""*/}
                                    {/*            id="preview"*/}
                                    {/*            className="profile_img"*/}
                                    {/*            ref={previewAttachment}*/}
                                    {/*        />*/}
                                    {/*    </span>*/}
                                    {/*)}*/}
                                    <span className="profile_thumb">
                                        <img
                                            src=""
                                            alt=""
                                            id="preview"
                                            className="profile_img"
                                            ref={previewAttachment}
                                            onLoad={handleImageLoad}
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
                        <tr>
                            <th>메모 (국문)</th>
                            <td>
                                <textarea ref={peopleMemoKo}></textarea>
                            </td>
                            <th>메모 (영문)</th>
                            <td>
                                <textarea ref={peopleMemoEn}></textarea>
                            </td>
                        </tr>
                        {isModData && (
                            <tr>
                                <th>QR CODE</th>
                                <td colSpan={3}>
                                    <div className="hotel_thumb_wrap">
                                        <img src={modData.qr_img} alt="" />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h4 className="mo_subtitle">프로필 정보</h4>
                <Link
                    to=""
                    onClick={() => handelProfileSection("add")}
                    className="subbtn on"
                >
                    추가
                </Link>
                <table className="table_bb">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
                        {state.profileSection.map((item, idx) => (
                            <tr key={`${idx}_${item.idx}`}>
                                <th>프로필</th>
                                <td>
                                    <div>
                                        <select
                                            className="select w180"
                                            id={`section_select_${item.idx}`}
                                            value={item.sectionValue}
                                            onChange={(e) =>
                                                handleProfileType(e, item.idx)
                                            }
                                        >
                                            <option value="">- 선택 -</option>
                                            {profileType.length !== 0 &&
                                                profileType.map(
                                                    (profileTypeItem) => (
                                                        <option
                                                            key={
                                                                profileTypeItem.code_key
                                                            }
                                                            value={
                                                                profileTypeItem.code_key
                                                            }
                                                        >
                                                            {`${profileTypeItem.code_value_ko} (${profileTypeItem.code_value_en})`}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                        <Link
                                            to=""
                                            onClick={() =>
                                                handelProfileSection(
                                                    "remove",
                                                    item.idx,
                                                )
                                            }
                                            className="tablebtn"
                                        >
                                            프로필 삭제
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;
                                        {state.selectedProfile.filter(
                                            (el) => el.parentIdx === item.idx,
                                        ).length !== 0 && (
                                            <Link
                                                to=""
                                                className="tablebtn"
                                                onClick={() =>
                                                    handleInputBtn(
                                                        "add",
                                                        item.idx,
                                                    )
                                                }
                                            >
                                                항목 추가
                                            </Link>
                                        )}
                                    </div>
                                    {state.selectedProfile
                                        .filter(
                                            (el) => el.parentIdx === item.idx,
                                        )
                                        .map((inputItem) => (
                                            <div key={inputItem.inputIdx}>
                                                <input
                                                    type="text"
                                                    className="input w370"
                                                    id={`${item.idx}-${inputItem.inputIdx}`}
                                                    value={
                                                        inputItem.profileContentKo
                                                    }
                                                    onChange={(e) =>
                                                        handleInput(
                                                            e,
                                                            item.idx,
                                                            inputItem.inputIdx,
                                                            "ko",
                                                        )
                                                    }
                                                    placeholder="국문"
                                                />
                                                <input
                                                    type="text"
                                                    className="input w370"
                                                    id={`${item.idx}-${inputItem.inputIdx}`}
                                                    value={
                                                        inputItem.profileContentEn
                                                    }
                                                    onChange={(e) =>
                                                        handleInput(
                                                            e,
                                                            item.idx,
                                                            inputItem.inputIdx,
                                                            "en",
                                                        )
                                                    }
                                                    placeholder="영문"
                                                />
                                                <Link
                                                    to=""
                                                    className="tablebtn"
                                                    onClick={() =>
                                                        handleInputBtn(
                                                            "remove",
                                                            item.idx,
                                                            inputItem.inputIdx,
                                                        )
                                                    }
                                                >
                                                    항목 삭제
                                                </Link>
                                            </div>
                                        ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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

<script></script>;

export default ArtistManageModalMain;
