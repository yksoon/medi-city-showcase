import { Skeleton } from "@mui/material";
import React from "react";

const MainMainvisual = (props) => {
    const registrationInfo = props.registrationInfo;

    return (
        <>
            <div id="mainvisual">
                <div className="main_txt">
                    <div className="main_txt_in">
                        <h2>
                            <img
                                src="img/web/main/main_txt.png"
                                alt="Medi-City Medical Showcase"
                            />
                        </h2>

                        {registrationInfo.length !== 0 ? (
                            <h3>
                                {registrationInfo.registration_sub_title_en}
                            </h3>
                        ) : (
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: "2rem" }}
                                width={"100%"}
                            />
                        )}

                        <p className="date">
                            January <span className="pink">24-25</span>, 2024
                            <br />
                            The Westin Jakarta, Indonesia
                        </p>
                    </div>
                    <p
                        className="ob_img"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                    >
                        <img
                            src="img/web/main/main_img.png"
                            alt="키비 오브젝트이미지"
                        />
                    </p>
                </div>
            </div>
        </>
    );
};

export default MainMainvisual;
