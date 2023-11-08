// 콜론, slash
const colon = ":";
const slash = "/";

// 프로토콜
// 호스트
// 포트
// 버전
const protocol = "http://";

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

    // 행사소개
    // /intro/intro
    web_intro_url: `${base_url}intro/intro`,

    // 행사장소
    // /intro/location
    web_intro_location_url: `${base_url}intro/location`,

    // 행사일정
    // /program/program
    web_program_url: `${base_url}program/program`,

    // 세부프로그램
    // /program/detail
    web_program_detail_url: `${base_url}program/detail`,

    // 이벤트프로그램
    // /program/event
    web_program_event_url: `${base_url}program/event`,

    // notice
    // /notice/notice
    web_notice_url: `${base_url}notice/notice`,

    // 참여기업
    // /company/companydetail
    web_company_url: `${base_url}company/company`,

    // 참여기업 리스트
    // /company/companylist
    // web_company_list_url: `${base_url}company/companylist`,

    // 참여기업 상세
    // /company/companydetail
    // web_company_detail_url: `${base_url}company/detail`,

    // 회원가입
    // /signup
    web_signup_url: `${base_url}signup`,

    // 사전등록 확인
    // /signupchk
    web_signupchk_url: `${base_url}signupchk`,

    // 사전등록 수정
    // /signup_mod
    web_signup_mod_url: `${base_url}signup_mod`,

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

    // /v1/reg/user
    // PUT
    // 참가자관리 상세
    api_admin_mod_reg_users: `${
        base_api_url + slash + version + slash
    }reg/user`,

    // /v1/reg/user/{registration_idx}/{institution_idxs}
    // DELETE
    // 참가자관리 삭제
    api_admin_remove_reg_users: `${
        base_api_url + slash + version + slash
    }reg/user${slash}`,
};

export { routerPath, apiPath };
