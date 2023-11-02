import axios from "axios";

let ip;
let token;

// 인스턴스 타임아웃
const timeOut = 20000;

// Header Prefix
const prefix = "Showcase"

/*
    REST CONNECTION 시 Request 를 가로채서
    request.headers 를 셋팅한다.

    ex)
    Jobara-Src = : 0.0.0.0
    Jobara-Token = JEJUJOBARA xxxxxxxxxxxxxxx

*/

// application/json
const Instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        // "Content-Type": "text/plain",
    },
    timeout: timeOut,
});

Instance.interceptors.request.use(
    (config) => {
        setInterceptors(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// application/json
// admin
const Instance_admin = axios.create({
    headers: {
        "Content-Type": "application/json",
        // "Content-Type":
        //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8",
    },
    timeout: timeOut,
});

Instance_admin.interceptors.request.use(
    (config) => {
        setInterceptorsAdmin(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// multipart/form-data
const Instance_multi = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    },
    timeout: timeOut,
});

Instance_multi.interceptors.request.use(
    (config) => {
        setInterceptors(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// multipart/form-data
// admin
const Instance_admin_multi = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    },
    timeout: timeOut,
});

Instance_admin_multi.interceptors.request.use(
    (config) => {
        setInterceptorsAdmin(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const setInterceptors = (config) => {
    const recoilSession = JSON.parse(sessionStorage.getItem("recoilSession"));

    ip =
        recoilSession === null
            ? sessionStorage.getItem("ipInfo")
            : recoilSession.ipInfo;
    token = recoilSession === null ? "" : recoilSession.userToken;

    config.headers[`${prefix}-Src`] = ip ? ip : "";
    config.headers[`${prefix}-Token`] = token ? token : "";

    return config;
};

const setInterceptorsAdmin = (config) => {
    const recoilSession = JSON.parse(sessionStorage.getItem("recoilSession"));

    ip =
        recoilSession === null
            ? sessionStorage.getItem("ipInfo")
            : recoilSession.ipInfo;
    token = recoilSession === null ? "" : recoilSession.userTokenAdmin;

    config.headers[`${prefix}-Src`] = ip ? ip : "";
    config.headers[`${prefix}-Token`] = token ? token : "";

    return config;
};

export { Instance, Instance_multi, Instance_admin, Instance_admin_multi };
