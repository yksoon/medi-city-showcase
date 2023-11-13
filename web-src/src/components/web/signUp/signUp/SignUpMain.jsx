import React from "react";
import Header from "components/web/common/Header";

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
        </>
    );
};

export default SignUpMain;
