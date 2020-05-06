import webPages from "@/pages/web";
import ErrorPage from "@/pages/error";

export default  {
    name: "Admin",
    key: "admin_app",
    prefix: "",
    layout: {
        header: true
    },
    children: [
        {
            name: "Test Index",
            key: "test_index2",
            path: "/test",
            component: webPages.Test,
            //component: Pages.Index,
            exact: true
        },
        {
            name: "404 Error",
            key: "404_eror",
            path: "*",
            component: ErrorPage,
            //component: Pages.Index,
            exact: true
        },
        /*
        {
            name: "detail",
            key: "产品编辑",
            path: "/react-fe/ttd/product/detail/:id",
            component: Pages.ProductDetail
        }
        */
    ]
};
