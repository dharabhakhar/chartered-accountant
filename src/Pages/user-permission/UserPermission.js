// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCheck, faCloudUpload, faFileLines, faFileText, faTrash, faUserCheck, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
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
// import { _fetchAllClients, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveClient, _savePermission } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import SearchDatePicker from "../../UIComponents/SubHeader/SearchDatePicker";
// import { BsFileText, BsFileTextFill } from "react-icons/bs";
// import { useNavigate, useParams } from "react-router-dom/dist";
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Client() {
//     const userId = localStorage.getItem('userId');
//     const userName = localStorage.getItem('userName')
//     const navigate = useNavigate();

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             refresh: false,
//             ProjectFile: false,
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
//     // const [userPermission, setUserPermission] = useState([])
//     const [selectedClient, setSelectedClient] = useState('')
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false)
//     const [fromdate_search, setFromDate_search] = useState(false)
//     const [todate_search, setToDate_search] = useState(false)
//     const [fromdate, setFromDate] = useState(false)
//     const [todate, setToDate] = useState(false)
//     const [allCanView, setAllCanView] = useState(false);
//     const [allCanAdd, setAllCanAdd] = useState(false);
//     const [allCanEdit, setAllCanEdit] = useState(false);
//     const [allCanDelete, setAllCanDelete] = useState(false);
//     const [allCanPrint, setAllCanPrint] = useState(false);

//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     // const [sortType, setSortType] = useState({
//     //     clientName: 'asc',
//     //     updateTime: 'asc',
//     //     serialNo: 'asc'
//     // });

//     /**Refs */
//     const gridListDivRef = useRef(null)

//     /**Form Handling */
//     // const formik = useFormik({
//     //     initialValues: {
//     //         clientName: '',
//     //         clientKey: '',
//     //         clientSrNo: ''
//     //     },
//     //     validateOnMount: true,
//     //     validate: (values) => {
//     //         const errors = {};

//     //         if (!values.clientName) {
//     //             errors.clientName = 'Required';
//     //         } else if (values.clientName.length > 100) {
//     //             errors.clientName = 'Maximum 100 characters are allowed';
//     //         }

//     //         if (!values.clientKey) {
//     //             errors.clientKey = 'Required';
//     //         } else if (values.clientKey.length > 100) {
//     //             errors.clientKey = 'Maximum 100 characters are allowed';
//     //         }


//     //         if (!values.clientSrNo) {
//     //             errors.clientSrNo = 'Required';
//     //         } else if (values.clientSrNo.length > 100) {
//     //             errors.clientSrNo = 'Maximum 100 characters are allowed';
//     //         }

//     //         return errors;
//     //     },
//     //     onSubmit: async (values) => {
//     //         if (formik.isValid) {
//     //             setPopupOverlay(true);
//     //             await saveClient(showModal.mode === 'edit' ? selectedClient.clientId : undefined);
//     //         }
//     //     }
//     // });
//     // const validateForm = () => {
//     //     setTimeout(() => {
//     //         formik.validateForm();
//     //     }, 200);
//     // };

//     /**Methods */
//     //Read
//     const fetchAllClients = async () => {

//         if (!showSkeletonLoader) setShowPageLoader(true);

//         const response = await _fetchUser(userId);
//         // const response1 = await _fetchUser(decode.userId)

//         // if (response1 && response1.status === 200) {
//         //     setUserPermission(response1.data || []);
//         // }

//         if (response && response.status === 200) {
//             setAllClients(response.data || []);
//         }
//         setShowPageLoader(false);
//         setShowSkeletonLoader(false);
//         if (!shouldRunEffect) setShouldRunEffect(true)

//     }

//     // const onUpdateClientStatus = (status) => {
//     //     if (fromdate_search) {
//     //         setFromDate(fromdate_search)
//     //     }
//     //     if (todate_search) {
//     //         setFromDate(todate_search)
//     //     }
//     //     // setSelectedClient(null)
//     //     // if (status === 'active') {
//     //     //     setClientStatus(statuses.active);
//     //     // } else if (status === 'deactive') {
//     //     //     setClientStatus(statuses.deactive);
//     //     // }
//     // };

//     //Write
//     const onAddClient = useCallback(() => {
//         setShowModal((current) => {
//             return { ...current, show: true, mode: 'add' };
//         });
//         // validateForm();
//     }, []);

