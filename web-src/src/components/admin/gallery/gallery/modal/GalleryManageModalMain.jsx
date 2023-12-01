import React, { useRef, useState } from "react";
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
    const [postType, setPostType] = useState([]);
    const [postStatus, setPostStatus] = useState([]);
    const [paintType, setPaintType] = useState([]);
    const [artType, setArtType] = useState([]);
    const [participateType, setParticipateType] = useState([]);

    // refs
    const mainTitleKo = useRef(null);
    const mainTitleEn = useRef(null);
    const subTitleKo = useRef(null);
    const subTitleEn = useRef(null);

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
                                작품명(국문) <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={mainTitleKo}
                                    placeholder="작품명"
                                />{" "}
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
                                />{" "}
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
            {/*<CurrencySelect*/}
            {/*    onChange={(e, value) => setSelectedCurrency(value)}*/}
            {/*    defaultValue={selectedCurrency}*/}
            {/*    mode={"full"}*/}
            {/*/>*/}
        </>
    );
};

export default GalleryManageModalMain;
