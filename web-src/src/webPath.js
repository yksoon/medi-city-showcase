// 콜론, slash
const colon = ":";
const slash = "/";

// 프로토콜
// 호스트
// 포트
// 버전
const protocol = "https://";

const host = "gateway.hicompint.com";
// const host = "210.116.101.159";

const port = "60000";

const version = "v1";

const gateway = "showcase";

// 기본 url
// const base_url = protocol + host + colon + port + slash + version + slash;
const base_url = "/";
const base_api_url = protocol + host + colon + port + slash + gateway;
// const base_api_url = protocol + host + colon + port;
// const base_api_url = process.env.REACT_APP_DB_HOST;
// const base_api_url = "http://localhost:3005";
// "proxy": "http://jejujobara.com:60000"

// admin
const admin = "admin";

// route
const routerPath = {
    // ---------------------- web -------------------------
    // 메인
    // /
    web_main_url: `${base_url}`,

    // 메인 팝업
    // /popup/:id
    web_popup_url: `${base_url}popup${slash}`,

    // 프로그램
    // /program
    web_program_url: `${base_url}program`,

    // 가이드라인
    // /participation/guideline
    web_participation_guideline_url: `${base_url}participation/guideline`,

    // 사전등록
    // /signup/signup
    web_signup_signup_url: `${base_url}signup/signup`,

    // 사전등록 참가자 확인
    // /signup/check_entry
    web_signup_check_entry_url: `${base_url}signup/check_entry`,

    // 사전등록 확인
    // /signup/confirmation
    web_signup_confirmation_url: `${base_url}signup/confirmation`,

    // 아트버디 - 갤러리 리스트
    // /artbuddy/gallery_list
    web_artbuddy_gallery_list_url: `${base_url}artbuddy/gallery_list`,

    // 아트버디 - 갤러리 상세
    // /artbuddy/gallery
    web_artbuddy_gallery_url: `${base_url}artbuddy/gallery`,

    // 아트버디 - 소개
    // /artbuddy/exhibition
    web_artbuddy_exhibition_url: `${base_url}artbuddy/exhibition`,

    // 사전등록 - 인도네시아
    // /local/signup
    web_local_signup_url: `${base_url}local/signup`,

    // 사전등록 참가자 확인 - 인도네시아
    // /local/check_entry
    web_local_check_entry_url: `${base_url}local/check_entry`,

    // 사전등록 확인 - 인도네시아
    // /local/confirmation
    web_local_confirmation_url: `${base_url}local/confirmation`,

    // 가이드라인 - 인도네시아
    // /local/guideline
    web_local_guideline_url: `${base_url}local/guideline`,

    // 방명록
    // /guest_book
    web_guest_book_url: `${base_url}guest_book`,

    // ---------------------- admin -------------------------
    // 메인
    // /admin
    admin_main_url: `${base_url + admin}`,

    // 로그인
    // /admin/signin
    admin_signin_url: `${base_url + admin + slash}signin${slash}`,
};

