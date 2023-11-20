import React from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";

const PhotoBoardMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const isRefresh = props.isRefresh;

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>포토 갤러리</h3>
                </div>
            </div>
        </>
    );
};

export default PhotoBoardMain;
