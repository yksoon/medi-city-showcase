import { Pagination } from "@mui/material";
import axios from "axios";
import {
    CommonConsole,
    CommonErrModule,
    CommonErrorCatch,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    ipInfoAtom,
    isSpinnerAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "recoils/atoms";
import { successCode } from "resultCode";
import { apiPath } from "webPath";

const OneLineBoard = (props) => {
    // const { alert } = useAlert();
    // const err = { dispatch, alert };
    const resetUserInfoAdmin = useResetRecoilState(userInfoAdminAtom);
    const resetUserTokenAdmin = useResetRecoilState(userTokenAdminAtom);

    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const notice = process.env.REACT_APP_NOTICE;
    const isDeveloping = process.env.REACT_APP_ISDEVELOPING;

    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);
    const userInfoAdmin = useRecoilValue(userInfoAdminAtom);

    const ip = useRecoilValue(ipInfoAtom);
    // const ip = useSelector((state) => state.ipInfo.ipInfo);

    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modOneLine, setModOneLine] = useState(null);
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
            board_type: "400",
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

    // 글쓰기
    const regBoard = () => {
        setModalTitle("글쓰기");
        setIsOpen(true);
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        const keyword = searchKeyword.current.value;

        getBoardList(value, 10, keyword);
    };

    // 모달 닫기
    const handleModalClose = () => {
        setIsOpen(false);
    };

    // 화면 재 렌더링
    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
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

                setModOneLine(result_info);

                setModalTitle("한줄게시판 수정");
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

    // 엑셀 다운로드
    const downloadExcel = () => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );

        setIsSpinner(true);

        // 대시보드
        // /v1/board/_download
        // POST
        // !!!!!!!!!!!!! 엑셀 다운로드만 blob으로 response를 받아야하기때문에 rest 함수 사용하지 않고 따로 axios로 호출
        axios({
            method: "POST",
            url: apiPath.api_admin_board_download,
            responseType: "blob",
            headers: {
                "Content-Type": "application/json",
                "Jobara-Token": userTokenAdmin,
                "Jobara-Src": ip,
            },
            data: {
                board_type: "400",
                page_num: 1,
                page_size: 1,
            },
        })
            .then((response) => {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);

                console.log(response);

                // window 객체의 createObjuctURL을 이용해서 blob:http://~~~ 식의 url을 만들어 준다.
                const url = window.URL.createObjectURL(
                    // Blob은 배열 객체 안의 모든 데이터를 합쳐 blob으로 반환하기 때문에 []안에 담는다!
                    new Blob([response.data], {
                        type: response.headers["content-type"],
                    })
                );

                // link 안에 위에서 만든 url을 가지고 있는 a 태그를 만들고 보이지 않도록 해준다.
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", excelName());
                document.body.appendChild(link);
                link.style.display = "none";
                link.click();
            })
            .catch((error) => {
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );

                setIsSpinner(false);

                CommonErrorCatch(
                    error,
                    // dispatch,
                    setIsSpinner,
                    alert,
                    resetUserInfoAdmin,
                    resetUserTokenAdmin
                );
            });
    };

    // 엑셀 이름
    const excelName = () => {
        const now = new Date();
        const year = String(now.getFullYear());

        let month = String(now.getMonth() + 1);
        if (month.length === 1) {
            month = "0" + month;
        }

        let day = String(now.getDate());
        if (day.length === 1) {
            day = "0" + day;
        }

        const nowDate = `${year}${month}${day}`;

        const xlsName = `${nowDate}_잡아라_한줄게시판_자료`;

        return xlsName;
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
                    <h3>한줄 게시판</h3>
                </div>
                <div className="con_area">
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
                            {/* <Link
                                        href=""
                                        className="btn btn01"
                                        onClick={regBoard}
                                    >
                                        글쓰기
                                    </Link> */}
                            {/* <Link href="" className="btn btn02">
                                        삭제
                                    </Link> */}
                            <Link className="btn btn01" onClick={downloadExcel}>
                                엑셀 다운로드
                            </Link>
                            {userInfoAdmin.user_role_cd === "000" && (
                                <Link
                                    className="btn btn02"
                                    onClick={removeBoard}
                                >
                                    삭제
                                </Link>
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                        }}
                    >
                        총 : <b>&nbsp; {pageInfo && pageInfo.total} &nbsp;</b>{" "}
                        건
                    </div>
                    <div className="adm_notice">
                        <div className="adm_table">
                            <table className="table_a">
                                <colgroup>
                                    <col width="5%" />
                                    <col width="5%" />
                                    <col width="10%" />
                                    <col width="10%" />
                                    <col width="*" />
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
                                                    checkItems &&
                                                    boardList &&
                                                    checkItems.length ===
                                                        boardList.length
                                                        ? true
                                                        : false
                                                }
                                            />
                                        </th>
                                        <th>번호</th>
                                        <th>등록자</th>
                                        <th>연락처</th>
                                        <th>내용</th>
                                        <th>등록일</th>
                                        <th>수정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardList.length !== 0 ? (
                                        boardList.map((item, idx) => (
                                            <tr key={`oneline_board_${idx}`}>
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
                                                <td>{item.user_name_ko}</td>
                                                <td>{`${item.mobile1}-${item.mobile2}-${item.mobile3}`}</td>
                                                <td>{item.subject}</td>
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
                                                    <b>데이터가 없습니다.</b>
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
                </div>
            </div>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"800"}
                handleModalClose={handleModalClose}
                component={"RegOneLineBoardModal"}
                handleNeedUpdate={handleNeedUpdate}
                modOneLine={modOneLine}
            />
        </>
    );
};

export default OneLineBoard;