// api
const apiPath = {
    // http://jejujobara.com:60000/auth/v1/signin

    // ------------------ Information ------------------

    // /v1/_codes
    // POST
    // 공통 코드
    api_codes: `${base_api_url + slash + version + slash}_codes`,
    // api_codes: `${slash + version + slash}_codes`,

    // /v1/info/result
    // GET
    // 공통 코드
    api_result: `${base_api_url + slash + version + slash}info/result`,
    // api_result: `${slash + version + slash}info/result`,

    // /v1/captcha/img
    // GET
    // 자동가입방지-이미지
    api_captcha_img: `${base_api_url + slash + version + slash}captcha/img`,
    // api_captcha_img: `${slash + version + slash}captcha/img`,

    // /v1/_file/000/
    // GET
    // 파일 다운로드
    api_file: `${base_api_url + slash + version + slash}_file/000/`,

    // ------------------ Auth ------------------

    // /v1/signin
    // POST
    // 로그인
    api_auth_signin: `${base_api_url + slash + version + slash}signin`,
    // api_auth_signin: `${slash + version + slash}signin`,

    // /v1/signout
    // POST
    // 로그아웃
    api_auth_signout: `${base_api_url + slash + version + slash}signout`,
    // api_auth_signout: `${slash + version + slash}signout`,

    // /v1/_user
    // POST(multi) 등록
    // PUT(multi) 수정
    api_auth_reg_user: `${base_api_url + slash + version + slash}_user`,
    // api_auth_reg_user: `${slash + version + slash}_user`,

    // ------------------ Refresh ------------------

    // /v1/refresh
    // POST
    // 토큰 리프레쉬
    api_refresh: `${base_api_url + slash + version + slash}refresh`,
    // api_refresh: `${slash + version + slash}refresh`,

    // ------------------ Menu Management ------------------

    // /v1/menus
    // GET
    // 메뉴 리스트
    api_admin_menus: `${base_api_url + slash + version + slash}menus`,
    // api_admin_menus: `${slash + version + slash}menus`,

    // ------------------ User Info Management API 사용자 정보 관리 API ------------------

    // /v1/user/infos
    // POST
    // 유저 리스트
    api_admin_user_infos: `${base_api_url + slash + version + slash}user/infos`,
    // api_admin_user_infos: `${slash + version + slash}user/infos`,

    // /v1/user/info/{user_idx}
    // POST
    // 유저 리스트
    api_admin_user_info: `${base_api_url + slash + version + slash}user/info`,
    // api_admin_user_info: `${slash + version + slash}user/info`,

    // /v1/user/_check
    // POST
    // 중복확인
    api_user_check: `${base_api_url + slash + version + slash}user/_check`,
    // api_user_check: `${slash + version + slash}user/_check`,

    // /v1/user/{user_idx}
    // GET
    // 유저 상세
    api_auth_user_idx: `${base_api_url + slash + version + slash}user/`,
    // api_auth_user_idx: `${slash + version + slash}user/`,

    // ------------------ Schedule API 스케줄 관리 API ------------------
    // /v1/schedules
    // GET
    // 스케줄 목록
    api_schedule_list: `${base_api_url + slash + version + slash}schedules`,
    // api_schedule_list: `${slash + version + slash}schedules`,

    // ------------------ Additional API 스케줄 관리 API ------------------
    // /v1/meta/_additionals
    // GET
    // 부가정보관리 목록
    api_get_additional: `${
        base_api_url + slash + version + slash
    }meta/_additionals`,
    // api_get_additional: `${slash + version + slash}meta/_additionals`,

    // ------------------ Dashboard API 대시보드 관리 API ------------------
    // /v1/dashboard
    // POST
    // 대시보드 목록
    api_admin_dashboard: `${base_api_url + slash + version + slash}dashboard`,

    // ------------------ Board API 게시판 관리 API ------------------
    // /v1/_boards
    // POST
    // 게시판 목록
    api_admin_boards: `${base_api_url + slash + version + slash}_boards`,

    // /v1/_board
    // POST MULTI
    // 게시판 등록
    api_admin_board: `${base_api_url + slash + version + slash}_board`,

    // /v1/board/{board_idx}
    // GET
    // 게시판 상세
    api_admin_get_board: `${
        base_api_url + slash + version + slash
    }board${slash}`,

    // /v1/board/
    // PUT MULTI
    // 게시판 수정
    api_admin_mod_board: `${base_api_url + slash + version + slash}board`,

    // /v1/board/
    // DELETE
    // 게시판 삭제
    api_admin_remove_board: `${
        base_api_url + slash + version + slash
    }board${slash}`,

    // /v1/board/_download
    // POST
    // 게시판 엑셀 다운로드
    api_admin_board_download: `${
        base_api_url + slash + version + slash
    }board/_download`,

    // /v1/_comment
    // POST MULTI
    // 문의 답변 등록
    api_admin_reg_comment: `${base_api_url + slash + version + slash}_comment`,

    // /v1/_comment
    // PUT MULTI
    // 문의 답변 등록
    api_admin_mod_comment: `${base_api_url + slash + version + slash}_comment`,

    // ------------------ Registration Management API 사전등록 관리 API ------------------
    // /v1/_regs
    // POST
    // 사전등록 목록
    api_admin_list_regs: `${base_api_url + slash + version + slash}_regs`,

    // /v1/reg
    // POST
    // 사전등록 등록
    api_admin_reg_regs: `${base_api_url + slash + version + slash}reg`,

    // /v1/_reg/{registration_idx}/
    // GET
    // 사전등록 등록
    api_admin_get_reg: `${base_api_url + slash + version + slash}_reg${slash}`,

    // /v1/reg
    // PUT
    // 사전등록 수정
    api_admin_mod_regs: `${base_api_url + slash + version + slash}reg`,

    // /v1/reg/{registration_idxs}
    // DELETE
    // 사전등록 삭제
    api_admin_delete_regs: `${
        base_api_url + slash + version + slash
    }reg${slash}`,

    // /v1/reg/_users
    // POST
    // 참가자관리 목록
    api_admin_list_reg_users: `${
        base_api_url + slash + version + slash
    }reg/_users`,

    // /v1/reg/_user/{registration_idx}/{institution_idx}
    // GET
    // 참가자관리 상세
    api_admin_detail_reg_users: `${
        base_api_url + slash + version + slash
    }reg/_user${slash}`,

    // /v1/reg/_user
    // POST
    // 참가자관리 등록
    api_admin_reg_reg_user: `${
        base_api_url + slash + version + slash
    }reg/_user`,

    // /v1/reg/user
    // PUT
    // 참가자관리 수정
    api_admin_mod_reg_user: `${base_api_url + slash + version + slash}reg/user`,

    // /v1/reg/user/{registration_idx}/{institution_idxs}
    // DELETE
    // 참가자관리 삭제
    api_admin_remove_reg_users: `${
        base_api_url + slash + version + slash
    }reg/user${slash}`,

    // /v1/reg/_confirm
    // POST
    // 참가자 확인
    api_admin_get_reg_confirm: `${
        base_api_url + slash + version + slash
    }reg/_confirm`,

    // ------------------ Popup Management API 팝업 관리 API ------------------
    // /v1/_popups
    // POST
    // 팝업 정보 목록
    api_admin_popups: `${base_api_url + slash + version + slash}_popups`,

    // /v1/_popup/{popup_idx}
    // GET
    // 팝업 정보 상세
    api_admin_get_popup: `${
        base_api_url + slash + version + slash
    }_popup${slash}`,

    // /v1/popup
    // POST MULTI
    // 팝업 정보 등록
    api_admin_reg_popup: `${base_api_url + slash + version + slash}popup`,

    // /v1/popup
    // PUT MULTI
    // 팝업 정보 수정
    api_admin_mod_popup: `${base_api_url + slash + version + slash}popup`,

    // /v1/popup/{popup_idxs}
    // DELETE
    // 팝업 정보 삭제
    api_admin_delete_popup: `${
        base_api_url + slash + version + slash
    }popup${slash}`,

    // ------------------ People Management API 인물 관리 API ------------------
    // /v1/peoples
    // POST
    // 아티스트 리스트
    api_admin_list_people: `${base_api_url + slash + version + slash}_peoples`,

    // /v1/people/{people_idx}/
    // GET
    // 아티스트 상세
    api_admin_detail_people: `${
        base_api_url + slash + version + slash
    }_people${slash}`,

    // /v1/people/{people_idx}/
    // DELETE
    // 아티스트 삭제
    api_admin_remove_people: `${
        base_api_url + slash + version + slash
    }people${slash}`,

    // /v1/people
    // POST
    // 아티스트 등록
    api_admin_add_people: `${base_api_url + slash + version + slash}people`,

    // /v1/people
    // PUT
    // 아티스트 수정
    api_admin_mod_people: `${base_api_url + slash + version + slash}people`,

    // /v1/qrcodes
    // POST
    // QR코드 리스트
    api_admin_get_qrcodes: `${base_api_url + slash + version + slash}qrcodes`,
};

export { routerPath, apiPath };
