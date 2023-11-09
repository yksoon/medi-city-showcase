import { Skeleton } from "@mui/material";
import { CommonOpenUrl } from "common/js/Common";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ipInfoAtom, viewScheduleAtom } from "recoils/atoms";
import { routerPath } from "webPath";

const MainMainvisual = () => {
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
                        <h3>K-AESTHETIC & ART INDONESIA 2024</h3>
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
