import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {CommonConsole, CommonErrModule, CommonModal, CommonNotify, CommonRest} from "common/js/Common";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {isSpinnerAtom, userInfoAdminAtom, userTokenAdminAtom} from "recoils/atoms";
import {apiPath} from "webPath";
import {successCode} from "resultCode";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ConsultingBoardMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);
    const userInfoAdmin = useRecoilValue(userInfoAdminAtom);

    const isRefresh = props.isRefresh;

    // 리스트
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [checkItems, setCheckItems] = useState([]);

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    // 테이블 세팅
    const [sorting, setSorting] = useState([]);
    const columnHelper = createColumnHelper();

    const searchKeyword = useRef(null);

    useEffect(() => {
        getBoardList(1, 10, "");
    }, [isNeedUpdate, isRefresh]);

    // 리스트 가져오기
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // /v1/boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
            board_type: "100",  // 상담문의
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

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    // 검색
    const doSearch = () => {
        const keyword = searchKeyword.current.value;

        getBoardList(1, 10, keyword);
    };

    // 모달창 닫기
    const handleModalClose = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "입력된 정보가 초기화 됩니다. 창을 닫으시겠습니까?",
            callback: () => close(),
        });

        const close = () => {
            setModalTitle("");
            setModData({});
            setIsOpen(false);
        };
    };

    // 리스트 새로고침
    const handleNeedUpdate = () => {
        setModalTitle("");
        setIsOpen(false);
        setIsNeedUpdate(!isNeedUpdate);
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
            const idArray = [];
            boardList.forEach((el) => idArray.push(el.board_idx));
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        getBoardList(value, 10, searchKeyword.current.value);
    };

    // 약관 상세
    const detailBoard = (board_idx) => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_board + board_idx;
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
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;
                setModData(result_info);

                // console.log(result_info)
                modBoard();

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.result_message_ko,
                });
            }
        };
    };

    // 상세보기 모달
    const modBoard = () => {
        setModalTitle("문의내용 상세보기");
        setIsOpen(true);
    };

    // --------------------------------- 테이블 세팅 -------------------------------------

    // 컬럼 세팅
    const columns = useMemo(() => [
        {
            accessorKey: "board_idx",
            cell: (info) => (
                <input
                    type="checkbox"
                    name={`board_idx_${info.getValue()}`}
                    id={info.getValue()}
                    value={info.getValue()}
                    onChange={(e) =>
                        handleSingleCheck(e.target.checked, info.getValue())
                    }
                    checked={
                        checkItems.includes(info.getValue())
                    }
                />
            ),
            header: () => (
                <input
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={
                        checkItems &&
                        boardList &&
                        checkItems.length === boardList.length
                    }
                />
            ),
            enableSorting: false,
        },

        columnHelper.accessor((row) => row.process_status, {
            id: "process_status",
            cell: (info) => info.getValue(),
            header: "처리상태",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.subject, {
            id: "subject",
            cell: (info) => info.getValue(),
            header: "제목",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.content, {
            id: "content",
            cell: (info) => info.getValue(),
            header: "내용",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.reg_user_name_ko, {
            id: "reg_user_name_ko",
            cell: (info) => info.getValue(),
            header: "등록자",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.reg_dttm.split(" ")[0], {
            id: "reg_dttm",
            cell: (info) => info.getValue(),
            header: "등록일",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor(
            (row) => (
                <Link
                    to=""
                    className="tablebtn"
                    onClick={() => detailBoard(row.board_idx)}
                >
                    상세보기
                </Link>
            ),
            {
                id: "viewDetail",
                cell: (info) => info.getValue(),
                header: "상세보기",
                enableSorting: false,
            }
        ),
    ]);

    const data = useMemo(() => boardList, [boardList]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>상담문의</h3>
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
                            <Link to="" className="subbtn off" onClick={doSearch}>검색</Link>
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
                            {/*<Link className="btn btn01" onClick={downloadExcel} to="">*/}
                            {/*    엑셀 다운로드*/}
                            {/*</Link>*/}
                            {/*{userInfoAdmin.user_role_cd === "000" && (*/}
                            {/*    <Link*/}
                            {/*        className="btn btn02"*/}
                            {/*        onClick={removeBoard}*/}
                            {/*     to="">*/}
                            {/*        삭제*/}
                            {/*    </Link>*/}
                            {/*)}*/}
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

                    <div className="adm_table">
                        <table className="table_a">
                            <colgroup>
                                <col width="5%" />
                                <col width="10%" />
                                <col width="20%" />
                                <col width="*" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="5%" />
                            </colgroup>
                            <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? "cursor-pointer select-none table_sort"
                                                                    : "",
                                                            onClick:
                                                                header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getCanSort() &&
                                                            ({
                                                                asc: (
                                                                    <div className="sort_asc">
                                                                        <ArrowDropUpIcon />
                                                                        <ArrowDropDownIcon />
                                                                    </div>
                                                                ),
                                                                desc: (
                                                                    <div className="sort_desc">
                                                                        <ArrowDropUpIcon />
                                                                        <ArrowDropDownIcon />
                                                                    </div>
                                                                ),
                                                            }[
                                                                header.column.getIsSorted()
                                                                ] ?? (
                                                                <div>
                                                                    <ArrowDropUpIcon />
                                                                    <ArrowDropDownIcon />
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                            </thead>
                            <tbody>
                            {boardList.length !== 0 ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column
                                                            .columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td
                                            colSpan="100%"
                                            style={{ height: "55px" }}
                                        >
                                            <b>데이터가 없습니다.</b>
                                        </td>
                                    </tr>
                                </>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {Object.keys(pageInfo).length !== 0 && (
                        <div className="pagenation">
                            <Pagination
                                count={pageInfo.pages}
                                onChange={handleChange}
                                shape="rounded"
                                color="primary"
                            />
                        </div>
                    )}

                </div>
            </div>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"800"}
                handleModalClose={handleModalClose}
                component={"ConsultingBoardModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
        </>
    );
};

export default ConsultingBoardMain;