//     const onEditClient = async (_client) => {
//         // if (!_client) {
//         //     _client = selectedClient;
//         // }
//         // setShowPageLoader(true)
//         // const formData = {
//         //     clientName: _client?.clientName,
//         //     clientKey: _client?.clientKey,
//         //     clientSrNo: _client?.serialNo
//         // };
//         // formik.setValues(formData);
//         // setSelectedSocialAccountDropDown(socialAccount.socialPlatform)

//         // setShowPageLoader(false);
//         // setShowModal((current) => {
//         //     return { ...current, show: true, mode: 'edit' };
//         // });
//         // const response = await getImageFromDrive([slider.photoGuid], ImageSizeVariants._250X250, eFileModule.displayAttachment);
//         // if (response && response.data && response.data.lstFile && response.data.lstFile.length) {
//         //   setUploadedImageSrc(response.data.lstFile[0].fileURL);
//         // }
//         // validateForm();
//     };

//     const savePermission = () => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const response = await _savePermission(userId, allClients);

//                 if (response && response.status === 200) {
//                     setSnackBarState({
//                         open: true, severity: 'success',
//                         bgcolor: alertColors.success, message: response.message || 'User Permission has been saved successfully!'
//                     });
//                     setPopupOverlay(false);

//                 } else if (response) {
//                     setSnackBarState({
//                         open: true, severity: 'error',
//                         bgcolor: alertColors.error, message: response.message || 'Client has not been saved!'
//                     });
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
//         });
//     };

//     //Internal
//     // function onClientSelect(_client) {
//     //     if (selectedClient && (selectedClient.clientId === _client.clientId)) {
//     //         setSelectedClient(null);
//     //     } else {
//     //         setSelectedClient(_client);
//     //     }
//     // }

//     // function openClientInEditMode(_client) {
//     //     setSelectedClient(_client)
//     //     onEditClient(_client);
//     // }

//     // const onRefresh = () => {
//     //     setSelectedClient(null)
//     //     setShowSkeletonLoader(true);
//     //     if (activeStatus_searchbar === statusLabels[clientStatus]) {
//     //         fetchAllClients();
//     //     } else {
//     //         onUpdateClientStatus(activeStatus_searchbar);

//     //     }

//     // };

//     // const onProjectFile = () => {
//     //     // setSelectedClient(null)
//     //     setShowSkeletonLoader(true);
//     //     if (activeStatus_searchbar === statusLabels[clientStatus]) {
//     //         fetchAllClients();
//     //     } else {
//     //         onUpdateClientStatus(activeStatus_searchbar);

//     //     }

//     // };

//     // click events
//     const setView = () => {
//         if (!allCanView) {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canView: (client.ePermission !== 8 && client.ePermission !== 9) ? true : false };
//             });
//             setAllClients(updatedClients);
//             setAllCanView(true);
//         } else {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canView: false };
//             });
//             setAllClients(updatedClients);
//             setAllCanView(false);
//         }
//     };
//     const setAdd = () => {
//         if (!allCanAdd) {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canAdd: (client.ePermission !== 3 && client.ePermission !== 5 && client.ePermission !== 7 && client.ePermission !== 9 && client.ePermission !== 10) ? true : false };
//             });
//             setAllClients(updatedClients);
//             setAllCanAdd(true);
//         } else {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canAdd: false };
//             });
//             setAllClients(updatedClients);
//             setAllCanAdd(false);
//         }
//     };
//     const setEdit = () => {
//         if (!allCanEdit) {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canEdit: (client.ePermission !== 6 && client.ePermission !== 5 && client.ePermission !== 8 && client.ePermission !== 10) ? true : false };
//             });
//             setAllClients(updatedClients);
//             setAllCanEdit(true);
//         } else {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canEdit: false };
//             });
//             setAllClients(updatedClients);
//             setAllCanEdit(false);
//         }
//     };
//     const setDelete = () => {
//         if (!allCanDelete) {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canDelete: (client.ePermission !== 3 && client.ePermission !== 5 && client.ePermission !== 7 && client.ePermission !== 8 && client.ePermission !== 9 && client.ePermission !== 10) ? true : false };
//             });
//             setAllClients(updatedClients);
//             setAllCanDelete(true);
//         } else {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canDelete: false };
//             });
//             setAllClients(updatedClients);
//             setAllCanDelete(false);
//         }
//     };
//     const setPrint = () => {
//         if (!allCanPrint) {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canPrint: (client.ePermission === 1 || client.ePermission === 2 || client.ePermission === 5 || client.ePermission === 11) ? true : false };
//             });
//             setAllClients(updatedClients);
//             setAllCanPrint(true);
//         } else {
//             const updatedClients = allClients.map((client) => {
//                 return { ...client, canPrint: false };
//             });
//             setAllClients(updatedClients);
//             setAllCanPrint(false);
//         }
//     };

