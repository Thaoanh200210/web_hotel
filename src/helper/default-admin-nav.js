module.exports = () =>{
    return  {
        navTabs:[
            {
                name: "Thống kê",
                icon: "bi bi-gear-wide",
                url: "/administrator/statistical",
                children: []
            },
            
            {
                name: "Quản lý địa điểm",
                icon: "bi bi-journal",
                url: "/administrator/city",
                children: []
            },
            {
                name: "Quản lý khách sạn",
                icon: "bi bi-journal",
                url: "/administrator/hotel",
                children: []
            },
            {
                name: "Quản lý nhân viên",
                icon: "bi bi-journal",
                url: "/administrator/user",
                children: []
            },
            {
                name: "Quản lý dịch vụ",
                icon: "bi bi-journal-text",
                url: "/administrator/service",
                children: []
            },
            {
                name: "Quản lý loại phòng",
                icon: "bi bi-calendar-event",
                url: "/administrator/type_room",
                children: []
            },
            {
                name: "Quản lý lựa chọn",
                icon: "bi bi-star",
                url: "/administrator/selection",
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