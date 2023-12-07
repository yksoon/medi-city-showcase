import React, { useEffect, useState } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isSpinnerAtom, registrationInfoAtom } from "recoils/atoms";
import { apiPath, routerPath } from "webPath";
import { registration_idx } from "common/js/static";
import { successCode } from "resultCode";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const ArtbuddyArtistListMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const registrationInfo = useRecoilValue(registrationInfoAtom);

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        getArtistList();
    }, []);

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

                // setBoardList(result_info.filter((el) => el.show_yn === "Y"));
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
                        <Link
                            to={routerPath.web_artbuddy_artist_list_url}
                            className="active"
                        >
                            Artist
                        </Link>
                        <Link to={routerPath.web_artbuddy_gallery_list_url}>
                            Gallery
                        </Link>
                    </div>

                    <div id="subtitle">
                        <h3>Artists</h3>
                    </div>

                    <div className={
                            activePeopleIdx === 0
                                ? "listbox artist_list"
                                : "listbox artistbox"
                        }>
                        
                        {boardList.length !== 0 &&
                            boardList.map((item, idx) => (
                                <figure key={item.people_idx}>
                                    <Link
                                        to={`${routerPath.web_artbuddy_artist_detail_url}${item.people_idx}`}
                                    >
                                        <div className="thumb">
                                            <img
                                                src={
                                                    apiPath.api_file +
                                                    item.thumbnail_info[0]
                                                        .file_path_enc
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <p className="name">
                                            {/*{item.name_ko}{" "}*/}
                                            {/*<span>*/}
                                            {item.name_en
                                                ? item.name_en
                                                : item.name_ko}
                                            {/*</span>*/}
                                        </p>
                                    </Link>
                                </figure>
                            ))}
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

export default ArtbuddyArtistListMain;
