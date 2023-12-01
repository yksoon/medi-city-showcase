import React, { useState } from "react";
import CountrySelect from "common/js/commonComponents/CountrySelect";
import CurrencySelect from "common/js/commonComponents/CurrencySelect";

const GalleryManageModalMain = () => {
    const [selectedCurrency, setSelectedCurrency] = useState("410");

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
