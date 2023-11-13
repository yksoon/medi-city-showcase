import React from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";

const SignUpMain = () => {
    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

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
                        <h4>PARTICIPATION SIGN-UP</h4>
                    </div>
                </div>
            </div>

            {/*서브 container //S*/}
            <div id="container" className="sub_container">
                <div id="con_area">
                    <div id="leftmenu">
                        <Link to={routerPath.web_participation_guideline_url}>
                            Guideline
                        </Link>
                        <a to={routerPath.web_signup_signup_url}>
                            Online Sign-up
                        </a>
                        <a href="">Sign-up Confirmation</a>
                    </div>
                    <div id="subtitle">
                        <h3>ONLINE SIGN-UP</h3>
                    </div>

                    <div className="signup">
                        <div className="boxing">
                            <h3 className="c_tit">
                                Plastic & Aesthetic Clinics Information
                            </h3>
                            <p className="r_noti">
                                (<span className="red">*</span>) Required
                            </p>
                            <table>
                                <colgroup>
                                    <col width="30%" />
                                    <col width="*" />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>
                                            Plastic & Aesthetic Clinic Name{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            Address{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />
                                            <Link to="" className="normal_btn">
                                                Search
                                            </Link>
                                            <br />
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                required
                                            />
                                            <br />
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            The name of the contact person{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="First Name"
                                                required
                                            />{" "}
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="Last Name"
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            TEL <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -{" "}
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -{" "}
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            E-mail{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                name=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>FAX</th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                            />{" "}
                                            -{" "}
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                            />{" "}
                                            -{" "}
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Participant Information</h3>
                            <p className="r_noti">
                                (<span className="red">*</span>) Required
                            </p>

                            <div className="addzone">
                                <label htmlFor="sameInfo">
                                    If the above information is same, please
                                    check{" "}
                                    <input type="checkbox" id="sameInfo" />
                                </label>
                            </div>
                            <div className="morezone">
                                <Link to="">
                                    Adding participants &nbsp;
                                    <img src="img/web/sub/add_p.png" alt="" />
                                </Link>
                            </div>

                            <table className="add_tb">
                                <colgroup>
                                    <col width="10%" />
                                    <col width="38.5%" />
                                    <col width="10%" />
                                    <col width="38.5%" />
                                    <col width="3%" />
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <th>
                                            Name <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="First Name"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="Last Name"
                                                required
                                            />
                                        </td>
                                        <th>
                                            Title <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                required
                                            />
                                        </td>
                                        <td rowSpan="2" className="del_td">
                                            <a href="" title="Delete">
                                                <img
                                                    src="img/web/sub/del_p.png"
                                                    alt=""
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            TEL <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />
                                        </td>
                                        <th>
                                            E-mail{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                name=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="add_tb">
                                <colgroup>
                                    <col width="10%" />
                                    <col width="38.5%" />
                                    <col width="10%" />
                                    <col width="38.5%" />
                                    <col width="3%" />
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <th>
                                            Name <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="First Name"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_n"
                                                placeholder="Last Name"
                                                required
                                            />
                                        </td>
                                        <th>
                                            Title <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                required
                                            />
                                        </td>
                                        <td rowSpan="2" className="del_td">
                                            <a href="" title="Delete">
                                                <img
                                                    src="img/web/sub/del_p.png"
                                                    alt=""
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            TEL <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />{" "}
                                            -
                                            <input
                                                type="text"
                                                value=""
                                                name=""
                                                className="input_m"
                                                required
                                            />
                                        </td>
                                        <th>
                                            E-mail{" "}
                                            <span className="red">*</span>
                                        </th>
                                        <td>
                                            <input
                                                type="text"
                                                name=""
                                                required
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="boxing">
                            <h3 className="c_tit">Sign-up details</h3>
                            <table>
                                <colgroup>
                                    <col width="60%" />
                                    <col width="20%" />
                                    <col width="20%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th colSpan="3">
                                            Provided Information
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="center gray">
                                            Contents
                                        </th>
                                        <th className="center gray">
                                            Amount (KRW)
                                        </th>
                                        <th className="center gray">
                                            Select Check
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b className="per">
                                                Per person basis
                                            </b>
                                            <p>
                                                1. Round-trip Airfare (January
                                                22nd to January 26th)
                                            </p>
                                            <p>
                                                2. 4 Nights 5Days Accommodation
                                                (5-Star Hotel Mulia Senayan)
                                                <br />
                                                <span>
                                                    - Includes Breakfast and
                                                    Additional Facilities
                                                </span>
                                            </p>
                                            <p>
                                                3. Meals <br />
                                                <span>
                                                    - January 24th: Lunch and
                                                    Dinner provided <br />-
                                                    January 25th: Dinner
                                                    provided
                                                </span>
                                            </p>
                                            <p>
                                                4. A Exclusive Consultation Desk
                                            </p>
                                            <p>
                                                5. Transportation: <br />
                                                <span>
                                                    - Jakarta Airport ↔
                                                    Accommodation (Hotel Mulia
                                                    Senayan)
                                                    <br />- Accommodation ↔
                                                    Exhibition Venue (The Westin
                                                    Jakarta)
                                                </span>
                                            </p>
                                        </td>
                                        <td className="center">12,000,000</td>
                                        <td className="center">
                                            <input type="checkbox" value="" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table>
                                <colgroup>
                                    <col width="60%" />
                                    <col width="20%" />
                                    <col width="20%" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th colSpan="3">Selected Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="center gray">
                                            Contents
                                        </th>
                                        <th className="center gray">
                                            Amount (KRW)
                                        </th>
                                        <th className="center gray">
                                            Select Check
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="center">
                                            Additional Participants (per person)
                                        </th>
                                        <td className="center">2,500,000</td>
                                        <td className="center">
                                            <select name="" id="">
                                                <option value="">1</option>
                                                <option value="">2</option>
                                                <option value="">3</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="center">
                                            Interpretation (Korean-Indonesian) -
                                            2 days
                                        </th>
                                        <td className="center">600,000</td>
                                        <td className="center">
                                            <input type="checkbox" value="" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

export default SignUpMain;
