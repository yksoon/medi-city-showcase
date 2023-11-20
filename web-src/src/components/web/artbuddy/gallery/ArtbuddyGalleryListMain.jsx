import React from "react";
import Header from "components/web/common/Header";
import { Link } from "react-router-dom";
import { routerPath } from "webPath";
import FooterSub from "components/web/common/FooterSub";
import Footer from "components/web/common/Footer";

const ArtbuddyGalleryListMain = () => {
    return (
        <>
            {/*header//S*/}
            <Header />
            {/*header//E*/}

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
                        <Link to={routerPath.web_artbuddy_exhibition_url}>
                            K-ART Exhibition
                        </Link>
                        <Link
                            to={routerPath.web_artbuddy_gallery_list_url}
                            className="active"
                        >
                            Gallery
                        </Link>
                    </div>

                    <div id="subtitle">
                        <h3>Galley</h3>
                    </div>

                    <div className="galleryList">
                        <div className="gfilter">
                            <Link to="" className="active">
                                ALL
                            </Link>
                            <Link to="">Kim eun hye</Link>
                            <Link to="">Lee jang ok</Link>
                            <Link to="">Jung ui dong</Link>
                            <Link to="">Aira choi</Link>
                            <Link to="">Can N Chur</Link>
                            <Link to="">Ssunki</Link>
                            <Link to="">Senny</Link>
                            <Link to="">Newmoon</Link>
                            <Link to="">Kim in</Link>
                        </div>

                        <div className="listbox">
                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb01.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb02.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb03.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb01.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb02.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb01.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb03.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb02.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb03.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb01.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb03.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>

                            <figure>
                                <Link to={routerPath.web_artbuddy_gallery_url}>
                                    <p className="thumb">
                                        <img
                                            src="img/web/sub/thumb02.jpg"
                                            alt=""
                                        />
                                    </p>
                                    <p className="name">Kim eun hye</p>
                                    <div className="info">
                                        <p>
                                            <span>Title</span> 감정의집 18
                                        </p>
                                        <p>
                                            <span>Size</span> 45.5x45.5cm(10호)
                                        </p>
                                        <p>
                                            <span>Materials</span> 캔버스에
                                            아크릴외 혼합콜라주, 2023
                                        </p>
                                    </div>
                                </Link>
                            </figure>
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

export default ArtbuddyGalleryListMain;
