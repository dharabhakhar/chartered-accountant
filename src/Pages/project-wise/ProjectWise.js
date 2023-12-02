// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCheck, faCloudUpload, faFileLines, faFileText, faTrash, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageLoader from "../../UIComponents/Loaders/PageLoader";
// import FormPopup from "../../UIComponents/Popup/FormPopup";
// import { useFormik } from "formik";
// import { alertColors, statusLabels, statuses } from "../../Utils/constants"
// import ConfirmPopup from "../../UIComponents/Popup/ConfirmPopup";
// import { Snackbar, Alert } from "@mui/material";
// import { RotatingLines } from "react-loader-spinner";
// import { CLIENT_KEY_GENERATE_URL } from "../../Utils/Config/envConfig"
// import SkeletonLoaderForGrid from "../../UIComponents/Loaders/SkeletonLoaderForGrid";
// import { _fetchAllClients, _fetchProject } from "../../Utils/APIs/FetchAPIs";
// import { _saveBackup, _saveClient } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import SearchDatePicker from "../../UIComponents/SubHeader/SearchDatePicker";
// import { getFormattedDate, formatTime, compareDates } from '../../Utils/date';
// import { BsFileText, BsFileTextFill } from "react-icons/bs";
// import { useParams } from "react-router-dom/dist";
// import PaginationTab from "../../UIComponents/Pagination/PagnationTab";
// import { AiOutlineCloudDownload } from "react-icons/ai";
// import SavingLoader from "../../UIComponents/Loaders/SavingLoader";
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Client() {
//     const project_Name = localStorage.getItem('projectName');

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             refresh: true,
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
//     const [updateFlag, setUpdateFlag] = useState(false);


//     //dynamic data
//     const [allClients, setAllClients] = useState([])
//     const [selectedClient, setSelectedClient] = useState(null)
//     const [_searchText, set_SearchText] = useState("")
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false)
//     const currentDate = new Date();
//     const thirtyDaysAgo = new Date(currentDate);
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 6);
//     const [fromdate, setFromDate] = useState(thirtyDaysAgo);
//     const [_fromDate, set_FromDate] = useState(thirtyDaysAgo);
//     const [todate, setToDate] = useState(currentDate);
//     const [_toDate, set_ToDate] = useState(currentDate);
//     const [totalRecorders, setTotalRecords] = useState("0")
//     const [pageNo, setPageNo] = useState(1)
//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     const [sortType, setSortType] = useState({
//         updateTime: 'asc',
//         serialNo: 'asc',
//         size: 'asc',
//         cndSize: 'asc',
//         hardDiskSize: 'asc',
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
//     const fetchAllClients = async (fromdate, todate, removeSelected = false) => {

//         if (!showSkeletonLoader) setShowPageLoader(true);
//         let projectId = localStorage.getItem('projectId')

//         console.log(fromdate);
//         console.log(todate);

//         const response = await _fetchProject(projectId, fromdate, todate, pageNo)
//         if (fromdate !== '' && todate !== '') {

//             if (response && response.status === 200) {
//                  setTotalRecords(response.data.totalRecords)
//                 console.log(totalRecorders);
//                 setAllClients(response.data.lstProjectWiseBackupLog || []);
//             } else {
//                 setSnackBarState({
//                     open: true, severity: 'error',
//                     bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[0] : 'Client has not been Updated!'
//                 });
//             }
//             if (removeSelected) {
//                 setSelectedClient(null)
//             }
//             setShowPageLoader(false);
//             setShowSkeletonLoader(false);
//             if (!shouldRunEffect) setShouldRunEffect(true)
//         } else {
//             setSnackBarState({
//                 open: true, severity: 'error',
//                 bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[0] : 'Client has not been Updated!'
//             });
//             setShowPageLoader(false);
//             setShowSkeletonLoader(false);
//         }

//     }

//     const onClientSearch = (searchText) => {
//         set_SearchText(searchText)
//     }

//     const onUpdateClientStatus = (status, searchText) => {
//         console.log(_fromDate);
//         console.log(fromdate);
//         set_SearchText(searchText)
//         setFromDate('')
//         if (_fromDate) {
//             const date = new Date(_fromDate);
//             date.setHours(date.getHours() + 6);
//             setFromDate(date.toISOString());
//         } else {
//             setFromDate('')
//         }

//         console.log(_toDate);
//         setToDate('');
//         if (_toDate) {
//             const date = new Date(_toDate);
//             date.setHours(date.getHours() + 6);
//             setToDate(date.toISOString());
//         } else {
//             setToDate('');
//         }
//         console.log('clicked');
//         setUpdateFlag(!updateFlag);
//     };

