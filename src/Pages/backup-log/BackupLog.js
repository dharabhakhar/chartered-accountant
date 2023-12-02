// import { Fragment, useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCaretDown, faCheck, faChevronDown, faCloudUpload, faFileText, faTrash, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageLoader from "../../UIComponents/Loaders/PageLoader";
// import FormPopup from "../../UIComponents/Popup/FormPopup";
// import { formatTime } from "../../Utils/date"
// import { useFormik } from "formik";
// import { alertColors, statusLabels, statuses } from "../../Utils/constants"
// import ConfirmPopup from "../../UIComponents/Popup/ConfirmPopup";
// import { Snackbar, Alert } from "@mui/material";
// import { CLIENT_KEY_GENERATE_URL } from "../../Utils/Config/envConfig"
// import SkeletonLoaderForGrid from "../../UIComponents/Loaders/SkeletonLoaderForGrid";
// import { _fetchAllLog, _fetchAllProjectGroup, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveBackup, _saveClient } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import SearchDatePicker from "../../UIComponents/SubHeader/SearchDatePicker";
// import { useNavigate } from "react-router-dom/dist";
// import { Combobox, Transition } from "@headlessui/react";
// import PaginationTab from "../../UIComponents/Pagination/PagnationTab";
// import { AiOutlineCloudDownload } from "react-icons/ai";
// import SavingLoader from "../../UIComponents/Loaders/SavingLoader";
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Client() {
//     const navigate = useNavigate()

//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             refresh: true,
//             projectFile: true,
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
//     const [_projectGroupId, set_projectGroupId] = useState("")
//     const [_pageNo, set_pageNo] = useState()
//     const [_maxItem, set_maxItem] = useState()
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//     const [hasSerialNo, setHasSerialNo] = useState(false)
//     const [fromdate_search, setFromDate_search] = useState(false)
//     const [todate_search, setToDate_search] = useState(false)
//     const [fromdate, setFromDate] = useState(false)
//     const [todate, setToDate] = useState(false)
//     const [selected, setSelected] = useState({ id: 0, name: "" })
//     const [filteredSocialAccounts, setfilteredSocialAccounts] = useState([]);
//     const [filteredCategories, setfilteredcategories] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [addPostCategoryQuery, setAddPostCategoryQuery] = useState('');
//     const [selectedPostCategory, setSelectedPostCategory] = useState(null);
//     const [isOpenDropDown, setIsOpenDropDown] = useState(false);
//     const [totalRecorders, setTotalRecords] = useState("0")
//     const [pageNo, setPageNo] = useState(1);
//     const [backupLink, setBackupLink] = useState('');
//     const [updateFlag, setUpdateFlag] = useState(false);
//     const [log, setlog] = useState([
//         1,2,3,4,5,6
//     ])
  
//     // const [generatedKey, setGeneratedKey] = useState("")

//     //other state
//     const [sortType, setSortType] = useState({
//         projectName: 'asc',
//         projectGroupName: 'asc',
//         updateTime: 'asc',
//         serialNo: 'asc',
//         size: 'asc',
//         cndSize: 'asc',
//         hardDiskSize: 'asc',
//     });
//     const setgroupName = (value) => {
//         setSelected(value);
//     }


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
//     const getGroup = async () => {
//         if (!showSkeletonLoader) setShowPageLoader(true);


//         const response = await _fetchAllProjectGroup(_searchText, clientStatus)

//         if (response && response.status === 200) {
//             const data = response.data || [];
//             const allCategories = [{ projectGroupId: 0, projectGroupName: "All" }].concat(data);
//             setfilteredcategories(allCategories);
//             setCategories(allCategories);
//             setSelectedPostCategory(allCategories[0]);
//         }
//         setShowPageLoader(false);
//         setShowSkeletonLoader(false);
//         if (!shouldRunEffect) setShouldRunEffect(true)

//     }
//     const fetchAllClients = async (removeSelected = false) => {

//         if (!showSkeletonLoader) setShowPageLoader(true);


//         const response = await _fetchAllLog(_searchText, selectedPostCategory || 0, pageNo, _maxItem)
//         // const response1 = await _fetchUser(decode.userId)

//         if (response && response.status === 200) {
//             setAllClients(response.data.lstBackupLog || []);
//             setTotalRecords(response.data.totalRecords)
//         }
//         // if (response1 && response1.status === 200) {
//         //     setUserPermission(response1.data || []);
//         // }
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

//     const onUpdateClientStatus = (status, searchText) => {    
//         set_SearchText(searchText)
//     setUpdateFlag(!updateFlag);
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
//         if (selectedClient && (selectedClient.projectId === _client.projectId)) {
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

//     };

//     const onProjectFile = (_client) => {
//         if (!_client) {
//             _client = selectedClient;
//         }
//         localStorage.setItem('projectId', _client.projectId)
//         localStorage.setItem('projectName', _client.projectName)
//         const name = createSlug(_client.projectName);
//         navigate(`/backup-log/${name}`);
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
//     const sortByProjectName = () => {
//         setSortType((current) => {
//             return { ...current, projectName: current.projectName === 'asc' ? 'desc' : 'asc' };
//         });
//     };
//     const sortByProjectGroupName = () => {
//         setSortType((current) => {
//             return { ...current, projectGroupName: current.projectGroupName === 'asc' ? 'desc' : 'asc' };
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
//         console.log('clicked');
//         setSortType((current) => {
//             return { ...current, hardDiskSize: current.hardDiskSize === 'asc' ? 'desc' : 'asc' };
//         });
//         console.log(sortType.hardDiskSize);
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
//                 color: "#198754",
//                 submitText: "Active",
//                 onClick: (e) => updateClientStatus(statuses.active)
//             };
//             case 'deactivate': return {
//                 icon: faBan,
//                 text: " Are you sure to deactive the selected Project Group?",
//                 color: "#e6ad5c",
//                 submitText: "Deactive",
//                 onClick: (e) => updateClientStatus(statuses.deactive)
//             };
//             case 'delete': return {
//                 icon: faTrash,
//                 text: " Are you sure to delete the selected Project Group?",
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
//     const onCategorySelect = (category) => {
//         setSelectedPostCategory(category);
//         setAddPostCategoryQuery('');
//     };
//     function createSlug(name) {
//         return name
//             .toLowerCase() // Convert to lowercase
//             .replace(/\s+/g, '-') // Replace spaces with hyphens
//             .replace(/[^a-z0-9-]/g, '') // Remove any special characters or symbols
//             .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
//             .trim(); // Trim any leading/trailing whitespace
//     }
//     const filterCategories = (query) => {
//         const filtered = categories.filter((category) =>
//           category.projectGroupName.toLowerCase().includes(query.toLowerCase())
//         );
//         setfilteredcategories(filtered);
//       };
//     const extendSearch = (
//         <div>
//             <div className="mb-4">

//                 <div className={`combo-box ${isOpenDropDown ? 'box-open' : ''}`}>
//                     <Combobox value={selectedPostCategory} onChange={onCategorySelect}>
//                         <div id="" className="relative mb-[15px]">
//                             <div id="categoryDropdown2" placeholder="categoryDropdown2" className=" peer relative w-full cursor-default overflow-hidden rounded-[3.75px] bg-white text-left  focus:outline-none ">
//                                 <Combobox.Input
//                                     className="capitalize   outline-none font-mulish text-[14px] h-[40px]  px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                     displayValue={(category) => category?.projectGroupName}
//                                     onChange={(event) => {setAddPostCategoryQuery(event.target.value);
//             filterCategories(event.target.value);}}
//                                     onFocus={() => setIsOpenDropDown(true)}
//                                     onBlur={() => setIsOpenDropDown(false)}

//                                 />
//                                 <Combobox.Button className="absolute inset-0 bg-transparent flex items-center justify-end  pr-2">
//                                     <span
//                                         className="px-[12px] text-[13px]  font-mulish  text-[#696c74] transition-all  peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                         aria-hidden="true"
//                                     >{selectedPostCategory === null && !isOpenDropDown && <> Project Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span></>}


//                                     </span>
//                                     <FontAwesomeIcon icon={faCaretDown} className="text-xs text-gray-400" />
//                                 </Combobox.Button>
//                             </div>
//                             {(addPostCategoryQuery || isOpenDropDown || selectedPostCategory?.projectGroupName) && <label
//                                 htmlFor="categoryDropdown2"
//                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                             >
//                                 Project Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                             </label>}
//                             <Transition
//                                 as={Fragment}
//                                 leave="transition ease-in duration-100"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                                 afterLeave={() => { setAddPostCategoryQuery(''); }}
//                             >
//                                 <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm rounded-b-lg  shadow-xl  ">
//                                     {filteredCategories.length === 0 && addPostCategoryQuery !== '' ? (
//                                         <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                                             Nothing found.
//                                         </div>
//                                     ) : (
//                                         filteredCategories.map((category) => (
//                                             <Combobox.Option
//                                                 key={category.projectGroupId}
//                                                 className={({ active }) =>
//                                                     `relative  select-none py-2 pl-10 pr-4 ${active ? 'bg-[#2574ab] text-white' : 'text-gray-900'
//                                                     } w-full px-2  cursor-pointer hover:bg-[#2574ab] hover:text-white py-1 duration-150 capitalize `
//                                                 }
//                                                 value={category}
//                                             >
//                                                 {({ selected, active }) => (
//                                                     <>
//                                                         <span
//                                                             className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                                                                 }`}
//                                                         >
//                                                             {category.projectGroupName}
//                                                         </span>
//                                                         {selected ? (
//                                                             <span
//                                                                 className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-900'
//                                                                     }`}
//                                                             >
//                                                             </span>
//                                                         ) : null}
//                                                     </>
//                                                 )}
//                                             </Combobox.Option>
//                                         ))
//                                     )}
//                                 </Combobox.Options>
//                             </Transition>
//                         </div>
//                     </Combobox>
//                 </div>
//             </div>
//         </div>
//     )

//     const downloadBackup = (client) => {
//         setPopupOverlay(true);
//         try {
//             _saveBackup(client.backupLogId)
//                 .then(response => {
//                     if (response && response.status === 200) {
//                         console.log(response);
//                         // setSnackBarState({
//                         //     open: true, severity: 'success',
//                         //     bgcolor: alertColors.success, message: response.data.responseMessage || 'Backup has been saved successfully!'
//                         // });
//                         const fileUrl = response.message.data.backupFileUrl;
//                         // const fileUrl = " https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip";
//                         const link = document.createElement('a');
//                         link.href = fileUrl;
//                         link.download = 'backup.zip';
//                         link.click();
//                         setPopupOverlay(false);

//                     } else if (response) {
//                         setSnackBarState({
//                             open: true, severity: 'error',
//                             bgcolor: alertColors.error, message: response.data.errors[0] || 'Backup has not been saved!'
//                         });
//                         setPopupOverlay(false);
//                     }
//                 })
//         } catch (e) {
//             setSnackBarState({
//                 open: true, severity: 'error',
//                 bgcolor: alertColors.error, message: 'Something went wrong!'
//             });
//             setPopupOverlay(false);
//         }
//     }
//     /**Effects */
//     useEffect(() => {
//         setHeightOfGrid();
//         document.title = 'Backup Log - Zibma Infotech';
//     }, []);

//     useEffect(
//         () => {
//             setShowSkeletonLoader(true)
//             setTimeout(
//                 () => {

//                     fetchAllClients()
//                     getGroup();
//                 }, 300
//             )
//         }, []
//     )

//     useEffect(
//         () => {
//             if (!shouldRunEffect) return
//             fetchAllClients(true)
//         }, [pageNo, _searchText, updateFlag]
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
//         if (sortType.projectName === 'asc') {
//             sortedClients.sort((a, b) => a.projectName?.localeCompare(b.projectName) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.projectName?.localeCompare(a.projectName) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.projectName]);
//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         const sortedClients = [...allClients];
//         if (sortType.projectGroupName === 'asc') {
//             sortedClients.sort((a, b) => a.projectGroupName?.localeCompare(b.projectGroupName) || 0);
//         } else {
//             sortedClients.sort((a, b) => b.projectGroupName?.localeCompare(a.projectGroupName) || 0);
//         }
//         setAllClients(sortedClients);
//     }, [sortType.projectGroupName]);
//     // useEffect(() => {
//     //     if (!allClients || !allClients.length) return;

//     //     const sortedClients = [...allClients];
//     //     if (sortType.hardDiskSize === 'asc') {
//     //         sortedClients.sort((a, b) => a.hardDiskUsageSizeInGB?.toString()?.localeCompare(b.hardDiskUsageSizeInGB?.toString()) || 0);
//     //     } else {
//     //         sortedClients.sort((a, b) => b.hardDiskUsageSizeInGB?.toString()?.localeCompare(a.hardDiskUsageSizeInGB?.toString()) || 0);
//     //     }
//     //     setAllClients(sortedClients);
//     // }, [sortType.hardDiskSize]);
//     useEffect(() => {
//         if (!allClients || !allClients.length) return;
//         setAllClients([...orderBy(allClients, 'hardDiskUsageSizeInGB', sortType.hardDiskSize)]);
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
//         setAllClients([...orderBy(allClients, 'lastUploadTime', sortType.updateTime)]);
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

//     const [rightSideButtons, setRightSideButtons] = useState(
//         {
//             reportButton: true,
//         }
//     );

//     return (

//         <>
//             <div className=" h-full relative overflow-hidden bg-[#D8DCE3] py-[8px] ">
//                 {/* Loaders and Alerts */}
//                 <PageLoader show={showPageLoader} title={"Fetching Data"} bgOpacity={40} />
//                 {/* {
//                     (userPermission.length > 1 &&
//                         userPermission[4].canView === true &&
//                         userPermission[4].canPrint === true ) ? (
//                             <> */}

//                 <Snackbar
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     open={snackBarState.open}
//                     severity={snackBarState.severity}
//                     onClose={handleSnackbarClose}
//                     key={'top' + 'right'}
//                 autoHideDuration={5000}
//                 >
//                     <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#FFFFFF', background: snackBarState.bgcolor }}>
//                         {snackBarState.message}
//                     </Alert>
//                 </Snackbar>

//                 <PathInfo fontAwesomeIcon={faCloudUpload} />

//                 {/* Status Change Alerts/Popups */}
//                 {showStatusUpdateModal.show && (
//                     createConfirmPopup()
//                 )}

//                 {/* Header */}
//                 {popupOverlay && <SavingLoader /> }
                    
//                 <div className="px-[10px] bg-white h-[calc(100%-35px)]">
//                     <Header
//                         isLoading={showSkeletonLoader}
//                         isItemSelected={!!selectedClient}
//                         show={headerButtons}
//                         onSearch={onClientSearch}
//                         onSearchClick={onUpdateClientStatus}
//                         onRefresh={onRefresh}
//                         onProjectFile={onProjectFile}
//                         initialSearchValue={_searchText}
//                         activeStatus={clientStatus}
//                         searchStatusModifier={setActiveStatus_searchBar}
//                         extendSearchBox={extendSearch}
//                         hideStatusSearch={true}
//                         rightSideButtons={rightSideButtons}
//                     >


//                     </Header>

//                     {/* Skeleton for Grid */}
//                     <SkeletonLoaderForGrid show={showSkeletonLoader} />

//                     {/* Grid */}

//                     <div className={`${showSkeletonLoader ? 'opacity-0' : ''}  grid-sec bg-white h-[calc(100%-58px)] max-[767px]:h-[calc(100%-112px)] flex flex-col max-[767px]:overflow-x-auto `}>
//                         <div className="grow flex flex-col max-[767px]:w-fit">

//                             <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                                 <div className={` flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[150px] px-[10px] ${hasSerialNo ? " w-[160px] " : " w-[140px] "} `}>
//                                     <div>sr no.</div>
//                                     {hasSerialNo &&
//                                         <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                     }

//                                 </div>

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Project Name</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByProjectName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>
//                                 {/* <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Project Group Name</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByProjectGroupName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div> */}

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

//                                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[65%] px-[10px]">
//                                     <div>Last Backup Time</div>
//                                     <FontAwesomeIcon onClick={(e) => sortByUpdateTime()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                                 </div>
//                                 <div className="flex items-center justify-center font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                     <div>Download</div>
//                                 </div>

//                             </div>


//                             <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap w-full h-[377px]">
//                                 {!!allClients.length && (
//                                     allClients.map((_client, index) => {
//                                         return (
//                                             <div onClick={(e) => onClientSelect(_client)} key={_client.projectId} className={`${(selectedClient && selectedClient.projectId === _client.projectId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>

//                                                 <div className={`flex items-center h-full px-[10px] py-[5px] overflow-hidden w-[150px]`}>
//                                                     <div className=" text-ellipsis">{index + 1}</div>
//                                                 </div>

//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.projectName}</div>
//                                                 </div>
//                                                 {/* <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.projectGroupName}</div>
//                                                 </div> */}

//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.sizeInMB ? _client.sizeInMB : ''}</div>
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">{_client.cdnUsageSizeInGB ? _client.cdnUsageSizeInGB : ''}</div>
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">
//                                                         {_client.hardDiskUsageSizeInGB ? _client.hardDiskUsageSizeInGB : ''}
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center h-full w-[65%] px-[10px] py-[5px] overflow-hidden">
//                                                     <div className="overflow-hidden  text-ellipsis">  {_client.lastBackupTime ? formatTime(_client.lastBackupTime) : ""}</div>
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
//                         {/* <div className="font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center fixed bottom-3 bg-white w-[87%]">Total Record Count: {allClients?.length}</div>
//                             <div className='w-fit'>
//                                 <PaginationTab totalItems={totalRecorders || 0} onPageChnage={setPageNo} itemsCount={30} />
//                             </div> */}
//                         <div className={`font-mulish font-semibold text-[#696c74] text-[14px] h-[42px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between`} >
//                             <div className='w-fit'>Total Record Count: {totalRecorders || allClients.length}</div>
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