//     const ChangeCanView = (_clientId) => {
//         const updatedClients = allClients.map((_client) => {
//             if (_client.ePermission === _clientId) {
//                 return { ..._client, canView: !_client.canView };
//             }
//             return _client;
//         });
//         setAllClients(updatedClients);
//     }

//     const ChangeCanAdd = (_clientId) => {
//         const updatedClients = allClients.map((_client) => {
//             if (_client.ePermission === _clientId) {
//                 return { ..._client, canAdd: !_client.canAdd };
//             }
//             return _client;
//         });
//         setAllClients(updatedClients);
//     }
//     const ChangeCanEdit = (_clientId) => {
//         const updatedClients = allClients.map((_client) => {
//             if (_client.ePermission === _clientId) {
//                 return { ..._client, canEdit: !_client.canEdit };
//             }
//             return _client;
//         });
//         setAllClients(updatedClients);
//     }
//     const ChangeCanDelete = (_clientId) => {
//         const updatedClients = allClients.map((_client) => {
//             if (_client.ePermission === _clientId) {
//                 return { ..._client, canDelete: !_client.canDelete };
//             }
//             return _client;
//         });
//         setAllClients(updatedClients);
//     }
//     const ChangeCanPrint = (_clientId) => {
//         const updatedClients = allClients.map((_client) => {
//             if (_client.ePermission === _clientId) {
//                 return { ..._client, canPrint: !_client.canPrint };
//             }
//             return _client;
//         });
//         setAllClients(updatedClients);
//     }


//     const handleCancel = (e) => {
//         e.preventDefault();
//         navigate('/User');
//     };

//     // const closeStatusUpdateModal = () => {
//     //     setShowStatusUpdateModal({
//     //         show: false,
//     //         mode: 'deactivate'
//     //     });
//     // };
//     // const sortByClientName = () => {
//     //     setSortType((current) => {
//     //         return { ...current, clientName: current.clientName === 'asc' ? 'desc' : 'asc' };
//     //     });
//     // };

//     // const sortByUpdateTime = () => {
//     //     setSortType((current) => {
//     //         return { ...current, updateTime: current.updateTime === 'asc' ? 'desc' : 'asc' };
//     //     });
//     // };

//     // const sortBySerialNo = () => {
//     //     setSortType((current) => {
//     //         return { ...current, serialNo: current.serialNo === 'asc' ? 'desc' : 'asc' };
//     //     });
//     // };

//     // const setHeightOfGrid = () => {

//     //     if (gridListDivRef && gridListDivRef.current) {
//     //         gridListDivRef.current.style.height = gridListDivRef.current.clientHeight - 20 + 'px';
//     //     }
//     // };

//     // const onActivateClient = () => {
//     //     setShowStatusUpdateModal({
//     //         show: true,
//     //         mode: 'activate'
//     //     });
//     // };

//     // const onDeactivateClient = () => {
//     //     setShowStatusUpdateModal({
//     //         show: true,
//     //         mode: 'deactivate'
//     //     });
//     // };

//     // const onDelete = () => {
//     //     setShowStatusUpdateModal({
//     //         show: true,
//     //         mode: 'delete'
//     //     });
//     // }

//     // function _getConfirmationPopupData(mode) {
//     //     switch (mode) {
//     //         case 'activate': return {
//     //             icon: faCheck,
//     //             text: " Are you sure to active the selected Project Group?",
//     //             color: "#198754",
//     //             submitText: "Active",
//     //             onClick: (e) => updateClientStatus(statuses.active)
//     //         };
//     //         case 'deactivate': return {
//     //             icon: faBan,
//     //             text: " Are you sure to deactive the selected Project Group?",
//     //             color: "#e6ad5c",
//     //             submitText: "Deactive",
//     //             onClick: (e) => updateClientStatus(statuses.deactive)
//     //         };
//     //         case 'delete': return {
//     //             icon: faTrash,
//     //             text: " Are you sure to delete the selected Project Group?",
//     //             color: "#dc3545",
//     //             submitText: "Delete",
//     //             onClick: (e) => updateClientStatus(statuses.delete)
//     //         };
//     //         default:
//     //             return {}
//     //     }
//     // }

//     const handleSnackbarClose = () => {
//         setSnackBarState({ open: false, message: '' });
//     };

