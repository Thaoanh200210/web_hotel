module.exports = () =>{
    return  {
        navTabs:[
            {
                name: "Thống kê",
                icon: "bi bi-gear-wide",
                url: "/manager/statistical",
                children: []
            },
            {
                name: "Quản lý khách sạn",
                icon: "bi bi-journal",
                url: "/manager/hotel",
                children: []
            },
            {
                name: "Quản lý phòng",
                icon: "bi bi-journal",
                url: "/manager/room",
                children: []
            },
            {
                name: "Quản lý đặt phòng",
                icon: "bi bi-journal-text",
                url: "/manager/booking",
                children: []
            },
            {
                name: "Quản lý sự kiện",
                icon: "bi bi-calendar-event",
                url: "/manager/event",
                children: []
            },
            {
                name: "Quản lý giảm giá",
                icon: "bi bi-calendar-event",
                url: "/manager/discount",
                children: []
            },
            {
                name: "Cơ sở vật chất",
                icon: "bi bi-journal-text",
                url: "/manager/service",
                children: []
            },
            {
                name: "Quản lý loại phòng",
                icon: "bi bi-calendar-event",
                url: "/manager/type_room",
                children: []
            },
            {
                name: "Hình thức thanh toán",
                icon: "bi bi-star",
                url: "/manager/selection",
                children: []
            },
            {
                name: "Quản lý dịch vụ",
                icon: "bi bi-calendar-event",
                url: "/manager/service_hotel",
                children: []
            },
            {
                name: "Quản lý người dùng",
                icon: "bi bi-person-circle",
                url: "#",
                children: [
                    {
                        name: "Quản lý nhân viên",
                        icon: "bi bi-circle",
                        url: "/manager/user/employee",
                        children: []
                    },
                    {
                        name: "Quản lý khách hàng",
                        icon: "bi bi-circle",
                        url: "/manager/user/customer",
                        children: []
                    },
                ]
            },
            {
                name: "Quản lý đánh giá",
                icon: "bi bi-star",
                url: "/manager/review",
                children: []
            },
            {
                name: "Đăng xuất",
                icon: "bi bi-box-arrow-left",
                url: "",
                children: []
            },
        ]
    }
}