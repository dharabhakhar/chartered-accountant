// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCheck, faTrash, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
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
// import { _fetchAllClients, _fetchAllProjectGroup, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveClient, _saveProjectGroup, _saveProjectStatus } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Client() {

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             add: decode?.claims.includes(2) ? true : false,
//             edit: decode?.claims.includes(3) ? true : false,
//             active: decode?.claims.includes(3) ? true : false,
//             deactive: decode?.claims.includes(3) ? true : false,
//             delete: decode?.claims.includes(4) ? true : false,
//             refresh: true,
//         }
//     );
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


//     //dynamic data
//     const [allClients, setAllClients] = useState([])
//     const [userPermission, setUserPermission] = useState([])
//     const [selectedClient, setSelectedClient] = useState(null)
//     const [_searchText, set_SearchText] = useState("")
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false)
//     const [updateFlag, setUpdateFlag] = useState(false);
//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     const [sortType, setSortType] = useState({
//         clientName: 'asc',
//         serialNo: 'asc'
//     });


//     /**Refs */
//     const gridListDivRef = useRef(null)

//     /**Form Handling */
//     const formik = useFormik({
//         initialValues: {
//             clientName: '',
//             clientSrNo: ''
//         },
//         validateOnMount: true,
//         validate: (values) => {
//             const errors = {};

//             if (!values.clientName) {
//                 errors.clientName = 'Group Name is Required';
//             } else if (values.clientName.length > 50) {
//                 errors.clientName = 'Maximum 50 characters are allowed';
//             }

//             if (!values.clientSrNo) {
//                 errors.clientSrNo = 'serial number is required';
//             } else if (values.clientSrNo.length > 50) {
//                 errors.clientSrNo = 'Maximum 50 characters are allowed';
//             }

//             return errors;
//         },
//         onSubmit: async (values) => {
//             if (formik.isValid) {
//                 setPopupOverlay(true);
//                 await saveClient(showModal.mode === 'edit' ? selectedClient.projectGroupId : undefined);
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

//         console.log(_searchText);
//         console.log(clientStatus);
//         const response = await _fetchAllProjectGroup(_searchText, clientStatus)
//         // const response1 = await _fetchUser(decode.userId)

//         // if (response1 && response1.status === 200) {
//         //     setUserPermission(response1.data || []);
//         // }

//         if (response && response.status === 200) {
//             setAllClients(response.data || []);
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
//         setUpdateFlag(!updateFlag);
//     }

//     const onUpdateClientStatus = (status, searchText) => {
//         setSelectedClient(null)
//         if (status === 'active') {
//             setClientStatus(statuses.active);
//         } else if (status === 'deactive') {
//             setClientStatus(statuses.deactive);
//         }
//         set_SearchText(searchText)
//         setUpdateFlag(!updateFlag);
//     };

//     //Write
//     const onAddClient = useCallback(() => {
//         setShowPageLoader(true)
//         const nextSerialNo = calculateNextSerialNumber(allClients);
//         fetchAllClients().then((clients) => {
//         if (allClients.length > 0) {
//             let formData = {
//                 clientName:'',
//                 clientSrNo: nextSerialNo
//             }
//             formik.setValues(formData);
//         }
//         setShowPageLoader(false)
//         setShowModal((current) => {
//             return { ...current, show: true, mode: 'add' };
//         });
//         validateForm();
//     })
//     }, [formik, fetchAllClients]);

//     function calculateNextSerialNumber(clients) {
//         if (clients.length === 0) {
//           return 1; 
//         }
//         const biggestSerialNo = clients.reduce((max, client) => {
//           return client.serialNo > max ? client.serialNo : max;
//         }, 0);
      
//         return biggestSerialNo + 1;
//       }

//     const onEditClient = async (_client) => {
//         if (!_client) {
//             _client = selectedClient;
//         }
//         setShowPageLoader(true)
//         const formData = {
//             clientName: _client?.projectGroupName,
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

//     const saveClient = (GroupId) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 if (formik.isValid) {

//                     const response = await _saveProjectGroup(GroupId || 0, formik.values.clientName, formik.values.clientSrNo);

//                     if (response && response.status && response.message.statusCode === 200) {
//                         setSnackBarState({
//                             open: true, severity: 'success',
//                             bgcolor: alertColors.success, message: response.message.responseMessage || 'Project Group has been saved successfully!'
//                         });
//                         setPopupOverlay(false);
//                         onCloseModal();
//                         fetchAllClients();

