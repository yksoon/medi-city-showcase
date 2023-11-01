import {
    Instance,
    Instance_multi,
    Instance_admin,
    Instance_admin_multi,
} from "./Instance";

const RestServer = (method, url, data, admin) => {
    switch (method) {
        case "get":
            const retGet =
                admin === "Y"
                    ? Instance_admin.get(url, data)
                    : Instance.get(url, data);
            return retGet;

        case "post":
            const retPost =
                admin === "Y"
                    ? Instance_admin.post(url, data)
                    : Instance.post(url, data);
            return retPost;

        case "put":
            const retPut =
                admin === "Y"
                    ? Instance_admin.put(url, data)
                    : Instance.put(url, data);
            return retPut;

        case "delete":
            const retDelete =
                admin === "Y"
                    ? Instance_admin.delete(url, data)
                    : Instance.delete(url, data);
            return retDelete;

        case "post_multi":
            const retAdminPost =
                admin === "Y"
                    ? Instance_admin_multi.post(url, data)
                    : Instance_multi.post(url, data);
            return retAdminPost;

        case "put_multi":
            const retAdminPut =
                admin === "Y"
                    ? Instance_admin_multi.put(url, data)
                    : Instance_multi.put(url, data);
            return retAdminPut;

        default:
            break;
    }
};

export { RestServer };
