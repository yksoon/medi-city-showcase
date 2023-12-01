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

    // select box options
    const [selectedCurrency, setSelectedCurrency] = useState("410");
    const [postTypeOption, setPostTypeOption] = useState([]);
    const [postStatusOption, setPostStatusOption] = useState([]);
    const [paintTypeOption, setPaintTypeOption] = useState([]);
    const [artTypeOption, setArtTypeOption] = useState([]);
    const [participateTypeOption, setParticipateTypeOption] = useState([]);

    // 아티스트 리스트
    const [artistList, setArtistList] = useState([]);

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

                setArtistList(result_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
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
                            <th>게시유형</th>
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
                            <th>게시상태</th>
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
                            <th>재질유형</th>
                            <td>
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
                            <th>참여유형</th>
                            <td>
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
                                참여자 메모
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
                            <th>
                                내용(국문) <span className="red">*</span>
                            </th>
                            <td>
                                <textarea
                                    ref={contentInfoKo}
                                    placeholder="내용"
                                ></textarea>
                            </td>
                            <th>
                                내용(영문) <span className="red">*</span>
                            </th>
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
                    </tbody>
                </table>
            </div>

            <div className="subbtn_box">
                {/*{isModData ? (*/}
                {/*    <>*/}
                {/*        <Link*/}
                {/*            to=""*/}
                {/*            className="subbtn del"*/}
                {/*            onClick={clickRemove}*/}
                {/*        >*/}
                {/*            삭제*/}
                {/*        </Link>*/}
                {/*        <Link*/}
                {/*            to=""*/}
                {/*            className="subbtn on"*/}
                {/*            onClick={() => regModBoard("mod")}*/}
                {/*        >*/}
                {/*            수정*/}
                {/*        </Link>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <Link*/}
                {/*        to=""*/}
                {/*        className="subbtn on"*/}
                {/*        onClick={() => regModBoard("reg")}*/}
                {/*    >*/}
                {/*        등록*/}
                {/*    </Link>*/}
                {/*)}*/}
                <Link to="" className="subbtn off" onClick={handleModalClose}>
                    취소
                </Link>
            </div>
        </>
    );
};

export default GalleryManageModalMain;
