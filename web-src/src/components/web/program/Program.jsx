import React from "react";
import Header from "components/web/common/Header";
import Footer from "components/web/common/Footer";
import FooterSub from "components/web/common/FooterSub";

const Program = () => {
    return (
        <>
            {/*header*/}
            <Header />

            <div id="subvisual">
                <div className="sub_txt">
                    <div className="sub_txt_in">
                        <h2>
                            <img
                                src="img/web/sub/sub_txt.png"
                                alt="Medi-City Medical Showcase"
                            />
                        </h2>
                        <h3>K-AESTHETIC & ART INDONESIA 2024</h3>
                        <h4>PROGRAM</h4>
                    </div>
                </div>
            </div>

            {/*서브 container*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div id="subtitle">
                        <h3>PROGRAM</h3>
                    </div>
                    <div className="program">
                        <h3 className="c_tit">January 24 (Wed) 2024</h3>
                        <table>
                            <colgroup>
                                <col width="26%" />
                                <col width="*" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time">14:00</td>
                                    <td>ARTBUDDY</td>
                                </tr>
                                <tr>
                                    <td className="time">15:00</td>
                                    <td>MyVenus</td>
                                </tr>
                                <tr>
                                    <td className="time">16:00</td>
                                    <td>MyVenus</td>
                                </tr>
                                <tr>
                                    <td className="time">18:00</td>
                                    <td>Gala Dinner (Invited guests only)</td>
                                </tr>
                                <tr>
                                    <td className="time">18:30</td>
                                    <td>Introduction of Medi-City</td>
                                </tr>
                            </tbody>
                        </table>
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

export default Program;
