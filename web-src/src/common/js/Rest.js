import {
    Instance,
    Instance_multi,
    Instance_admin,
    Instance_admin_multi,
    Instance_admin_file,
    Instance_file,
    Instance_admin_file_multi,
    Instance_multi_file,
} from "./Instance";

const RestServer = (method, url, data, admin, file) => {
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
                    ? file === "Y"
                        ? Instance_admin_file.post(url, data)
                        : Instance_admin.post(url, data)
                    : file === "Y"
                    ? Instance_file(url, data)
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
            const retMultiPost =
                admin === "Y"
                    ? file === "Y"
                        ? Instance_admin_file_multi.post(url, data)
                        : Instance_admin_multi.post(url, data)
                    : file === "Y"
                    ? Instance_multi_file.post(url, data)
                    : Instance_multi.post(url, data);
            return retMultiPost;

        case "put_multi":
            const retMultiPut =
                admin === "Y"
                    ? Instance_admin_multi.put(url, data)
                    : Instance_multi.put(url, data);
            return retMultiPut;

        default:
            break;
    }
};

export { RestServer };
