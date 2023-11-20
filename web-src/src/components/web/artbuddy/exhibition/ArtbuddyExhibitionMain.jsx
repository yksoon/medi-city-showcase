import React from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { routerPath } from "webPath";
import { Link } from "react-router-dom";

const ArtbuddyExhibitionMain = () => {
    return (
        <>
            {/*header*/}
            <Header />

            <div id="subvisual" className="art_subvisual">
                <div className="sub_txt">
                    <div className="sub_txt_in">
                        <h3>K-AESTHETIC & ART INDONESIA 2024</h3>
                        <h4>ARTBUDDY, K-ART</h4>
                    </div>
                </div>
            </div>

            {/*서브 container //S*/}
            <div id="container" className="sub_container">
                <div id="con_area" className="wide_conarea">
                    <div id="leftmenu">
                        <Link
                            to={routerPath.web_artbuddy_exhibition_url}
                            className="active"
                        >
                            K-ART Exhibition
                        </Link>
                        <Link to={routerPath.web_artbuddy_gallery_list_url}>
                            Gallery
                        </Link>
                    </div>

                    <div id="subtitle">
                        <h3>K-ART Exhibition</h3>
                    </div>

                    <div className="kart">
                        <div className="boxing">
                            <p
                                className="left"
                                data-aos="fade-right"
                                data-aos-duration="1200"
                            >
                                <img
                                    src="img/web/sub/artbuddy_logo.jpg"
                                    alt=""
                                />
                            </p>
                            <div className="right">
                                <dl>
                                    <dt>ARTBUDDY is </dt>
                                    <dd>
                                        dedicated to mitigating the barriers to
                                        the art market, allowing everyone to
                                        become friends with art.
                                        <br />
                                        As an art business group, we engage in
                                        various activities to support and
                                        encourage emerging artists in South
                                        Korea.
                                        <br />
                                        Through the discovery of new talents and
                                        the utilization of copyrights for
                                        product and content development,
                                        <br />
                                        we strive to breathe life into the
                                        Korean art market, providing fresh
                                        stimulation.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>In this Medi-City Medical Showcase,</dt>
                                    <dd>
                                        we will highlight the works of creative
                                        and fresh Korean artists who play a key
                                        role in K-Culture.
                                        <br />
                                        This showcase not only raises awareness
                                        of K-medical but also elevates the
                                        interest in K-ART,
                                        <br />
                                        laying the groundwork for promising
                                        Korean artists to venture into the
                                        international market.
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <p class="bimg">
                            <img src="img/web/sub/artbuddy_bg.jpg" alt="" />
                        </p>
                    </div>
                </div>
            </div>
            {/*서브 container //E*/}

            {/*footer*/}
            <FooterSub />
            <Footer />
        </>
    );
};

export default ArtbuddyExhibitionMain;
