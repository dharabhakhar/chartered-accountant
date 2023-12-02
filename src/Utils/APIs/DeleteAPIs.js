// import { _api } from "../Config/axiosConfig";

// export const _deleteUser = async (employeeId) => {
//     if(!employeeId){
//         return;
//     }
//     try {
//         const data = {
//             "employeeId": employeeId
//         };

//         const response = await _api.post('user/delete', data);
//         console.log(response.data);

//         return { status: 200, message: response.data.responseMessage || 'User has been deleted successfully!' }

//     } catch (err) {
//         console.log("error_catched__deleteUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'User has not been deleted!'
//         }
//     }
// }
// export const _deleteBackupSchedule = async (backupScheduleId) => {
//     if(!backupScheduleId){
//         return;
//     }
//     try {
//         const data = {
//             "backupScheduleId": backupScheduleId
//         };

//         const response = await _api.post('schedule/delete', data);

//         return { status: 200, message: response.data.responseMessage || 'BackUp Schedule has been deleted successfully!' }

//     } catch (err) {
//         console.log("error_catched__deleteUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'Backup Schedule has not been deleted!'
//         }
//     }
// }