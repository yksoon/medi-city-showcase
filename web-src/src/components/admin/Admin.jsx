import { CommonErrModule, CommonRest, CommonSpinner } from "common/js/Common";
import SideNav from "components/admin/nav/SideNav";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiPath, routerPath } from "webPath";
import { successCode } from "resultCode";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    isSpinnerAtom,
    pageAtom,
    userInfoAdminAtom,
    userTokenAdminAtom,
} from "recoils/atoms";
import ConsultingBoardMain from "components/admin/board/consultingBoard/ConsultingBoardMain";
import RegistraionManageMain from "components/admin/registration/registrationManage/RegistraionManageMain";
import EntryManageMain from "components/admin/registration/entryManage/EntryManageMain";
import PopupManageMain from "components/admin/popupManage/PopupManageMain";
import GuestBookBoardMain from "components/admin/board/guestBook/GuestBookBoardMain";
import ArtistManageMain from "components/admin/gallery/artist/ArtistManageMain";
import NoticeBoardMain from "components/admin/board/notice/NoticeBoardMain";
import VideoBoardMain from "components/admin/board/videoBoard/VideoBoardMain";
import GalleryMain from "components/admin/gallery/gallery/GalleryMain";

const Admin = () => {
    const err = CommonErrModule();
    const isSpinner = useRecoilValue(isSpinnerAtom);
    const [isRefresh, setIsRefresh] = useState(false);

    const navigate = useNavigate();

    const userTokenAdmin = useRecoilValue(userTokenAdminAtom);
    const userInfoAdmin = useRecoilValue(userInfoAdminAtom);

    // recoil
    const [page, setPage] = useRecoilState(pageAtom);

    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        if (!userTokenAdmin) {
            navigate(routerPath.admin_signin_url);
        } else {
            requestMenu();
        }
    }, []);

    const requestMenu = () => {
        // 메뉴 리스트 호출
        // /v1/menus
        // GET
        const url = apiPath.api_admin_menus;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y", // 어드민일때 이 값을 넣으세요~
        };

        CommonRest(restParams);

        const responsLogic = (res) => {
            const result_code = res.headers.result_code;
            let resData = [];

            if (result_code === successCode.success) {
                resData = res.data.result_info;

                createMenuList(resData);
            }
        };
    };

    const createMenuList = (menuData) => {
        let menuArr = [];
        let depth1 = [];
        let depth2 = [];
        let depth3 = [];

        menuData.map((item) => {
            let menuOnce = {};

            menuOnce["title"] = item.menu_name_ko;
            menuOnce["page"] = item.menu_path ? item.menu_path : "";
            menuOnce["child"] = [];
            menuOnce["menu_code"] = Number(item.menu_code);

            if (item.menu_depth === 0) {
                depth1.push(menuOnce);
            } else if (item.menu_depth === 1) {
                depth2.push(menuOnce);
            } else {
                depth3.push(menuOnce);
            }
            return item;
        });

        depth2.map((item2) => {
            depth3.map((item3) => {
                if (
                    item3.menu_code > item2.menu_code &&
                    item3.menu_code < item2.menu_code + 100
                ) {
                    depth2
                        .find((e) => e.menu_code === item2.menu_code)
                        .child.push(item3);
                }

                return item3;
            });

            return item2;
        });

        depth1.map((item1) => {
            depth2.map((item2) => {
                if (
                    item2.menu_code > item1.menu_code &&
                    item2.menu_code < item1.menu_code + 1000
                ) {
                    depth1
                        .find((e) => e.menu_code === item1.menu_code)
                        .child.push(item2);
                }

                return item2;
            });

            return item1;
        });

        menuArr = depth1;
        setMenuList(menuArr);
    };

    const switchPage = (page) => {
        setIsRefresh(!isRefresh);
        setPage(page);
    };

    // 렌더링 페이지
    const renderPage = (page) => {
        switch (page) {
            
            // 사전등록관리 - 사전등록
            case "registrationMng":
                return <RegistraionManageMain isRefresh={isRefresh} />;

            // 사전등록관리 - 참가자관리
            case "entryMng":
                return <EntryManageMain isRefresh={isRefresh} />;

            // 게시판관리 - 공지사항
            case "noticeBoard":
                return <NoticeBoardMain isRefresh={isRefresh} />;

            // 게시판관리 - 상담문의
            case "consultingBoard":
                return <ConsultingBoardMain isRefresh={isRefresh} />;

            // 게시판관리 - 방명록
            case "guestBookBoard":
                return <GuestBookBoardMain isRefresh={isRefresh} />;

            // 게시판관리 - 영상갤러리
            case "movieBoard":
                return <VideoBoardMain isRefresh={isRefresh} />;

            // 갤러리관리 - 아티스트
            case "artistMng":
                return <ArtistManageMain isRefresh={isRefresh} />;

            // 갤러리관리 - 갤러리
            case "galleryMng":
                return <GalleryMain isRefresh={isRefresh} />;

            // 팝업관리
            case "popupMng":
                return <PopupManageMain isRefresh={isRefresh} />;

            default:
                return <EntryManageMain isRefresh={isRefresh} />;
        }
    };
    return (
        <>
            <div className="wrap">
                <div className="admin">
                    {userInfoAdmin && (
                        <SideNav
                            userInfoAdmin={userInfoAdmin}
                            switchPage={switchPage}
                            menuList={menuList}
                        />
                    )}
                    {renderPage(page)}
                </div>
            </div>
            {isSpinner && <CommonSpinner />}
        </>
    );
};

export default Admin;
