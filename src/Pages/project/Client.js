// import { useCallback, useEffect, useRef, useState } from "react";
// import { _api, decode } from "../../Utils/Config/axiosConfig";
// import Header from "../../UIComponents/SubHeader/Header";
// import { faArrowDownWideShort, faBan, faCheck, faHouse, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageLoader from "../../UIComponents/Loaders/PageLoader";
// import FormPopup from "../../UIComponents/Popup/FormPopup";
// import { useFormik } from "formik";
// import { alertColors, statusLabels, statuses } from "../../Utils/constants";
// import ConfirmPopup from "../../UIComponents/Popup/ConfirmPopup";
// import { Snackbar, Alert } from "@mui/material";
// import { CLIENT_KEY_GENERATE_URL } from "../../Utils/Config/envConfig";
// import SkeletonLoaderForGrid from "../../UIComponents/Loaders/SkeletonLoaderForGrid";
// import { _fetchAllProject, _fetchAllProjectGroup, _fetchTime, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveBackupNow, _saveProject } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import { useNavigate } from "react-router-dom/dist";
// const orderBy = require('lodash/orderBy');


// export default function Client() {
//   const navigate = useNavigate();

//   /**Mutable State */
//   //layouts
//   const [showPageLoader, setShowPageLoader] = useState(false);
//   const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//   const [shouldRunEffect, setShouldRunEffect] = useState(false);
//   const [popupOverlay, setPopupOverlay] = useState(false);
//   const [headerButtons, setHeaderButtons] = useState(
//     {
//       add: true,
//       edit: true,
//       active: true,
//       deactive: true,
//       delete: true,
//       backupNow: true,
//       refresh: true,
//       backupSetting: true,
//       backupSchedule: true,
//     }
//   );
//   const [showModal, setShowModal] = useState({
//     show: false,
//     mode: 'add'
//   });
//   const [showStatusUpdateModal, setShowStatusUpdateModal] = useState({
//     show: false,
//     mode: 'deactive'
//   });
//   const [showBackupNowModal, setShowBackupNowModal] = useState(false);
//   const [snackBarState, setSnackBarState] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//     bgcolor: alertColors.success
//   });
//   const [keyGenerateLoading, setKeyGenerateLoading] = useState(false);
//   const [popupIsOpen, setPopupIsOpen] = useState(false);


//   //dynamic data
//   const [allClients, setAllClients] = useState([]);
//   const [userPermission, setUserPermission] = useState([]);
//   const [BackupNow, setBackupNow] = useState({
//     isUploadToOnlineStorage: false,
//     isForceBackup: false
//   });
//   const [backupTime, setBackupTime] = useState({
//     lastBackupTime: false,
//     lastUploadTime: false
//   });
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [_searchText, set_SearchText] = useState("");
//   const [clientStatus, setClientStatus] = useState(statuses.active);
//   const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//   const [hasSerialNo, setHasSerialNo] = useState(false);
//   // const [generatedKey, setGeneratedKey] = useState("")
//   //other state
//   const [sortType, setSortType] = useState({
//     clientName: 'asc',
//     serialNo: 'asc'
//   });
//   const [selected, setSelected] = useState({ id: 0, name: "" });
//   const [isOpenDropDown, setIsOpenDropDown] = useState(false);

//   const [selectedSocialAccountDropDownText, setSelectedSocialAccountDropDownText] = useState();
//   const [filteredSocialAccounts, setfilteredSocialAccounts] = useState([]);
//   const [productGroupId, setprojectGroupId] = useState('');


//   const getgroup = async () => {
//     if (!showSkeletonLoader) setShowPageLoader(true);


//     const response = await _fetchAllProjectGroup(_searchText, clientStatus);

//     if (response && response.status === 200) {
//       const data = response.data || [];
//       setfilteredSocialAccounts(response.data || []);
//       const matchingClient = data.find((client) => client.projectGroupName === selectedClient?.projectGroupName);
//       if (matchingClient) {
//         setSelected(matchingClient.projectGroupId);
//       }
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true);

//   };

//   /**Refs */
//   const gridListDivRef = useRef(null);

//   /**Form Handling */
//   const formik = useFormik({
//     initialValues: {
//       clientName: '',
//       clientSrNo: '',
//     },
//     validateOnMount: true,
//     validate: (values) => {
//       const errors = {};

