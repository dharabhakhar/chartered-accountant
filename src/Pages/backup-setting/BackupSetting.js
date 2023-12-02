// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCheck, faClipboard, faGear, faTrash, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageLoader from "../../UIComponents/Loaders/PageLoader";
// import FormPopup from "../../UIComponents/Popup/FormPopup";
// import { formatTime } from "../../Utils/date"
// import { useFormik } from "formik";
// import { alertColors, statusLabels, statuses } from "../../Utils/constants"
// import ConfirmPopup from "../../UIComponents/Popup/ConfirmPopup";
// import { Snackbar, Alert } from "@mui/material";
// import { RotatingLines } from "react-loader-spinner";
// import { CLIENT_KEY_GENERATE_URL } from "../../Utils/Config/envConfig"
// import SkeletonLoaderForGrid from "../../UIComponents/Loaders/SkeletonLoaderForGrid";
// import { _fetchAllClients, _fetchBackupSetting, _fetchTime, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveBackupSetting, _saveClient } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import { Link, useNavigate } from "react-router-dom/dist";
// import { Email } from "@mui/icons-material";
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');
// const status_labels = ["", "active", "deactive", "delete"];

// export default function Backup({ searchStatusModifier, activeStatus }) {
//     const navigate = useNavigate('');
//     const ProjectId = localStorage.getItem('ProjectId');
//     const ProjectName = localStorage.getItem('ProjectName');

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [statusFilter, setStatusFilter] = useState(status_labels[activeStatus]);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             add: true,
//             edit: decode?.claims.includes(13) ? true : false,
//             delete: true,
//             refresh: true,
//         }
//     );
//     useEffect(
//         () => {
//             setStatusFilter(status_labels[activeStatus])
//         }, [activeStatus]
//     )
//     const [showModal, setShowModal] = useState({
//         show: false,
//         mode: 'add'
//     });
//     const [showStatusUpdateModal, setShowStatusUpdateModal] = useState({
//         show: false,
//         mode: 'deactive'
//     });
//     const [snackBarState, setSnackBarState] = useState({
//         open: false,
//         message: '',
//         severity: 'success',
//         bgcolor: alertColors.success
//     });
//     const [keyGenerateLoading, setKeyGenerateLoading] = useState(false)
//     const [popupIsOpen, setPopupIsOpen] = useState(false);
//     const patt3 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

//     //dynamic data
//     const [allClients, setAllClients] = useState({
//         backupPath1:'',
//         backupPath2:'',
//         isUploadToStorage: false,
//         isSendMail: false,
//         toEmailAddress: ''
//     })
//     const [userPermission, setUserPermission] = useState([])
//     const [backupTime, setBackupTime] = useState({
//         lastBackupTime: '',
//         lastUploadTime: ''
//     })
//     const [selectedClient, setSelectedClient] = useState(null)
//     const [_searchText, set_SearchText] = useState("")
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false);
    
//     const [emailError, setEmailError] = useState('');
//     const [backupError, setBackupError] = useState('');
//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     const [sortType, setSortType] = useState({
//         clientName: 'asc',
//         updateTime: 'asc',
//         serialNo: 'asc'
//     });


//     /**Refs */
//     const gridListDivRef = useRef(null)

//     /**Form Handling */
//     const formik = useFormik({
//         initialValues: {
//             clientName: '',
//             clientKey: '',
//             clientSrNo: ''
//         },
//         validateOnMount: true,
//         validate: (values) => {
//             const errors = {};

//             if (!values.clientName) {
//                 errors.clientName = 'Required';
//             } else if (values.clientName.length > 100) {
//                 errors.clientName = 'Maximum 100 characters are allowed';
//             }

//             if (!values.clientKey) {
//                 errors.clientKey = 'Required';
//             } else if (values.clientKey.length > 100) {
//                 errors.clientKey = 'Maximum 100 characters are allowed';
//             }


//             if (!values.clientSrNo) {
//                 errors.clientSrNo = 'Required';
//             } else if (values.clientSrNo.length > 100) {
//                 errors.clientSrNo = 'Maximum 100 characters are allowed';
//             }

//             return errors;
//         },
//         onSubmit: async (values) => {
//             if (formik.isValid) {
//                 setPopupOverlay(true);
//                 await saveClient(showModal.mode === 'edit' ? selectedClient.clientId : undefined);
//             }
//         }
//     });
//     const validateForm = () => {
//         setTimeout(() => {
//             formik.validateForm();
//         }, 200);
//     };