//     const downloadBackup = (client) => {
//         setPopupOverlay(true);
//         try {
//             _saveBackup(client.backupLogId)
//                 .then(response => {
//                     if (response && response.status === 200) {
//                         console.log(response);
//                         const fileUrl = response.message.data.backupFileUrl;
//                         const link = document.createElement('a');
//                         link.href = fileUrl;
//                         link.download = 'backup.zip';
//                         link.click();
//                         setPopupOverlay(false)

//                     } else if (response) {
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.data.errors[0] || 'Backup has not been saved!'
//                         });
//                         setPopupOverlay(false)
//                     }
//                 })
//         } catch (e) {
//             setSnackBarState({
//                 open: true, severity: 'error',
//                 bgcolor: alertColors.error, message: 'Something went wrong!'
//             });
//             setPopupOverlay(false)
//         }
//     }

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

//     const saveClient = (_clientId) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 if (formik.isValid) {

//                     const response = await _saveClient(_clientId || 0, formik.values.clientSrNo, formik.values.clientName, formik.values.clientKey);

//                     if (response && response.status === 200) {
//                         setSnackBarState({
//                             open: true, severity: 'success',
//                             bgcolor: alertColors.success, message: response.message || 'Client has been saved successfully!'
//                         });
//                         setPopupOverlay(false);
//                         onCloseModal();
//                         fetchAllClients();

//                     } else if (response) {
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.message || 'Client has not been saved!'
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

//     const onProjectFile = () => {
//         // setSelectedClient(null)
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
//     const sortBySize = () => {
//         setSortType((current) => {
//             return { ...current, size: current.size === 'asc' ? 'desc' : 'asc' };
//         });
//     };
//     const sortByCndSize = () => {
//         setSortType((current) => {
//             return { ...current, cndSize: current.cndSize === 'asc' ? 'desc' : 'asc' };
//         });
//     };
//     const sortByHardDiskSize = () => {
//         setSortType((current) => {
//             return { ...current, hardDiskSize: current.hardDiskSize === 'asc' ? 'desc' : 'asc' };
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
//     const onRefresh = () => {
//         setSelectedClient(null)
//         setShowSkeletonLoader(true);
//         fetchAllClients(fromdate, todate);
//     };

//     const handleSnackbarClose = () => {
//         setSnackBarState({ open: false, message: '' });
//     };

//     /**UI Piece */

//     const extendSearch = (
//         <div>
//             <div className="mb-4">
//                 {/* <CustomDatePicker selectedDate={fromdate_search} selectedDateModifier={setFromDate_search} title="From Date" id="backuplog_search_fromdate" classNames="rounded-[3.75px]" /> */}

//                 <SearchDatePicker searchDate={_fromDate} searchDateModifier={set_FromDate} title="From Date" id="backuplog_search_fromdate" />
//             </div>
//             <div>
//                 <SearchDatePicker searchDate={_toDate} searchDateModifier={set_ToDate} title="To Date" id="backuplog_search_todate" />
//             </div>
//         </div>
//     )
//     /**Effects */
//     useEffect(() => {
//         setHeightOfGrid();
//         document.title = 'Project Wise - Zibma Infotech';
//     }, []);

//     useEffect(
//         () => {
//             setShowSkeletonLoader(true)

//             setTimeout(
//                 () => {
//                     set_FromDate(fromdate)
//                     set_ToDate(todate)
//                     fetchAllClients(fromdate, todate)
//                 }, 300
//             )
//         }, []
//     )

//     useEffect(
//         () => {
//             if (!shouldRunEffect) return
//             fetchAllClients(fromdate, todate)
//             console.log('called');
//         }, [pageNo, fromdate, todate, updateFlag]
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
//         if (sortType.hardDiskSize === 'asc') {
//             sortedClients.sort((a, b) => a.hardDiskUsageSizeInGB?.toString()?.localeCompare(b.hardDiskUsageSizeInGB?.toString()) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.hardDiskUsageSizeInGB?.toString()?.localeCompare(a.hardDiskUsageSizeInGB?.toString()) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.hardDiskSize]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         const sortedClients = [...allClients];
//         if (sortType.serialNo === 'asc') {
//             sortedClients.sort((a, b) => a.serialNo?.localeCompare(b.serialNo) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.serialNo?.localeCompare(a.serialNo) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.serialNo]);
//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         const sortedClients = [...allClients];
//         if (sortType.cndSize === 'asc') {
//             sortedClients.sort((a, b) => a.cdnUsageSizeInGB?.toString()?.localeCompare(b.cdnUsageSizeInGB?.toString()) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.cdnUsageSizeInGB?.toString()?.localeCompare(a.cdnUsageSizeInGB?.toString()) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.cndSize]);
//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         const sortedClients = [...allClients];
//         if (sortType.size === 'asc') {
//             sortedClients.sort((a, b) => a.sizeInMB?.toString()?.localeCompare(b.sizeInMB?.toString()) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.sizeInMB?.toString()?.localeCompare(a.sizeInMB?.toString()) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.size]);