//       if (!values.clientName) {
//         errors.clientName = 'Required';
//       } else if (values.clientName.length > 50) {
//         errors.clientName = 'Maximum 50 characters are allowed';
//       }

//       if (!values.clientSrNo) {
//         errors.clientSrNo = 'Required';
//       } else if (values.clientSrNo.length > 50) {
//         errors.clientSrNo = 'Maximum 50 characters are allowed';
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {
//       if (formik.isValid) {
//         setPopupOverlay(true);
//         await saveClient(showModal.mode === 'edit' ? selectedClient.projectId : undefined);
//       }
//     }
//   });
//   const name = formik.values?.name;
//   const validateForm = () => {
//     setTimeout(() => {
//       formik.validateForm();
//     }, 200);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     return new Promise(async (resolve, reject) => {
//       try {

//         const response = await _saveBackupNow(selectedClient.projectId, BackupNow);

//         if (response && response.status && response.message.statusCode === 200) {
//           setSnackBarState({
//             open: true, severity: 'success',
//             bgcolor: alertColors.success, message: response.message.responseMessage || 'Backup Done'
//           });
//           setPopupOverlay(false);
//           onCloseModal();
//           fetchAllClients();

//         } else if (response) {
//           setSnackBarState({
//             open: true, severity: 'error',
//             bgcolor: alertColors.error, message: response.message.responseMessage || 'Backup has not been done!'
//           });
//           setPopupOverlay(false);
//         }

//         resolve(true);

//       } catch (e) {
//         console.log(e);
//         setSnackBarState({
//           open: true, severity: 'error',
//           bgcolor: alertColors.error, message: 'Something went wrong!'
//         });
//         setPopupOverlay(false);
//       }
//     });
//   };


//   /**Methods */
//   //Read
//   const fetchAllClients = async (removeSelected = false) => {

//     if (!showSkeletonLoader) setShowPageLoader(true);

//     const response = await _fetchAllProject(_searchText, clientStatus, selected.projectGroupId);
//     const response1 = await _fetchUser(decode?.userId);

//     if (response1 && response1.status === 200) {
//       setUserPermission(response1.data || []);
//     }

//     if (response && response.status === 200) {
//       setAllClients(response.data || []);
//       // console.log(localStorage.getItem('selectedOrganization'));
//     }
//     if (removeSelected) {
//       setSelectedClient(null);
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true);

//   };

//   const onClientSearch = (searchText) => {
//     set_SearchText(searchText);
//   };

//   const onUpdateClientStatus = (status) => {
//     setSelectedClient(null);
//     if (status === 'active') {
//       setClientStatus(statuses.active);
//     } else if (status === 'deactive') {
//       setClientStatus(statuses.deactive);
//     }
//   };

//   //Write
//   const onAddClient = useCallback(() => {
//     setShowModal((current) => {
//       return { ...current, show: true, mode: 'add' };
//     });
//     validateForm();
//     getgroup();
//   }, []);

//   const onEditClient = async (_client) => {
//     getgroup();
//     if (!_client) {
//       _client = selectedClient;
//     }
//     setShowPageLoader(true);
//     const formData = {
//       clientName: _client?.projectName,
//       clientSrNo: _client?.serialNo
//     };
//     formik.setValues(formData);

//     setShowPageLoader(false);
//     setShowModal((current) => {
//       return { ...current, show: true, mode: 'edit' };
//     });
//     validateForm();
//   };

//   const saveClient = (projectId) => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (formik.isValid) {

//           const response = await _saveProject(projectId || 0, formik.values.clientName, formik.values.clientSrNo, selected);

//           if (response && response.status && response.message.statusCode === 200) {
//             setSnackBarState({
//               open: true, severity: 'success',
//               bgcolor: alertColors.success, message: response.message.responseMessage || 'Project has been saved successfully!'
//             });
//             setPopupOverlay(false);
//             onCloseModal();
//             fetchAllClients();

//           } else if (response) {
//             setSnackBarState({
//               open: true, severity: 'error',
//               bgcolor: alertColors.error, message: response.message.responseMessage || 'Project has not been saved!'
//             });
//             setPopupOverlay(false);
//           }

