import React from "react";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";

const Section02 = () => {
    return (
        <>
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

export default Section02;
