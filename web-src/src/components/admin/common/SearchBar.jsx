import React from "react";
import { Link } from "react-router-dom";

const SearchBar = (props) => {
    const searchKeyword = props.searchKeyword;
    const doSearch = props.doSearch;
    const regBoard = props.regBoard;
    const clickRemove = props.clickRemove;

    return (
        <>
            <div className="adm_search">
                <div>
                    {/* <select name="" id="">
                                        <option value="">구분</option>
                                        <option value="">이름</option>
                                        <option value="">소속</option>
                                    </select> */}
                    <input type="text" className="input" ref={searchKeyword} />
                    <Link to="" className="subbtn off" onClick={doSearch}>
                        검색
                    </Link>
                </div>
                <div className="btn_box btn_right" style={{ margin: 0 }}>
                    <Link to="" className="subbtn on" onClick={regBoard}>
                        등록
                    </Link>
                    <Link to="" className="subbtn del" onClick={clickRemove}>
                        삭제
                    </Link>
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
        </>
    );
};

export default SearchBar;
