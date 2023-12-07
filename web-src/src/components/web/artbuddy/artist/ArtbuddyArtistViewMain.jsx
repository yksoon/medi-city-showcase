import React, { useEffect, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, isSpinnerAtom, registrationInfoAtom } from "recoils/atoms";
import { useLocation, useParams } from "react-router";
import Header from "components/web/common/Header";
import { Skeleton } from "@mui/material";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import { successCode } from "resultCode";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const ArtbuddyArtistViewMain = () => {
    // const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const registrationInfo = useRecoilValue(registrationInfoAtom);
    const codes = useRecoilValue(codesAtom);

    // url params
    const params = useParams();
    const peopleIdx = params ? params.peopleIdx : "";

    // states
    const [artistInfo, setArtistInfo] = useState({});
    const [peopleType, setPeopleType] = useState([]);
    const [profileType, setProfileType] = useState([]);
    const [swiperItem, setSwiperItem] = useState([]);

    const [state, setState] = useState({
        profileSection: [], // Initialize with your actual state structure
        selectedProfile: [], // Initialize with your actual state structure
    });

    useEffect(() => {
        codes.length === 0 ? setIsSpinner(true) : setIsSpinner(false);

        codes.length !== 0 && setPeopleTypeFunc();

        codes.length !== 0 && getArtistInfo();
    }, [codes]);

    const setPeopleTypeFunc = () => {
        // 인물타입
        const peopleTypeArr = codes.filter(
            (el) => el.code_type === "PEOPLE_TYPE",
        );
        setPeopleType(peopleTypeArr);

        // 프로필타입
        const profileTypeArr = codes.filter(
            (el) => el.code_type === "PROFILE_TYPE",
        );
        setProfileType(profileTypeArr);
    };

    /**
     * 아티스트 정보 받아오기
     */
    const getArtistInfo = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_detail_people + peopleIdx;
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
                setArtistInfo(result_info);

                if (result_info.work_info.length !== 0) {
                    let newArr = [];
                    const len = result_info.work_info.length;
                    for (let i = 0; i < len; i++) {
                        const url =
                            apiPath.api_file +
                            result_info.work_info[i].thumbnail_info[0]
                                .file_path_enc;

                        newArr.push(url);
                    }
                    setSwiperItem(newArr);
                }

                // setSwiperItem(result_info.work_info);
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
        Object.keys(artistInfo).length !== 0 && setDefaultProfile();
    }, [artistInfo]);

    const setDefaultProfile = () => {
        const defaultProfile = artistInfo.profile_info;
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

            // defaultProfile.forEach((profile, i) => {
            //     if (
            //         state.profileSection.filter(
            //             (el) => el.sectionValue === profile.profile_type_cd,
            //         ).length !== 0
            //     ) {
            //         const parentObj = state.profileSection.find(
            //             (el) => el.sectionValue === profile.profile_type_cd,
            //         );
            //         const obj = {
            //             parentIdx: parentObj.idx,
            //             profileType: parentObj.sectionValue,
            //             profileContentKo: profile.profile_content_ko,
            //             profileContentEn: profile.profile_content_en,
            //             inputIdx: i + 1,
            //         };
            //
            //         setState((prevState) => ({
            //             ...prevState,
            //             selectedProfile: [...prevState.selectedProfile, obj],
            //         }));
            //     }
            // });
        }
    };

    useEffect(() => {
        const defaultProfile = artistInfo.profile_info;

        if (state.profileSection.length !== 0) {
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
    }, [state.profileSection]);

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

            {codes.length !== 0 && (
                <>
                    {/*서브 container //S*/}
                    <div id="container" className="sub_container">
                        <div id="con_area" className="wide_conarea">
                            <div id="leftmenu">
                                <Link
                                    to={routerPath.web_artbuddy_exhibition_url}
                                >
                                    K-ART Exhibition
                                </Link>
                                <Link
                                    to={routerPath.web_artbuddy_artist_list_url}
                                    className="active"
                                >
                                    Artist
                                </Link>
                                <Link
                                    to={
                                        routerPath.web_artbuddy_gallery_list_url
                                    }
                                >
                                    Gallery
                                </Link>
                            </div>

                            <div className="galleryView">
                                {Object.keys(artistInfo).length !== 0 && (
                                    <>
                                        <div className="top_name">
                                            {/*<h4>{artistInfo.name_ko}</h4>*/}
                                            <h5>{artistInfo.name_en}</h5>
                                        </div>

                                        {/*이미지 스와이퍼 영역 S*/}
                                        {swiperItem.length !== 0 && (
                                            <Swiper
                                                className="swiper-container artist_work"
                                                speed={1000}
                                                // slidesPerView={"auto"}
                                                slidesPerView={3}
                                                spaceBetween={40}
                                                // mousewheel={true}
                                                loop={false}
                                                navigation={true}
                                                // loopAdditionalSlides={1}
                                                grabCursor={true}
                                                centeredSlides={true}
                                                effect={"coverflow"}
                                                coverflowEffect={{
                                                    rotate: 50,
                                                    stretch: 0,
                                                    depth: 100,
                                                    modifier: 1,
                                                    slideShadows: true,
                                                }}
                                                breakpoints={{
                                                    0:{
                                                        slidesPerView: 2,
                                                        spaceBetween:10
                                                    },
                                                    1024:{
                                                        slidesPerView: 3,
                                                        spaceBetween:40
                                                    }

                                                  }}
                                                autoplay={{
                                                    delay: 5000,
                                                    disableOnInteraction: false,
                                                }}
                                                modules={[
                                                    Autoplay,
                                                    EffectCoverflow,
                                                    Navigation,
                                                ]}
                                                pagination={false}
                                                initialSlide={0}
                                            >
                                                {swiperItem.length !== 0 &&
                                                    swiperItem.map((item, idx) => (
                                                        <SwiperSlide
                                                            className="swiper-slide"
                                                            key={`swiper_${idx}`}
                                                        >
                                                            <img
                                                                src={item}
                                                                alt=""
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                        </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        )}
                                        {/*이미지 스와이퍼 영역 E*/}

                                        <div className="artinfo artist_info">
                                            <div className="left">
                                                <div className="thumb">
                                                    <img
                                                        src={
                                                            apiPath.api_file +
                                                            artistInfo
                                                                .file_info[0]
                                                                .file_path_enc
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <h4 className="artist">
                                                    <span>
                                                        {
                                                            peopleType.filter(
                                                                (el) =>
                                                                    el.code_key ===
                                                                    artistInfo.people_type_cd,
                                                            )[0].code_value_en
                                                        }
                                                    </span>
                                                    <br />
                                                    {artistInfo.name_en}
                                                </h4>
                                                <p>
                                                    {artistInfo.people_memo_en
                                                        ? artistInfo.people_memo_en
                                                        : artistInfo.people_memo_ko}
                                                </p>
                                            </div>

                                            <div className="right">
                                                {state.profileSection.length !==
                                                    0 &&
                                                    state.profileSection.map(
                                                        (item, idx) => (
                                                            <>
                                                                <div
                                                                    className="artnote"
                                                                    // key={item.sectionValue}
                                                                    key={`profileSection-${item.idx}`}
                                                                >
                                                                    <h4>
                                                                        {
                                                                            profileType.filter(
                                                                                (
                                                                                    el,
                                                                                ) =>
                                                                                    el.code_key ===
                                                                                    item.sectionValue,
                                                                            )[0]
                                                                                .code_value_en
                                                                        }
                                                                    </h4>
                                                                    <ul>
                                                                        {state
                                                                            .selectedProfile
                                                                            .length !==
                                                                            0 &&
                                                                            state.selectedProfile
                                                                                .filter(
                                                                                    (
                                                                                        el,
                                                                                    ) =>
                                                                                        el.parentIdx ===
                                                                                        item.idx,
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        inputItem,
                                                                                    ) => (
                                                                                        <li
                                                                                            key={`${inputItem.parentIdx}-${inputItem.inputIdx}`}
                                                                                        >
                                                                                            {inputItem.profileContentEn
                                                                                                ? inputItem.profileContentEn
                                                                                                : inputItem.profileContentKo}
                                                                                        </li>
                                                                                    ),
                                                                                )}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        ),
                                                    )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*서브 container //E*/}
                </>
            )}

            {/*footer //S*/}
            <FooterSub />
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default ArtbuddyArtistViewMain;
