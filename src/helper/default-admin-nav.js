module.exports = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); 

    return {
        navTabs: [
            {
                name: "Thống kê",
                icon: "bi bi-gear-wide",
                url: `/administrator/statistical?type=month&month=${currentYear}-${currentMonth}&quarter=${currentYear}-1&year=${currentYear}`,
                children: []
            },
            {
                name: "Quản lý địa điểm thành phố",
                icon: "bi bi-journal",
                url: "/administrator/city",
                children: []
            },
            {
                name: "Quản lý đăng ký khách sạn",
                icon: "bi bi-journal",
                url: "/administrator/hotel",
                children: []
            },
            {
                name: "Quản lý nhân viên",
                icon: "bi bi-person-circle",
                url: "/administrator/user",
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
                url: "/log-out",
                children: []
            },
        ]
    }
}
