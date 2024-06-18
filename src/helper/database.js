var mongoose = require("mongoose");
class MongoDB {
    static async connect(uri) {
        //
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
    }
    static async disconnect() {
        await mongoose.disconnect();
    }
}
module.exports = { MongoDB } ;