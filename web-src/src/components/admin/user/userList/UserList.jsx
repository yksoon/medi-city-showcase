import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    CommonConsole,
    CommonErrModule,
    CommonModal,
    CommonNotify,
    CommonRest,
} from "common/js/Common";
import { apiPath } from "webPath";
import { Pagination } from "@mui/material";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { successCode } from "resultCode";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";

const UserList = (props) => {
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [userList, setUserList] = useState([]);
    const [modUserData, setModUserData] = useState(null);
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [checkItems, setCheckItems] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const { confirm } = useConfirm();
    const fileBaseUrl = apiPath.api_file;
    const [additionalList, setAdditionalList] = useState([]);

    const searchKeyword = useRef(null);

    const isRefresh = props.isRefresh;

    useEffect(() => {
        getAdditional();
    }, []);

    useEffect(() => {
        reqUserList(1, 10, "");
    }, [isNeedUpdate, isRefresh]);

    const handleNeedUpdate = () => {
        setIsNeedUpdate(!isNeedUpdate);
    };

    const handleModalClose = () => {
        setModUserData(null);
        setIsOpen(false);
    };

    const regUser = () => {
        setModalTitle("사전등록");
        setIsOpen(true);
    };

    // 참여프로그램 리스트 받아오기
    const getAdditional = () => {
        // /v1/meta/_additionals
        // GET
        const restParams = {
            method: "get",
            url: apiPath.api_get_additional,
            data: {},
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            console.log(res);

            const result_code = res.headers.result_code;
            // 성공
            if (result_code === successCode.success) {
                let result_info = res.data.result_info;

                setAdditionalList(result_info);
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

    // 유저 리스트
    const reqUserList = (pageNum, pageSize, searchKeyword) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );
        setIsSpinner(true);

        // /v1/user/infos
        // POST
        const url = apiPath.api_admin_user_infos;
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

        const responsLogic = (res) => {
            let result_code = res.headers.result_code;

            // 성공
            if (
                result_code === successCode.success ||
                result_code === successCode.noData
            ) {
                let result_info = res.data.result_info;
                let page_info = res.data.page_info;

                setUserList(result_info);
                setPageInfo(page_info);

                setIsSpinner(false);
                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);

                // dispatch(
                //     set_spinner({
                //         isLoading: false,
                //     })
                // );
            }
        };
    };

    // 회원 정보 수정
    const modUser = (user_idx) => {
        // dispatch(
        //     set_spinner({
        //         isLoading: true,
        //     })
        // );
        setIsSpinner(true);

        let userIdx = String(user_idx);

        // account/v1/user/info/{user_idx}
        // GET
        const url = apiPath.api_admin_user_info + `/${userIdx}`;
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

                setModUserData(result_info);

                setModalTitle("사전등록 수정");
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

    // 회원 선택 삭제
    // const clickRemove = () => {
    //     //선택여부 확인
    //     checkItems.length === 0
    //         ? CommonNotify({
    //               type: "alert",
    //               hook: alert,
    //               message: "사용자를 선택해주세요",
    //           })
    //         : CommonNotify({
    //               type: "confirm",
    //               hook: confirm,
    //               message: "선택된 사용자를 삭제 하시겠습니까?",
    //               callback: () => removeUser(),
    //           });
    // };

    // 삭제 confirm callback
    // const removeUser = () => {
    //     let checkItemsStr = checkItems.join();

    //     dispatch(
    //         set_spinner({
    //             isLoading: true,
    //         })
    //     );

    //     // account/v1/user/user/{user_idx}
    //     // DELETE
    //     const url = apiPath.api_admin_user_remove + `/${checkItemsStr}`;
    //     const data = {};

    //     RestServer("delete", url, data)
    //         .then((response) => {
    //             let res = response;
    //             let result_code = res.headers.result_code;
    //             let result_info = res.data.result_info;

    //             // 성공
    //             if (result_code === "0000") {
    //                 dispatch(
    //                     set_spinner({
    //                         isLoading: false,
    //                     })
    //                 );

    //                 CommonNotify({
    //                     type: "alert",
    //                     hook: alert,
    //                     message: response.headers.result_message_ko,
    //                 });

    //                 handleNeedUpdate();
    //             }
    //             // 에러
    //             else {
    //                 CommonConsole("log", response);

    //                 dispatch(
    //                     set_spinner({
    //                         isLoading: false,
    //                     })
    //                 );

    //                 CommonNotify({
    //                     type: "alert",
    //                     hook: alert,
    //                     message: response.headers.result_message_ko,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             CommonErrorCatch(error, dispatch, alert);
    //         });
    // };

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
            userList.forEach((el) => idArray.push(el.user_idx));
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        const keyword = searchKeyword.current.value;

        reqUserList(value, 10, keyword);
    };

    // 검색
    const doSearch = () => {
        const keyword = searchKeyword.current.value;

        reqUserList(1, 10, keyword);
    };

    // 검색 input 엔터키
    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            doSearch(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>사전등록 리스트</h3>
                </div>
                <div className="con_area">
                    <div className="adm_search">
                        <div>
                            {/* <select name="" id="">
                                <option value="">구분</option>
                                <option value="">이름</option>
                                <option value="">소속</option>
                            </select>{" "} */}
                            <input
                                type="text"
                                className="input"
                                ref={searchKeyword}
                                onKeyDown={(e) => handleOnKeyPress(e)} // Enter 입력 이벤트 함수
                            />{" "}
                            <Link className="btn btn02" onClick={doSearch}>
                                검색
                            </Link>
                        </div>
                        <div>
                            <Link className="btn btn01" onClick={regUser}>
                                임의등록
                            </Link>
                            {/* <a href="" class="btn btn01">엑셀 다운로드</a> */}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                        }}
                    >
                        총 : <b>&nbsp;{pageInfo && pageInfo.total}&nbsp;</b> 명
                    </div>
                    <div className="adm_table">
                        <table className="table_a">
                            <colgroup>
                                <col width="2%" />
                                {/* <col width="4%" /> */}
                                <col width="6%" />
                                <col width="5%" />
                                <col width="7%" />
                                <col width="6%" />
                                <col width="6%" />
                                <col width="8%" />
                                <col width="6%" />
                                <col width="6%" />
                                <col width="8%" />
                                <col width="8%" />
                                <col width="8%" />
                                <col width="6%" />
                                <col width="6%" />
                                <col width="6%" />
                                <col width="6%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th rowSpan="2">
                                        <input
                                            type="checkbox"
                                            name="select-all"
                                            onChange={(e) =>
                                                handleAllCheck(e.target.checked)
                                            }
                                            checked={
                                                checkItems &&
                                                userList &&
                                                checkItems.length ===
                                                    userList.length
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </th>
                                    {/* <th rowSpan="2">고유번호</th> */}
                                    <th rowSpan="2">ID</th>
                                    <th rowSpan="2">이름</th>
                                    <th rowSpan="2">연락처</th>
                                    <th rowSpan="2">생년월일</th>
                                    <th rowSpan="2">학번</th>
                                    <th rowSpan="2">학교</th>
                                    <th rowSpan="2">학과</th>
                                    <th rowSpan="2">희망직종</th>
                                    <th colSpan={`${additionalList.length}`}>
                                        참여프로그램
                                    </th>
                                    <th rowSpan="2">등록일</th>
                                    <th rowSpan="2">이력서 보기</th>
                                    <th rowSpan="2">정보수정</th>
                                </tr>
                                <tr>
                                    {additionalList.map((item, idx) => (
                                        <th
                                            key={`admin_additional_${idx}`}
                                            style={{
                                                borderRight: "1px solid #ddd",
                                            }}
                                        >
                                            {item.additional_name_ko}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {userList.length !== 0 ? (
                                    userList.map((item, idx) => (
                                        <tr key={`list_${idx}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name={`userIdx_${item.user_idx}`}
                                                    id={item.user_idx}
                                                    defaultValue={item.user_idx}
                                                    onChange={(e) =>
                                                        handleSingleCheck(
                                                            e.target.checked,
                                                            item.user_idx
                                                        )
                                                    }
                                                    checked={
                                                        checkItems.includes(
                                                            item.user_idx
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </td>
                                            {/* <td>{item.user_key}</td> */}
                                            <td>{item.user_id}</td>
                                            <td>{item.user_name_ko}</td>
                                            <td>{`${item.mobile1}-${item.mobile2}-${item.mobile3}`}</td>
                                            <td>
                                                {item.birth_yyyy === null
                                                    ? "-"
                                                    : `${item.birth_yyyy}-${item.birth_mm}-${item.birth_dd}`}
                                            </td>
                                            <td>{item.user_memo}</td>
                                            <td>
                                                {item.organization_name_ko
                                                    ? item.organization_name_ko
                                                    : "-"}
                                            </td>
                                            <td>
                                                {item.department_name_ko
                                                    ? item.department_name_ko
                                                    : "-"}
                                            </td>
                                            <td>
                                                {item.specialized_name_ko
                                                    ? item.specialized_name_ko
                                                    : "-"}
                                            </td>
                                            {additionalList.map(
                                                (item2, idx2) => (
                                                    <td
                                                        className="checkicon"
                                                        key={`add_chk_${idx2}`}
                                                    >
                                                        {item.additional_info.filter(
                                                            (e) =>
                                                                e.additional_idx ===
                                                                item2.additional_idx
                                                        ).length !== 0 ? (
                                                            <CheckCircleOutlineOutlinedIcon />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </td>
                                                )
                                            )}
                                            <td>
                                                {item.reg_dttm
                                                    ? item.reg_dttm.split(
                                                          " "
                                                      )[0]
                                                    : "-"}
                                            </td>
                                            <td className="filebtn">
                                                {item.file_info !== 0 &&
                                                    item.file_info.map(
                                                        (item2, idx2) => (
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
                                                            </Link>
                                                        )
                                                    )}
                                                {/* <img
                                                    src="img/common/file.svg"
                                                    alt=""
                                                /> */}
                                            </td>
                                            <td>
                                                <Link
                                                    className="tablebtn"
                                                    onClick={(e) => {
                                                        modUser(item.user_idx);
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
                                                colSpan="16"
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
                    {userList.length !== 0 ? (
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
                component={"RegUserModalMain"}
                handleNeedUpdate={handleNeedUpdate}
                modUserData={modUserData}
            />
        </>
    );
};

export default UserList;
