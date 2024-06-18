const express = require("express");
const fs = require("fs")
const router = express.Router();
const { StoreRunController }  = require("./controllers/store-run");
const { Middleware }  = require("./middlewares/index.middleware");
let storeRun = new StoreRunController();
let middleware = new Middleware();
let listRouteName = fs.readdirSync(`${__dirname}/routes`);
console.log(listRouteName);





for (const routeName of listRouteName) {
    let name = routeName.replace(".js","")
    //khác store - run 
    if(name != "store-run"){
        if(name == "manager"){
            // thằng nào muốn truy cập manager đều phải có 1 hotel id
            router.use("/" + name + "/:hotelId",middleware.authenticate, middleware.message, require(`./routes/${name}`))
        }
        else{
            //đường dẫn paymnet or ad đều dùng này
            router.use("/" + name,middleware.authenticate, middleware.message, require(`./routes/${name}`))
        }}
    // là store-run thì dùng đường dẫn này 
    else
        router.use("/",
            middleware.registration,
            middleware.login,
            middleware.passwordChange,
            middleware.authenticate,
            middleware.message,
            require(`./routes/${name}`)
        )
}

// router.use(storeRun.pageNotFound);
router.use(express.urlencoded({extended: true}))

router.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = router;