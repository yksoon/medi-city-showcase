import React from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";

const GuestBookBoardMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const isRefresh = props.isRefresh;

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>게시판 관리 - 방명록</h3>
                </div>
            </div>
        </>
    );
};

export default GuestBookBoardMain;
