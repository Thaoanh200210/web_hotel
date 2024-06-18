module.exports = (customMessage, message) => {
    //Hàm custom lại message dựa trên constants message
    let msg = {
        message: message.message,
        type: message.type,
    };
    msg.message = msg.message.replace("{1}", customMessage);
    return msg;
};
