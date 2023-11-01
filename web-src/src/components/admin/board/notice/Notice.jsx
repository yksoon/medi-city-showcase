import { Pagination } from "@mui/material";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { commaOfNumber } from "common/js/Pattern";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { successCode } from "resultCode";
import { apiPath } from "webPath";

const Notice = (props) => {
    // const dispatch = useDispatch();
    // const { alert } = useAlert();
    // const { confirm } = useConfirm();
    // const err = { dispatch, alert };

    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const fileBaseUrl = apiPath.api_file;

    const notice = process.env.REACT_APP_NOTICE;
    const isDeveloping = process.env.REACT_APP_ISDEVELOPING;

    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modNotice, setModNotice] = useState(null);
    const [checkItems, setCheckItems] = useState([]);

    const searchKeyword = useRef(null);

    const isRefresh = props.isRefresh;

    useEffect(() => {
        getBoardList(1, 10, "");
    }, [isNeedUpdate, isRefresh]);

    // 리스트 가져오기
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        // /v1/boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
            board_type: "000",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
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
                let page_info = res.data.page_info;

                setBoardList(result_info);
                setPageInfo(page_info);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);
            }
        };
    };

    // 검색
    const doSearch = () => {
        const keyword = searchKeyword.current.value;

        getBoardList(1, 10, keyword);
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        const keyword = searchKeyword.current.value;

        getBoardList(value, 10, keyword);
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

    // 글쓰기
    const regBoard = () => {
        setModalTitle("글쓰기");
        setIsOpen(true);
    };

    // 게시글 수정
    const modBoard = (board_idx) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

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
            admin: "Y",
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

                setIsSpinner(false);

                setModNotice(result_info);

                setModalTitle("공지사항 수정");
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

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const boardArray = [];
            boardList.forEach((el) => boardArray.push(el.board_idx));
            setCheckItems(boardArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    // 삭제
    const removeBoard = () => {
        const length = checkItems.length;

        if (length === 0) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "삭제할 게시글을 선택해주세요",
            });
        } else {
            CommonNotify({
                type: "confirm",
                hook: confirm,
                message: "선택한 게시글을 삭제하시겠습니까?",
                callback: () => removeLogic(),
            });

            const removeLogic = () => {
                // dispatch(
                //     set_spinner({
                //         isLoading: true,
                //     })
                // );

                setIsSpinner(true);

                let data = {};
                let checkCount = 0;

                for (let i = 0; i < length; i++) {
                    // v1/board
                    // DELETE
                    let url =
                        apiPath.api_admin_remove_board + `/${checkItems[i]}`;

                    // console.log(url);
                    // 파라미터
                    const restParams = {
                        method: "delete",
                        url: url,
                        data: data,
                        err: err,
                        callback: (res) => responsLogic(res),
                        admin: "Y",
                    };
                    CommonRest(restParams);
                }

                const responsLogic = (res) => {
                    if (res.headers.result_code === successCode.success) {
                        checkCount++;

                        if (checkCount === length) {
                            // dispatch(
                            //     set_spinner({
                            //         isLoading: false,
                            //     })
                            // );

                            setIsSpinner(false);

                            CommonNotify({
                                type: "alert",
                                hook: alert,
                                message: `${checkCount} 건의 게시글이 삭제 되었습니다.`,
                                callback: () => refresh(),
                            });

                            const refresh = () => {
                                setCheckItems([]);

                                setIsNeedUpdate(!isNeedUpdate);
                            };
                        }
                    }
                };
            };
        }
    };

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>공지사항</h3>
                </div>
                <div className="con_area">
                    <>
                        <div className="adm_search">
                            <div>
                                {/* <select name="" id="">
                                                            <option value="">구분</option>
                                                            <option value="">이름</option>
                                                            <option value="">소속</option>
                                                        </select> */}
                                <input
                                    type="text"
                                    className="input"
                                    ref={searchKeyword}
                                />
                                <Link className="btn btn02" onClick={doSearch}>
                                    검색
                                </Link>
                            </div>
                            <div
                                className="btn_box btn_right"
                                style={{ margin: 0 }}
                            >
                                <Link
                                    href=""
                                    className="btn btn01"
                                    onClick={regBoard}
                                >
                                    글쓰기
                                </Link>
                                <Link
                                    className="btn btn02"
                                    onClick={removeBoard}
                                >
                                    삭제
                                </Link>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginBottom: "10px",
                            }}
                        >
                            총 :{" "}
                            <b>&nbsp; {pageInfo && pageInfo.total} &nbsp;</b> 건
                        </div>

                        <div className="adm_notice">
                            <div className="adm_table">
                                <table className="table_a">
                                    <colgroup>
                                        <col width="5%" />
                                        <col width="5%" />
                                        <col width="*" />
                                        <col width="20%" />
                                        <col width="10%" />
                                        <col width="10%" />
                                        <col width="5%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    name="select-all"
                                                    onChange={(e) =>
                                                        handleAllCheck(
                                                            e.target.checked
                                                        )
                                                    }
                                                    checked={
                                                        // checkItems &&
                                                        // boardList &&
                                                        checkItems.length ===
                                                        boardList.length
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </th>
                                            <th>번호</th>
                                            <th>제목</th>
                                            <th>파일</th>
                                            <th>조회수</th>
                                            <th>등록일</th>
                                            <th>게시글수정</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boardList.length !== 0 ? (
                                            boardList.map((item, idx) => (
                                                <tr key={`notice_${idx}`}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            name={`userIdx_${item.board_idx}`}
                                                            id={item.board_idx}
                                                            defaultValue={
                                                                item.board_idx
                                                            }
                                                            onChange={(e) =>
                                                                handleSingleCheck(
                                                                    e.target
                                                                        .checked,
                                                                    item.board_idx
                                                                )
                                                            }
                                                            checked={
                                                                checkItems.includes(
                                                                    item.board_idx
                                                                )
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                    </td>
                                                    <td>{item.row_num}</td>
                                                    <td>{item.subject}</td>
                                                    <td>
                                                        <div className="file_wrap">
                                                            {item.file_info
                                                                .length !== 0 &&
                                                                item.file_info.map(
                                                                    (
                                                                        item2,
                                                                        idx2
                                                                    ) => (
                                                                        <Link
                                                                            to={`${fileBaseUrl}${item2.file_path_enc}`}
                                                                            key={`file_${idx2}`}
                                                                        >
                                                                            <img
                                                                                src="img/common/file.svg"
                                                                                alt={
                                                                                    item2.file_name
                                                                                }
                                                                                title={
                                                                                    item2.file_name
                                                                                }
                                                                            />
                                                                            {
                                                                                item2.file_name
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="viewer_wrap">
                                                            <img
                                                                src="img/common/user_icon_black.png"
                                                                alt=""
                                                            />{" "}
                                                            {String(
                                                                item.view_count
                                                            ).replace(
                                                                commaOfNumber,
                                                                ","
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {
                                                            item.reg_dttm.split(
                                                                " "
                                                            )[0]
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link
                                                            className="tablebtn"
                                                            onClick={(e) => {
                                                                modBoard(
                                                                    item.board_idx
                                                                );
                                                            }}
                                                        >
                                                            수정
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <>
                                                <tr>
                                                    <td
                                                        colSpan="7"
                                                        style={{
                                                            height: "55px",
                                                        }}
                                                    >
                                                        <b>
                                                            데이터가 없습니다.
                                                        </b>
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {boardList.length !== 0 ? (
                            pageInfo && (
                                <div className="pagenation">
                                    <Pagination
                                        count={pageInfo.pages}
                                        onChange={handleChange}
                                        shape="rounded"
                                        color="primary"
                                    />
                                </div>
                            )
                        ) : (
                            <></>
                        )}
                        <div className="pagenation"></div>
                        {/* <div
                                dangerouslySetInnerHTML={{ __html: dummy }}
                            ></div> */}
                    </>
                </div>
            </div>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"RegNoticeModal"}
                handleNeedUpdate={handleNeedUpdate}
                modNotice={modNotice}
            />
        </>
    );
};

export default Notice;