//           resolve(true);
//         }
//       } catch (e) {
//         console.log(e);
//         setSnackBarState({
//           open: true, severity: 'error',
//           bgcolor: alertColors.error, message: 'Something went wrong!'
//         });
//         setPopupOverlay(false);
//       }
//     });
//   };

//   const updateClientStatus = async (status) => {
//     try {

//       setShowPageLoader(true);
//       console.log(selectedClient);
//       const data = {
//         "projectId": selectedClient.projectId,
//         "eStatus": status,
//       };
//       const response = await _api.post('project/change_status', data);
//       console.log(response);
//       if (response && response.status && response.data.statusCode === 200) {

//         setSnackBarState({
//           open: true, severity: 'success',
//           bgcolor: alertColors.success, message: response.data.responseMessage || "Project has been Updated!",
//         });
//         closeStatusUpdateModal();
//         fetchAllClients(true);
//         setShowPageLoader(false);

//       } else if (response) {

//         setSnackBarState({
//           open: true, severity: 'error',
//           bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[0] : 'Project has not been Updated!'
//         });
//         closeStatusUpdateModal();
//         setShowPageLoader(false);

//       }

//       setShowPageLoader(false);


//     } catch (err) {
//       console.log(err);
//       setSnackBarState({
//         open: true, severity: 'error',
//         bgcolor: alertColors.error, message: err.message?.errors ? err.message.errors[0] : 'Project has not been Updated!'
//       });
//       closeStatusUpdateModal();
//       setShowPageLoader(false);
//     }

//   };



//   //Internal
//   function onClientSelect(_client) {
//     if (selectedClient && (selectedClient.projectId === _client.projectId)) {
//       setSelectedClient(null);
//     } else {
//       setSelectedClient(_client);
//     }
//   }

//   function openClientInEditMode(_client) {
//     setSelectedClient(_client);
//     onEditClient(_client);
//   }

//   const onRefresh = () => {
//     setSelectedClient(null);
//     setShowSkeletonLoader(true);
//     if (activeStatus_searchbar === statusLabels[clientStatus]) {
//       fetchAllClients();
//     } else {
//       onUpdateClientStatus(activeStatus_searchbar);

//     }

//   };

//   const onBackupSetting = (_client) => {
//     if (!_client) {
//       _client = selectedClient;
//     }
//     setShowSkeletonLoader(true);
//     localStorage.setItem('ProjectId', _client.projectId);
//     localStorage.setItem('ProjectName', _client.projectName);
//     if (selectedClient) {
//       navigate('/project/backup-setting');
//     }
//     setSelectedClient(null);
//   };

//   const onBackupSchedule = (_client) => {
//     if (!_client) {
//       _client = selectedClient;
//     }
//     setShowSkeletonLoader(true);
//     localStorage.setItem('ProjectId', _client.projectId);
//     localStorage.setItem('ProjectName', _client.projectName);
//     if (selectedClient) {
//       navigate('/project/backup-schedule');
//     }
//     setSelectedClient(null);
//   };

//   const onCloseModal = () => {
//     formik.resetForm();
//     setShowModal((current) => {
//       return { ...current, show: false };
//     });
//     setSelected('');
//   };

//   const closeStatusUpdateModal = () => {
//     setShowStatusUpdateModal({
//       show: false,
//       mode: 'deactivate'
//     });
//   };
//   const closeBackupNowModal = () => {
//     setShowBackupNowModal(false);
//     setBackupNow({
//       lastBackupTime: false,
//       lastUploadTime: false
//     });
//   };
//   const sortByClientName = () => {
//     setSortType((current) => {
//       return { ...current, clientName: current.clientName === 'asc' ? 'desc' : 'asc' };
//     });
//   };

//   const sortBySerialNo = () => {
//     setSortType((current) => {
//       return { ...current, serialNo: current.serialNo === 'asc' ? 'desc' : 'asc' };
//     });
//   };

//   const setHeightOfGrid = () => {

//     if (gridListDivRef && gridListDivRef.current) {
//       gridListDivRef.current.style.height = gridListDivRef.current.clientHeight - 20 + 'px';
//     }
//   };

//   const onActivateClient = () => {
//     setShowStatusUpdateModal({
//       show: true,
//       mode: 'activate'
//     });
//   };

