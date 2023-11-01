// import MainContentsInfo from "./contents/MainContentsInfo";
import MainContentsNoti from "./contents/MainContentsNoti";
import MainContentsProgram from "./contents/MainContentsProgram";
import MainContentsTalk from "./contents/MainContentsTalk";

const MainContents = () => {
    const isDeveloping = process.env.REACT_APP_ISDEVELOPING;

    return (
        <>
            <div id="container">
                {/* 인포 */}
                {/* <MainContentsInfo /> */}
                {/* 응원 댓글 */}
                <MainContentsTalk />
                {/* 프로그램, 참여기업 */}
                <MainContentsProgram />
                {/* 공지사항 */}
                <MainContentsNoti />
            </div>
        </>
    );
};

export default MainContents;
