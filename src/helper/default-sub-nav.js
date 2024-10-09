module.exports = () =>{
    return  {
        navTabs:[
            {
                name: "Quản lý phòng",
                icon: "bi bi-journal",
                url: "/sub/room",
                children: []
            },
            {
                name: "Quản lý đặt phòng",
                icon: "bi bi-journal-text",
                url: "/sub/booking",
                children: []
            },
            {
                name: "Quản lý giảm giá",
                icon: "bi bi-calendar-event",
                url: "/sub/discount",
                children: []
            },
            {
                name: "Quản lý khách hàng",
                icon: "bi bi-circle",
                url: "/sub/customer",
                children: []
            },

            {
                name: "Quản lý đánh giá",
                icon: "bi bi-star",
                url: "/sub/review",
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