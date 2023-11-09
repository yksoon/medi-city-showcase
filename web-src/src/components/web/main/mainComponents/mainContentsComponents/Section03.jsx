import React from "react";

const Section03 = () => {
    return (
        <>
            <div className="section03" id="section03">
                <div className="hotel">
                    <p className="img">
                        <img
                            src="img/web/main/hotel.jpg"
                            alt="호텔이미지"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                        />
                    </p>
                    <div className="info">
                        <h4>VENUE</h4>
                        <h3>The Westin Jakarta</h3>
                        <p>
                            Jl. H.R. Rasuna Said Kav.C-22 A, Jakarta, Jakarta,
                            Indonesia, 12940
                            <br />
                            Tel: +62 21-27887788
                        </p>
                        <p className="btns">
                            <a
                                href="https://www.google.com/maps?ll=-6.22234,106.835156&z=16&t=m&hl=en&gl=KR&mapclient=embed&cid=6175992436560864023"
                                target="_blank"
                            >
                                <span className="arrow">
                                    VIEW MAP
                                    <img
                                        src="img/web/main/white_arrow2.png"
                                        alt="VIEW MAP"
                                    />
                                </span>
                            </a>
                            <a
                                href="https://www.marriott.com/en-us/hotels/jktwi-the-westin-jakarta/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0"
                                arget="_blank"
                            >
                                <span className="arrow">
                                    OVERVIEW
                                    <img
                                        src="img/web/main/white_arrow2.png"
                                        alt="GO HOTEL WEBSITE"
                                    />
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
                <div className="hotel_map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.306115309706!2d106.83085667581312!3d-6.223307460952207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f1144aa5e5%3A0x55b5886634b5a317!2sThe%20Westin%20Jakarta!5e0!3m2!1sen!2skr!4v1699330467479!5m2!1sen!2skr"
                        width="100%"
                        height="420"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </>
    );
};

export default Section03;