//     /**Methods */
//     //Read
//     const fetchAllClients = async (removeSelected = false) => {

//         if (!showSkeletonLoader) setShowPageLoader(true);

//         const response = await _fetchBackupSetting(ProjectId)
//         const response1 = await _fetchTime(ProjectId)

//         if (response && response.status === 200) {
//             setAllClients(response.data || '');
//         }
//         if (response1 && response1.status === 200) {
//             setBackupTime(response1.data || '');
//         }
//         if (removeSelected) {
//             setSelectedClient(null)
//         }
//         setShowPageLoader(false);
//         setShowSkeletonLoader(false);
//         if (!shouldRunEffect) setShouldRunEffect(true)

//     }

//     const onClientSearch = (searchText) => {
//         set_SearchText(searchText)
//     }

//     const onUpdateClientStatus = (status) => {
//         setSelectedClient(null)
//         if (status === 'active') {
//             setClientStatus(statuses.active);
//         } else if (status === 'deactive') {
//             setClientStatus(statuses.deactive);
//         }
//     };

//     //Write
//     const onAddClient = useCallback(() => {
//         setShowModal((current) => {
//             return { ...current, show: true, mode: 'add' };
//         });
//         validateForm();
//     }, []);

//     const onEditClient = async (_client) => {
//         if (!_client) {
//             _client = selectedClient;
//         }
//         setShowPageLoader(true)
//         const formData = {
//             clientName: _client?.clientName,
//             clientKey: _client?.clientKey,
//             clientSrNo: _client?.serialNo
//         };
//         formik.setValues(formData);
//         // setSelectedSocialAccountDropDown(socialAccount.socialPlatform)

//         setShowPageLoader(false);
//         setShowModal((current) => {
//             return { ...current, show: true, mode: 'edit' };
//         });
//         // const response = await getImageFromDrive([slider.photoGuid], ImageSizeVariants._250X250, eFileModule.displayAttachment);
//         // if (response && response.data && response.data.lstFile && response.data.lstFile.length) {
//         //   setUploadedImageSrc(response.data.lstFile[0].fileURL);
//         // }
//         validateForm();
//     };

//     const saveClient =async (e) => {
//         setShowPageLoader(true);
//         e.preventDefault();
//         await SaveBackup();
                
//     };

//     const SaveBackup = () =>{
//         return new Promise(async (resolve, reject) => {
//             try {
                
//                 if (allClients.backupPath1 === '') {
//                     setBackupError('Backup path1 is Required');
//                     setShowPageLoader(false);
//                 }
//                 if(allClients.isSendMail === true && allClients.toEmailAddress === ''){
//                         setEmailError('Email Address is Required');
//                         setShowPageLoader(false);
//                         return false;
//                 } else if (allClients.isSendMail === true && patt3.test(allClients.toEmailAddress) === false) {
//                     setEmailError('Enter Valid Email');
//                     setShowPageLoader(false);
//                     return false;
//                 }
//                 if(allClients.backupPath1 !== '' || (allClients.isSendMail === false && allClients.toEmailAddress === '')){

//                     const response = await _saveBackupSetting(ProjectId, allClients);

//                     if (response && response.status === 200) {
//                         setShowPageLoader(false);
//                         setSnackBarState({
//                             open: true, severity: 'success',
//                             bgcolor: alertColors.success, message: response.message.responseMessage || 'Backup Setting has been saved successfully!'
//                         });
//                         onCloseModal();
//                         fetchAllClients();

//                     } else if (response) {
//                         for(let i = 0; i<response.data.errors.length; i++){
//                             setShowPageLoader(false);
//                             setSnackBarState({
//                                 open: true, severity: 'error',
//                                 bgcolor: alertColors.error, message: response.data.errors[i] || 'Backup Setting has not been saved!'
//                             });
//                         }
                        
//                     }

//                     resolve(true);
//                 }
//             } catch (e) {
//                 setShowPageLoader(false);
//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: 'Something went wrong!'
//                 });
//             }
//         });
//     }

//     const updateClientStatus = async (status) => {
//         try {

//             setShowPageLoader(true);
//             const data = {
//                 "clientId": selectedClient.clientId,
//                 "eStatus": status,
//             };
//             const response = await _api.post('/client/change_status', data);
//             if (response && response.data && response.data.statusCode === 200) {

