import React from "react";
import Header from "components/web/common/Header";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";

const ArtbuddyGalleryMain = () => {
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
                <div id="con_area">
                    <div id="leftmenu">
                        <a href="guideline.html">K-ART Exhibition</a>
                        <a href="signup.html" className="active">
                            Gallery
                        </a>
                    </div>

                    <div id="subtitle">
                        <h3>Galley</h3>
                    </div>

                    <div className="galleryView">
                        <p
                            className="artbox"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <img src="img/web/sub/test_art.jpg" alt="" />
                        </p>
                        <div className="artinfo">
                            <h4 className="artist">
                                <span>Artist</span>
                                <br />
                                Can N Chur
                            </h4>
                            <ul>
                                <li>
                                    <span>Title</span>빡고주의보{" "}
                                </li>
                                <li>
                                    <span>Size</span>42 X 58cm
                                </li>
                                <li>
                                    <span>Materials</span>Edgecoloring on
                                    gicleeprint, ED of 90, 2023
                                </li>
                                <li>
                                    <span>Price</span>KRW 350,000
                                </li>
                            </ul>

                            <div className="artnote">
                                <h4>Artist’s Note</h4>
                                <p className="txt">
                                    작가는 자신이 만든 세계, 나만의 세계를
                                    ‘마이토피아’라고 칭하며 그 속에서 남의
                                    시선을 의식하지 않은채 자유롭게 살아가는
                                    ‘나’와는 정반대인 이상형 빡고(빡친 고양이
                                    줄인말)의 모습을 담고 작품화했다. 작품마다
                                    각기 다른 동화적 이야기를 녹여 한계와 경계가
                                    없는 독창적인 작품 세계를 선보이고 있다.
                                </p>
                            </div>

                            <div className="inqbox">
                                <h4>Inquire</h4>
                                <table>
                                    <colgroup>
                                        <col width="30%" />
                                        <col width="*" />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>
                                                <input type="text" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TEL</th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="input_t"
                                                />{" "}
                                                -
                                                <input
                                                    type="text"
                                                    className="input_t"
                                                />{" "}
                                                -
                                                <input
                                                    type="text"
                                                    className="input_t"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>E-mail</th>
                                            <td>
                                                <input type="text" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Memo</th>
                                            <td>
                                                <textarea
                                                    name=""
                                                    id=""
                                                ></textarea>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="btnbox">
                                    <input type="submit" value="SUBMIT" />
                                </div>
                            </div>
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

export default ArtbuddyGalleryMain;
