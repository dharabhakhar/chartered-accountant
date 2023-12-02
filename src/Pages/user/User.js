// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCheck, faClipboard, faTrash, faUser, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
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
// import { _fetchAllClients, _fetchProfilePicture, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveClient } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import { _deleteUser } from "../../Utils/APIs/DeleteAPIs";
// import { useNavigate } from "react-router-dom/dist";
// import SuccessIcon from '@mui/icons-material/CheckCircle';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningIcon from '@mui/icons-material/Warning';
// import ErrorIcon from '@mui/icons-material/Error';
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Backup() {
//     const navigate = useNavigate();

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             add: decode?.claims.includes(27) ? true : false,
//             delete: decode?.claims.includes(29) ? true : false,
//             permission: decode?.claims.includes(31) ? true : false,
//             refresh: true
//         }
//     );
//     const [showModal, setShowModal] = useState({
//         show: false,
//         mode: 'add'
//     });
//     const [showStatusUpdateModal, setShowStatusUpdateModal] = useState({
//         show: false,
//         mode: 'delete'
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
//     const [profileImage, setprofileImage] = useState([])
//     // const [userPermission, setUserPermission] = useState([])
//     const [selectedClient, setSelectedClient] = useState(null)
//     const [_searchText, set_SearchText] = useState("")
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false)
//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     const [sortType, setSortType] = useState({
//         firstName: 'asc',
//         serialNo: 'asc'
//     });


//     /**Refs */
//     const gridListDivRef = useRef(null)

//     /**Form Handling */
//     const formik = useFormik({
//         initialValues: {
//             username: ''
//         },
//         validateOnMount: true,
//         validate: (values) => {
//             const errors = {};

//             if (!values.username) {
//                 errors.clientName = 'Required';
//             } else if (values.username.length > 100) {
//                 errors.clientName = 'Maximum 100 characters are allowed';
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

//         const response = await _fetchAllClients(_searchText)

//         if (response && response.status === 200) {
//             setAllClients(response.data || []);
//             const allPhotoGuids = response.data.map(user => user.photoGuid).filter(photoGuid => photoGuid !== null);

//             const response1 = await _fetchProfilePicture(allPhotoGuids)
//             if (response1 && response1.status === 200) {
//                 const profileImages = response1.data || [];
//                 setprofileImage(profileImages);
          
//                 const clientsWithImages = response.data.map((_client, index) => {
//                     const matchingProfileImage = profileImages.find(image => image.guid === _client.photoGuid);
                  
//                     return {
//                       ..._client,
//                       profileImage: matchingProfileImage || null,
//                     };
//                   });
                  
          
//                 setAllClients(clientsWithImages);
//                 console.log(clientsWithImages);

//             }
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

//     const onPermission = (_client) => {
//         if (!_client) {
//             _client = selectedClient;
//         }
//         localStorage.setItem('userId', _client.userId);
//         localStorage.setItem('userName', _client.firstName)
//         setSelectedClient(null)
//         setShowSkeletonLoader(true);
//         navigate(`/user/permission`);
//     };

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

//     const saveClient = (_clientId) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 if (formik.isValid) {

//                     const response = await _saveClient(formik.values.username);

//                     if (response && response.status === 200) {
//                         setSnackBarState({
//                             open: true, severity: 'success',
//                             bgcolor: alertColors.success, message: response.message || 'User has been added successfully!'
//                         });
//                         setPopupOverlay(false);
//                         onCloseModal();
//                         fetchAllClients();

//                     } else if (response) {
//                         for(let i = 0; i<response.data.errors.length; i++){
//                             setSnackBarState({
//                                 open: true, severity: 'error',
//                                 bgcolor: alertColors.error, message: response.data.errors[i] || 'User has not been added!'
//                             });
//                         }
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.message || 'User has not been added!'
//                         });
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

//     const DeleteUser = async (_client) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const response = await _deleteUser(_client);

//                 if (response && response.status === 200) {
//                     setSnackBarState({
//                         open: true, severity: 'success',
//                         bgcolor: alertColors.success, message: response.message || 'User has been deleted successfully!'
//                     });
//                     setPopupOverlay(false);
//                     setShowStatusUpdateModal({
//                         show: false,
//                         mode: 'delete'
//                     })
//                     fetchAllClients();
//                     // updateClientStatus(statuses.delete)

//                 } else if (response) {
//                     for(let i = 0; i<response.data.errors.length; i++){
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.data.errors[i] || 'User has not been deleted!'
//                         });
//                     }
                    
//                     setPopupOverlay(false);
//                 }

//                 // resolve(true);
//             } catch (e) {
//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: 'Something went wrong!'
//                 });
//             }
//         })
//     }



//     //Internal
//     function onClientSelect(_client) {
//         if (selectedClient && (selectedClient.clientId === _client.clientId)) {
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
//         setSelectedClient(null);
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
//     const sortByClientName = () => {
//         setSortType((current) => {
//             return { ...current, firstName: current.firstName === 'asc' ? 'desc' : 'asc' };
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
//                 text: " Are you sure to delete the selected User?",
//                 color: "#dc3545",
//                 submitText: "Delete",
//                 onClick: (e) => { DeleteUser(selectedClient.employeeId) }
//             }
//             default:
//                 return {}
//         }
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
//     useEffect(() => {
//         setHeightOfGrid();
//         document.title = 'User - Zibma Infotech';
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

