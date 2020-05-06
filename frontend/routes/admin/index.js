import adminPages from "@/pages/admin";

export default  {
    name: "Admin",
    key: "web_app",
    prefix: "/admin",
    layout: {
        header: true
    },
    children: [
        {
            name: "Test Index",
            key: "test_index",
            path: "/",
            component: adminPages.Test,
            exact: true
        },
        {
            name: "Driver",
            key: "admin_driver_list",
            path: "/drivers",
            component: adminPages.Driver,
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
