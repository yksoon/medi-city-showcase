import React, { useEffect, useMemo, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { apiPath } from "webPath";
import { successCode } from "resultCode";
import { Link } from "react-router-dom";
import SearchBar from "components/admin/common/SearchBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Pagination } from "@mui/material";

const GalleryMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const isRefresh = props.isRefresh;

    /**
     * 리스트 state
     */
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [page, setPage] = useState(1);
    const [checkItems, setCheckItems] = useState([]);

    /**
     * modal
     */
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    /**
     * 테이블세팅
     */
    const [sorting, setSorting] = useState([]);
    const columnHelper = createColumnHelper();

    /**
     * 검색 키워드
     * @type {React.MutableRefObject<null>}
     */
    const searchKeyword = useRef(null);

    /**
     * QR 모달
     */
    const [isOpenQr, setIsOpenQr] = useState(false);
    const [modalTitleQr, setModalTitleQr] = useState("");
    const [modDataQr, setModDataQr] = useState([]);

    useEffect(() => {
        getBoardList(page, 10, "");
    }, [isNeedUpdate, isRefresh]);

    /**
     * 리스트 가져오기
     * @param pageNum
     * @param pageSize
     * @param searchKeyword
     */
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // /v1/_gallerys
        // POST
        // 갤러리 목록
        const url = apiPath.api_list_gallery;
        const data = {
            page_num: pageNum,
            page_size: pageSize,
            search_keyword: searchKeyword,
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
            const result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                const result_info = res.data.result_info;
                const page_info = res.data.page_info;

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

    /**
     * 모달창 닫기
     */
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

    /**
     * 검색
     */
    const doSearch = () => {
        const keyword = searchKeyword.current.value;

        getBoardList(page, 10, keyword);
    };

    /**
     * 리스트 새로고침
     */
    const handleNeedUpdate = () => {
        setModalTitle("");
        setIsOpen(false);
        setModData({});
        setIsNeedUpdate(!isNeedUpdate);
    };

    /**
     * 체크박스 단일 선택
     * @param checked
     * @param id
     */
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가

            let newArr = checkItems;
            newArr.push(id);

            newArr = newArr.filter((element, index) => {
                return newArr.indexOf(element) === index;
            });

            console.log([...newArr]);
            setCheckItems(newArr);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    /**
     * 체크박스 전체 선택
     * @param checked
     */
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            // boardList.forEach((el) => idArray.push(el.institution_idx));
            boardList.forEach((el) => idArray.push(el.work_idx));

            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    /**
     * 페이지네이션 이동
     * @param e
     * @param value
     */
    const handleChange = (e, value) => {
        getBoardList(value, 10, searchKeyword.current.value);
        setPage(value);
    };

    /**
     * 신규 등록 모달
     */
    const regBoard = () => {
        setModalTitle("갤러리 신규 등록");
        setIsOpen(true);
    };

    /**
     * 삭제
     */
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

    /**
     * 삭제
     * @returns {Promise<void>}
     */
    const removeBoard = async () => {
        let checkItemsStr = checkItems.join();
        setIsSpinner(true);

        const url = `${apiPath.api_delete_gallery}${checkItemsStr}`;

        const restParams = {
            method: "delete",
            url: url,
            data: {},
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            const result_code = res.headers.result_code;
            if (result_code === successCode.success) {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "삭제가 완료 되었습니다",
                    callback: () => pageUpdate(),
                });
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "잠시 후 다시 시도해주세요",
                });
            }

            const pageUpdate = () => {
                setCheckItems([]);
                handleNeedUpdate();
            };
        };
    };

    /**
     * 상세보기 모달
     */
    const modBoard = () => {
        setModalTitle("참가자 상세보기");
        setIsOpen(true);
    };

    /**
     * 상세
     * @param work_idx
     */
    const detailBoard = (work_idx) => {
        setIsSpinner(true);

        const url = apiPath.api_detail_gallery + work_idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            admin: "Y",
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

    /**
     * QR 코드 핸들러
     */
    const qrModalHandler = () => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_qrcodes;
        const data = {
            qr_type: "100", // 인물정보 : 000, 작품정보: 100
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            admin: "Y",
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            if (res.headers.result_code === successCode.success) {
                const result_info = res.data.result_info;
                setModDataQr(result_info);

                // console.log(res);
                modBoardQr();

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

    /**
     * QR 모달
     */
    const modBoardQr = () => {
        setModalTitleQr("갤러리 QR-CODE LIST");
        setIsOpenQr(true);
    };

    /**
     * QR 모달 닫기
     */
    const handleModalCloseQr = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "입력된 정보가 초기화 됩니다. 창을 닫으시겠습니까?",
            callback: () => close(),
        });

        const close = () => {
            setModalTitleQr("");
            setModDataQr({});
            setIsOpenQr(false);
        };
    };

    // --------------------------------- 테이블 세팅 -------------------------------------

    // 컬럼 세팅
    const columns = useMemo(() => [
        {
            accessorKey: "work_idx",
            cell: (info) => (
                <input
                    type="checkbox"
                    name={`work_idx_${info.getValue()}`}
                    id={info.getValue()}
                    value={info.getValue()}
                    onChange={(e) =>
                        handleSingleCheck(e.target.checked, info.getValue())
                    }
                    checked={checkItems.includes(info.getValue())}
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

        columnHelper.accessor(
            (row) => (
                <>
                    <img
                        loading="lazy"
                        src={
                            row.thumbnail_info.length !== 0
                                ? apiPath.api_file +
                                  row.thumbnail_info[0].file_path_enc
                                : "img/web/sub/default_full.jpg"
                        }
                        alt=""
                        style={{ width: "100px" }}
                    />
                </>
            ),
            {
                id: "thumbnail_info",
                cell: (info) => info.getValue(),
                header: "작품",
                enableSorting: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) => (
                <>
                    {row.main_title_ko}
                    <br />
                    {`(${row.main_title_en})`}
                    {(row.sub_title_ko || row.sub_title_en) && (
                        <>
                            <br />
                            <br />
                            {row.sub_title_ko ?? ""}
                            <br />
                            {`(${row.sub_title_en ?? ""})`}
                        </>
                    )}
                </>
            ),
            {
                id: "main_title_ko",
                cell: (info) => info.getValue(),
                header: "작품제목",
                enableSorting: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) => (
                <>
                    {row.name_ko}
                    <br />
                    {`(${row.name_en})`}
                </>
            ),
            {
                id: "name",
                cell: (info) => info.getValue(),
                header: "작가명",
                enableSorting: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) =>
                row.art_type && (
                    <>
                        {row.art_type.split("(")[0]}
                        <br />
                        {"(" + row.art_type.split("(")[1]}
                    </>
                ),
            {
                id: "art_type",
                cell: (info) => info.getValue(),
                header: "미술 구분",
                sortingFn: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) =>
                row.paint_type && (
                    <>
                        {row.paint_type.split("(")[0]}
                        <br />
                        {"(" + row.paint_type.split("(")[1]}
                    </>
                ),
            {
                id: "paint_type",
                cell: (info) => info.getValue(),
                header: "질감 구분",
                sortingFn: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) =>
                row.participate_type && (
                    <>
                        {row.participate_type.split("(")[0]}
                        <br />
                        {"(" + row.participate_type.split("(")[1]}
                    </>
                ),
            {
                id: "participate_type",
                cell: (info) => info.getValue(),
                header: "참여 구분",
                sortingFn: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) =>
                row.comment_info && (
                    <>
                        {row.comment_info.length}
                    </>
                ),
            {
                id: "comment_info",
                cell: (info) => info.getValue(),
                header: "댓글수",
                sortingFn: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor(
            (row) =>
                row.reg_dttm && (
                    <>
                        {row.reg_dttm.split(" ")[0]}
                        <br />
                        {row.reg_dttm.split(" ")[1]}
                    </>
                ),
            {
                id: "reg_dttm",
                cell: (info) => info.getValue(),
                header: "등록일",
                sortingFn: "alphanumericCaseSensitive",
            },
        ),

        columnHelper.accessor((row) => <img src={row.qr_img} alt="" />, {
            id: "qr_img",
            cell: (info) => info.getValue(),
            header: "QR",
            enableSorting: false,
        }),

        columnHelper.accessor(
            (row) => (
                <Link
                    to=""
                    className="tablebtn"
                    onClick={() => detailBoard(row.work_idx)}
                >
                    상세보기
                </Link>
            ),
            {
                id: "viewDetail",
                cell: (info) => info.getValue(),
                header: "상세보기",
                enableSorting: false,
            },
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
                    <h3>갤러리 관리 - 갤러리</h3>
                </div>

                <div className="con_area">
                    {/*검색 바*/}
                    <SearchBar
                        searchKeyword={searchKeyword}
                        doSearch={doSearch}
                        regBoard={regBoard}
                        // downloadExcel={downloadExcel}
                        clickRemove={clickRemove}
                    />

                    <div
                        className="sub_search_bar"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                        }}
                    >
                        <Link
                            to=""
                            className="subbtn on"
                            onClick={qrModalHandler}
                        >
                            갤러리 전체 QR 리스트
                        </Link>
                    </div>

                    <div
                        style={{
                            width: "100%",
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
                                <col width="*" />
                                <col width="13%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="7%" />
                                <col width="5%" />
                                <col width="8%" />
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
                                                                header.getContext(),
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
                                                            cell.getContext(),
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
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"GalleryManageModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
            <CommonModal
                isOpen={isOpenQr}
                title={modalTitleQr}
                width={"1400"}
                handleModalClose={handleModalCloseQr}
                component={"QrListModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modData={modDataQr}
            />
        </>
    );
};

export default GalleryMain;
