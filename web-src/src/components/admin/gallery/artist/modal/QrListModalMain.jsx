import React, { useRef } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";

const QrListModalMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const title = props.title;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    const printRef = useRef(null);

    let prtContent;
    let initBody;
    const handlePrint = () => {
        prtContent = document.getElementById("qrTable");
        // window.onbeforeprint = beforePrint;
        // window.onafterprint = afterPrint;
        window.print();
    };

    // 웹페이지 body 내용을 프린트하고 싶은 내용으로 교체
    function beforePrint() {
        initBody = document.body.innerHTML;
        document.body.innerHTML = prtContent.innerHTML;
    }

    // 프린트 후, 웹페이지 body 복구
    function afterPrint() {
        document.body.innerHTML = initBody;
    }
    return (
        <>
            <div className="admin" id="qrContainer">
                <div className="subbtn_box">
                    <ReactToPrint
                        trigger={() => (
                            <Link to="" className="subbtn on">
                                전체 출력
                            </Link>
                        )}
                        content={() => printRef.current}
                    />
                </div>
                <h4 className="mo_subtitle">{title}</h4>
                <table className="table_bb" id="qrTable" ref={printRef}>
                    <colgroup>
                        <col width="60%" />
                        <col width="40%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <th>QR</th>
                        </tr>
                        {isModData &&
                            modData.map((item, idx) => (
                                <tr key={`idx_${idx}`}>
                                    <td>
                                        <h4 className="mo_subtitle">
                                            {item.title}
                                        </h4>
                                    </td>
                                    <td id={idx}>
                                        <img src={item.img} alt="" />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="subbtn_box">
                    <Link
                        to=""
                        className="subbtn off"
                        onClick={handleModalClose}
                    >
                        취소
                    </Link>
                </div>
            </div>
        </>
    );
};

export default QrListModalMain;
