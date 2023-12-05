import React, { useEffect, useMemo, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonConsole, CommonErrModule, CommonModal, CommonNotify, CommonRest } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { Link } from "react-router-dom";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "@mui/material";
import { boardType } from "common/js/static";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBar from "components/admin/common/SearchBar";

// ------------------- import End --------------------

const GuestBookBoardMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

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

    // 검색어
    const searchKeyword = useRef(null);

    useEffect(() => {
        getBoardList(1, 10, "");
    }, [isNeedUpdate, isRefresh]);

    // 리스트 가져오기
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // /v1/_boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
            board_type: boardType.guestBook, // 방명록
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
        setModData({});
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
    
    // 방명록 정보 상세
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

    // 방명록 등록 모달
    const regBoard = () => {
        setModalTitle("방명록 등록하기");
        setIsOpen(true);
    };

    // 방명록 상세 모달
    const modBoard = () => {
        setModalTitle("방명록 상세보기");
        setIsOpen(true);
    };

    // 삭제
    const clickRemove = () => {
        //선택여부 확인
        checkItems.length === 0
            ? CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "삭제할 항목을 선택해주세요",
                })
            : CommonNotify({
                    type: "confirm",
                    hook: confirm,
                    message: "선택된 항목을 삭제 하시겠습니까?",
                    callback: () => removeBoard(),
                });
    };

    const removeBoard = async () => {
        setIsSpinner(true);

        const length = checkItems.length;

        let data = {};
        let checkCount = 0;

        for (let i = 0; i < length; i++) {
            // /v1/board/{board_idx}
            // DELETE
            // 게시판 삭제
            let url = apiPath.api_admin_remove_board + checkItems[i];

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
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: `${checkCount} 건의 방명록이 삭제 되었습니다.`,
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

    const downloadExcel = () => {
        setIsSpinner(true);

        // /v1/board/_download
        // POST
        // 게시판 엑셀 다운로드
        const url = apiPath.api_admin_board_download;
        const data = {
            page_num: 1,
            page_size: 10,
            search_keyword: "",
            board_type: boardType.guestBook, // 방명록
            file_down_yn: "Y",
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
            file: "Y", // file: "Y" 로 하면 엑셀 다운로드 가능
        };
        CommonRest(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            const result_code = res.headers.result_code;

            console.log(res);

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                // window 객체의 createObjuctURL을 이용해서 blob:http://~~~ 식의 url을 만들어 준다.
                const url = window.URL.createObjectURL(
                    // Blob은 배열 객체 안의 모든 데이터를 합쳐 blob으로 반환하기 때문에 []안에 담는다!
                    new Blob([res.data], {
                        type: res.headers["content-type"],
                    }),
                );

                // link 안에 위에서 만든 url을 가지고 있는 a 태그를 만들고 보이지 않도록 해준다.
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", excelName());
                document.body.appendChild(link);
                link.style.display = "none";
                link.click();

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
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

        const xlsName = `${nowDate}_Showcase_방명록`;

        return xlsName;
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

        columnHelper.accessor((row) => row.reg_user_name_en, {
            id: "reg_user_name_en",
            cell: (info) => info.getValue(),
            header: "등록자",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => `+${row.inter_phone_number} ${row.mobile1}-${row.mobile2}-${row.mobile3}`, {
            id: "mobile",
            cell: (info) => info.getValue(),
            header: "전화번호",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.email, {
            id: "email",
            cell: (info) => info.getValue(),
            header: "이메일",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.content_en, {
            id: "content_en",
            cell: (info) => info.getValue(),
            header: "소속",
            sortingFn: "alphanumericCaseSensitive",
        }),

        columnHelper.accessor((row) => row.reg_dttm, {
            id: "reg_dttm",
            cell: (info) => info.getValue(),
            header: "등록일시",
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
                    <h3>게시판 관리 - 방명록</h3>
                </div>
                <div className="con_area">
                    {/*검색 바*/}
                    <SearchBar
                        searchKeyword={searchKeyword}
                        doSearch={doSearch}
                        regBoard={regBoard}
                        downloadExcel={downloadExcel}
                        clickRemove={clickRemove}
                    />
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
                                <col width="15%" />
                                <col width="12%" />
                                <col width="*" />
                                <col width="15%" />
                                <col width="12%" />
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
                                                <td key={cell.id} 
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis', // 넘치는 텍스트에 ... 처리
                                                        overflow: 'hidden', // 넘치는 영역 숨김
                                                        maxWidth: '200px'
                                                    }}
                                                >
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
                component={"GuestBookBoardModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
        </>
    );
};

export default GuestBookBoardMain;