//                     } else if (response) {
//                         for(let i = 0; i<response.data.errors.length; i++){
//                             setSnackBarState({
//                                 open: true, severity: 'error',
//                                 bgcolor: alertColors.error, message: response.data.errors[i] || 'Project Group has not been saved!'
//                             });
//                         }
                        
//                         setPopupOverlay(false);
//                     }

//                     resolve(true);
//                 }
//             } catch (e) {
//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: 'Something went wrong!'
//                 });
//                 setPopupOverlay(false);
//             }
//         });
//     };

//     const updateClientStatus = async (status) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const response = await _saveProjectStatus(selectedClient.projectGroupId, status);

//                 if (response && response.status && response.message.statusCode === 200) {
//                     setSnackBarState({
//                         open: true, severity: 'success',
//                         bgcolor: alertColors.success, message: response.message.responseMessage || 'Project Group has been Updated successfully!'
//                     });
//                     setPopupOverlay(false);
//                     onCloseModal();
//                     fetchAllClients();

//                 } else if (response) {
//                     for(let i = 0; i<response.data.errors.length; i++){
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.data.errors[i] || 'Project Group has not been Updated!'
//                         });
//                     }
                   
//                     setPopupOverlay(false);
//                 }

//                 resolve(true);

//             } catch (e) {
//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: 'Something went wrong!'
//                 });
//                 setPopupOverlay(false);
//             }
//         })
//     };



//     //Internal
//     function onClientSelect(_client) {
//         if (selectedClient && (selectedClient.projectGroupId === _client.projectGroupId)) {
//             setSelectedClient(null);
//         } else {
//             setSelectedClient(_client);
//         }
//     }

//     function openClientInEditMode(_client) {
//         setSelectedClient(_client)
//         onEditClient(_client);
//     }

//     const onRefresh = () => {
//         setSelectedClient(null)
//         setShowSkeletonLoader(true);
//         if (activeStatus_searchbar === statusLabels[clientStatus]) {
//             fetchAllClients();
//         } else {
//             onUpdateClientStatus(activeStatus_searchbar);

//         }
//         setActiveStatus_searchBar(activeStatus_searchbar)

//     };

//     const onCloseModal = () => {
//         formik.resetForm();
//         setShowModal((current) => {
//             return { ...current, show: false };
//         });
//         setShowStatusUpdateModal((current) => {
//             return { ...current, show: false };
//         });
//     };

//     const closeStatusUpdateModal = () => {
//         setShowStatusUpdateModal({
//             show: false,
//             mode: 'deactivate'
//         });
//     };
//     const sortByClientName = () => {
//         setSortType((current) => {
//             return { ...current, clientName: current.clientName === 'asc' ? 'desc' : 'asc' };
//         });
//     };

//     const sortByUpdateTime = () => {
//         setSortType((current) => {
//             return { ...current, updateTime: current.updateTime === 'asc' ? 'desc' : 'asc' };
//         });
//     };

//     const sortBySerialNo = () => {
//         setSortType((current) => {
//             return { ...current, serialNo: current.serialNo === 'asc' ? 'desc' : 'asc' };
//         });
//     };

//     const setHeightOfGrid = () => {

//         if (gridListDivRef && gridListDivRef.current) {
//             gridListDivRef.current.style.height = gridListDivRef.current.clientHeight - 20 + 'px';
//         }
//     };

//     const onActivateClient = () => {
//         setShowStatusUpdateModal({
//             show: true,
//             mode: 'activate'
//         });
//     };

//     const onDeactivateClient = () => {
//         setShowStatusUpdateModal({
//             show: true,
//             mode: 'deactivate'
//         });
//     };

//     const onDelete = () => {
//         setShowStatusUpdateModal({
//             show: true,
//             mode: 'delete'
//         });
//     }

//     function _getConfirmationPopupData(mode) {
//         switch (mode) {
//             case 'activate': return {
//                 icon: faCheck,
//                 text: " Are you sure to active the selected Project Group?",
//                 color: "#3a6d7e",
//                 submitText: "Active",
//                 onClick: (e) => updateClient(statuses.active),
//             };
//             case 'deactivate': return {
//                 icon: faBan,
//                 text: " Are you sure to deactive the selected Project Group?",
//                 color: "#e6ad5c",
//                 submitText: "Deactive",
//                 onClick: (e) => updateClient(statuses.deactive),
//             };
//             case 'delete': return {
//                 icon: faTrash,
//                 text: " Are you sure to delete the selected Project Group?",
//                 color: "#dc3545",
//                 submitText: "Delete",
//                 onClick: (e) => updateClient(statuses.delete)
//             };
//             default:
//                 return {}
//         }
//     }
//     const updateClient = (mode) => {
//         setPopupOverlay(true);
//         updateClientStatus(mode)
//     }