//   const onDeactivateClient = () => {
//     setShowStatusUpdateModal({
//       show: true,
//       mode: 'deactivate'
//     });
//   };

//   const onDelete = () => {
//     setShowStatusUpdateModal({
//       show: true,
//       mode: 'delete'
//     });
//   };

//   const onBackupNow = async () => {
//     if (!showSkeletonLoader) setShowPageLoader(true);

//     const response1 = await _fetchTime(selectedClient.projectId);

//     if (response1 && response1.status === 200) {
//       setBackupTime(response1.data || '');
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true);
//     setShowBackupNowModal(true);
//   };
//   const ChangeUpload = () => {
//     setBackupNow({ ...BackupNow, isUploadToOnlineStorage: !BackupNow.isUploadToOnlineStorage });
//   };
//   const ChangeSendEmail = () => {
//     setBackupNow({ ...BackupNow, isForceBackup: !BackupNow.isForceBackup });
//   };


//   function _getConfirmationPopupData(mode) {
//     switch (mode) {
//       case 'activate': return {
//         icon: faCheck,
//         text: " Are you sure to active the selected Project?",
//         color: "#198754",
//         submitText: "Active",
//         onClick: (e) => updateClientStatus(statuses.active)
//       };
//       case 'deactivate': return {
//         icon: faBan,
//         text: " Are you sure to deactive the selected Project?",
//         color: "#e6ad5c",
//         submitText: "Deactive",
//         onClick: (e) => updateClientStatus(statuses.deactive)
//       };
//       case 'delete': return {
//         icon: faTrash,
//         text: " Are you sure to delete the selected Project?",
//         color: "#dc3545",
//         submitText: "Delete",
//         onClick: (e) => updateClientStatus(statuses.delete)
//       };
//       case 'backupNow': return {
//         icon: faTrash,
//         text: " Are you sure to Backup the selected Project?",
//         color: "#176B87",
//         submitText: "Backup Now",
//         onClick: (e) => updateClientStatus(statuses.delete)
//       };
//       default:
//         return {};
//     }
//   }

//   const handleSnackbarClose = () => {
//     setSnackBarState({ open: false, message: '' });
//   };

//   function generateKey() {
//     try {
//       setKeyGenerateLoading(true);
//       fetch(CLIENT_KEY_GENERATE_URL).then(
//         (res) => res.json()
//       ).then(
//         (_response) => {
//           let _generatedKey = _response.password || "";
//           formik.setFieldValue("clientKey", _generatedKey);
//           setKeyGenerateLoading(false);
//         }
//       ).catch(
//         (err) => {
//           console.log(err);
//           formik.setFieldTouched("clientKey", true);
//           setTimeout(
//             () => {
//               formik.setFieldError("clientKey", "Failed to generate key");

