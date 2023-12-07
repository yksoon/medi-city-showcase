import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "components/web/common/Header";
import { Link } from "react-router-dom";
import { apiPath, routerPath } from "webPath";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonConsole, CommonErrModule, CommonRest } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, registrationInfoAtom } from "recoils/atoms";
import { successCode } from "resultCode";
import { Skeleton } from "@mui/material";
import NoImage from "./no_image.jpg";

const ArtbuddyGalleryListMain = () => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const registrationInfo = useRecoilValue(registrationInfoAtom);

    const [boardList, setBoardList] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [activePeopleIdx, setActivePeopleIdx] = useState(0);

    useEffect(() => {
        getArtistList();
        getGalleryList(0);
    }, []);

    /**
     * 아티스트 리스트 받아오기
     */
    const getArtistList = () => {
        setIsSpinner(true);

        // /v1/peoples
        // POST
        // 아티스트 리스트
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
                const page_info = res.data.page_info;

                setArtistList(result_info);
                // setPageInfo(page_info);

                // setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    /**
     * 갤러리 리스트 받아오기
     */
    const getGalleryList = (people_idx) => {
        setIsSpinner(true);

        // /v1/_gallerys
        // POST
        // 갤러리 목록
        const url = apiPath.api_list_gallery;
        const data = {
            page_num: "1",
            page_size: "0",
            search_keyword: "",
            all_yn: people_idx === 0 ? "Y" : "",
            people_idx: people_idx !== 0 ? people_idx : "",
            show_yn: "Y"
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
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
                const page_info = res.data.page_info;

                setBoardList(result_info);
                // setPageInfo(page_info);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    const changeArtist = (people_idx) => {
        setActivePeopleIdx(people_idx);
        getGalleryList(people_idx);
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
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">
                    <div id="leftmenu">
                        <Link to={routerPath.web_artbuddy_exhibition_url}>
                            K-ART Exhibition
                        </Link>
                        <Link to={routerPath.web_artbuddy_artist_list_url}>
                            Artist
                        </Link>
                        <Link
                            to={routerPath.web_artbuddy_gallery_list_url}
                            className="active"
                        >
                            Gallery
                        </Link>
                    </div>

                    <div id="subtitle">
                        <h3>Gallery</h3>
                    </div>

                    <div className="galleryList">
                        <div className="gfilter">
                            {artistList.length !== 0 && (
                                <Link
                                    to=""
                                    className={
                                        activePeopleIdx === 0 ? "active" : ""
                                    }
                                    onClick={() => changeArtist(0)}
                                >
                                    ALL
                                </Link>
                            )}
                            {artistList.length !== 0 &&
                                artistList.map((item, idx) => (
                                    <Link
                                        to=""
                                        key={`artistList_${idx}`}
                                        onClick={() =>
                                            changeArtist(item.people_idx)
                                        }
                                        className={
                                            activePeopleIdx === item.people_idx
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        {item.name_en}
                                    </Link>
                                ))}
                        </div>

                        <div
                            className={
                                activePeopleIdx === 0
                                    ? "listbox"
                                    : "listbox artistbox"
                            }
                        >
                            {boardList.length !== 0 &&
                                boardList.map((item, idx) => (
                                    <figure key={`boardList_${idx}`}>
                                        <Link
                                            to={`${routerPath.web_artbuddy_gallery_url}${item.work_idx}`}
                                        >
                                            <p className="thumb">
                                                {/*<img*/}
                                                {/*    loading="lazy"*/}
                                                {/*    src={*/}
                                                {/*        item.thumbnail_info*/}
                                                {/*            .length !== 0*/}
                                                {/*            ? apiPath.api_file +*/}
                                                {/*              item*/}
                                                {/*                  .thumbnail_info[0]*/}
                                                {/*                  .file_path_enc*/}
                                                {/*            : ""*/}
                                                {/*    }*/}
                                                {/*    alt=""*/}
                                                {/*/>*/}
                                                <LazyImage
                                                    src={
                                                        item.thumbnail_info
                                                            .length !== 0
                                                            ? apiPath.api_file +
                                                              item
                                                                  .thumbnail_info[0]
                                                                  .file_path_enc
                                                            : ""
                                                    }
                                                />
                                            </p>
                                            <p className="name">
                                                {item.name_en}
                                            </p>
                                            <div className="info">
                                                <p>
                                                    <span>Title</span>{" "}
                                                    {item.main_title_en}
                                                </p>
                                                {item.size_info_show_yn ===
                                                    "Y" && (
                                                    <p>
                                                        <span>Size</span>{" "}
                                                        {item.size_info_en
                                                            ? item.size_info_en
                                                            : item.size_info_ko}
                                                    </p>
                                                )}
                                                {item.materials_info_show_yn ===
                                                    "Y" && (
                                                    <p>
                                                        <span>Materials</span>{" "}
                                                        {item.materials_info_en
                                                            ? item.materials_info_en
                                                            : item.materials_info_ko}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </figure>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {/*서브 container //E*/}

            {/*footer //S*/}
            <FooterSub />
            <Footer />
            {/*footer //E*/}
        </>
    );
};

export default ArtbuddyGalleryListMain;

const LazyImage = ({ src }) => {
    // state
    const [isLoading, setIsLoading] = useState(false);

    // ref
    const imgRef = useRef(null);
    const observer = useRef();

    // useEffect
    useEffect(() => {
        observer.current = new IntersectionObserver(intersectionObserver);
        imgRef.current && observer.current.observe(imgRef.current);

        return () => {
            observer.current && observer.current.disconnect(); // disconnect the observer on component unmount
        };
    }, []);

    // IntersectionObserver settings
    const intersectionObserver = (entries, io) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoading(true);
            }
        });
    };

    return <img ref={imgRef} src={isLoading ? src : NoImage} alt="" />;
};
