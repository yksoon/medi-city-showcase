import React, { useEffect, useRef, useState } from "react";
import CountrySelect from "common/js/commonComponents/CountrySelect";
import CurrencySelect from "common/js/commonComponents/CurrencySelect";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import imageCompression from "browser-image-compression";
import { imageResizeOptions } from "common/js/static";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import RadioGroupSelection from "common/js/commonComponents/RadioGroupSelection";
import { commentType } from "common/js/static";

// ------------------- import End --------------------

const GalleryManageModalMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const countryBank = useRecoilValue(countryBankAtom);
    const codes = useRecoilValue(codesAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    // modal 컨트롤
    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;
    const handleNeedUpdateComment = props.handleNeedUpdateComment;


    // select box options
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [postTypeOption, setPostTypeOption] = useState([]);
    const [postStatusOption, setPostStatusOption] = useState([]);
    const [paintTypeOption, setPaintTypeOption] = useState([]);
    const [artTypeOption, setArtTypeOption] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    const [participateTypeOption, setParticipateTypeOption] = useState([]);

    // 아티스트 리스트
    const [artistList, setArtistList] = useState([]);

    // states
    const [peopleIdx, setPeopleIdx] = useState("");
    const [artTypeShowYn, setArtTypeShowYn] = useState("Y");
    const [materialsInfoShowYn, setMaterialsInfoShowYn] = useState("Y");
    const [paintTypeShowYn, setPaintTypeShowYn] = useState("Y");
    const [participateTypeShowYn, setParticipateTypeShowYn] = useState("Y");
    const [placeInfoShowYn, setPlaceInfoShowYn] = useState("Y");
    const [priceInfoShowYn, setPriceInfoShowYn] = useState("Y");
    const [sizeInfoShowYn, setSizeInfoShowYn] = useState("Y");
    const [yearInfoShowYn, setYearInfoShowYn] = useState("Y");
    const [showYn, setShowYn] = useState("Y");
    const [replyingStates, setReplyingStates] = useState(Array(modData.comment_info.length).fill(false));
    const [modiIdx, setModiIdx] = useState("");

    // refs
    const mainTitleKo = useRef(null);
    const mainTitleEn = useRef(null);
    const subTitleKo = useRef(null);
    const subTitleEn = useRef(null);
    const postType = useRef(null);
    const postStatus = useRef(null);
    const paintType = useRef(null);
    const artType = useRef(null);
    const participateType = useRef(null);
    const participateMemoKo = useRef(null);
    const participateMemoEn = useRef(null);
    const priceInfoKo = useRef(null);
    const priceInfoEn = useRef(null);
    const sizeInfoKo = useRef(null);
    const sizeInfoEn = useRef(null);
    const workMemoKo = useRef(null);
    const workMemoEn = useRef(null);
    const contentInfoKo = useRef(null);
    const contentInfoEn = useRef(null);
    const inputAttachmentFile = useRef(null);
    const previewAttachment = useRef(null);
    const yearInfoKo = useRef(null);
    const yearInfoEn = useRef(null);
    const materialsInfoKo = useRef(null);
    const materialsInfoEn = useRef(null);

    const fileBaseUrl = apiPath.api_file;

    useEffect(() => {
        getArtistList();
    }, []);

    const getArtistList = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_list_people;
        const data = {
            page_num: "1",
            page_size: "0",
            search_keyword: "",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };
        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;

                getArtists(result_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const getArtists = (result_info) => {
        let options = [];
        for (let i = 0; i < result_info.length; i++) {
            let newObj = {};

            const value = String(result_info[i].people_idx);
            newObj = {
                value: value,
                label: `${result_info[i].name_ko} (${result_info[i].name_en})`,
            };

            options.push(newObj);
        }

        setArtistList(options);

        isModData && setDefaultValue();
    };

    useEffect(() => {
        // SELECT 옵션 초기화
        setSelectOption();
    }, [countryBank, codes]);

    const setSelectOption = () => {
        // 게시타입
        const postTypeArr = codes.filter((el) => el.code_type === "POST_TYPE");
        setPostTypeOption(postTypeArr);

        // 게시상태
        const postStatusArr = codes.filter(
            (el) => el.code_type === "POST_STATUS",
        );
        setPostStatusOption(postStatusArr);

        // 재질타입
        const paintTypeArr = codes.filter(
            (el) => el.code_type === "PAINT_TYPE",
        );
        setPaintTypeOption(paintTypeArr);

        // 미술타입
        const artTypeArr = codes.filter((el) => el.code_type === "ART_TYPE");
        setArtTypeOption(artTypeArr);

        // 참여타입
        const participateTypeArr = codes.filter(
            (el) => el.code_type === "PARTICIPATE_TYPE",
        );
        setParticipateTypeOption(participateTypeArr);
    };

    const setDefaultValue = () => {
        mainTitleKo.current.value = modData.main_title_ko;
        mainTitleEn.current.value = modData.main_title_en;
        subTitleKo.current.value = modData.sub_title_ko;
        subTitleEn.current.value = modData.sub_title_en;
        postType.current.value = modData.post_type_cd;
        postStatus.current.value = modData.post_status_cd;
        paintType.current.value = modData.paint_type_cd;
        artType.current.value = modData.art_type_cd;
        participateType.current.value = modData.participate_type_cd;
        participateMemoKo.current.value = modData.participate_memo_ko;
        participateMemoEn.current.value = modData.participate_memo_en;
        priceInfoKo.current.value = modData.price_info_ko;
        priceInfoEn.current.value = modData.price_info_en;
        sizeInfoKo.current.value = modData.size_info_ko;
        sizeInfoEn.current.value = modData.size_info_en;
        workMemoKo.current.value = modData.work_memo_ko;
        workMemoEn.current.value = modData.work_memo_en;
        contentInfoKo.current.value = modData.content_info_ko;
        contentInfoEn.current.value = modData.content_info_en;
        yearInfoKo.current.value = modData.year_info_ko;
        yearInfoEn.current.value = modData.year_info_en;
        materialsInfoKo.current.value = modData.materials_info_ko;
        materialsInfoEn.current.value = modData.materials_info_en;

        setShowYn(modData.show_yn)
        setArtTypeShowYn(modData.art_type_show_yn);
        setMaterialsInfoShowYn(modData.materials_info_show_yn);
        setPaintTypeShowYn(modData.paint_type_show_yn);
        setParticipateTypeShowYn(modData.participate_type_show_yn);
        setPriceInfoShowYn(modData.price_info_show_yn);
        setSizeInfoShowYn(modData.size_info_show_yn);
        setYearInfoShowYn(modData.year_info_show_yn);

        previewAttachment.current.src =
            modData.file_info.length !== 0 &&
            apiPath.api_file + modData.file_info[0].file_path_enc;
        setPeopleIdx(String(modData.people_idx));
        setSelectedCurrency(modData.currency_type_cd);
    };

    // 이미지 업로드 시 미리보기
    const readURL = (input, imageType) => {
        const imageFile = input.files[0];
        if (isFileImage(input.files)) {
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    // 썸네일일경우
                    if (imageType === "origin") {
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

    /**
     * 파일이 이미지인지
     * @param file
     * @returns {*|boolean}
     */
    const isFileImage = (file) => {
        if (file) {
            for (let i = 0; i < file.length; i++) {
                return file[i] && file[i]["type"].split("/")[0] === "image";
            }
        }
    };

    // 썸네일 이미지 사이즈 조정 - 가로 세로 길이 대비
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

    // 등록
    const regModBoard = (method) => {
        if (validation()) {
            setIsSpinner(true);

            let url;
            if (method === "reg") {
                // /v1/_gallery
                // POST MULTI
                // 갤러리 등록
                url = apiPath.api_add_gallery;
            } else if (method === "mod") {
                // /v1/reg
                // PUT
                // 사전등록 수정
                url = apiPath.api_mod_gallery;
            }

            const formData = new FormData();
            let data = {};

            let fileArr = [];
            let thumbArr = [];

            data = {
                showYn: showYn,
                mainTitleKo: mainTitleKo.current.value,
                mainTitleEn: mainTitleEn.current.value,
                subTitleKo: subTitleKo.current.value,
                subTitleEn: subTitleEn.current.value,
                postType: postType.current.value,
                postStatus: postStatus.current.value,
                paintType: paintType.current.value,
                artType: artType.current.value,
                participateType: participateType.current.value,
                participateMemoKo: participateMemoKo.current.value,
                participateMemoEn: participateMemoEn.current.value,
                priceInfoKo: priceInfoKo.current.value,
                priceInfoEn: priceInfoEn.current.value,
                sizeInfoKo: sizeInfoKo.current.value,
                sizeInfoEn: sizeInfoEn.current.value,
                workMemoKo: workMemoKo.current.value,
                workMemoEn: workMemoEn.current.value,
                contentInfoKo: contentInfoKo.current.value,
                contentInfoEn: contentInfoEn.current.value,
                yearInfoKo: yearInfoKo.current.value,
                yearInfoEn: yearInfoEn.current.value,
                materialsInfoKo: materialsInfoKo.current.value,
                materialsInfoEn: materialsInfoEn.current.value,
                artTypeShowYn: artTypeShowYn,
                materialsInfoShowYn: materialsInfoShowYn,
                paintTypeShowYn: paintTypeShowYn,
                participateTypeShowYn: participateTypeShowYn,
                priceInfoShowYn: priceInfoShowYn,
                sizeInfoShowYn: sizeInfoShowYn,
                yearInfoShowYn: yearInfoShowYn,
                peopleIdx: peopleIdx,
                currencyType: selectedCurrency,
                workIdx: method === "mod" ? modData.work_idx : "",
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
            // state.selectedProfile.forEach((item, idx) => {
            //     if (item.profileContentKo || item.profileContentEn) {
            //         formData.append(
            //             `profileInfo[${idx}].profileType`,
            //             item.profileType,
            //         );
            //         formData.append(
            //             `profileInfo[${idx}].profileContentKo`,
            //             item.profileContentKo,
            //         );
            //         formData.append(
            //             `profileInfo[${idx}].profileContentEn`,
            //             item.profileContentEn,
            //         );
            //     }
            // });

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

            // 썸네일 생성
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
                                ? "갤러리 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "갤러리 수정이 완료 되었습니다"
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

        if (peopleIdx === 0) {
            noti("", "아티스트를 선택해주세요");

            return false;
        }

        if (!mainTitleKo.current.value || !mainTitleEn.current.value) {
            noti(mainTitleKo, "작품명(국문,영문)을 입력해주세요");

            return false;
        }

        if (!postType.current.value) {
            noti(postType, "게시유형을 선택해주세요");

            return false;
        }

        if (!postStatus.current.value) {
            noti(postStatus, "게시상태를 선택해주세요");

            return false;
        }

        if (!paintType.current.value) {
            noti(paintType, "재질유형을 선택해주세요");

            return false;
        }

        if (!participateType.current.value) {
            noti(participateType, "참여유형을 선택해주세요");

            return false;
        }

        if (!isModData) {
            if (!inputAttachmentFile) {
                noti(inputAttachmentFile, "작품 이미지를 첨부해주세요");

                return false;
            }
        }

        return true;
    };

    // 삭제
    const clickRemove = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "삭제하시겠습니까?",
            callback: () => doRemove(),
        });

        const doRemove = () => {
            setIsSpinner(true);

            const url = `${apiPath.api_delete_gallery}${modData.work_idx}`;

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

     // 댓글 삭제
     const clickRemoveComment = (comment_idx) => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "댓글을 삭제하시겠습니다?",
            callback: () => removeComment(comment_idx),
        });

        const removeComment = (comment_idx) => {
            setIsSpinner(true);

            // /v1/_comment/{comment_idx}
            // DELETE
            // 댓글 삭제
            let url = apiPath.api_admin_remove_comment + comment_idx;

            const restParams = {
                method: "delete",
                url: url,
                data: {},
                err: err,
                admin: "Y",
                callback: (res) => responsLogicComment(res),
            };

            CommonRest(restParams);
            
            const responsLogicComment = (res) => {
                const result_code = res.headers.result_code;
                if (result_code === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "삭제가 완료 되었습니다",
                        callback: () => pageUpdateComment(modData.work_idx),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }

                const pageUpdateComment = (work_idx) => {
                    setReplyingStates(Array(modData.comment_info.length).fill(false));
                    handleNeedUpdateComment(work_idx);
                    setReplyContent("");
                    setModiIdx("");
                };
            };
        };
    };

    // 각 요소에 대한 클릭 이벤트 핸들러를 생성
    const handleRemoveClick = (comment_idx) => {
        return () => {
            clickRemoveComment(comment_idx);
        };
    };

    const handleInputChange = (e) => {
        // 입력된 내용을 상태에 저장
        setReplyContent(e.target.value);
    };

    const handleInputChangeModi = (e, comments) => {
        const updatedComments = e.target.value;
        comments.content_en = updatedComments;
        setReplyContent(updatedComments);
        setModiIdx(comments.comment_idx);
        
        return comments;
    };

    // 등록 or 수정
    const clickRegComment = (method, comment_info) => {
        if (validation()) {
            //setIsSpinner(true);

            const formData = new FormData();
            let url;
            let data = {};
            let fileArr = [];

            data = {
                boardIdx: comment_info.board_idx,
                commentType : commentType.gallery,
                showYn: comment_info.show_yn,
                subjectKo: comment_info.subject_ko,
                subjectEn: comment_info.subject_en,
                subTitleKo: comment_info.sub_title_ko ? comment_info.sub_title_ko : comment_info.subject_ko,
                subTitleEn: comment_info.sub_title_en ? comment_info.sub_title_en : comment_info.subject_en,
            };

            if (method === "reg") {
                // /v1/_comment
                // POST MULTI
                // 문의 답변 등록
                url = apiPath.api_admin_reg_comment;

                data.targetIdx = comment_info.comment_idx;
                data.contentKo = replyContent;
                data.contentEn = replyContent;
            } else if (method === "mod") {
                let commentIdxVal = comment_info.comment_idx;
                data.commentIdx = commentIdxVal;

                // /v1/_comment
                // PUT MULTI
                // 문의 답변 수정
                url = apiPath.api_admin_mod_comment;

                if (modiIdx == comment_info.comment_idx) {
                    data.contentKo = replyContent;
                    data.contentEn = replyContent;
                } else {
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "수정된 대상이 올바르지 않습니다."
                    });

                    return;
                }
            }

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            // 파일 formData append
            /* fileArr = Array.from(comment_info.files);
            let len = fileArr.length;
            for (let i = 0; i < len; i++) {
                formData.append("attachmentFile", fileArr[i]);
            }*/

            const restParams = {
                method: method === "reg" ? "post_multi" : method === "mod" ? "put_multi" : "",
                url: url, // /v1/board
                data: formData,
                err: err,
                admin: "Y",
                callback: (res) => responseLogicComment(res),
            };

            CommonRest(restParams);

            const responseLogicComment = (res) => {
                let result_code = res.headers.result_code;

                if (result_code === successCode.success) {
                    setIsSpinner(false);
                    setReplyingStates(Array(comment_info.length).fill(false));
                    setReplyContent("");
                    setModiIdx("");
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: 
                            method === "reg"
                                ? "답변 등록이 완료 되었습니다"
                                : method === "mod"
                                ? "답변 수정이 완료 되었습니다"
                                : "",
                        callback: () => handleNeedUpdateComment(comment_info.board_idx),
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

    const clickRegReplying = (mod, commentIndex) => {
        if (mod == 'reg') {
            // 해당 댓글의 isReplying 상태를 토글합니다.
            const updatedReplyingStates = [...replyingStates];
            updatedReplyingStates[commentIndex] = !updatedReplyingStates[commentIndex];
            setReplyingStates(updatedReplyingStates);
        }
    };

    const radioItems = [
        { value: "Y", label: "노출" },
        { value: "N", label: "비노출" },
    ];

    return (
        <>
            <div className="admin">
                <h4 className="mo_subtitle">작품 정보</h4>
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
                                작가 <span className="red">*</span>
                            </th>
                            <td>
                                {artistList.length !== 0 && (
                                    <Autocomplete
                                        id="artist-select-demo"
                                        size="small"
                                        options={artistList}
                                        value={
                                            peopleIdx
                                                ? artistList.filter(
                                                      (el) =>
                                                          el.value ===
                                                          peopleIdx,
                                                  )[0]
                                                : null
                                        }
                                        // disableCloseOnSelect
                                        // autoHighlight
                                        getOptionLabel={(option) =>
                                            option.label
                                        }
                                        onChange={(e, newValue) =>
                                            setPeopleIdx(
                                                newValue ? newValue.value : "",
                                            )
                                        }
                                        renderOption={(props, option) => (
                                            <Box
                                                component="li"
                                                sx={{
                                                    "& > img": {
                                                        mr: 2,
                                                        flexShrink: 0,
                                                    },
                                                }}
                                                {...props}
                                            >
                                                {option.label}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <>
                                                <TextField
                                                    {...params}
                                                    // label="Choose a country"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                    }}
                                                    placeholder="작가를 선택해주세요"
                                                />
                                            </>
                                        )}
                                    />
                                )}
                            </td>
                            <th>
                                노출여부 <span className="red">*</span>
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
                                작품명 <span className="red">*</span> <br />
                                (국문/영문)
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mainTitleKo}
                                    placeholder="작품명"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mainTitleEn}
                                    placeholder="Title"
                                />
                            </td>
                            <th>
                                부제목
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={subTitleKo}
                                    placeholder="부제목"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={subTitleEn}
                                    placeholder="Subtitle"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                게시유형 <span className="red">*</span>
                            </th>
                            <td>
                                <select className="wp100" ref={postType}>
                                    <option value="">- 선택 -</option>
                                    {postTypeOption.length !== 0 &&
                                        postTypeOption.map((item, idx) => (
                                            <option
                                                key={`postTypeOption_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                            <th>
                                게시상태 <span className="red">*</span>
                            </th>
                            <td>
                                <select className="wp100" ref={postStatus}>
                                    <option value="">- 선택 -</option>
                                    {postStatusOption.length !== 0 &&
                                        postStatusOption.map((item, idx) => (
                                            <option
                                                key={`postTypeOption_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>미술유형</th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"artTypeShowYn"}
                                    value={artTypeShowYn}
                                    onChange={(e) =>
                                        setArtTypeShowYn(e.target.value)
                                    }
                                />
                                <select className="wp100" ref={artType}>
                                    <option value="">- 선택 -</option>
                                    {artTypeOption.length !== 0 &&
                                        artTypeOption.map((item, idx) => (
                                            <option
                                                key={`postTypeOption_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                            <th>
                                재질유형 <span className="red">*</span>
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"paintTypeShowYn"}
                                    value={paintTypeShowYn}
                                    onChange={(e) =>
                                        setPaintTypeShowYn(e.target.value)
                                    }
                                />
                                <select className="wp100" ref={paintType}>
                                    <option value="">- 선택 -</option>
                                    {paintTypeOption.length !== 0 &&
                                        paintTypeOption.map((item, idx) => (
                                            <option
                                                key={`postTypeOption_${idx}`}
                                                value={item.code_key}
                                            >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                        ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                연도정보
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"yearInfoShowYn"}
                                    value={yearInfoShowYn}
                                    onChange={(e) =>
                                        setYearInfoShowYn(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={yearInfoKo}
                                    placeholder="연도 정보"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={yearInfoEn}
                                    placeholder="Year Info"
                                />
                            </td>
                            <th>
                                재료정보
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"materialsInfoShowYn"}
                                    value={materialsInfoShowYn}
                                    onChange={(e) =>
                                        setMaterialsInfoShowYn(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={materialsInfoKo}
                                    placeholder="재료정보"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={materialsInfoEn}
                                    placeholder="Materials Info"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                참여유형 <span className="red">*</span>
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"participateTypeShowYn"}
                                    value={participateTypeShowYn}
                                    onChange={(e) =>
                                        setParticipateTypeShowYn(e.target.value)
                                    }
                                />
                                <select className="wp100" ref={participateType}>
                                    <option value="">- 선택 -</option>
                                    {participateTypeOption.length !== 0 &&
                                        participateTypeOption.map(
                                            (item, idx) => (
                                                <option
                                                    key={`postTypeOption_${idx}`}
                                                    value={item.code_key}
                                                >{`${item.code_value_ko} (${item.code_value_en})`}</option>
                                            ),
                                        )}
                                </select>
                            </td>
                            <th>
                                추가 참여자 메모
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={participateMemoKo}
                                    placeholder="참여자 메모 (국문)"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={participateMemoEn}
                                    placeholder="Participate Memo (English)"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>통화코드</th>
                            <td>
                                <CurrencySelect
                                    onChange={(e, value) =>
                                        setSelectedCurrency(value)
                                    }
                                    defaultValue={selectedCurrency}
                                    mode={"en"}
                                />
                            </td>
                            <th>
                                가격정보
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"priceInfoShowYn"}
                                    value={priceInfoShowYn}
                                    onChange={(e) =>
                                        setPriceInfoShowYn(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={priceInfoKo}
                                    placeholder="가격정보 (국문)"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={priceInfoEn}
                                    placeholder="Price Info (English)"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                사이즈 정보
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <RadioGroupSelection
                                    radioItems={radioItems}
                                    name={"sizeInfoShowYn"}
                                    value={sizeInfoShowYn}
                                    onChange={(e) =>
                                        setSizeInfoShowYn(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={sizeInfoKo}
                                    placeholder="사이즈 정보 (국문)"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={sizeInfoEn}
                                    placeholder="Size Info (English)"
                                />
                            </td>
                            <th>
                                메모
                                <br />
                                (국문/영문)
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={workMemoKo}
                                    placeholder="메모 (국문)"
                                />
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={workMemoEn}
                                    placeholder="Memo (English)"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용(국문)</th>
                            <td>
                                <textarea
                                    ref={contentInfoKo}
                                    placeholder="내용"
                                ></textarea>
                            </td>
                            <th>내용(영문)</th>
                            <td>
                                <textarea
                                    ref={contentInfoEn}
                                    placeholder="Content"
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                작품이미지 <span className="red">*</span>
                            </th>
                            <td colSpan={3}>
                                <div className="profile_wrap">
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
                        {isModData && (
                            <tr>
                                <th>QR</th>
                                <td colSpan="3">
                                    <div className="hotel_thumb_wrap">
                                        <img src={modData.qr_img} alt="" />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 댓글 관리 */}
                {isModData && (
                    modData.comment_info.length !== 0 && (
                        // 수정화면이고 댓글이 있는 경우 랜더링
                        <>
                            <a href={apiPath.api_gallery_download + modData.work_idx}>엑셀다운로드</a>
                            {modData.comment_info.map((comment, index) => (
                                // 댓글
                                <div style={{ fontWeight: "bold", border: "1px solid #666" }}>
                                    <div>문의자 : {comment.user_name_first_en} {comment.user_name_last_en}</div>
                                    <div>등록일 : {comment.reg_dttm}</div>
                                    <div>연락처 : (+{comment.inter_phone_number}) {comment.mobile1}</div>
                                    <div>이메일 : {comment.email}</div>
                                    <div>내용 : {comment.content_en}</div>
                                    <div style={{ display: "flex", justifyContent: "end" }}>
                                        <Link
                                            className="subbtn del"
                                            onClick={handleRemoveClick(comment.comment_idx)}
                                        >
                                            삭제
                                        </Link>
                                        <Link
                                            className="subbtn on"
                                            onClick={() => clickRegReplying('reg',index)}
                                        >
                                            {replyingStates[index] ? '닫기' : '답글'}
                                        </Link>
                                    </div>
                                    {/* 댓글 첨부파일 */}
                                    {comment.file_info !== null && (
                                        comment.file_info.map((item, idx) => (
                                            <div key={`file_info_${idx}`}>
                                                <Link
                                                    to={`${fileBaseUrl}${item.file_path_enc}`}
                                                >
                                                    <img
                                                        src="/img/common_old/file.svg"
                                                        alt="파일 아이콘"
                                                    />
                                                    {item.file_name}
                                                </Link>
                                            </div>
                                        )
                                    ))}
                                    {/* 답변 입력 */}
                                    {replyingStates[index] && (
                                        <div>
                                            <div style={{ color: "#666" }}>답변 작성</div>
                                            <input onChange={handleInputChange} type="text" className="input wp100" placeholder="답글 내용" />
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <button onClick={() => clickRegReplying("reg", index)}>취소</button>
                                                <button onClick={() => clickRegComment("reg", comment)} >등록</button>
                                            </div>
                                        </div>
                                    )}
                                    {/* 답변 목록 */}
                                    {comment.child_comments.length !== 0 && (
                                        comment.child_comments.map((childComment) => (
                                            <div key={childComment.comment_idx} style={{ background: "#eee" }}>
                                                <div>답변자 : {childComment.reg_user_name_en}</div>
                                                <div>등록일 : {childComment.reg_dttm}</div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="input wp100"
                                                        value={childComment.content_en}
                                                        onChange={(e) => handleInputChangeModi(e, childComment)}
                                                    />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "end" }}>
                                                    <Link
                                                        className="subbtn del"
                                                        onClick={handleRemoveClick(childComment.comment_idx)}
                                                    >
                                                        삭제
                                                    </Link>
                                                    <Link className="subbtn on" onClick={() => clickRegComment("mod",childComment)}>
                                                        수정   
                                                    </Link>
                                                </div>
                                                {/* 답변 첨부파일 */}
                                                {childComment.file_info !== null &&
                                                    childComment.file_info.map((item, idx) => (
                                                        <div key={`file_info_${idx}`}>
                                                            <Link
                                                                to={`${fileBaseUrl}${item.file_path_enc}`}
                                                            >
                                                                <img
                                                                    src="/img/common_old/file.svg"
                                                                    alt="파일 아이콘"
                                                                />
                                                                {item.file_name}
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            ))}
                        </>
                    )
                )}
            </div>

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
                <Link to="" className="subbtn off" onClick={handleModalClose}>
                    취소
                </Link>
            </div>
        </>
    );
};

export default GalleryManageModalMain;