//     // function generateKey() {
//     //     try {
//     //         setKeyGenerateLoading(true);
//     //         fetch(CLIENT_KEY_GENERATE_URL).then(
//     //             (res) => res.json()
//     //         ).then(
//     //             (_response) => {
//     //                 let _generatedKey = _response.password || "";
//     //                 formik.setFieldValue("clientKey", _generatedKey)
//     //                 setKeyGenerateLoading(false)
//     //             }
//     //         ).catch(
//     //             (err) => {
//     //                 console.log(err)
//     //                 formik.setFieldTouched("clientKey", true)
//     //                 setTimeout(
//     //                     () => {
//     //                         formik.setFieldError("clientKey", "Failed to generate key")

//     //                     }, 50
//     //                 )
//     //                 setKeyGenerateLoading(false)
//     //             }
//     //         )
//     //     } catch (err) {
//     //         console.log(err)
//     //         if (keyGenerateLoading) {
//     //             setKeyGenerateLoading(false)
//     //             formik.setFieldTouched("clientKey", true)
//     //             setTimeout(
//     //                 () => {
//     //                     formik.setFieldError("clientKey", "Failed to generate key")

//     //                 }, 50
//     //             )
//     //         }
//     //     }
//     // }

//     /**UI Piece */
//     // function StatusChangedAlert({ _mode }) {
//     //     let _popupData = _getConfirmationPopupData(_mode);

//     //     return (
//     //         <div className="p-[15px]">

//     //             <div className="flex flex-col items-center gap-y-[10px]">

//     //                 <div style={{ borderColor: _popupData.color }} className="w-[50px] h-[50px] rounded-full border-[2px] border-solid text-[#5bc0de] flex justify-center items-center" >
//     //                     <FontAwesomeIcon className="text-[24px]" icon={_popupData.icon} style={{ color: _popupData.color }} />
//     //                 </div>

//     //                 <div className="font-semibold font-mulish text-[18px] text-[#696c74]">{_popupData.text}</div>

//     //             </div>


//     //         </div>
//     //     )
//     // }

//     // function createConfirmPopup() {
//     //     const _data = _getConfirmationPopupData(showStatusUpdateModal.mode);
//     //     return (
//     //         <ConfirmPopup openPopup={showStatusUpdateModal.show}
//     //             title={"Confirmation"}
//     //             closingMethod={(e) => closeStatusUpdateModal()}
//     //             submitMethod={_data.onClick}
//     //             color={_data.color}
//     //             submitText={_data.submitText}>
//     //             <div className="border-b-solid border-b-[#e5e5e5]">
//     //                 <StatusChangedAlert _mode={showStatusUpdateModal.mode} />
//     //             </div>
//     //         </ConfirmPopup>
//     //     )
//     // }

//     const extendSearch = (
//         <div>
//             <div className="mb-4">
//                 {/* <CustomDatePicker selectedDate={fromdate_search} selectedDateModifier={setFromDate_search} title="From Date" id="backuplog_search_fromdate" classNames="rounded-[3.75px]" /> */}

//                 <SearchDatePicker searchDate={fromdate_search} searchDateModifier={setFromDate_search} title="From Date" id="backuplog_search_fromdate" />
//             </div>
//             <div>
//                 <SearchDatePicker searchDate={todate_search} searchDateModifier={setToDate_search} title="To Date" id="backuplog_search_todate" />
//             </div>
//         </div>
//     )
//     /**Effects */
//     useEffect(() => {
//         // setHeightOfGrid();
//         document.title = 'User Permission - Zibma Infotech';
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

//     // useEffect(() => {
//     //     if (!allClients || !allClients.length) return;

//     //     let _sortType = sortType.clientName || "asc";
//     //     if (_sortType === "asc") {
//     //         // setAllClients(handleStringSort(allClients, "clientName", true));
//     //     }
//     //     if (_sortType === "desc") {
//     //         // setAllClients(handleStringSort(allClients, "clientName", false));
//     //     }
//     //     // setAllClients([...orderBy(allClients, 'clientName', sortType.clientName)]);
//     // }, [sortType.clientName]);

//     // useEffect(() => {
//     //     if (!allClients || !allClients.length) return;
//     //     let _sortType = sortType.serialNo || "asc";
//     //     if (_sortType === "asc") {
//     //         // setAllClients(handleNumberSort(allClients, "serialNo", true));
//     //     }
//     //     if (_sortType === "desc") {
//     //         // setAllClients(handleNumberSort(allClients, "serialNo", false));
//     //     }
//     // }, [sortType.serialNo]);

