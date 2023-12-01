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
                                        dedicated to mitigating the barriers to the art market, allowing everyone to develop their own unique relationships or connections with art. As an art business collective, we engage in various activities with the aim of providing support and encouragement to emerging artists in South Korea. Through the discovery of new talents and the utilization of copyrights for IP (Intellectual Property) such product and content development, we strive to breathe life into the Korean art market, thereby providing fresh stimulation.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>Throughout this Medi-City Medical Showcase,</dt>
                                    <dd>
                                        we aim to highlight the works of creative and fresh Korean artists who play a key role in K-Culture.<br />
                                        This showcase will not only strive to raises awareness of K-medical but will also elevate interest in K-ART,<br />
                                        effectively laying the groundwork to allow for promising Korean artists to venture into the international market.
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <p className="bimg">
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