//                 setSnackBarState({
//                     open: true, severity: 'success',
//                     bgcolor: alertColors.success, message: response.data.responseMessage || "Client has been Updated!",

//                 });
//                 closeStatusUpdateModal();
//                 fetchAllClients(true);
//                 setShowPageLoader(false);

//             } else if (response) {

//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[0] : 'Client has not been Updated!'
//                 });
//                 closeStatusUpdateModal();
//                 setShowPageLoader(false);

//             }

//             setShowPageLoader(false);


//         } catch (err) {
//             setSnackBarState({
//                 open: true, severity: 'error',
//                 bgcolor: alertColors.error, message: err.data?.errors ? err.data.errors[0] : 'Client has not been Updated!'
//             });
//             closeStatusUpdateModal();
//             setShowPageLoader(false);
//         }

//     };



//     //Internal

//     const onRefresh = () => {
//         setSelectedClient(null)
//         setShowSkeletonLoader(true);
//         if (activeStatus_searchbar === statusLabels[clientStatus]) {
//             fetchAllClients();
//         } else {
//             onUpdateClientStatus(activeStatus_searchbar);

//         }

//     };

//     const onCloseModal = () => {
//         formik.resetForm();
//         setShowModal((current) => {
//             return { ...current, show: false };
//         });
//     };

//     const closeStatusUpdateModal = () => {
//         setShowStatusUpdateModal({
//             show: false,
//             mode: 'deactivate'
//         });
//     };

//     const setHeightOfGrid = () => {

//         if (gridListDivRef && gridListDivRef.current) {
//             gridListDivRef.current.style.height = gridListDivRef.current.clientHeight - 20 + 'px';
//         }
//     };

//     const ChangeUpload = () => {
//         setAllClients({ ...allClients, isUploadToStorage: !allClients.isUploadToStorage });
//     }
//     const ChangeSendEmail = () => {
//         setAllClients({ ...allClients, isSendMail: !allClients.isSendMail });
//         if(!allClients.isSendMail){
//             setEmailError('');
//         }
//     }
    
//     const setEmail = (Email) => {
//         setAllClients({ ...allClients, toEmailAddress: Email });
//             setEmailError('');
//     }
//     const setBackupPath1 = (Path1) => {
//         setAllClients({ ...allClients, backupPath1: Path1 });
//         setBackupError('');
//     }
//     const setBackupPath2 = (Path2) => {
//         setAllClients({ ...allClients, backupPath2: Path2 });
//     }

//     const onDelete = () => {
//         setShowStatusUpdateModal({
//             show: true,
//             mode: 'delete'
//         });
//     }

//     function _getConfirmationPopupData(mode) {
//         switch (mode) {
//             // case 'activate': return {
//             //     icon: faCheck,
//             //     text: " Are you sure to active the selected Client?",
//             //     color: "#198754",
//             //     submitText: "Active",
//             //     onClick: (e) => updateClientStatus(statuses.active)
//             // };
//             // case 'deactivate': return {
//             //     icon: faBan,
//             //     text: " Are you sure to deactive the selected Client?",
//             //     color: "#e6ad5c",
//             //     submitText: "Deactive",
//             //     onClick: (e) => updateClientStatus(statuses.deactive)
//             // };
//             case 'delete': return {
//                 icon: faTrash,
//                 text: " Are you sure to delete the selected Backup Schedule?",
//                 color: "#dc3545",
//                 submitText: "Delete",
//                 onClick: (e) => updateClientStatus(statuses.delete)
//             };
//             default:
//                 return {}
//         }
//     }

//     const handleSnackbarClose = () => {
//         setSnackBarState({ open: false, message: '' });
//     };

//     /**UI Piece */
//     function StatusChangedAlert({ _mode }) {
//         let _popupData = _getConfirmationPopupData(_mode);

//         return (
//             <div className="p-[15px]">

//                 <div className="flex flex-col items-center gap-y-[10px]">

//                     <div style={{ borderColor: _popupData.color }} className="w-[50px] h-[50px] rounded-full border-[2px] border-solid text-[#5bc0de] flex justify-center items-center" >
//                         <FontAwesomeIcon className="text-[24px]" icon={_popupData.icon} style={{ color: _popupData.color }} />
//                     </div>

//                     <div className="font-semibold font-mulish text-[18px] text-[#696c74]">{_popupData.text}</div>

//                 </div>


//             </div>
//         )
//     }

