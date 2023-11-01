import { CommonErrModule } from "common/js/Common";
import { commaOfNumber } from "common/js/Pattern";
import useAlert from "hook/useAlert";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";
const fileBaseUrl = apiPath.api_file;

const MainContentsNoticeModal = (props) => {
    // const dispatch = useDispatch();
    // const { alert } = useAlert();
    // const err = { dispatch, alert };
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [fileList, setFileList] = useState([]);
    const [noticeContent, setNoticeContent] = useState(null);

    const modalOption = {
        isOpen: props.isOpen,
        title: props.title,
        content: props.content,
        handleModalClose: props.handleModalClose,
    };

    const modNotice = props.modNotice ? props.modNotice : null;

    const handleNeedUpdate = props.handleNeedUpdate;

    // useEffect(() => {
    //     // mod인경우
    //     if (modNotice) {
    //         getDefaultValue();
    //     }
    // }, []);

    useLayoutEffect(() => {
        // mod인경우
        if (modNotice) {
            getDefaultValue();
        }
    }, []);

    // 수정일경우 디폴트 세팅
    const getDefaultValue = () => {
        // 파일
        const files = modNotice ? modNotice.file_info : [];

        setFileList(files);

        setNoticeContent(modNotice.content);
    };

    const createMarkup = () => {
        return { __html: noticeContent };
    };

    return (
        <>
            <div>
                <div
                    id="noticeModalContent"
                    className="noticeModalContent"
                    dangerouslySetInnerHTML={createMarkup()}
                ></div>
                <br />
                <br />
                <div>
                    <div className="admin">
                        <table className="table_bb">
                            <colgroup>
                                <col width="12%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>조회 수</th>
                                    <td>
                                        {String(modNotice.view_count).replace(
                                            commaOfNumber,
                                            ","
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td className="fileicon">
                                        <div>
                                            {fileList.length !== 0 &&
                                                fileList.map((item, idx) => (
                                                    <div key={`file_${idx}`}>
                                                        <Link
                                                            to={`${fileBaseUrl}${item.file_path_enc}`}
                                                        >
                                                            <img
                                                                src="img/common/file.svg"
                                                                alt=""
                                                            />
                                                            {item.file_name}{" "}
                                                        </Link>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContentsNoticeModal;
