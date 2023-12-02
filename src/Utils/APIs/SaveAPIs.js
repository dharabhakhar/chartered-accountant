// import { _api } from "../Config/axiosConfig";

// export const _saveClient = async (_username) => {
//     try {
//         const data = {
//             "username": _username
//         };

//         const response = await _api.post('user/save', data);
//         return { status: 200, message: response.data.responseMessage || 'User has been added successfully!' }

//     } catch (err) {
//         console.log("error_catched__saveUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'User has not been added!'
//         }
//     }

// }
// export const _saveBackupSchedule = async (backupScheduleId, localTime, clientName, ProjectId) => {
//     // const formattedDate = `2023-10-16`;
//     //                     const [hours, minutes] = localTime.match(/\d+/g);
//     //                     const isoDate = new Date(`${formattedDate}T${hours}:${minutes}:00Z`);

//     //                     let formattedISODate = isoDate.toISOString();
//     try {
//         const data = {
//             "backupScheduleId": backupScheduleId || 0,
//             "projectId": ProjectId || 1,
//             "backupTitle": clientName,
//             "backupTime": localTime
//         };

//         const response = await _api.post('schedule/save', data);

//         return { status: 200, message: response.data.responseMessage || 'Backup Schedule has been added successfully!' }

//     } catch (err) {
//         console.log("error_catched__saveUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'Backup Schedule has not been added!'
//         }
//     }

// }
// export const _saveBackupSetting = async (ProjectId, allClients) => {
//     try {
//         const data = {
//             "projectId": ProjectId,
//             "backupPath1": allClients.backupPath1,
//             "backupPath2": allClients.backupPath2,
//             "isUploadToStorage": allClients.isUploadToStorage,
//             "isSendMail": allClients.isSendMail,
//             "toEmailAddress": allClients.toEmailAddress || null,
//         };

//         const response = await _api.post('setting/set', data);

//         return { status: 200, message: response.data || 'Backup setting has been added successfully!' }

//     } catch (err) {
//         console.log("error_catched__saveUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'Backup setting has not been added!'
//         }
//     }

// }
// export const _savePermission = async (userId, allClients) => {
//     console.log(allClients);
//     try {
//         const data = {
//             "userId": userId,
//             "lstUserPermission": allClients
//         };
//         const response = await _api.post('user_permission/set', data);

//         return { status: 200, message: response.data.responseMessage || 'User-Permission has been Updated successfully!' }

//     } catch (err) {
//         console.log("error_catched__saveUser", err)

//         return {
//             ...err,
//             message: err.data.errors ? err.data.errors[0] : 'User has not been added!'
//         }
//     }

// }
// export const _saveBackup = async (backupLogId ) => {
//     try {
//         // return;
//         const response = await _api.get(`download?backupLogId=${backupLogId}`);

//         return { status: 200, message: response || 'Backup downloaded' }

//     } catch (err) {
//         console.log("error_catched__saveBackup", err)

//         return {
//             ...err,
//             message: err
//         }
//     }

// }
// export const _saveProjectGroup = async (projectGroupId, clientName, SrNo) => {
//     try {
//         const data = {
//             "projectGroupId": projectGroupId || 0,
//             "serialNo": SrNo,
//             "projectGroupName": clientName
//         };
//         console.log(data);
//         const response = await _api.post('project_group/save', data);
//         return { status: 200, message: response.data || 'Project-Group has been saved successfully!' }
//     } catch (err) {
//         console.log("error_catched__savedProjectGroup", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }
// export const _saveProjectDB = async (DBId, ProjectId, DBtype, DBserver, DBname, clientName, password , clientSrNo) => {
//     try {
//         const data = {
//             "projectDBId": DBId || 0,
//             "projectId": ProjectId,
//             "serialNo": clientSrNo,
//             "eDatabaseType": DBtype,
//             "dbServer": DBserver,
//             "dbName": DBname,
//             "username": clientName,
//             "password": password
//         };
//         console.log(data);
//         const response = await _api.post('project_db/save', data);
//         return { status: 200, message: response.data || 'Project-db has been saved successfully!' }
//     } catch (err) {
//         console.log("error_catched__savedProjectGroup", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }
// export const _saveProject = async (projectId, clientName, clientSrNo, projectGroupId) => {
//     try {
//         const data = {
//             "projectId": projectId || 0,
//             "projectGroupId": projectGroupId,
//             "serialNo": clientSrNo,
//             "projectName": clientName
//         };
//         const response = await _api.post('project/save', data);
//         return { status: 200, message: response.data || 'Project has been saved successfully!' }
//     } catch (err) {
//         console.log("error_catched__savedProject", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }
// export const _saveProjectStatus = async (projectGroupId, status) => {
//     try {
//         const data = {
//             "projectGroupId": projectGroupId,
//             "eStatus": status
//         };
//         const response = await _api.post('project_group/change_status', data);
//         return { status: 200, message: response.data || 'Project Group Status has been Updated successfully!' }
//     } catch (err) {
//         console.log("error_catched__UpdateProject", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }
// export const _saveProjectDBStatus = async (projectDBId, status) => {
//     try {
//         const data = {
//             "projectDBId": projectDBId,
//             "eStatus": status
//         };
//         const response = await _api.post('project_db/change_status', data);
//         return { status: 200, message: response.data || 'Project Group Status has been Updated successfully!' }
//     } catch (err) {
//         console.log("error_catched__UpdateProject", err)
//         return {
//             ...err,
//             message: "failed to fetch Project"
//         }
//     }
// }
// export const _saveBackupNow = async (projectId, backup) => {
//     try {
//         const response = await _api.get(`take_now?projectId=${projectId}&isUploadToOnlineStorage=${backup.isUploadToOnlineStorage}&isForceBackup=${backup.isForceBackup}`);
//         return { status: 200, message: response.data || 'Backup done' }
//     } catch (err) {
//         console.log("error_catched__saveBackup", err)
//         return {
//             ...err,
//             message: "failed to fetch Backup"
//         }
//     }
// }
