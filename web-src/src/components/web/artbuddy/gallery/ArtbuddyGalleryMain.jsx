import React, { useEffect, useState, useRef } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonCommaPattern,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    codesAtom,
    countryBankAtom,
    isSpinnerAtom,
    registrationInfoAtom,
} from "recoils/atoms";
import { useParams } from "react-router";
import { successCode } from "resultCode";
import { Skeleton } from "@mui/material";
import { commaOfNumber } from "common/js/Pattern";
import { commentModel } from "models/comment/comment";

// ------------------- import End --------------------

const ArtbuddyGalleryMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [isNeedUpdate, setIsNeedUpdate] = useState(false);

    const registrationInfo = useRecoilValue(registrationInfoAtom);
    const codes = useRecoilValue(codesAtom);
    const countryBank = useRecoilValue(countryBankAtom);

    // refs
    const nameFirstEn = useRef(null);
    const nameLastEn = useRef(null);
    const mobile1 = useRef(null);
    const mobile2 = useRef(null);
    const mobile3 = useRef(null);
    const email = useRef(null);
    const memo = useRef(null);
    const password = useRef(null);

    // url params
    const params = useParams();
    const workIdx = params ? params.workIdx : "";

    // states
    const [galleryInfo, setGalleryInfo] = useState({});
    const [peopleType, setPeopleType] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [currencyCode, setCurrencyCode] = useState("");

    useEffect(() => {
        codes.length === 0 ? setIsSpinner(true) : setIsSpinner(false);

        codes.length !== 0 && setPeopleTypeFunc();

        codes.length !== 0 && getWorkInfo();
    }, [codes]);

    const setPeopleTypeFunc = () => {
        // 인물타입
        const peopleTypeArr = codes.filter(
            (el) => el.code_type === "PEOPLE_TYPE",
        );
        setPeopleType(peopleTypeArr);

        // 통화코드
        const currencyArr = countryBank.filter(
            (e) => e.code_type === "CURRENCY_TYPE",
        );
        setCurrencies(currencyArr);
    };

    /**
     * 작품 정보 받아오기
     */
    const getWorkInfo = () => {
        setIsSpinner(true);

        // /v1/_gallery/{work_idx}/
        // GET
        // 갤러리 상세
        const url = apiPath.api_detail_gallery + workIdx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;
                setGalleryInfo(result_info);

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

    useEffect(() => {
        currencies.length !== 0 &&
            Object.keys(galleryInfo).length !== 0 &&
            setCurrencyCode(
                currencies.filter(
                    (el) => el.code_key === galleryInfo.currency_type_cd,
                )[0].code_value_en,
            );
    }, [galleryInfo, currencies]);

    // 문의글 작성
    const regComment = () => {
        if (validation()) {
            setIsSpinner(true);

            const model = commentModel;
            const formData = new FormData();

            // /v1/_board
            // POST MULTI
            // 게시판 등록
            let url = apiPath.api_admin_reg_board;
            let data = {};

            data = {
                ...model,
                // boardType: boardType.guestBook,
                subjectKo: "방명록",
                subjectEn: "GuestBook",
                subTitleKo: "방명록",
                subTitleEn: "GuestBook",
                interPhoneNumber: "62", // 인도 국가번호로 고정
                userNameFirstEn: nameFirstEn.current.value,
                userNameLastEn: nameLastEn.current.value,
                mobile1: mobile1.current.value,
                mobile2: mobile2.current.value,
                mobile3: mobile3.current.value,
                email: email.current.value,
                contentKo: memo.current.value,
                contentEn: memo.current.value,
            };

            // 기본 formData append
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const restParams = {
                method: "post_multi",
                url: url,
                data: formData,
                err: err,
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
                        message: "Terima kasih atas kesediaan untuk mengisi informasi Anda di buku tamu",
                        callback: () => handleNeedUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "Please try again in a few minutes",
                    });
                }
            };
        }
    };

    // 페이지 새로고침
    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
    };

    // 문의글 입력값 검증
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

        if (!nameFirstEn.current.value) {
            noti(nameFirstEn, "Please enter your first name");

            return false;
        }

        if (!nameLastEn.current.value) {
            noti(nameLastEn, "Please enter your last name");

            return false;
        }

        if (!mobile1.current.value) {
            noti(mobile1, "Please enter your phone number");

            return false;
        }

        if (!mobile2.current.value) {
            noti(mobile2, "Please enter your phone number");

            return false;
        }

        if (!mobile3.current.value) {
            noti(mobile3, "Please enter your phone number");

            return false;
        }

        if (!email.current.value) {
            noti(email, "Please enter your e-mail");

            return false;
        }

        if (!memo.current.value) {
            noti(memo, "Please enter your inquiry details");

            return false;
        }

        return true;
    };

    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

            <div id="subvisual" className="art_subvisual">
                <div className="sub_txt">
                    <div className="sub_txt_in">
                        {Object.keys(registrationInfo).length !== 0 ? (
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                        ) : (
                            <h3
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        fontSize: "1rem",
                                        textAlign: "center",
                                    }}
                                    width={"60%"}
                                />
                            </h3>
                        )}
                        <h4>ARTBUDDY, K-ART</h4>
                    </div>
                </div>
            </div>

            {/*서브 container //S*/}
            {codes.length !== 0 && (
                <>
                    <div id="container" className="sub_container">
                        <div id="con_area">
                            <div id="leftmenu">
                                <Link
                                    to={routerPath.web_artbuddy_exhibition_url}
                                >
                                    K-ART Exhibition
                                </Link>
                                <Link
                                    to={routerPath.web_artbuddy_artist_list_url}
                                >
                                    Artist
                                </Link>
                                <Link
                                    to={
                                        routerPath.web_artbuddy_gallery_list_url
                                    }
                                    className="active"
                                >
                                    Gallery
                                </Link>
                            </div>

                            <div id="subtitle">
                                <h3>Galley</h3>
                            </div>

                            {Object.keys(galleryInfo).length !== 0 && (
                                <div className="galleryView">
                                    <p className="artbox">
                                        <img
                                            src={
                                                apiPath.api_file +
                                                galleryInfo.thumbnail_info[0]
                                                    .file_path_enc
                                            }
                                            alt=""
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        />
                                    </p>
                                    <div className="artinfo">
                                        <h4 className="artist">
                                            <span>
                                                {
                                                    peopleType.filter(
                                                        (el) =>
                                                            el.code_key ===
                                                            galleryInfo.people_type_cd,
                                                    )[0].code_value_en
                                                }
                                            </span>
                                            <br />
                                            <Link
                                                to={`${routerPath.web_artbuddy_artist_detail_url}${galleryInfo.people_idx}`}
                                            >
                                                {galleryInfo.name_en
                                                    ? galleryInfo.name_en
                                                    : galleryInfo.name_ko}
                                            </Link>
                                        </h4>
                                        <ul>
                                            <li>
                                                <span>Title</span>
                                                {galleryInfo.main_title_en
                                                    ? galleryInfo.main_title_en
                                                    : galleryInfo.main_title_ko}
                                            </li>
                                            {galleryInfo.size_info_show_yn ===
                                                "Y" && (
                                                <li>
                                                    <span>Size</span>
                                                    {galleryInfo.size_info_en
                                                        ? galleryInfo.size_info_en
                                                        : galleryInfo.size_info_ko}
                                                </li>
                                            )}
                                            {galleryInfo.materials_info_show_yn ===
                                                "Y" && (
                                                <li>
                                                    <span>Materials</span>
                                                    {galleryInfo.materials_info_en
                                                        ? galleryInfo.materials_info_en
                                                        : galleryInfo.materials_info_ko}
                                                </li>
                                            )}
                                            {galleryInfo.price_info_show_yn ===
                                                "Y" && (
                                                <li>
                                                    <span>Price</span>
                                                    {currencyCode
                                                        ? currencyCode.split(
                                                              "-",
                                                          )[0]
                                                        : ""}{" "}
                                                    {galleryInfo.price_info_en
                                                        ? `${CommonCommaPattern(
                                                              galleryInfo.price_info_en,
                                                              3,
                                                          )} ${
                                                              currencyCode
                                                                  ? currencyCode.split(
                                                                        "-",
                                                                    )[1]
                                                                  : ""
                                                          }`
                                                        : `${CommonCommaPattern(
                                                              galleryInfo.price_info_ko,
                                                              3,
                                                          )} ${
                                                              currencyCode
                                                                  ? currencyCode.split(
                                                                        "-",
                                                                    )[1]
                                                                  : ""
                                                          }`}
                                                </li>
                                            )}
                                        </ul>

                                        {galleryInfo.people_memo_en ||
                                            (galleryInfo.people_memo_ko && (
                                                <div className="artnote">
                                                    <h4>Artist’s Note</h4>
                                                    <p className="txt">
                                                        {galleryInfo.people_memo_en
                                                            ? galleryInfo.people_memo_en
                                                            : galleryInfo.people_memo_ko}
                                                    </p>
                                                </div>
                                            ))}

                                        {/* 문의글 작성 */}
                                        <div className="inqbox">
                                            <h4>Inquire</h4>
                                            <table>
                                                <colgroup>
                                                    <col width="30%" />
                                                    <col width="*" />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>
                                                            <input type="text" ref="nameFirstEn" placeholder="First" />&#32;
                                                            <input type="text" ref="nameLastEn" placeholder="Last" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>TEL</th>
                                                        <td>
                                                            <input type="text" className="input_t" ref="mobile1" />
                                                            &#32;-&#32;
                                                            <input type="text" className="input_t" ref="mobile2" />
                                                            &#32;-&#32;
                                                            <input type="text" className="input_t" ref="mobile3" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>E-mail</th>
                                                        <td>
                                                            <input type="text" ref="email" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Memo</th>
                                                        <td>
                                                            <textarea ref="memo"></textarea>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Password</th>
                                                        <td>
                                                            <input type="text" ref="password" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="btnbox">
                                                <input type="submit" value="SUBMIT" onClick={regComment} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            {/*서브 container //E*/}

            {/*footer*/}
            <FooterSub />
            <Footer />
        </>
    );
};

export default ArtbuddyGalleryMain;
