// 사전등록 idx
const registration_idx = "2";

// 썸네일 formData append
const imageResizeOptions = {
    maxSizeMB: 0.25,
    useWebWorker: true,
    preserveExif: true,
};

// 게시판 유형 (board_type)
const boardType = {
    notice: "050",
    consulting: "150",
    guestBook: "250",
    etc: "900"
}

export { registration_idx, imageResizeOptions, boardType };
