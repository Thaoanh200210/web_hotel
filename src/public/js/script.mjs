function userIsAuthenticated($event, userInfo){
    if(userInfo){
        $event.preventDefault();
        swal({
            title: "Kiểm tra đăng nhập",
            text: "Người dùng chưa đang nhập",
            icon: "error",
          })
    }
  }