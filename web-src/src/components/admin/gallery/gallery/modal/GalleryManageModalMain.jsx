import React, { useState } from "react";
import CountrySelect from "common/js/commonComponents/CountrySelect";
import CurrencySelect from "common/js/commonComponents/CurrencySelect";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule } from "common/js/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codesAtom, countryBankAtom, isSpinnerAtom } from "recoils/atoms";

const GalleryManageModalMain = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const countryBank = useRecoilValue(countryBankAtom);
    const codes = useRecoilValue(codesAtom);

    // 상세보기 데이터
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    // modal 컨트롤
    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    // select box options
    const [selectedCurrency, setSelectedCurrency] = useState("410");
    const [postType, setPostType] = useState([]);
    const [postStatus, setPostStatus] = useState([]);

    return (
        <>
            <CurrencySelect
                onChange={(e, value) => setSelectedCurrency(value)}
                defaultValue={selectedCurrency}
                mode={"full"}
            />
        </>
    );
};

export default GalleryManageModalMain;