//     /**Effects */
//     useEffect(() => {
//         setHeightOfGrid();
//         document.title = 'Backup Setting - Zibma Infotech';
//     }, []);

//     useEffect(
//         () => {
//             setShowSkeletonLoader(true)
//             setTimeout(
//                 () => {

//                     fetchAllClients()
//                 }, 300
//             )
//         }, []
//     )

//     useEffect(
//         () => {
//             if (!shouldRunEffect) return
//             fetchAllClients(true)
//         }, [_searchText]
//     )

//     useEffect(() => {
//         if (!shouldRunEffect) return
//         fetchAllClients();
//         setHeaderButtons((current) => {
//             return {
//                 ...current,
//                 active: clientStatus === 2,
//                 deactive: clientStatus === 1
//             };
//         });

//     }, [clientStatus]);



//     useEffect(() => {
//         if (!allClients || !allClients.length) return;

//         let _sortType = sortType.clientName || "asc";
//         if (_sortType === "asc") {
//             // setAllClients(handleStringSort(allClients, "clientName", true));
//         }
//         if (_sortType === "desc") {
//             // setAllClients(handleStringSort(allClients, "clientName", false));
//         }
//         // setAllClients([...orderBy(allClients, 'clientName', sortType.clientName)]);
//     }, [sortType.clientName]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         let _sortType = sortType.serialNo || "asc";
//         if (_sortType === "asc") {
//             // setAllClients(handleNumberSort(allClients, "serialNo", true));
//         }
//         if (_sortType === "desc") {
//             // setAllClients(handleNumberSort(allClients, "serialNo", false));
//         }
//     }, [sortType.serialNo]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         setAllClients([...orderBy(allClients, 'updateTime', sortType.updateTime)]);
//     }, [sortType.updateTime]);

//     // useEffect(
//     //     () => {
//     //         if (allClients.length) {
//     //             if (allClients[0].serialNo && !hasSerialNo) {
//     //                 setHasSerialNo(true)
//     //             }
//     //         }
//     //     }, [allClients]
//     // )


//     useEffect(
//         () => {
//             if (showModal.show || showStatusUpdateModal.show) {
//                 setPopupIsOpen(true)
//             } else {
//                 setPopupIsOpen(false)
//             }
//         }, [showModal?.show, showStatusUpdateModal?.show]
//     )
//     useEffect(
//         () => {
//             const _onAddKeyboard = (event) => {
//                 if (event.altKey && event.key) {
//                     if (event.key.toLowerCase() === "n" && headerButtons.add && !popupIsOpen) {
//                         if (onAddClient) onAddClient();
//                     }
//                     if (event.key.toLowerCase() === "u" && headerButtons.edit && !popupIsOpen) {
//                         if (onEditClient && selectedClient) onEditClient();
//                     }
//                     if (event.key.toLowerCase() === "x" && headerButtons.delete) {
//                         if (onDelete && selectedClient && !popupIsOpen) onDelete();
//                     }
//                 }
//                 // if (event.key === "Enter") {
//                 //   if (showModal.show) {
//                 //     formik.handleSubmit()
//                 //   }
//                 // }
//             }
//             document.onkeydown = _onAddKeyboard;
//             return () => {
//                 document.removeEventListener("keydown", _onAddKeyboard)
//             }
//         }, [headerButtons, selectedClient, popupIsOpen]
//     )

//         return (

//             <>
//                 <div className=" h-full relative overflow-hidden bg-[#D8DCE3] py-[8px] ">
//                     {/* Loaders and Alerts */}
//                     <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />
//                     <Snackbar
//                         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                         open={snackBarState.open}
//                         severity={snackBarState.severity}
//                         onClose={handleSnackbarClose}
//                         key={'top' + 'right'}
//                         autoHideDuration={5000}
//                     >
//                         <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#FFFFFF', background: snackBarState.bgcolor }}>
//                             {snackBarState.message}
//                         </Alert>
//                     </Snackbar>


//                     <PathInfo fontAwesomeIcon={faGear} />

