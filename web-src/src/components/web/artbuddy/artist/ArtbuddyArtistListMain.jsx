import React, { useEffect, useState } from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
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

    const [registrationInfo, setRegistrationInfo] = useState([]);

    useEffect(() => {
        getRegistration();
        // getArtistList();
    }, []);

    // 정보 받아오기 REST
    const getRegistration = () => {
        const url = apiPath.api_admin_get_reg + registration_idx;
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

                setRegistrationInfo(result_info);
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    // message: res.headers.result_message_ko,
                    message: "잠시후 다시 시도해주세요",
                });
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
                        {registrationInfo.length !== 0 ? (
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
                        <Link
                            to={routerPath.web_artbuddy_gallery_list_url}
                            className="active"
                        >
                            Gallery
                        </Link>
                    </div>

                    <div id="subtitle">
                        <h3>Artists</h3>
                    </div>

                    <div className="listbox artist_list">
                        <figure>
                            <a href="">
                                <div className="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/74ed0dd3da70975f1179368ec2651240e61f0b6a2eb9c5fbc39c55b55b8a26e4efabe8cf7ed4840d730d4a337fe00bca3a668f65946989a425ef703cfb7a460d"
                                        alt=""
                                    />
                                </div>
                                <p className="name">
                                    김 인 <span>in Kim</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <p class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/6f9df8b48210d7c64b72942c6b90e6468e70523ccb0e348a7e4cf4f5e702c8a929545cb89cc91c97036a2b604265a4deaa266854e23eaf966d9375edadb286f9"
                                        alt=""
                                    />
                                </p>
                                <p class="name">
                                    김 은혜 <span>Kim eun hye</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/90bfc4bf04be874362ff29634e03975c010c4b72dd1c2928ae5366e342c7e06f1fa56fea88a8433747ed14897758a9d365d2975271fcb5e0de65d22dad8a912b"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    정 의동 <span>ui dong Jung</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/42903bac7699bccd7f3307af4e124bdbc2479bfe6aba7fb021f851bee479898bbc998135d5a6ef59ceb7d1be0f04f6deed572c36ddfc05e21ac65f058dc5105e"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    캔 앤 추르 <span>Can N Chur</span>
                                </p>
                            </a>
                        </figure>
                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/74ed0dd3da70975f1179368ec2651240e61f0b6a2eb9c5fbc39c55b55b8a26e4efabe8cf7ed4840d730d4a337fe00bca3a668f65946989a425ef703cfb7a460d"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    김 인 <span>in Kim</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <p class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/6f9df8b48210d7c64b72942c6b90e6468e70523ccb0e348a7e4cf4f5e702c8a929545cb89cc91c97036a2b604265a4deaa266854e23eaf966d9375edadb286f9"
                                        alt=""
                                    />
                                </p>
                                <p class="name">
                                    김 은혜 <span>Kim eun hye</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/90bfc4bf04be874362ff29634e03975c010c4b72dd1c2928ae5366e342c7e06f1fa56fea88a8433747ed14897758a9d365d2975271fcb5e0de65d22dad8a912b"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    정 의동 <span>ui dong Jung</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/42903bac7699bccd7f3307af4e124bdbc2479bfe6aba7fb021f851bee479898bbc998135d5a6ef59ceb7d1be0f04f6deed572c36ddfc05e21ac65f058dc5105e"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    캔 앤 추르 <span>Can N Chur</span>
                                </p>
                            </a>
                        </figure>
                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/74ed0dd3da70975f1179368ec2651240e61f0b6a2eb9c5fbc39c55b55b8a26e4efabe8cf7ed4840d730d4a337fe00bca3a668f65946989a425ef703cfb7a460d"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    김 인 <span>in Kim</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <p class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/6f9df8b48210d7c64b72942c6b90e6468e70523ccb0e348a7e4cf4f5e702c8a929545cb89cc91c97036a2b604265a4deaa266854e23eaf966d9375edadb286f9"
                                        alt=""
                                    />
                                </p>
                                <p class="name">
                                    김 은혜 <span>Kim eun hye</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/90bfc4bf04be874362ff29634e03975c010c4b72dd1c2928ae5366e342c7e06f1fa56fea88a8433747ed14897758a9d365d2975271fcb5e0de65d22dad8a912b"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    정 의동 <span>ui dong Jung</span>
                                </p>
                            </a>
                        </figure>

                        <figure>
                            <a href="">
                                <div class="thumb">
                                    <img
                                        src="https://gateway.hicompint.com:60000/showcase/v1/_file/000/42903bac7699bccd7f3307af4e124bdbc2479bfe6aba7fb021f851bee479898bbc998135d5a6ef59ceb7d1be0f04f6deed572c36ddfc05e21ac65f058dc5105e"
                                        alt=""
                                    />
                                </div>
                                <p class="name">
                                    캔 앤 추르 <span>Can N Chur</span>
                                </p>
                            </a>
                        </figure>
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
