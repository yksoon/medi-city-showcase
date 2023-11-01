import { CircularProgress, Skeleton } from "@mui/material";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { successCode } from "resultCode";
import { apiPath } from "webPath";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ipInfoAtom, isSpinnerAtom } from "recoils/atoms";

const MainContentsNoti = () => {
    // const dispatch = useDispatch();
    // const { alert } = useAlert();
    // const err = { dispatch, alert };
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const ipInfo = useRecoilValue(ipInfoAtom);

    const [boardList, setBoardList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modNotice, setModNotice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);

    useLayoutEffect(() => {
        getBoardList(1, 5);
    }, [ipInfo]);

    // 리스트 가져오기
    const getBoardList = (pageNum, pageSize) => {
        // /v1/boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            board_type: "000",
            admin_type: "N",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };
        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            let result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                let result_info = res.data.result_info;

                setBoardList(result_info);

                setIsLoading(false);
            } else {
                // 에러
                CommonConsole("log", res);
            }
        };
    };

    // 모달 닫기
    const handleModalClose = () => {
        setModNotice(null);
        setIsOpen(false);
    };

    // 화면 재 렌더링
    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
    };

    const openNotice = (board_idx, e) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );
        setIsSpinning(true);

        //console.log(e);
        //let offset = $(`#${e.target.id}`).offset(); //선택한 태그의 위치를 반환
        //$("html").animate({ scrollTop: offset.top });

        const boardIdx = String(board_idx);

        // v1/board/{board_idx}
        // GET
        const url = apiPath.api_admin_get_board + `/${boardIdx}`;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            let result_code = res.headers.result_code;
            let result_info = res.data.result_info;

            // 성공
            if (result_code === successCode.success) {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinning(false);

                setModNotice(result_info);

                setModalTitle(result_info.subject);
                setIsOpen(true);
            }
            // 에러
            else {
                CommonConsole("log", res);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    return (
        <>
            <div className="section03">
                <div className="notice">
                    <h3>공지사항</h3>
                    <ul>
                        {isLoading ? (
                            <>
                                <li>
                                    <Skeleton />
                                </li>
                                <li>
                                    <Skeleton />
                                </li>
                                <li>
                                    <Skeleton />
                                </li>
                            </>
                        ) : boardList.length !== 0 ? (
                            boardList.map((item, idx) => (
                                <li key={`main_notice_${idx}`}>
                                    <Link
                                        id={`main_notice_${idx}`}
                                        onClick={(e) => {
                                            openNotice(item.board_idx, e);
                                            e.preventDefault();
                                        }}
                                    >
                                        {item.subject}
                                    </Link>
                                    <span className="date">
                                        {item.reg_dttm.split(" ")[0]}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>
                                <p className="notice_no">
                                    공지사항이 없습니다.
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"MainContentsNoticeModal"}
                handleNeedUpdate={handleNeedUpdate}
                modNotice={modNotice}
            />
            {isSpinning && (
                <div className="spinner">
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

export default MainContentsNoti;
