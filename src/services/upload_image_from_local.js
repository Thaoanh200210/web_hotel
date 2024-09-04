const {UploadRepository} = require('../repositories/upload');

async function uploadImageFromLocal(path, folderName, name) {
    const uploadRepo = new UploadRepository();
    return await uploadRepo.uploadImageFromLocal({path, folderName, name});
}


module.exports =  uploadImageFromLocal;