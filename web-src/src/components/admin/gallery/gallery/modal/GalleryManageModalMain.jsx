import React, { useEffect, useRef, useState } from "react";
import CountrySelect from "common/js/commonComponents/CountrySelect";
import CurrencySelect from "common/js/commonComponents/CurrencySelect";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";

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
                                작품명(영문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mainTitleEn}
                                    placeholder="Title"
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>부제목(국문)</th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={subTitleKo}
                                    placeholder="부제목"
                                />
                            </td>
                            <th>부제목(영문)</th>
                            <td>
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