//                     {/* Header */}
//                     <div className="flex flex-col px-[10px] pt-[15px] bg-white h-[calc(100%-35px)] overflow-auto">
//                         <div className="pb-0">
//                             <label className="text-[#696c74]">Backup Setting for <span className="text-black">{ProjectName}</span></label>
//                         </div>
//                         <div className='max-w-[700px] w-full mt-[10px]'>
//                             <form>
//                                 <div className="px-[15px] py-[5px] max-[767px]:w-[100%]">
//                                     <div className="mb-[20px] bg-[#fafaf8] border rounded p-2 form-setting">
//                                         <div className="mb-[20px] relative max-[767px]:w-[100%]">
//                                             <input
//                                                 className="peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="serialNumber3"
//                                                 type="text"
//                                                 placeholder="Backup Path 1st"
//                                                 name="serialNumber"
//                                                 onChange={(e) => setBackupPath1(e.target.value)}
//                                                 value={allClients.backupPath1}
//                                                 required
//                                             />
//                                             <label
//                                                 htmlFor="serialNumber3"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 Backup Path 1st <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                             </label>
//                                             <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                             {backupError}
//                                         </div>
//                                         </div>
//                                         <div className="mb-[20px] relative">
//                                             <input
//                                                 className="peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="serialNumber4"
//                                                 type="text"
//                                                 placeholder="Backup Path 2nd"
//                                                 name="serialNumber"
//                                                 onChange={(e) => setBackupPath2(e.target.value)}
//                                                 value={allClients.backupPath2}
//                                             />
//                                             <label
//                                                 htmlFor="serialNumber4"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 Backup Path 2nd 
//                                                 {/* <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span> */}
//                                             </label>
//                                             {/* <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                                 {formik.errors.serialNumber && formik.touched.serialNumber && formik.errors.serialNumber}
//                                             </div> */}
//                                         </div>

//                                         <div className="flex justify-between mb-[20px] max-[767px]:block">
//                                             <div class="flex items-center max-[767px]:mb-4">
//                                                 <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => ChangeUpload()}
//                                                     checked={allClients.isUploadToStorage}
//                                                 />
//                                                 <label for="default-checkbox" class="ml-2 text-sm font-normal font-mulish text-[14px] select-none"> Upload Backup To Online Storage</label>
//                                             </div>
//                                             <div class="flex items-center">
//                                                 <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
//                                                 onClick={(e) => ChangeSendEmail()}
//                                                 checked={allClients.isSendMail}/>
//                                                 <label for="checked-checkbox" class="ml-2 text-sm font-normal font-mulish text-[14px] select-none">Send Backup Confirmation Mail</label>
//                                             </div>
//                                         </div>
//                                             {
//                                                 allClients.isSendMail === true ? (
//                                                     <div className="mb-[20px] relative">
//                                             <input
//                                                 className="peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="emailId"
//                                                 type="text"
//                                                 placeholder="email address"
//                                                 name="emailId"
//                                                 onInput={(e) => setEmail(e.target.value)}
//                                                 value={allClients.toEmailAddress}
//                                             />
//                                             <label
//                                                 htmlFor="emaiId"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 To Email ID <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                             </label>
//                                             <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                                 {emailError}
//                                             </div>
//                                         </div>
//                                                 ) : null
//                                             }
//                                         <div className="mb-[20px] font-mulish text-[14px]">
//                                             <label className="mb-3 font-normal">Last Backup Time: <span className="font-medium">{backupTime.lastBackupTime ? formatTime(backupTime.lastBackupTime) : ''}</span></label>
//                                         </div>
//                                         <div className="font-mulish text-[14px]">
//                                             <label className="mb-3 font-normal">Last Upload Time: <span className="font-medium">{backupTime.lastUploadTime ? formatTime(backupTime.lastUploadTime) : ''}</span></label>
//                                         </div>

//                                     </div>
//                                     <div>
//                                         <div className="flex items-center justify-end mt-[5px]">
//                                             <div className="text-[14px] font-mulish font-semibold flex gap-x-[10px]">
//                                                 <Link to={'/project'}>
//                                                 <button className="hover:opacity-[0.88] rounded-[4px] pt-[5px] pb-[6px] w-[65px] text-black bg-[#f6f0f6]">Cancel</button>
//                                                 </Link>
//                                                 <button className={`hover:opacity-[0.88] rounded-[4px] pt-[5px] pb-[6px] w-[65px] text-white bg-gradient-to-r from-[#259dab] to-[#2574ab]`} onClick={(e)=>{saveClient(e)}}>Save</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>


//                     </div>
//                     {/* </>
//         ) : (
//           <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] max-[767px]:max-h-[calc(100%-104px)] flex flex-col max-[767px]:overflow-x-auto `}>
//             <h3>Not Allowed</h3>
//           </div>
//         )
//         } */}


//                 </div>



//             </>



//         )
// }