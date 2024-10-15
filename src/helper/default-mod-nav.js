module.exports = () => {
    return {
        navTabs: [
            {
                name: "Quản lý địa điểm thành phố",
                icon: "bi bi-journal",
                url: "/mod/city",
                children: []
            },
            {
                name: "Quản lý đăng ký khách sạn",
                icon: "bi bi-journal",
                url: "/mod/hotel",
                children: []
            },
            {
                name: "Đăng xuất",
                icon: "bi bi-box-arrow-left",
                url: "/log-out",
                children: []
            },
        ]
    }
}