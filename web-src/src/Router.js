import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { routerPath } from "webPath";
import { Suspense } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import NotFoundPage from "NotFoundPage";
import Admin from "components/admin/Admin";
import SignIn from "components/admin/signin/SignIn";
import Forbidden from "Forbidden";
import Program from "components/web/program/Program";
import Guideline from "components/web/participation/guideline/Guideline";
import SignUpMain from "components/web/signUp/signUp/SignUpMain";
import CheckEntryMain from "components/web/signUp/checkEntry/CheckEntryMain";
import ArtbuddyGalleryMain from "components/web/artbuddy/gallery/ArtbuddyGalleryMain";
import ArtbuddyExhibitionMain from "components/web/artbuddy/exhibition/ArtbuddyExhibitionMain";
import ArtbuddyGalleryListMain from "components/web/artbuddy/gallery/ArtbuddyGalleryListMain";
import MainPopupModal from "components/web/main/mainComponents/mainContentsComponents/modal/MainPopupModal";
import SignUpIndonesia from "components/web/indonesiaSignup/signup/SignUpIndonesia";
import CheckEntryIndonesia from "components/web/indonesiaSignup/checkEntry/CheckEntryIndonesia";
import GuidelineIndonesia from "components/web/indonesiaSignup/guideline/GuidelineIndonesia";
import GuestBookMain from "components/web/guestBook/GuestBookMain";

// Router
const Router = () => {
    // 레이지 로딩 추가
    const Main = React.lazy(() => import("components/web/Main"));

    // 페이지 url 라우팅 추가 필요시 아래에 추가하세요
    return (
        <>
            {/* Route 밖에 Suspense로 감싼다 */}
            <Suspense
                fallback={
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            >
                <Routes>
                    {/* /link를 입력하면 LinkPage 오픈 */}
                    {/* -------------------------------web------------------------------- */}
                    {/* 메인 */}
                    {/* URL : / */}
                    <Route path={routerPath.web_main_url} element={<Main />} />

                    {/* 메인 팝업 */}
                    {/* URL : /popup/:id */}
                    <Route
                        path={routerPath.web_popup_url + ":id"}
                        element={<MainPopupModal />}
                    />

                    {/* 프로그램 */}
                    {/* URL : /program */}
                    <Route
                        path={routerPath.web_program_url}
                        element={<Program />}
                    />

                    {/* 가이드라인 */}
                    {/* URL : /participation/guideline */}
                    <Route
                        path={routerPath.web_participation_guideline_url}
                        element={<Guideline />}
                    />

                    {/* 사전등록 */}
                    {/* URL : /signup/signup */}
                    <Route
                        path={routerPath.web_signup_signup_url}
                        element={<SignUpMain />}
                        // render={() => <SignUpMain />}
                    />

                    {/* 사전등록 참가자 확인 */}
                    {/* URL : /signup/check_entry */}
                    <Route
                        path={routerPath.web_signup_check_entry_url}
                        element={<CheckEntryMain />}
                    />

                    {/* 사전등록 확인 */}
                    {/* URL : /signup/confirmation */}
                    <Route
                        path={routerPath.web_signup_confirmation_url}
                        element={<SignUpMain />}
                    />

                    {/* 아트버디 - 갤러리 */}
                    {/* URL : /artbuddy/gallery_list */}
                    <Route
                        path={routerPath.web_artbuddy_gallery_list_url}
                        element={<ArtbuddyGalleryListMain />}
                    />

                    {/* 아트버디 - 갤러리 */}
                    {/* URL : /artbuddy/gallery */}
                    <Route
                        path={routerPath.web_artbuddy_gallery_url}
                        element={<ArtbuddyGalleryMain />}
                    />

                    {/* 아트버디 - 소개 */}
                    {/* URL : /artbuddy/exhibition */}
                    <Route
                        path={routerPath.web_artbuddy_exhibition_url}
                        element={<ArtbuddyExhibitionMain />}
                    />

                    {/* 사전등록 - 인도네시아 */}
                    {/* URL : /local/signup */}
                    <Route
                        path={routerPath.web_local_signup_url}
                        element={<SignUpIndonesia />}
                    />

                    {/* 사전등록 참가자 확인 - 인도네시아 */}
                    {/* URL : /local/check_entry */}
                    <Route
                        path={routerPath.web_local_check_entry_url}
                        element={<CheckEntryIndonesia />}
                    />

                    {/* 사전등록 확인 - 인도네시아 */}
                    {/* URL : /signup/confirmation */}
                    <Route
                        path={routerPath.web_local_confirmation_url}
                        element={<SignUpIndonesia />}
                    />

                    {/* 가이드라인 - 인도네시아 */}
                    {/* URL : /local/guideline */}
                    <Route
                        path={routerPath.web_local_guideline_url}
                        element={<GuidelineIndonesia />}
                    />

                    {/* 방명록 */}
                    {/* URL : /guest_book */}
                    <Route
                        path={routerPath.web_guest_book_url}
                        element={<GuestBookMain />}
                    />

                    {/* -------------------------------admin------------------------------- */}
                    {/* 메인 */}
                    {/* URL : /admin */}
                    <Route
                        path={routerPath.admin_main_url}
                        element={<Admin />}
                    />

                    {/* 로그인 */}
                    {/* URL : /admin/signin */}
                    <Route
                        path={routerPath.admin_signin_url}
                        element={<SignIn />}
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default Router;
