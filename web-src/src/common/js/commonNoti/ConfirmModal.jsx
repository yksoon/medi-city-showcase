import { Link } from "react-router-dom";
import useConfirm from "hook/useConfirm";

const ConfirmModal = () => {
    const { confirmList } = useConfirm();

    if (confirmList.length <= 0) return null;

    const escKeyModalClose = (e) => {
        if (e.keyCode === 27 && document.getElementById("closeBtn") !== null) {
            document.getElementById("closeBtn").click();
            return false;
        }
    };
    window.addEventListener("keydown", escKeyModalClose);

    return (
        <div className="alert_wrap block">
            {confirmList.map(
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
                                    className="backbtn on"
                                    onClick={(e) => {
                                        ok.click();
                                        e.preventDefault();
                                    }}
                                >
                                    {ok.text}{" "}
                                    <span>
                                        <img
                                            src="img/common/arrow.png"
                                            alt=""
                                        />
                                    </span>
                                </Link>{" "}
                                <Link
                                    className="backbtn"
                                    id="closeBtn"
                                    onClick={(e) => {
                                        cancel.click();
                                        e.preventDefault();
                                    }}
                                >
                                    {cancel.text}{" "}
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

export default ConfirmModal;