//     // useEffect(() => {
//     //     if (!allClients || !allClients.length) return;
//     //     setAllClients([...orderBy(allClients, 'updateTime', sortType.updateTime)]);
//     // }, [sortType.updateTime]);

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
//                     // if (event.key.toLowerCase() === "r" && headerButtons.deactive && !popupIsOpen) {
//                     //     if (onDeactivateClient && selectedClient && !popupIsOpen) onDeactivateClient();
//                     // }
//                     // if (event.key.toLowerCase() === "a" && headerButtons.active) {
//                     //     if (onActivateClient && selectedClient && !popupIsOpen) onActivateClient();
//                     // }
//                     // if (event.key.toLowerCase() === "x" && headerButtons.delete) {
//                     //     if (onDelete && selectedClient && !popupIsOpen) onDelete();
//                     // }
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
//                 {/* Loaders and Alerts */}
//                 <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />
//                 {/* {
//                 (userPermission.length > 0 &&
//                     userPermission[6].canView === true &&
//                     userPermission[6].canEdit === true ) ? (
//                     <> */}
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

//                 <PathInfo fontAwesomeIcon={faUserCheck} />

//                 {/* Status Change Alerts/Popups */}
//                 {/* {showStatusUpdateModal.show && (
//                     createConfirmPopup()
//                 )} */}

//                 {/* Header */}
//                 <div className="px-[10px] bg-white h-[calc(100%-35px)]">
//                     <div className="py-2">
//                         <lavle className="text-[#696c74]">User Name: <span className="text-black">{userName}</span></lavle>
//                     </div>


//                     {/* Skeleton for Grid */}
//                     <SkeletonLoaderForGrid show={showSkeletonLoader} />

//                     {/* Grid */}

//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec bg-white h-[calc(100%-50px)] max-[767px]:h-[calc(100%-40px)] flex flex-col max-[767px]:overflow-x-auto`}>
//                         <div className="grow flex flex-col max-[767px]:w-fit ">

//                             <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                                 <div className={` flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[150px] max-[594px]:w-[170px] px-[10px] `}>
//                                     <div>Permission Name</div>
//                                     {/* {hasSerialNo &&
//                                         <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                     } */}

//                                 </div>

//                                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[20%] px-[10px]">
//                                     <div class="flex items-center">
//                                         <input id="normal-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={allCanView}
//                                             onChange={setView} />
//                                         <label for="normal-checkbox" class="ml-2 text-sm font-bold font-mulish text-[14px] select-none">View</label>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[20%] px-[10px]">
//                                     <div class="flex items-center">
//                                         <input id="normal-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={allCanAdd}
//                                             onChange={setAdd} />
//                                         <label for="normal-checkbox" class="ml-2 text-sm font-bold font-mulish text-[14px] select-none">Add</label>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[20%] px-[10px]">
//                                     <div class="flex items-center">
//                                         <input id="normal-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={allCanEdit}
//                                             onChange={setEdit} />
//                                         <label for="normal-checkbox" class="ml-2 text-sm font-bold font-mulish text-[14px] select-none">Edit</label>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[20%] px-[10px]">
//                                     <div class="flex items-center">
//                                         <input id="normal-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={allCanDelete}
//                                             onChange={setDelete} />
//                                         <label for="normal-checkbox" class="ml-2 text-sm font-bold font-mulish text-[14px] select-none">delete</label>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[20%] px-[10px]">
//                                     <div class="flex items-center">
//                                         <input id="normal-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={allCanPrint}
//                                             onChange={setPrint} />
//                                         <label for="normal-checkbox" class="ml-2 text-sm font-bold font-mulish text-[14px] select-none">print</label>
//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="grow overflow-auto table-list whitespace-nowrap w-full h-[440px]">
//                                 {
//                                     !!allClients.length && (
//                                         allClients.map((_client, index) => {
//                                             return (
//                                                 <div key={_client.ePermission} className={` border-x-[transparent]  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                                                     <div className="flex items-center h-full w-[150px] max-[594px]:w-[170px] px-[10px] py-[5px] overflow-hidden user-permi-name">
//                                                         <div className="overflow  text-ellipsis">{_client.ePermission === 1 ? 'Project Group ' : _client.ePermission === 2 ? 'Project' : _client.ePermission === 3 ? 'Backup Setting' : _client.ePermission === 4 ? 'Backup Schedule' : _client.ePermission === 5 ? 'Backup Log' : _client.ePermission === 6 ? 'Users' : _client.ePermission === 7 ? 'Permission' : _client.ePermission === 8 ? 'TakeBackup' : _client.ePermission === 9 ? 'ShrinkDB' : _client.ePermission === 10 ? 'Backup Download' : _client.ePermission === 11 ? 'Project DB' : ''}</div>
//                                                     </div>

