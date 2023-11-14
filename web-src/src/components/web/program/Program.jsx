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
                        <div className="boxing">
                            <h3 className="c_tit">Program at a Glance</h3>
                            <table className="glance_tb">
                                <colgroup>
                                    <col width="20%" />
                                    <col width="40%" />
                                    <col width="40%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="pur" colSpan="3">
                                            Day 1 - Jan. 24 (Wed)
                                        </th>
                                    </tr>
                                    <tr className="gray">
                                        <th>Time</th>
                                        <th>Room A</th>
                                        <th>Room B</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time">10:00 ~ 11:30</td>
                                        <td>
                                            <div className="c01">Showcase</div>
                                        </td>
                                        <td>
                                            <div className="c02">
                                                ART Exhibition
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">11:30 ~ 13:00</td>
                                        <td colSpan="2" className="normal">
                                            Lunch{" "}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">13:00 ~ 14:00</td>
                                        <td rowSpan="5">
                                            <div className="c01">Showcase</div>
                                        </td>
                                        <td>
                                            <div className="c02">
                                                ART Exhibition
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">14:00 ~ 15:00</td>
                                        <td>
                                            <div className="c03">ARTBUDDY</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">15:00 ~ 16:00</td>
                                        <td rowSpan="2">
                                            <div className="c04">MyVenus</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">16:00 ~ 17:00</td>
                                    </tr>
                                    <tr>
                                        <td className="time">17:00 ~ 17:30</td>
                                        <td>
                                            <div className="c02">
                                                ART Exhibition
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">17:30 ~ 18:00</td>
                                        <td colSpan="2" className="normal">
                                            Break Time
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">18:00 ~18:30</td>
                                        <td colSpan="2" className="normal">
                                            <b>Gala Dinner</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time">18:30 ~19:30</td>
                                        <td colSpan="2" className="normal">
                                            <b>Introduction of Medi-City</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="boxing">
                            <h3 className="c_tit">January 24 (Wed) 2024</h3>
                            <table className="de_tb">
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
                                        <td>
                                            Gala Dinner (Invited guests only)
                                        </td>
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
            </div>
            {/*서브 container //E*/}

            {/*footer*/}
            <FooterSub />
            <Footer />
        </>
    );
};

export default Program;
