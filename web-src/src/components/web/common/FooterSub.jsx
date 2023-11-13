import React from "react";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";

const FooterSub = () => {
    return (
        <>
            <div className="sub_hostbox">
                <span className="tit">HOST</span>
                <span className="logobox">
                    <img src="img/web/main/host_logo.png" alt="" />
                </span>
                <span className="tit">PARTNERS</span>
                <span className="logobox">
                    <img src="img/web/main/orga_logo01.png" alt="" />
                </span>
                <span className="logobox">
                    <img src="img/web/main/orga_logo02.png" alt="" />
                </span>
            </div>

            <div className="section02">
                <div className="sec02_in">
                    <Link to={routerPath.web_program_url} className="btn01">
                        Program Overview
                        <p className="cbox">
                            GO
                            <span className="arrow">
                                <img
                                    src="img/web/main/white_arrow.png"
                                    alt=""
                                />
                            </span>
                        </p>
                    </Link>
                    <Link
                        to={routerPath.web_signup_signup_url}
                        className="btn02"
                    >
                        Online Sign-up
                        <p className="cbox">
                            GO
                            <span className="arrow">
                                <img
                                    src="img/web/main/white_arrow.png"
                                    alt=""
                                />
                            </span>
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FooterSub;