//                                                     <div className="flex items-center h-full w-[20%] px-[10px] py-[5px] overflow-hidden user-permi-view">
//                                                         <input id={`view-checkbox-${index}`} type="checkbox" value={_client.canView} class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                                             onClick={(e) => ChangeCanView(_client.ePermission)}
//                                                             checked={_client.canView}
//                                                             disabled={_client.ePermission === 8 || _client.ePermission === 9}
//                                                         />
//                                                     </div>

//                                                     <div className="flex items-center h-full w-[20%] px-[10px] py-[5px] overflow-hidden user-permi-add">

//                                                         <input id={`view-checkbox-${index}`} type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                                             onClick={() => ChangeCanAdd(_client.ePermission)}
//                                                             checked={_client.canAdd}
//                                                             disabled={_client.ePermission === 3 || _client.ePermission === 5 || _client.ePermission === 7 || _client.ePermission === 9 || _client.ePermission === 10}
//                                                         />

//                                                     </div>

//                                                     <div className="flex items-center h-full w-[20%] px-[10px] py-[5px] overflow-hidden user-permi-edit">
//                                                         <input id={`view-checkbox-${index}`} type="checkbox" value="" class="ml-[2px] w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                                             onClick={() => ChangeCanEdit(_client.ePermission)}
//                                                             checked={_client.canEdit}
//                                                             disabled={_client.ePermission === 6 || _client.ePermission === 5 || _client.ePermission === 8 || _client.ePermission === 10}
//                                                         />
//                                                     </div>

//                                                     <div className="flex items-center h-full w-[20%] px-[10px] py-[5px] overflow-hidden user-permi-delete">
//                                                         <input id={`view-checkbox-${index}`} type="checkbox" value="" class="ml-1 w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                                             onClick={() => ChangeCanDelete(_client.ePermission)}
//                                                             checked={_client.canDelete}
//                                                             disabled={_client.ePermission === 3 || _client.ePermission === 5 || _client.ePermission === 7 || _client.ePermission === 8 || _client.ePermission === 9 || _client.ePermission === 10}
//                                                         />
//                                                     </div>

//                                                     <div className="flex items-center h-full w-[20%] px-[10px] py-[5px] overflow-hidden user-permi-print">

//                                                         <input id={`view-checkbox-${index}`} type="checkbox" value="" class="ml-[5px] w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                                             onClick={() => ChangeCanPrint(_client.ePermission)}
//                                                             checked={_client.canPrint}
//                                                             disabled={_client.ePermission === 3 || _client.ePermission === 4 || _client.ePermission === 6 || _client.ePermission === 7 || _client.ePermission === 8 || _client.ePermission === 9 || _client.ePermission === 10}
//                                                         />
//                                                     </div>

//                                                 </div>
//                                             );
//                                         })
//                                     )
//                                 }

//                             </div>

//                             {!!!allClients && (
//                                 <div className="flex mt-[30px] justify-center font-mulish font-semibold text-[#696c74bd] text-[17px]">No Data Available!</div>
//                             )}

//                         </div>
//                         {
//                             decode?.claims.includes(33) ?
//                                 <div className={`font-mulish font-semibold text-[14px] h-[34px] flex items-center justify-end`} >
//                                     <div className="">
//                                         <div className="text-[14px] font-mulish font-semibold flex gap-x-[10px]">
//                                             <button className="hover:opacity-[0.88] rounded-[4px] pt-[5px] pb-[6px] w-[65px] text-black bg-[#f6f0f6]" onClick={(e) => { handleCancel(e) }}>Cancel</button>
//                                             <button type="submit" className={`hover:opacity-[0.88] rounded-[4px] pt-[5px] pb-[6px] w-[65px] text-white bg-gradient-to-r from-[#259dab] to-[#2574ab]`} onClick={() => savePermission()}>Save</button>
//                                         </div>
//                                     </div>
//                                 </div> : null
//                         }
//                     </div>

//                 </div>
//                 {/* </>
//                 ) : (
//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] max-[767px]:max-h-[calc(100%-104px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                         <h3>Not Allowed</h3>
//                     </div> */}
//                 {/* )} */}
//             </div>
//         </>



//     )
// }