import { Link } from "react-router-dom";
import useAlert from "hook/useAlert";

const AlertModal = () => {
    const { alertList } = useAlert();

    if (alertList.length <= 0) return null;

    const escKeyModalClose = (e) => {
        if (e.keyCode === 27 && document.getElementById("okBtn") !== null) {
            document.getElementById("okBtn").click();
            return false;
        }
    };
    window.addEventListener("keydown", escKeyModalClose);

    return (
        <div className="alert_wrap block">
            {alertList.map(
                ({ id, message, buttons: { ok, close, cancel } }, idx) => {
                    return (
                        <div className="alert" key={`confirm_${idx}`}>
                            <div>
                                {/* <span
                                    className="noti_icon"
                                    id="modal-modal-title"
                                >
                                    <img src="img/common/alert.png" alt="" />
                                </span> */}
                                <h3>JOBARA</h3>
                                <p>
                                    {message
                                        ? decodeURI(message)
                                              .replaceAll("%20", " ")
                                              .replaceAll("%40", "@")
                                              .replaceAll("%3A", ":")
                                        : ""}
                                </p>
                            </div>
                            <div className="btn_box">
                                <Link
                                    className="backbtn"
                                    id="okBtn"
                                    onClick={(e) => {
                                        ok.click();
                                        e.preventDefault();
                                    }}
                                >
                                    {ok.text}
                                    <span>
                                        <img
                                            src="img/common/arrow.png"
                                            alt=""
                                        />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default AlertModal;