//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         setAllClients([...orderBy(allClients, 'backupTime', sortType.updateTime)]);
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
//                     <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#FFFFFF', background: snackBarState.bgcolor }}>
//                         {snackBarState.message}
//                     </Alert>
//                 </Snackbar>

//                 <PathInfo fontAwesomeIcon={faFileLines} />


// {popupOverlay && <SavingLoader /> }
//                 {/* Header */}
//                 <div className="px-[10px] bg-white h-[calc(100%-35px)]">
//                     {/* <label className="mb-3">Project Name: <span>##ProjectName##</span></label> */}
//                     <div className="py-2 pb-0">
//                         <label className="text-[#696c74]">Project Name: <span className="text-black capitalize">{project_Name}</span></label>
//                     </div>
//                     <Header
//                         isLoading={showSkeletonLoader}
//                         isItemSelected={!!selectedClient}
//                         show={headerButtons}
//                         onSearch={onClientSearch}
//                         onSearchClick={onUpdateClientStatus}
//                         onRefresh={onRefresh}
//                         onProjectFile={false}
//                         initialSearchValue={_searchText}
//                         activeStatus={clientStatus}
//                         searchStatusModifier={setActiveStatus_searchBar}
//                         extendSearchBox={extendSearch}
//                         hideStatusSearch={true}
//                         showSearch={true}
//                     >

//                     </Header>

//                     {/* Skeleton for Grid */}
//                     <SkeletonLoaderForGrid show={showSkeletonLoader} />

//                     {/* Grid */}

//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec bg-white h-[calc(100%-84px)] max-[767px]:h-[calc(100%-144px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                         <div className="grow flex flex-col max-[767px]:w-fit ">

//                             <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                                 <div className={` flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[100px] px-[10px] `}>
//                                     <div>sr no.</div>
//                                     {hasSerialNo &&
//                                         <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                     }

//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Size</div>
//                                     <FontAwesomeIcon onClick={(e) => sortBySize()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>CDN Size</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByCndSize()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>HardDisk Size</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByHardDiskSize()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Last Backup Time</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByUpdateTime()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>
//                                 <div className="flex items-center justify-center font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Download</div>
//                                 </div>

//                             </div>

//                             <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap  h-[377px] w-full">
//                                 {!!allClients.length && (
//                                     allClients.map((_client, index) => {
//                                         return (
//                                             <div key={_client.projectId} className={`${(selectedClient && selectedClient.projectId === _client.projectId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                                                 <div className={`flex items-center h-full w-[110px] px-[10px] py-[5px] overflow-hidden  `}>
//                                                     <div className="overflow-hidden text-ellipsis">{index+1}</div>
//                                                 </div>

//                                                 <div className="flex items-center h-full w-[51%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.sizeInMB ? _client.sizeInMB : '-'}</div>
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.cdnUsageSizeInGB ? _client.cdnUsageSizeInGB : '-'}</div>
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.hardDiskUsageSizeInGB ? _client.hardDiskUsageSizeInGB : ''}</div>
//                                                     {/* <div className="overflow-hidden  text-ellipsis">hello</div> */}
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.backupTime ? formatTime(_client.backupTime) : ""}</div>
//                                                 </div>
//                                                 <div className="flex items-center justify-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis margin-auto text-base" onClick={(e) => downloadBackup(_client)}><AiOutlineCloudDownload /></div>
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
//                         <div className={`font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between`} >
//                             <div className='w-fit '>Total Record Count: {totalRecorders || allClients.length}</div>
//                             <div className='w-fit'>
//                                 <PaginationTab totalItems={totalRecorders} onPageChnage={setPageNo} itemsCount={30} />
//                             </div>
//                         </div>

//                     </div>



//                 </div>

//             </div>

//         </>



//     )
// }