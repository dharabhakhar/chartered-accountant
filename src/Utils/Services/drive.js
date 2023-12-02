// import { _driveApi } from "../Config/axiosConfig";

// export const ImageSizeVariants = {
//   original : 1,
//   _25X25 : 2,
//   _100X100 : 3,
//   _250X250 : 4,
//   _800X800 : 5,
//   _1600X1600 : 6
// };

// export const getImageFromDrive = async (lstGuid, ePhotoSize, eFileModule) => {
//   return _driveApi.post('/get_file', {lstGuid, ePhotoSize, eFileModule});
// };

// export const removeImageFromDrive = async (guid, eFileModule) => {
//   return _driveApi.get('/delete_file', {
//     params: {
//       guid, eFileModule
//     }
//   });
// };