import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import { routerPath } from "webPath";
import { CommonOpenUrl } from "common/js/Common";

const MainContentsProgram = () => {
    const [companyData, setCompanyData] = useState([]);

    useEffect(() => {
        xlxsParsing();
    }, []);

    const xlxsParsing = async () => {
        const url = "/jobara_company_list.xlsx";
        const file = await (await fetch(url)).arrayBuffer();
        // const workbook = XLSX.read(file);

        const map = {
            label: "companyLabel",
            부스참여번호: "boothnum",
            방식: "type",
            기업명: "companyName",
            홈페이지: "homepageUrl",
        };

        readXlsxFile(file, { map }).then(({ rows }) => {
            // `rows` is an array of rows
            // each row being an array of cells.
            // console.log(rows);

            let compArr = [];
            const length = rows.length;
            for (let i = 0; i < length; i++) {
                if (rows[i]["companyLabel"]) {
                    compArr.push(rows[i]);
                }
            }

            setCompanyData(compArr);
            // console.log(compArr);
        });
    };

    return (
        <>
            <div className="section02">
                <div
                    className="bar01"
                    data-aos="fade-right"
                    data-aos-delay="400"
                    data-aos-easing="linear"
                >
                    <img src="img/web/main/bar_green.png" alt="" />
                </div>
                <div
                    className="bar02"
                    data-aos="fade-left"
                    data-aos-delay="800"
                    data-aos-easing="linear"
                >
                    <img src="img/web/main/bar_blue.png" alt="" />
                </div>
                <div className="cloud">
                    <img src="img/web/main/cloud_pink.png" alt="" />
                </div>

                <div className="program">
                    <h3>프로그램</h3>
                    <ul>
                        <li className="p01" data-aos="flip-left">
                            <span className="num">01</span>
                            진로탐색
                            <span className="icon">
                                <img src="img/web/main/picon01.png" alt="" />
                            </span>
                            <div>
                                <h5>나를 알아야 백전백승!</h5>
                                <p>
                                    내가 하고싶은 직무 또는 내가 잘 할 수 있는
                                    직무가 무엇인지 궁금하다면 현장에서
                                    검사해보자
                                </p>
                                <h5>이력서 및 자기소개서 컨설팅!</h5>
                                <p>
                                    자소서도 잘 써야 어필할 수 있다 전문가
                                    컨설턴트분들께 상담받고 서류 바로
                                    통과해보자~!
                                </p>
                            </div>
                        </li>
                        <li
                            className="p02"
                            data-aos="flip-left"
                            data-aos-delay="300"
                        >
                            <span className="num">02</span>
                            기업탐색
                            <span className="icon">
                                <img src="img/web/main/picon02.png" alt="" />
                            </span>
                            <div>
                                <h5>채용정보 및 상담</h5>
                                <p>
                                    도내외 기업들의 정보를 확인하고 채용계획도
                                    살펴보기
                                </p>
                                <h5>글로벌 JOB FAIR</h5>
                                <p>
                                    글로벌 채용 상담 및 인턴십에 관심이 있다면
                                </p>
                            </div>
                        </li>
                        <li
                            className="p03"
                            data-aos="flip-left"
                            data-aos-delay="600"
                        >
                            <span className="num">03</span>
                            AI 면접체험
                            <span className="icon">
                                <img src="img/web/main/picon03.png" alt="" />
                            </span>
                            <div>
                                <h5>실전 AI면접 체험</h5>
                                <p>
                                    AI면접 체험을 하고 면접 분석결과까지
                                    받아보자
                                </p>
                            </div>
                        </li>
                        <li
                            className="p04"
                            data-aos="flip-left"
                            data-aos-delay="900"
                        >
                            <span className="num">04</span>
                            NCS 모의고사
                            <span className="icon">
                                <img src="img/web/main/picon04.png" alt="" />
                            </span>
                            <div>
                                <h5>NCS 전략 특강 및 모의고사</h5>
                                <p>
                                    공공기관 및 대기업 취업 희망자는 필수코스인
                                    NCS 전략 특강 받고 모의고사 풀어보고
                                    우수자는 경품까지! <br />
                                    사전 신청하세요!
                                    <span>신청기간: ~ 9. 5.</span>
                                    <Link to={routerPath.web_signup_url}>
                                        사전등록 바로가기
                                    </Link>
                                </p>
                            </div>
                        </li>
                        <li
                            className="p05"
                            data-aos="flip-left"
                            data-aos-delay="1200"
                        >
                            <span className="num">05</span>
                            현직자 토크콘서트
                            <span className="icon">
                                <img src="img/web/main/picon05.png" alt="" />
                            </span>
                            <div>
                                <p>
                                    대기업 및 글로벌기업의 현직자를 만나볼 수
                                    있는기회!
                                    <br />
                                    직무별 다양한 이야기를 들어보자 ~!
                                    <br />
                                    토크콘서트 후 소규모 멘토링까지!
                                    <br />
                                    사전 신청하세요!
                                    <span>신청기간: ~ 9. 5.</span>
                                    <Link to={routerPath.web_signup_url}>
                                        사전등록 바로가기
                                    </Link>
                                </p>
                            </div>
                        </li>
                        <li
                            className="p06"
                            data-aos="flip-left"
                            data-aos-delay="1500"
                        >
                            <span className="num">06</span>
                            바로 채용면접
                            <span className="icon">
                                <img src="img/web/main/picon06.png" alt="" />
                            </span>
                            <div>
                                <p>
                                    현장에서 바로 채용되고 싶다면 서둘러
                                    신청하세요!
                                    <br />
                                    사전 서류 신청 하나로 채용까지 쭉~
                                    <br />
                                    <b>
                                        사전 서류신청 → 현장면접(서류 통과자) →
                                        바로채용
                                    </b>
                                    <span>신청기간: ~ 9. 5.</span>
                                    <span>
                                        제출처: 홈페이지 사전등록 또는
                                        이메일(linc21@naver.com){" "}
                                    </span>
                                    <Link to={routerPath.web_signup_url}>
                                        사전등록 바로가기
                                    </Link>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="company">
                    <h3>참여기업</h3>
                    <p>클릭시 기업 공식 홈페이지로 이동합니다.</p>
                    <div
                        className="logobox"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        {companyData.length !== 0 &&
                            companyData.map((item, idx) => (
                                <Link
                                    key={`company_main_${idx}`}
                                    onClick={(e) => {
                                        CommonOpenUrl(item.homepageUrl);
                                        e.preventDefault();
                                    }}
                                >
                                    <img
                                        src={`img/web/logo/logo_${item.companyLabel}.png`}
                                        alt={item.companyName}
                                    />
                                </Link>
                            ))}
                        {/* <Link
                            onClick={() => CommonOpenUrl("https://www.jejuair.net/")}
                        >
                            <img src="img/web/main/com01.png" alt="제주항공" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl(
                                    "https://jejusinh.nonghyup.com/user/indexMain.do?siteId=jejusinh"
                                )
                            }
                        >
                            <img src="img/web/main/com02.png" alt="농협은행" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl(
                                    "https://www.e-jejubank.com/JeJuBankInfo.do"
                                )
                            }
                        >
                            <img src="img/web/main/com03.png" alt="제주은행" />
                        </Link>
                        <Link onClick={() => CommonOpenUrl("")}>
                            <img
                                src="img/web/main/com04.png"
                                alt="그랜드하야트 제주"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("http://www.jwmarriottjeju.co.kr/")
                            }
                        >
                            <img
                                src="img/web/main/com05.png"
                                alt="jw메리어트 제주"
                            />
                        </Link>
                        <Link onClick={() => CommonOpenUrl("http://kalhotel.co.kr ")}>
                            <img
                                src="img/web/main/com06.png"
                                alt="칼호텔서귀포"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("https://www.shilla.net/jeju")
                            }
                        >
                            <img
                                src="img/web/main/com07.png"
                                alt="더신라제주"
                            />
                        </Link>
                        <Link
                            onClick={() => CommonOpenUrl("https://www.thepinx.co.kr")}
                        >
                            <img src="img/web/main/com08.png" alt="skpinx" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("https://www.xslab.co.kr/default/")
                            }
                        >
                            <img src="img/web/main/com09.png" alt="xslab" />
                        </Link>
                        <Link onClick={() => CommonOpenUrl("https://www.goorm.io/")}>
                            <img src="img/web/main/com10.png" alt="goorm" />
                        </Link>
                        <Link onClick={() => CommonOpenUrl("http://itnewcorp.com")}>
                            <img src="img/web/main/com11.png" alt="itnew" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("https://www.wayplus.co.kr/")
                            }
                        >
                            <img src="img/web/main/com12.png" alt="wayplus" />
                        </Link>
                        <Link>
                            <img src="img/web/main/com13.png" alt="leaflog" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("https://www.tilon.com/home")
                            }
                        >
                            <img src="img/web/main/com14.png" alt="tilonsoft" />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("http://www.intothecafe.co.kr/")
                            }
                        >
                            <img
                                src="img/web/main/com15.png"
                                alt="농업회사법인인투주식회사"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                CommonOpenUrl("http://www.hallasan.co.kr/index.php")
                            }
                        >
                            <img
                                src="img/web/main/com16.png"
                                alt="한라산소주"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("http://www.jejumayu.com/")}
                        >
                            <img
                                src="img/web/main/com17.png"
                                alt="제주마유㈜"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://pitterpetter.com/")}
                        >
                            <img
                                src="img/web/main/com18.png"
                                alt="pitterpetter"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://kcg.go.kr/jejucgh/main.do")
                            }
                        >
                            <img
                                src="img/web/main/com19.png"
                                alt="해양경찰청"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://www.kaflix.com/")}
                        >
                            <img src="img/web/main/com20.png" alt="kaflix" />
                        </Link>
                        <Link onClick={() => openUrl("https://www.ncf.or.kr/")}>
                            <img
                                src="img/web/main/com21.png"
                                alt="넥스트챌린지"
                            />
                        </Link>
                        <Link onClick={() => openUrl("http://jejusquare.kr")}>
                            <img
                                src="img/web/main/com22.png"
                                alt="JEJUSQUARE"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://www.981park.com/")}
                        >
                            <img
                                src="img/web/main/com23.png"
                                alt="모노리스제주파크(981파크)"
                            />
                        </Link>
                        <Link onClick={() => openUrl("https://mombly.kr/")}>
                            <img src="img/web/main/com24.png" alt="MOMBLY" />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://www.deslumieres.co.kr/bunker")
                            }
                        >
                            <img
                                src="img/web/main/com25.png"
                                alt="빛의 벙커/ (주)티모넷"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("http://www.jejuenergy.or.kr/")
                            }
                        >
                            <img
                                src="img/web/main/com26.png"
                                alt="제주에너지공사"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl(
                                    "https://www.komipo.co.kr/kor/main/main.do"
                                )
                            }
                        >
                            <img
                                src="img/web/main/com27.png"
                                alt="한국중부발전"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://home.kepco.co.kr ")}
                        >
                            <img src="img/web/main/com28.png" alt="한국전력" />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://kcg.go.kr/jejucgh/main.do")
                            }
                        >
                            <img src="img/web/main/com29.png" alt="KT" />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://www.kctvjeju.com/")}
                        >
                            <img src="img/web/main/com30.png" alt="KCTV" />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://www.neople.co.kr")}
                        >
                            <img src="img/web/main/com31.png" alt="NEOPLE" />
                        </Link>
                        <Link>
                            <img
                                src="img/web/main/com32.png"
                                alt="JEJUINDRONE"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://www.nanoomenergy.com/")
                            }
                        >
                            <img
                                src="img/web/main/com33.png"
                                alt="나눔에너지"
                            />
                        </Link>
                        <Link
                            onClick={() => openUrl("https://www.daeeun.net/")}
                        >
                            <img src="img/web/main/com34.png" alt="대은계전" />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://www.si-imaging.com/kr/")
                            }
                        >
                            <img src="img/web/main/com35.png" alt="SIIS" />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("http://www.windetect.co.kr/")
                            }
                        >
                            <img src="img/web/main/com36.png" alt="WINDETECT" />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl(
                                    "https://www.nia.or.kr/site/nia_kor/main.do"
                                )
                            }
                        >
                            <img
                                src="img/web/main/com37.png"
                                alt="한국지능정보사회진흥원"
                            />
                        </Link>
                        <Link onClick={() => openUrl("ijtohr@ijto.or.kr")}>
                            <img
                                src="img/web/main/com38.png"
                                alt="제주관광공사"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://www.jpdc.co.kr/index.htm")
                            }
                        >
                            <img
                                src="img/web/main/com39.png"
                                alt="제주특별자치도개발공사"
                            />
                        </Link>
                        <Link onClick={() => openUrl("http://www.nps.or.kr")}>
                            <img
                                src="img/web/main/com40.png"
                                alt="국민연금공단"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("https://www.jdcenter.com/main.cs")
                            }
                        >
                            <img
                                src="img/web/main/com41.png"
                                alt="제주국제자유도시개발센터"
                            />
                        </Link>
                        <Link
                            onClick={() =>
                                openUrl("http://jpmeng.co.kr/index.php")
                            }
                        >
                            <img src="img/web/main/com42.png" alt="JPM" />
                        </Link> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContentsProgram;