//             }, 50
//           );
//           setKeyGenerateLoading(false);
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       if (keyGenerateLoading) {
//         setKeyGenerateLoading(false);
//         formik.setFieldTouched("clientKey", true);
//         setTimeout(
//           () => {
//             formik.setFieldError("clientKey", "Failed to generate key");

//           }, 50
//         );
//       }
//     }
//   }

//   /**UI Piece */
//   function StatusChangedAlert({ _mode }) {
//     let _popupData = _getConfirmationPopupData(_mode);

//     return (
//       <div className="p-[15px]">

//         <div className="flex flex-col items-center gap-y-[10px]">

//           <div style={{ borderColor: _popupData.color }} className="w-[50px] h-[50px] rounded-full border-[2px] border-solid text-[#5bc0de] flex justify-center items-center">
//             <FontAwesomeIcon className="text-[24px]" icon={_popupData.icon} style={{ color: _popupData.color }} />
//           </div>

//           <div className="font-semibold font-mulish text-[18px] text-[#696c74]">{_popupData.text}</div>

//         </div>


//       </div>
//     );
//   }

//   function createConfirmPopup() {
//     const _data = _getConfirmationPopupData(showStatusUpdateModal.mode);
//     return (
//       <ConfirmPopup openPopup={showStatusUpdateModal.show}
//         title={"Confirmation"}
//         closingMethod={(e) => closeStatusUpdateModal()}
//         submitMethod={_data.onClick}
//         color={_data.color}
//         submitText={_data.submitText}>
//         <div className="border-b-solid border-b-[#e5e5e5]">
//           <StatusChangedAlert _mode={showStatusUpdateModal.mode} />
//         </div>
//       </ConfirmPopup>
//     );
//   }
//   /**Effects */
//   useEffect(() => {
//     setHeightOfGrid();
//     document.title = 'Project - Zibma Infotech';
//   }, []);

//   useEffect(
//     () => {
//       setShowSkeletonLoader(true);
//       setTimeout(
//         () => {

//           fetchAllClients();
//         }, 300
//       );
//     }, []
//   );

//   useEffect(
//     () => {
//       if (!shouldRunEffect) return;
//       fetchAllClients(true);
//     }, [_searchText]
//   );

//   useEffect(() => {
//     if (!shouldRunEffect) return;
//     fetchAllClients();
//     setHeaderButtons((current) => {
//       return {
//         ...current,
//         active: clientStatus === 2,
//         deactive: clientStatus === 1
//       };
//     });

//   }, [clientStatus]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;

//     let _sortType = sortType.clientName || "asc";
//     if (_sortType === "asc") {
//       // setAllClients(handleStringSort(allClients, "clientName", true));
//     }
//     if (_sortType === "desc") {
//       // setAllClients(handleStringSort(allClients, "clientName", false));
//     }
//     // setAllClients([...orderBy(allClients, 'clientName', sortType.clientName)]);
//   }, [sortType.clientName]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     let _sortType = sortType.serialNo || "asc";
//     if (_sortType === "asc") {
//       // setAllClients(handleNumberSort(allClients, "serialNo", true));
//     }
//     if (_sortType === "desc") {
//       // setAllClients(handleNumberSort(allClients, "serialNo", false));
//     }
//   }, [sortType.serialNo]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     setAllClients([...orderBy(allClients, 'updateTime', sortType.updateTime)]);
//   }, [sortType.updateTime]);

//   useEffect(
//     () => {
//       if (allClients.length) {
//         if (allClients[0].serialNo && !hasSerialNo) {
//           setHasSerialNo(true);
//         }
//       }
//     }, [allClients]
//   );

//   useEffect(
//     () => {
//       if (showModal.show || showStatusUpdateModal.show) {
//         setPopupIsOpen(true);
//       } else {
//         setPopupIsOpen(false);
//       }
//     }, [showModal?.show, showStatusUpdateModal?.show]
//   );
//   useEffect(
//     () => {
//       const _onAddKeyboard = (event) => {
//         if (event.altKey && event.key) {
//           if (event.key.toLowerCase() === "n" && headerButtons.add && !popupIsOpen) {
//             if (onAddClient) onAddClient();
//           }
//           if (event.key.toLowerCase() === "u" && headerButtons.edit && !popupIsOpen) {
//             if (onEditClient && selectedClient) onEditClient();
//           }
//           if (event.key.toLowerCase() === "r" && headerButtons.deactive && !popupIsOpen) {
//             if (onDeactivateClient && selectedClient && !popupIsOpen) onDeactivateClient();
//           }
//           if (event.key.toLowerCase() === "a" && headerButtons.active) {
//             if (onActivateClient && selectedClient && !popupIsOpen) onActivateClient();
//           }
//           if (event.key.toLowerCase() === "x" && headerButtons.delete) {
//             if (onDelete && selectedClient && !popupIsOpen) onDelete();
//           }
//         }
//         // if (event.key === "Enter") {
//         //   if (showModal.show) {
//         //     formik.handleSubmit()
//         //   }
//         // }
//       };
//       document.onkeydown = _onAddKeyboard;
//       return () => {
//         document.removeEventListener("keydown", _onAddKeyboard);
//       };
//     }, [headerButtons, selectedClient, popupIsOpen]
//   );

//   return (

//     <>

//       <div className=" h-full relative overflow-hidden bg-[#D8DCE3] py-[8px] ">
//         {/* Loaders and Alerts */}
//         <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />

//         <Snackbar
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//           open={snackBarState.open}
//           severity={snackBarState.severity}
//           onClose={handleSnackbarClose}
//           key={'top' + 'right'}
//           autoHideDuration={5000}
//         >
//           <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#FFFFFF', background: snackBarState.bgcolor }}>
//             {snackBarState.message}
//           </Alert>
//         </Snackbar>
//         {(userPermission.length > 1 &&
//           userPermission[1].canView === true &&
//           userPermission[1].canAdd === true &&
//           userPermission[1].canEdit === true &&
//           userPermission[1].canPrint === true &&
//           userPermission[1].canDelete === true) ? (


//           <PathInfo fontAwesomeIcon={faHouse} />) /* Add and Edit Popus */

//           :
//           <></>

//         };
//         {/* Add and Edit Popus  */}

//         {/* Add and Edit Popus */}
//         {showModal.show && (
//           <FormPopup openPopup={showModal.show} overlay={popupOverlay} submitMethod={formik.handleSubmit} submitText={"Save"} title={showModal.mode === 'add' ? 'Add Project' : 'Edit Project'} closingMethod={() => onCloseModal()} disabledSubmit={formik.isValid}>

//             <form onSubmit={formik.handleSubmit}>
//               <div className=" border-b w-full">
//                 <div className="px-[25px] py-[10px]">
//                   <div id="custom_select" className="relative mt-[15px] ">
//                     <div className="relative flex "
//                     >
//                     </div>
//                     {/* <div className="combo-box">
//                       <Combobox value={selected} onChange={setSelected} >
//                         <div id="" className="relative mt-1">
//                           <div id="selectedSocialAccountDropDownText" placeholder="selectedSocialAccountDropDownText" className=" peer relative w-full cursor-default overflow-hidden rounded-[3.75px] bg-white text-left  focus:outline-none ">
//                             <Combobox.Input
//                               className="capitalize   outline-none font-mulish text-[14px] h-[40px]  px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                               displayValue={(socialMedia) => (socialMedia.projectGroupName)}
//                               // displayValue={(socialMedia) => socialMedia.projectGroupName}
//                               onChange={(event) => setSelectedSocialAccountDropDownText(event.target.value)}
//                               onFocus={() => setIsOpenDropDown(true)}
//                               onBlur={() => setIsOpenDropDown(false)}

//                             />
//                             <Combobox.Button className="absolute inset-0 bg-transparent flex items-center pr-2">
//                               <span
//                                 className="px-[12px] text-[13px]  font-mulish  text-[#696c74] transition-all  peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                 aria-hidden="true"
//                               >{selected.name === "" && !isOpenDropDown && <> Select Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span></>}</span>
//                             </Combobox.Button>
//                           </div>
//                           {(selectedSocialAccountDropDownText || isOpenDropDown || selected.name) && <label
//                             htmlFor="selectedSocialAccountDropDownText"
//                             className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                           >
//                             Select Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                           </label>}
//                           <Transition
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                             afterLeave={() => { setSelectedSocialAccountDropDownText(''); }}
//                           >
//                             <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm rounded-b-lg  shadow-xl  ">
//                               {filteredSocialAccounts.length === 0 && selectedSocialAccountDropDownText !== '' ? (
//                                 <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                                   Nothing found.
//                                 </div>
//                               ) : (
//                                 filteredSocialAccounts.map((socialMedia, index) => (
//                                   <Combobox.Option
//                                     key={socialMedia.projectGroupId}
//                                     className={({ active }) =>
//                                       `relative  select-none py-2 pl-10 pr-4 ${active ? 'bg-[#2574ab] text-white' : 'text-gray-900'
//                                       } w-full px-2  cursor-pointer hover:bg-[#2574ab] hover:text-white py-1 duration-150 capitalize `
//                                     }
//                                     value={socialMedia}
//                                   >
//                                     {({ selected, active }) => (
//                                       <>
//                                         <span
//                                           className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                                             }`}
//                                         >
//                                           {socialMedia.projectGroupName}
//                                         </span>
//                                         {selected ? (
//                                           <span
//                                             className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-900'
//                                               }`}
//                                           >
//                                           </span>
//                                         ) : null}
//                                       </>
//                                     )}
//                                   </Combobox.Option>
//                                 ))
//                               )}
//                             </Combobox.Options>
//                           </Transition>
//                         </div>
//                       </Combobox>
//                     </div> */}
//                     <div className="my-[15px] relative">
//                       <div className="mt-[15px] relative">
//                         <select name="" id="option-menu" className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                           value={selected}
//                           onChange={(e) => setSelected(e.target.value)}
//                           disabled={showModal.mode === 'edit' ? true : false}>
//                           <option value=""> </option>
//                           {filteredSocialAccounts.length === 0 ? (
//                             <option value="">
//                               Nothing found.
//                             </option>
//                           ) : (
//                             filteredSocialAccounts.map((socialMedia, index) => (
//                               <option value={socialMedia.projectGroupId}>{socialMedia.projectGroupName}</option>
//                             )))}

//                         </select>
//                         <label
//                           htmlFor="option-menu"
//                           className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                         >
//                           Group Name <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                         </label>
//                       </div>
//                     </div>


//                   </div>

//                   <div className="my-[15px] relative">
//                     <div className="mt-[15px] relative">
//                       <input type="text"
//                         className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                         id="clientName"
//                         placeholder="Group Name"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values?.clientName} />
//                       <label
//                         htmlFor="clientName"
//                         className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                       >
//                         Project Name <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                       </label>
//                     </div>

//                   </div>

//                   <div className="my-[15px] relative">
//                     <div className="mt-[15px] relative">
//                       <input type="text"
//                         className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                         id="clientSrNo"
//                         placeholder="Profile Name"
//                         max={"99999"}
//                         min={'1'}
//                         name="clientSrNo"
//                         onChange={(event) => {
//                           event.preventDefault();
//                           const _key = event.nativeEvent.data;
//                           if (_key === "+" || _key === "-" || isNaN(_key)) return;
//                           if (event.target.value.length > 5 || (_key && event.target.value < 1)) return;
//                           formik.handleChange(event);
//                         }}
//                         onBlur={formik.handleBlur}
//                         value={formik.values?.clientSrNo} />
//                       <label
//                         htmlFor="clientSrNo"
//                         className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                       >
//                         Serial No <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                       </label>
//                     </div>
//                     <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                       {formik.errors.clientSrNo && formik.touched.clientSrNo && formik.errors.clientSrNo}
//                     </div>
//                   </div>
//                 </div>
//                 <div className='flex gap-4 justify-end text-[15px] max-[450px]:justify-center border-t px-[25px] py-3 font-semibold'>
//                   <button type='button' className={` rounded-[4px] pt-[5px] pb-[6px] max-[450px]:w-[100px] w-[85px] text-black bg-[#f6f0f6] hover:opacity-[0.88]`} onClick={() => onCloseModal()}>Cancel</button>
//                   <button type='submit' className={`${formik.isValid ? 'cursor-pointer' : 'cursor-not-allowed'} bg-gradient-to-r from-[#259dab] to-[#2574ab] text-white rounded px-3 py-1.5 capitalize  max-[450px]:w-[100px] w-[85px]`}>{"Save"}</button>
//                 </div>
//               </div>
//             </form>
//           </FormPopup>

//         )}

//         {/* backup now modal */}
//         {showBackupNowModal && (
//           <FormPopup openPopup={showBackupNowModal} overlay={popupOverlay} submitMethod={handleSubmit} submitText={"Backup Now"} title={'Backup Now'} closingMethod={() => closeBackupNowModal()}>

//             <form onSubmit={(e) => handleSubmit(e)}>
//               <div className=" border-b w-full">
//                 <div className="px-[25px] py-[10px]">
//                   <div id="custom_select" className="relative mt-[15px] ">
//                     <div className="relative flex "
//                     >
//                     </div>
//                   </div>
//                   <div className="flex mb-[20px]">
//                     <div class="flex items-center">
//                       <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => ChangeUpload()}
//                         checked={BackupNow.isUploadToOnlineStorage} />
//                       <label for="default-checkbox" class="ml-2 text-sm font-normal font-mulish text-[14px] select-none">Upload To Server</label>
//                     </div>
//                     <div class="flex items-center ms-[90px]">
//                       <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         onClick={(e) => ChangeSendEmail()}
//                         checked={BackupNow.isForceBackup} />
//                       <label for="checked-checkbox" class="ml-2 text-sm font-normal font-mulish text-[14px] select-none">Force Backup</label>
//                     </div>
//                   </div>

//                   <div className="mb-[20px] font-mulish text-[14px]">
//                     <lavle className="mb-3 font-normal">Last Backup Time: <span className="font-medium">{backupTime.lastBackupTime}</span></lavle>
//                   </div>
//                   <div className="font-mulish text-[14px]">
//                     <lavle className="mb-3 font-normal">Last Upload Time: <span className="font-medium">{backupTime.lastUploadTime}</span></lavle>
//                   </div>
//                 </div>
//                 <div className='flex gap-4 justify-end text-[15px] max-[450px]:justify-center border-t px-[25px] py-3 font-semibold'>
//                   <button type='button' className={` rounded-[4px] pt-[5px] pb-[6px] max-[450px]:w-[100px] w-[85px] text-black bg-[#f6f0f6] hover:opacity-[0.88]`} onClick={() => closeBackupNowModal()}>Cancel</button>
//                   <button type='submit' className={` bg-gradient-to-r from-[#259dab] to-[#2574ab] text-white rounded px-3 py-1.5 capitalize  max-[450px]:w-[110px] w-[115px] cursor-pointer`}>{"Backup Now"}</button>
//                 </div>
//               </div>
//             </form>
//           </FormPopup>
//         )}

//         {/* Status Change Alerts/Popups */}
//         {showStatusUpdateModal.show && (
//           createConfirmPopup()
//         )}

//         {/* Header */}
//         <div className="px-[10px] bg-white h-[calc(100%-35px)]">
//           <Header
//             isLoading={showSkeletonLoader}
//             isItemSelected={!!selectedClient}
//             show={headerButtons}
//             onAdd={onAddClient}
//             onEdit={onEditClient}
//             onDeactivate={onDeactivateClient}
//             onActivate={onActivateClient}
//             onDelete={onDelete}
//             onBackupNow={onBackupNow}
//             onSearch={onClientSearch}
//             onSearchClick={onUpdateClientStatus}
//             onRefresh={onRefresh}
//             onBackupSetting={onBackupSetting}
//             onBackupSchedule={onBackupSchedule}
//             initialSearchValue={_searchText}
//             activeStatus={clientStatus}
//             searchStatusModifier={setActiveStatus_searchBar} />

//           {/* Skeleton for Grid */}
//           <SkeletonLoaderForGrid show={showSkeletonLoader} />

//           {/* Grid */}

//           <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] flex flex-col max-[767px]:overflow-x-auto `}>
//             <div className="grow flex flex-col max-[767px]:w-fit ">

//               <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                 <div className={` flex items-center justify-between uppercase bg-[#2574ab] h-full px-[10px] w-[10%] `}>
//                   <div>sr no.</div>
//                   {hasSerialNo &&
//                     <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />}

//                 </div>

//                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[100%] px-[10px]">
//                   <div>Project Name</div>
//                   <FontAwesomeIcon onClick={(e) => sortByClientName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                 </div>

//               </div>
//               <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap  h-full w-full">
//                 {!!allClients.length && (
//                   allClients.map((_client, index) => {
//                     return (
//                       <div onClick={(e) => onClientSelect(_client)} onDoubleClick={(e) => openClientInEditMode(_client)} key={_client.projectId} className={`${(selectedClient && selectedClient.projectId === _client.projectId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                         <div className={`flex items-center h-full w-[10%] px-[10px] py-[5px] overflow-hidden  `}>
//                           <div className="overflow-hidden text-ellipsis">{_client.serialNo}</div>
//                         </div>

//                         <div className="flex items-center h-full w-[100%] px-[10px] py-[5px] overflow-hidden">
//                           <div className="overflow-hidden  text-ellipsis">{_client.projectName}</div>
//                         </div>

//                       </div>
//                     );
//                   })
//                 )}

//                 {!!!allClients.length && (
//                   <div className="flex mt-[30px] justify-center font-mulish font-semibold text-[#696c74bd] text-[17px]">No Data Available!</div>
//                 )}
//               </div>

//               <div className="font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between">Total Record Count: {allClients?.length}</div>
//             </div>

//           </div>



//         </div>


//         ):(
//         <div>
//           <h3>Not Allowed</h3>
//         </div>
// )
//       </div>
//     </>



//   );
// }