//     const handleSnackbarClose = () => {
//         setSnackBarState({ open: false, message: '' });
//     };

//     function generateKey() {
//         try {
//             setKeyGenerateLoading(true);
//             fetch(CLIENT_KEY_GENERATE_URL).then(
//                 (res) => res.json()
//             ).then(
//                 (_response) => {
//                     let _generatedKey = _response.password || "";
//                     formik.setFieldValue("clientKey", _generatedKey)
//                     setKeyGenerateLoading(false)
//                 }
//             ).catch(
//                 (err) => {
//                     formik.setFieldTouched("clientKey", true)
//                     setTimeout(
//                         () => {
//                             formik.setFieldError("clientKey", "Failed to generate key")

//                         }, 50
//                     )
//                     setKeyGenerateLoading(false)
//                 }
//             )
//         } catch (err) {
//             if (keyGenerateLoading) {
//                 setKeyGenerateLoading(false)
//                 formik.setFieldTouched("clientKey", true)
//                 setTimeout(
//                     () => {
//                         formik.setFieldError("clientKey", "Failed to generate key")

//                     }, 50
//                 )
//             }
//         }
//     }

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

//     function createConfirmPopup() {
//         const _data = _getConfirmationPopupData(showStatusUpdateModal.mode);

//         return (
//             <ConfirmPopup openPopup={showStatusUpdateModal.show}
//                 title={"Confirmation"}
//                 closingMethod={(e) => closeStatusUpdateModal()}
//                 submitMethod={_data.onClick}
//                 color={_data.color}
//                 submitText={_data.submitText}>
//                 <div className="border-b-solid border-b-[#e5e5e5]">
//                     <StatusChangedAlert _mode={showStatusUpdateModal.mode} />
//                 </div>
//             </ConfirmPopup>
//         )
//     }
//     /**Effects */
//     // useEffect(() => {
//     //     if (allClients.length > 0) {
//     //         let formData = {
//     //             clientSrNo: allClients[allClients.length - 1].serialNo + 1
//     //         }
//     //         // Update the form values using formik.setValues
//     //         formik.setValues(formData);
//     //     }
//     // }, [allClients]);
//     useEffect(() => {
//         if (statuses.active) {
//             setHeaderButtons((prevButtons) => ({
//                 ...prevButtons,
//                 active: false,
//                 deactive: true,
//             }));
//         } else {
//             // User is inactive, so set 'active' to false and 'deactive' to true
//             setHeaderButtons((prevButtons) => ({
//                 ...prevButtons,
//                 active: true,
//                 deactive: false,
//             }));
//         }
//     }, [statuses.active, statuses.deactive]);

//     useEffect(() => {
//         setHeightOfGrid();
//         document.title = 'Project Group - Zibma Infotech';
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

//     // useEffect(
//     //     () => {
//     //         if (!shouldRunEffect) return
//     //         fetchAllClients(true)
//     //     }, [_searchText]
//     // )

//     useEffect(() => {
//         if (!shouldRunEffect) return
//         fetchAllClients(true);
//         setHeaderButtons((current) => {
//             return {
//                 ...current,
//                 active: clientStatus === 2,
//                 deactive: clientStatus === 1
//             };
//         });

//     }, [clientStatus, updateFlag, _searchText]);



//     useEffect(() => {
//         if (!allClients || !allClients.length) return;

//         const sortedClients = [...allClients];
//         if (sortType.clientName === 'asc') {
//             sortedClients.sort((a, b) => a.projectGroupName?.localeCompare(b.projectGroupName) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.projectGroupName?.localeCompare(a.projectGroupName) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.clientName]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         setAllClients([...orderBy(allClients, 'serialNo', sortType.serialNo)]);
//     }, [sortType.serialNo]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         setAllClients([...orderBy(allClients, 'updateTime', sortType.updateTime)]);
//     }, [sortType.updateTime]);

//     useEffect(
//         () => {
//             if (allClients.length) {
//                 if (allClients[0].serialNo && !hasSerialNo) {
//                     setHasSerialNo(true)
//                 }
//             }
//         }, [allClients]
//     )

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
//                     if (event.key.toLowerCase() === "r" && headerButtons.deactive && !popupIsOpen) {
//                         if (onDeactivateClient && selectedClient && !popupIsOpen) onDeactivateClient();
//                     }
//                     if (event.key.toLowerCase() === "a" && headerButtons.active) {
//                         if (onActivateClient && selectedClient && !popupIsOpen) onActivateClient();
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


//     return (

//         <>
//             <div className=" h-full relative overflow-hidden bg-[#D8DCE3] py-[8px] ">
//                 <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />
//                 {/* {
//                     (userPermission.length > 1 &&
//                         userPermission[0].canView === true &&
//                         userPermission[0].canAdd === true &&
//                         userPermission[0].canEdit === true &&
//                         userPermission[0].canPrint === true &&
//                         userPermission[0].canDelete === true) ? (
//                             <>
//              */}
//                 {/* Loaders and Alerts */}

//                 <Snackbar
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     open={snackBarState.open}
//                     severity={snackBarState.severity}
//                     onClose={handleSnackbarClose}
//                     key={'top' + 'right'}
//                     autoHideDuration={5000}
//                 >
//                     <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#FFFFFF', background: snackBarState.bgcolor }}>
//                         {snackBarState.message}
//                     </Alert>
//                 </Snackbar>


//                 <PathInfo fontAwesomeIcon={faUserTie} />

//                 {/* Add and Edit Popus */}
//                 {showModal.show && (
//                     <FormPopup openPopup={showModal.show} overlay={popupOverlay} submitMethod={formik.handleSubmit} submitText={"Save"} title={showModal.mode === 'add' ? 'Add Project Group' : 'Edit Project Group'} closingMethod={() => onCloseModal()} disabledSubmit={formik.isValid}>

//                         <form onSubmit={formik.handleSubmit}>
//                             <div className=" border-b w-full">
//                                 <div className="px-[25px] py-[10px]">
//                                     <div className="my-[15px] relative">
//                                         <div className="mt-[15px] relative">
//                                             <input type="text"
//                                                 className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="clientName"
//                                                 placeholder="Group Name"
//                                                 name="clientName"
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 value={formik.values.clientName}
//                                                 autoFocus

//                                             />
//                                             <label
//                                                 htmlFor="clientName"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 Group Name <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                             </label>
//                                         </div>
//                                         <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                             {formik.errors.clientName && formik.touched.clientName && formik.errors.clientName}
//                                         </div>
//                                     </div>

//                                     {/* <div className="my-[15px] relative">
//                                         <div className="mt-[15px] relative flex items-center gap-2">
//                                             <div className="w-full">
//                                                 <input type="text"
//                                                     className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                     id="clientKey"
//                                                     placeholder="Profile Name"
//                                                     name="clientKey"
//                                                     onChange={formik.handleChange}
//                                                     onBlur={formik.handleBlur}
//                                                     value={formik.values.clientKey}
//                                                     disabled={true}
//                                                 />
//                                                 <label
//                                                     htmlFor="clientKey"
//                                                     className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                                 >
//                                                     Client Key <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                                 </label>
//                                             </div>
//                                             <div className="flex items-center gap-1 w-max">
//                                                 {
//                                                     keyGenerateLoading &&
//                                                     <RotatingLines
//                                                         strokeColor="#4fa94d"
//                                                         strokeWidth="5"
//                                                         animationDuration="0.75"
//                                                         width="20"
//                                                         visible={true}
//                                                     />
//                                                 }

//                                                 <button type="button" onClick={generateKey} className=" right-2 top-0 px-4 font-medium h-[39px] hover:bg-green-700 bg-green-800 text-white shado-sm border border-green-700 rounded-md text-sm">Generate</button>
//                                             </div>

//                                         </div>
//                                         <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                             {formik.errors.clientKey && formik.touched.clientKey && formik.errors.clientKey}
//                                         </div>
//                                     </div> */}

//                                     <div className="my-[15px] relative">
//                                         <div className="mt-[15px] relative">
//                                             <input type="text"
//                                                 className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="clientSrNo"
//                                                 placeholder="Profile Name"
//                                                 max={"99999"}
//                                                 min={'1'}
//                                                 name="clientSrNo"
//                                                 onChange={
//                                                     (event) => {
//                                                         event.preventDefault()
//                                                         const _key = event.nativeEvent.data;
//                                                         if (_key === "+" || _key === "-" || isNaN(_key)) return;
//                                                         if (event.target.value.length > 5 || (_key && event.target.value < 1)) return;
//                                                         formik.handleChange(event);
//                                                     }}
//                                                 onBlur={formik.handleBlur}
//                                                 value={formik.values.clientSrNo}
//                                             />
//                                             <label
//                                                 htmlFor="clientSrNo"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 Serial No <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                             </label>
//                                         </div>
//                                         <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                             {formik.errors.clientSrNo && formik.touched.clientSrNo && formik.errors.clientSrNo}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-4 justify-end text-[15px] max-[450px]:justify-center border-t px-[25px] py-3 font-semibold'>
//                                     <button type='button' className={` rounded-[4px] pt-[5px] pb-[6px] max-[450px]:w-[100px] w-[85px] text-black bg-[#f6f0f6] hover:opacity-[0.88]`} onClick={() => onCloseModal()}>Cancel</button>
//                                     <button type='submit' className={`${formik.isValid ? 'cursor-pointer' : 'cursor-not-allowed'} bg-gradient-to-r from-[#259dab] to-[#2574ab] text-white rounded px-3 py-1.5 capitalize  max-[450px]:w-[100px] w-[85px]`} >{"Save"}</button>
//                                 </div>


//                             </div>


//                         </form>
//                     </FormPopup>




//                 )}

//                 {/* Status Change Alerts/Popups */}
//                 {showStatusUpdateModal.show && (
//                     createConfirmPopup()
//                 )}

//                 {/* Header */}
//                 <div className="px-[10px] bg-white h-[calc(100%-35px)]">
//                     <Header
//                         isLoading={showSkeletonLoader}
//                         isItemSelected={!!selectedClient}
//                         show={headerButtons}
//                         onAdd={onAddClient}
//                         onEdit={onEditClient}
//                         onDeactivate={onDeactivateClient}
//                         onActivate={onActivateClient}
//                         onDelete={onDelete}
//                         onSearch={onClientSearch}
//                         onSearchClick={onUpdateClientStatus}
//                         onRefresh={onRefresh}
//                         initialSearchValue={_searchText}
//                         activeStatus={clientStatus}
//                         searchStatusModifier={setActiveStatus_searchBar}
//                     />

//                     {/* Skeleton for Grid */}
//                     <SkeletonLoaderForGrid show={showSkeletonLoader} />

//                     {/* Grid */}

//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec bg-white h-[calc(100%-53px)] max-[767px]:h-[calc(100%-112px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                         <div className="grow flex flex-col">

//                             <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                                 <div className={` flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[140px] px-[10px] ${hasSerialNo ? " w-[160px] " : " w-[140px] "} `}>
//                                     <div>Sr No.</div>
//                                     {hasSerialNo &&
//                                         <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                     }

//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[100%] px-[10px]">
//                                     <div>Group Name</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByClientName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>

//                                 {/* <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>key</div>
                                    
//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>last update</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByUpdateTime()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div> */}

//                             </div>

//                             <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap w-full h-[377px]">
//                                 {!!allClients.length && (
//                                     allClients.map((_client, index) => {
//                                         return (
//                                             <div onClick={(e) => onClientSelect(_client)} onDoubleClick={(e) => openClientInEditMode(_client)} key={_client.projectGroupId} className={`${(selectedClient && selectedClient.projectGroupId === _client.projectGroupId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                                                 <div className={`flex items-center h-full w-[140px] px-[10px] py-[5px] overflow-hidden ${hasSerialNo ? " w-[160px] " : " w-[140px] "}  `}>
//                                                     <div className="overflow-hidden text-ellipsis">{_client.serialNo}</div>
//                                                 </div>

//                                                 <div className="flex items-center h-full w-[100%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.projectGroupName}</div>
//                                                 </div>

//                                             </div>
//                                         );
//                                     })
//                                 )}



//                                 {!!!allClients.length && (
//                                     <div className="flex mt-[30px] justify-center font-mulish font-semibold text-[#696c74bd] text-[17px]">No Data Available!</div>
//                                 )}
//                             </div>
//                         </div>


//                         <div className="font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between">Total Record Count: {allClients?.length}</div>
//                     </div>

//                 </div>



//             </div>
//             {/* </>
            
//             ):(
//                 <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] max-[767px]:max-h-[calc(100%-104px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                             <h3>Not Allowed</h3>
//                         </div>
//                     )} */}
        
//         </>



//     )
// }