//         const sortedClients = [...allClients];
//         if (sortType.firstName === 'asc') {
//             sortedClients.sort((a, b) => a.firstName?.localeCompare(b.firstName) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.firstName?.localeCompare(a.firstName) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.firstName]);

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
//                     if (event.key.toLowerCase() === "x" && headerButtons.delete) {
//                         if (onDelete && selectedClient && !popupIsOpen) onDelete();
//                     }
//                 }
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
//                 {/* Loaders and Alerts */}
//                 <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />

//                 <Snackbar
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     open={snackBarState.open}
//                     severity={snackBarState.severity}
//                     onClose={handleSnackbarClose}
//                     key={'top' + 'right'}
//                     autoHideDuration={5000}
//                 >
//                     <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#fff', background: snackBarState.bgcolor }} >
//                         {snackBarState.message}
//                     </Alert>
//                 </Snackbar>


//                 <PathInfo fontAwesomeIcon={faUser} />

//                 {/* Add and Edit Popus */}
//                 {showModal.show && (
//                     <FormPopup openPopup={showModal.show} overlay={popupOverlay} submitMethod={formik.handleSubmit} submitText={"Save"} title={showModal.mode === 'add' ? 'Add User' : 'Edit User'} closingMethod={() => onCloseModal()} disabledSubmit={formik.isValid}>

//                         <form onSubmit={formik.handleSubmit}>
//                             <div className=" border-b w-full">
//                                 <div className="px-[25px] py-[10px]">
//                                     <div className="my-[15px] relative">
//                                         <div className="mt-[15px] relative">
//                                             <input type="text"
//                                                 className="cursor-pointer peer font-mulish text-[14px] h-[40px] px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                                 id="clientName"
//                                                 placeholder="Enter Username"
//                                                 name="username"
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 value={formik.values.username}
//                                                 autoFocus
//                                             />
//                                             <label
//                                                 htmlFor="username"
//                                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                             >
//                                                 Username <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                                             </label>
//                                         </div>
//                                         <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                                             {formik.errors.username}
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
//                         onDelete={onDelete}
//                         onSearch={onClientSearch}
//                         onSearchClick={onUpdateClientStatus}
//                         initialSearchValue={_searchText}
//                         onRefresh={onRefresh}
//                         // activeStatus={clientStatus}
//                         hideStatusSearch={true}
//                         searchStatusModifier={setActiveStatus_searchBar}
//                         onPermission={onPermission}
//                     />

//                     {/* Skeleton for Grid */}
//                     <SkeletonLoaderForGrid show={showSkeletonLoader} />

//                     {/* Grid */}

//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''}  grid-sec bg-white h-[calc(100%-53px)] max-[767px]:h-[calc(100%-112px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                         <div className="grow flex flex-col">

//                             <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                                 <div className={` flex items-center justify-between uppercase font-bold bg-[#2574ab] h-full w-[140px] px-[10px] ${hasSerialNo ? " w-[160px] " : " w-[140px] "} `}>
//                                     <div>Sr No.</div>
//                                     {hasSerialNo &&
//                                             <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                         }

//                                 </div>

//                                 <div className="flex items-center justify-between uppercase font-bold bg-[#2574ab] h-full w-[100%] px-[10px]">
//                                     <div>User</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByClientName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>

//                             </div>
//                             <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap w-full h-[377px]">

//                                 {!!allClients.length && (
//                                     allClients.map((_client, index) => {

//                                         const clientProfileImage = _client.photoGuid !== null ? (_client.profileImage || { fileURL: require("../../Images/avatar.jpg") }) : { fileURL: require("../../Images/avatar.jpg") };


//                                         return (
//                                             <div onClick={(e) => onClientSelect(_client)} key={_client.userId} className={`${(selectedClient && selectedClient.userId === _client.userId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                                                 <div className={`flex items-center h-full w-[140px] px-[10px] py-[5px] overflow-hidden ${hasSerialNo ? " w-[160px] " : " w-[140px] "}`}>
//                                                     <div className="overflow-hidden text-ellipsis">{index + 1}</div>
//                                                 </div>

//                                                 <div className="flex items-center h-full w-[100%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">
//                                                         <img className="w-[25px] h-[25px] inline-block rounded-full me-5" src={clientProfileImage.fileURL} alt="" />
//                                                         {_client.firstName} {_client.lastName}</div>
//                                                 </div>

//                                             </div>
//                                         );
//                                     })
//                                 )}
//                             </div>

//                             {!!!allClients.length && (
//                                 <div className="flex mt-[30px] justify-center font-mulish font-semibold text-[#696c74bd] text-[17px]">No Data Available!</div>
//                             )}
//                         </div>

//                         <div className="font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between">Total Record Count: {allClients?.length}</div>
//                     </div>

//                 </div>

//                 {/* </>
//                     ):(
//                         <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] max-[767px]:max-h-[calc(100%-104px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                             <h3>Not Allowed</h3>
//                         </div>
//                     )} */}
//             </div>
//         </>



//     )
// }