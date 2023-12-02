// import { _api, _driveApi, _getAccountAPI } from "../Config/axiosConfig";

// /**Decryption */
// export const _getDecryptedString = async (_string) => {
//     if (!_string) {
//         return
//     }
//     let data = {
//         "token": _string
//     }
//     try {
//         const response = await _getAccountAPI().post('/token/set', data);
//         return { status: 200, data: response.data.key }
//     } catch (err) {
//         console.log("error_catched__getDecryptedString", err)
//         return {
//             ...err,
//             message: "failed to decrypt String"
//         }
//     }
// }

// export const _getEncryptedString = async (_string) => {
//     if (!_string || _string === "") {
//         return
//     }
//     console.log(_string)
//     try {
//         const response = await _getAccountAPI().get('/token/get?key=' + _string);
//         return { status: 200, data: response.data.token }
//     } catch (err) {
//         console.log("error_catched__getEncryptedString", err)
//         return {
//             ...err,
//             message: "failed to decrypt String"
//         }
//     }
// }

// /**Client */
// export const _fetchAllClients = async (_searchText) => {
//     const data = {
//         "masterSearch": _searchText || ""
//     };
//     try {
//         const response = await _api.post('/user/get_all', data);
//         return { status: 200, data: response.data.lstUser }
//     } catch (err) {
//         console.log("error_catched__fetchAllUser", err)
//         return {
//             ...err,
//             message: "failed to fetch user"
//         }
//     }
// }
// export const _fetchProfilePicture = async (lstGuid) => {
//     const data = {
//         "lstGuid": lstGuid,
//         "ePhotoSize": 2,
//         "eFileModule":1
//     }
//     try {
//         const response = await _driveApi.post('/get_file', data);
//         return { status: 200, data: response.data.lstFile }
//     } catch (err) {
//         console.log("error_catched__fetchAllUserProfileImage", err)
//         return {
//             ...err,
//             message: "failed to fetch user"
//         }
//     }
// }
// /**User Permission */
// export const _fetchUser = async (userId) => {
//     console.log(userId);
//     try {
//         const response = await _api.get(`user_permission/get?userId=${userId}`);
//         return { status: 200, data: response.data.lstUserPermission }
//     } catch (err) {
//         console.log("error_catched__fetchUserId", err)
//         return {
//             ...err,
//             message: "failed to fetch user"
//         }
//     }
// }
// /**Backup Log */
// export const _fetchAllLog = async (_searchText, _projectGroupId, _pageNo, _maxItem) => {
//     const data = {
//         "masterSearch": _searchText || "",
//         "projectGroupId": _projectGroupId.projectGroupId || 0,
//         "pageNo": _pageNo || 1,
//         "maxItem": _maxItem || 30
//     };
//     try {
//         const response = await _api.post('log/last/get', data);
//         return { status: 200, data: response.data }
//     } catch (err) {
//         console.log("error_catched__fetchBackUpLog", err)
//         return {
//             ...err,
//             message: "failed to fetch Log"
//         }
//     }
// }
// /**backup log project */
// export const _fetchProject = async (projectId, fromdate, todate, pageNo) => {
//     const data = {
//         "projectId": projectId || 1,
//         "fromDate": fromdate ,
//         "toDate": todate,
//         "maxItem": 30,
//         "pageNo": pageNo
//     };
//     try {
//         const response = await _api.post('log/project_wise/get', data);
//         return { status: 200, data: response.data }
//     } catch (err) {
//         console.log("error_catched__fetchLogProjectData", err)
//         return {
//             ...err,
//             message: "failed to fetch project"
//         }
//     }
// }
// /**backup setting */
// export const _fetchBackupSetting = async (projectId) => {
//     try {
//         const response = await _api.get(`setting/get?projectId=${projectId}`);
//         return { status: 200, data: response.data}
//     } catch (err) {
//         console.log("error_catched__fetchBackupSetting", err)
//         return {
//             ...err,
//             message: "failed to fetch project"
//         }
//     }
// }
// export const _fetchTime = async (projectId) => {
//     try {
//         const response = await _api.get(`last_backup_time/get?projectId=${projectId}`);
//         return { status: 200, data: response.data}
//     } catch (err) {
//         console.log("error_catched__fetchBackupTime", err)
//         return {
//             ...err,
//             message: "failed to fetch project"
//         }
//     }
// }
// /**Project */
// export const _fetchBackupSchedule = async (_searchText, ProjectId) => {
//     const data = {
//         "masterSearch": _searchText || "",
//         "projectId": ProjectId || 1
//     };
//     try {
//         const response = await _api.post('schedule/get_all', data);
//         return { status: 200, data: response.data.lstBackupSchedule }
//     } catch (err) {
//         console.log("error_catched__fetchBackupSchedule", err)
//         return {
//             ...err,
//             message: "failed to fetch backup schedule"
//         }
//     }
// }
// export const _fetchBackupScheduleById = async (backupScheduleId) => {
//     if(!backupScheduleId){
//         return;
//     }
//     try {
//         const response = await _api.get(`schedule/get_by_id?backupScheduleId=${backupScheduleId}`);
//         return { status: 200, data: response.data }
//     } catch (err) {
//         console.log("error_catched__fetchBackupScheduleById", err)
//         return {
//             ...err,
//             message: "failed to fetch backup schedule"
//         }
//     }
// }
// export const _fetchAllProjectGroup = async (_searchText, _projectStatus) => {
    
//     const data = {
//         "masterSearch": _searchText || "",
//         "eStatus": _projectStatus
//     };
//     try {
//         const response = await _api.post('project_group/get_all', data);
//         return { status: 200, data: response.data.lstProjectGroup }
//     } catch (err) {
//         console.log("error_catched__fetchAllProjectGroup", err)
//         return {
//             ...err,
//             message: "failed to fetch ProjectGroup"
//         }
//     }
// }
// export const _fetchAllProjectDB = async (_searchText, _projectStatus, projectId) => {
    
//     const data = {
//         "masterSearch": _searchText || "",
//         "eStatus": _projectStatus,
//         "projectId": projectId
//     };
//     try {
//         const response = await _api.post('project_db/get_all', data);
//         return { status: 200, data: response.data.lstProjectDB }
//     } catch (err) {
//         console.log("error_catched__fetchAllProjectDB", err)
//         return {
//             ...err,
//             message: "failed to fetch ProjectDB"
//         }
//     }
// }
// export const _fetchProjectDB = async (projectDBId) => {
//     try {
//         const response = await _api.get(`project_db/get_by_id?projectDBId=${projectDBId}`);
//         return { status: 200, data: response.data }
//     } catch (err) {
//         console.log("error_catched__fetchAllProjectDB", err)
//         return {
//             ...err,
//             message: "failed to fetch ProjectDB"
//         }
//     }
// }
// export const _fetchAllProject = async (_searchText, _projectStatus, category) => {
    
//     const data = {
//         "masterSearch": _searchText,
//         "projectGroupId":category.projectGroupId || 0,
//         "eStatus": _projectStatus
//     };
//     try {
//         const response = await _api.post('project/get_all', data);
//         return { status: 200, data: response.data.lstProject }
//     } catch (err) {
//         console.log("error_catched__fetchAllProject", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }