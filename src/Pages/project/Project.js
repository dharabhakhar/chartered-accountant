// import { useCallback, useEffect, useRef, useState } from "react"
// import { _api, decode } from "../../Utils/Config/axiosConfig"
// import Header from "../../UIComponents/SubHeader/Header"
// import { faArrowDownWideShort, faBan, faCaretDown, faCheck, faHouse, faTrash, faUserTie, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PageLoader from "../../UIComponents/Loaders/PageLoader";
// import FormPopup from "../../UIComponents/Popup/FormPopup";
// import { formatTime } from "../../Utils/date"
// import { useFormik } from "formik";
// import { Fragment } from 'react'
// import { alertColors, statusLabels, statuses } from "../../Utils/constants"
// import ConfirmPopup from "../../UIComponents/Popup/ConfirmPopup";
// import { Snackbar, Alert } from "@mui/material";
// import { RotatingLines } from "react-loader-spinner";
// import { CLIENT_KEY_GENERATE_URL } from "../../Utils/Config/envConfig"
// import SkeletonLoaderForGrid from "../../UIComponents/Loaders/SkeletonLoaderForGrid";
// import { _fetchAllClients, _fetchAllProject, _fetchAllProjectGroup, _fetchTime, _fetchUser } from "../../Utils/APIs/FetchAPIs";
// import { _saveBackupNow, _saveClient, _saveProject } from "../../Utils/APIs/SaveAPIs";
// import PathInfo from "../../UIComponents/Navigation/PathInfo/PathInfo";
// import { Combobox, Transition } from '@headlessui/react';
// import { useNavigate } from "react-router-dom/dist";
// import { isNull } from "lodash";
// import SuccessIcon from '@mui/icons-material/CheckCircle';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningIcon from '@mui/icons-material/Warning';
// import ErrorIcon from '@mui/icons-material/Error';
// // import { handleNumberSort, handleStringSort } from "../../Utils/utils";

// //helpers
// const orderBy = require('lodash/orderBy');

// export default function Client() {
//   const navigate = useNavigate();

//   /**Mutable State */
//   //layouts
//   const [showPageLoader, setShowPageLoader] = useState(false);
//   const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//   const [shouldRunEffect, setShouldRunEffect] = useState(false)
//   const [popupOverlay, setPopupOverlay] = useState(false);
//   const [headerButtons, setHeaderButtons] = useState(
//     {
//       add: decode?.claims.includes(7) ? true : false,
//       edit: decode?.claims.includes(8) ? true : false,
//       active: decode?.claims.includes(8) ? true : false,
//       deactive: decode?.claims.includes(8) ? true : false,
//       delete: decode?.claims.includes(9) ? true : false,
//       refresh: true,
//       backupNow: decode?.claims.includes(37) ? true : false,
//       backupSetting: decode?.claims.includes(11) ? true : false,
//       backupSchedule: decode?.claims.includes(16) ? true : false,
//       projectDB: decode?.claims.includes(51) ? true : false,
//     }
//   );
//   const [showModal, setShowModal] = useState({
//     show: false,
//     mode: 'add'
//   });
//   const [isOpenDropDown, setIsOpenDropDown] = useState(false);
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
//   const [keyGenerateLoading, setKeyGenerateLoading] = useState(false)
//   const [popupIsOpen, setPopupIsOpen] = useState(false);


//   //dynamic data
//   const [allClients, setAllClients] = useState([])
//   // const [userPermission, setUserPermission] = useState([])
//   const [BackupNow, setBackupNow] = useState({
//     isUploadToOnlineStorage: false,
//     isForceBackup: false
//   })
//   const [backupTime, setBackupTime] = useState({
//     lastBackupTime: false,
//     lastUploadTime: false
//   })
//   const [selectedClient, setSelectedClient] = useState(null)
//   const [_searchText, set_SearchText] = useState("")
//   const [clientStatus, setClientStatus] = useState(statuses.active);
//   const [activeStatus_searchbar, setActiveStatus_searchBar] = useState('active');
//   const [hasSerialNo, setHasSerialNo] = useState(false)
//   const [length, setlength] = useState(0);
//   // const [generatedKey, setGeneratedKey] = useState("")


//   //other state
//   const [sortType, setSortType] = useState({
//     clientName: 'asc',
//     serialNo: 'asc',
//     groupname: 'asc'
//   });
//   const [selected, setSelected] = useState({ id: 0, name: "" })
//   const [selectedPostCategory, setSelectedPostCategory] = useState(null);
//   const [addPostCategory, setAddPostCategory] = useState(null);
//   const [emailError, setEmailError] = useState('');
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [filteredCategories, setfilteredcategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [addPostCategoryQuery, setAddPostCategoryQuery] = useState('');
//   const [selectedProjectCategory, setSelectedProjectCategory] = useState('');
//   const [updateFlag, setUpdateFlag] = useState(false);
//   const [searchgroup, setsearchgroup] = useState('')


//   const getgroup = async () => {
//     if (!showSkeletonLoader) setShowPageLoader(true);


//     const response = await _fetchAllProjectGroup(searchgroup, clientStatus)

//     if (response && response.status === 200) {
//       const data = response.data || [];
//       const allCategories = [{ projectGroupId: 0, projectGroupName: "All" }, ...data];
//       setfilteredcategories([...allCategories]);
//       setCategories([...allCategories]);
//       setSelectedPostCategory(allCategories[0]);
//       setAddPostCategory(allCategories[1]);
//       if (selectedClient) {
//         const matchingClient = data.find((client) => client.projectGroupName === selectedClient.projectGroupName);
//         if (matchingClient) {
//           setAddPostCategory(matchingClient);
//         }
//       }
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true)

//   }

//   /**Refs */
//   const gridListDivRef = useRef(null)

//   /**Form Handling */
//   const formik = useFormik({
//     initialValues: {
//       clientName: '',
//       clientSrNo: 1,
//     },
//     validateOnMount: true,

//     validate: (values) => {
//       const errors = {};

//       if (!values.clientName) {
//         errors.clientName = 'Project Name is Require';
//       } else if (values.clientName.length > 50) {
//         errors.clientName = 'Maximum 50 characters are allowed';
//       }

//       if (!values.clientSrNo) {
//         errors.clientSrNo = 'Serial No is Required';
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
//     setPopupOverlay(true)
//     return new Promise(async (resolve, reject) => {
//       try {
//         // console.log('clicked');

//         const response = await _saveBackupNow(selectedClient.projectId, BackupNow);

//         if (response.message.statusCode === 200) {
//           setSnackBarState({
//             open: true, severity: 'success',
//             bgcolor: alertColors.success, message: response.message.responseMessage || 'Backup Done'
//           });
//           setPopupOverlay(false);
//           onCloseModal();
//           fetchAllClients();

//         } else if (response) {
//           for (let i = 0; i < response.data.errors.length; i++) {
//             setSnackBarState({
//               open: true, severity: 'error',
//               bgcolor: alertColors.error, message: response.data.errors[i] || 'Backup has not been done!'
//             });
//           }
//           setPopupOverlay(false);
//         }

//         resolve(true);

//       } catch (e) {
//         setSnackBarState({
//           open: true, severity: 'error',
//           bgcolor: alertColors.error, message: 'Something went wrong!'
//         });
//         setPopupOverlay(false);
//       }
//     });
//   }


//   /**Methods */
//   //Read
//   const fetchAllClients = async (removeSelected = false) => {

//     if (!showSkeletonLoader) setShowPageLoader(true);

//     const response = await _fetchAllProject(_searchText, clientStatus, selectedProjectCategory || 0)

//     if (response && response.status === 200) {
//       setAllClients(response.data || []);
//     }
//     if (removeSelected) {
//       setSelectedClient(null)
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true)

//   }

//   const onClientSearch = (searchText) => {
//     set_SearchText(searchText)
//   }

//   const onUpdateClientStatus = (status, searchText) => {
//     setSelectedClient(null)
//     if (status === 'active') {
//       setClientStatus(statuses.active);
//     } else if (status === 'deactive') {
//       setClientStatus(statuses.deactive);
//     }
//     setSelectedProjectCategory(selectedPostCategory);
//     set_SearchText(searchText)
//     setUpdateFlag(!updateFlag);
//   };

//   function calculateNextSerialNumber(clients) {
//     if (clients.length === 0) {
//       return 1;
//     }
//     const biggestSerialNo = clients.reduce((max, client) => {
//       return client.serialNo > max ? client.serialNo : max;
//     }, 0);

//     return biggestSerialNo + 1;
//   }

//   //Write
//   const onAddClient = useCallback(() => {
//     setShowPageLoader(true)
//     const nextSerialNo = calculateNextSerialNumber(allClients);
//     fetchAllClients().then((clients) => {
//       if (allClients.length > 0) {
//         let formData = {
//           clientName: '',
//           clientSrNo: nextSerialNo
//         }
//         formik.setValues(formData);
//       }
//       setShowPageLoader(false)
//     })
//     setShowModal((current) => {
//       return { ...current, show: true, mode: 'add' };
//     });
//     setAddPostCategory(null);
//     validateForm();
//     setEmailError('');
//     getgroup();
//   }, []);

//   const onEditClient = async (_client) => {
//     getgroup();
//     if (!_client) {
//       _client = selectedClient;
//     }
//     setShowPageLoader(true)
//     const formData = {
//       clientName: _client?.projectName,
//       clientSrNo: _client?.serialNo
//     };
//     formik.setValues(formData);
//     setEmailError('');
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
//           if (addPostCategory.projectGroupId === 0 && addPostCategory.projectGroupName === "") {
//             setEmailError('Project Group is Required');
//             setPopupOverlay(false);
//             return;
//           } else {

//             const response = await _saveProject(projectId || 0, formik.values.clientName, formik.values.clientSrNo, addPostCategory.projectGroupId);

//             if (response && response.status && response.message.statusCode === 200) {
//               setSnackBarState({
//                 open: true, severity: 'success',
//                 bgcolor: alertColors.success, message: response.message.responseMessage || 'Project has been saved successfully!'
//               });
//               setPopupOverlay(false);
//               onCloseModal();
//               fetchAllClients();

//             } else if (response) {
//               for (let i = 0; i < response.data.errors.length; i++) {
//                 setSnackBarState({
//                   open: true, severity: 'error',
//                   bgcolor: alertColors.error, message: response.data.errors[0] || 'Project has not been saved!'
//                 });
//               }
//               setPopupOverlay(false);
//             }

//             resolve(true);
//           }
//         }
//       } catch (e) {
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
//       const data = {
//         "projectId": selectedClient.projectId,
//         "eStatus": status,
//       };
//       const response = await _api.post('project/change_status', data);
//       if (response && response.status && response.data.statusCode === 200) {

//         setSnackBarState({
//           open: true, severity: 'success',
//           bgcolor: alertColors.success, message: response.data.responseMessage || "Project has been Updated!",

//         });
//         closeStatusUpdateModal();
//         setSelectedClient(null);
//         fetchAllClients(true);
//         setShowPageLoader(false);

//       } else if (response) {
//         for (let i = 0; i < response.data.errors.length; i++) {
//           setSnackBarState({
//             open: true, severity: 'error',
//             bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[i] : 'Project has not been Updated!'
//           });
//         }

//         closeStatusUpdateModal();
//         setShowPageLoader(false);

//       }

//       setShowPageLoader(false);


//     } catch (err) {
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
//     setSelectedClient(_client)
//     onEditClient(_client);
//   }

//   const onRefresh = () => {
//     setSelectedClient(null)
//     setShowSkeletonLoader(true);
//     if (activeStatus_searchbar === statusLabels[clientStatus]) {
//       fetchAllClients();
//     } else {
//       onUpdateClientStatus(activeStatus_searchbar);

//     }

//   };

//   const onBackupSetting = (_client) => {
//     if (!_client) {
//       _client = selectedClient
//     }
//     setShowSkeletonLoader(true);
//     localStorage.setItem('ProjectId', _client.projectId);
//     localStorage.setItem('ProjectName', _client.projectName);
//     if (selectedClient) {
//       navigate('/project/backup-setting');
//     }
//     setSelectedClient(null)
//   };

//   const onBackupSchedule = (_client) => {
//     if (!_client) {
//       _client = selectedClient
//     }
//     setShowSkeletonLoader(true);
//     localStorage.setItem('ProjectId', _client.projectId);
//     localStorage.setItem('ProjectName', _client.projectName);
//     if (selectedClient) {
//       navigate('/project/backup-schedule');
//     }
//     setSelectedClient(null)
//   };
//   const onProjectDB = (_client) => {
//     if (!_client) {
//       _client = selectedClient
//     }
//     setShowSkeletonLoader(true);
//     localStorage.setItem('ProjectId', _client.projectId);
//     localStorage.setItem('ProjectName', _client.projectName);
//     if (selectedClient) {
//       navigate('/project/projectDB');
//     }
//     setSelectedClient(null)
//   };

//   const onCloseModal = () => {
//     formik.resetForm();
//     setShowModal((current) => {
//       return { ...current, show: false };
//     });
//     setShowBackupNowModal(false)
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
//     })
//   };
//   const sortByClientName = () => {
//     setSortType((current) => {
//       return { ...current, clientName: current.clientName === 'asc' ? 'desc' : 'asc' };
//     });
//   };
//   const sortBygroupname = () => {
//     setSortType((current) => {
//       return { ...current, groupname: current.groupname === 'asc' ? 'desc' : 'asc' };
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
//   }

//   const onBackupNow = async () => {
//     if (!showSkeletonLoader) setShowPageLoader(true);

//     const response1 = await _fetchTime(selectedClient.projectId)

//     if (response1 && response1.status === 200) {
//       setBackupTime(response1.data || '');
//     }
//     setShowPageLoader(false);
//     setShowSkeletonLoader(false);
//     if (!shouldRunEffect) setShouldRunEffect(true)
//     setShowBackupNowModal(true);
//   }
//   const ChangeUpload = () => {
//     setBackupNow({ ...BackupNow, isUploadToOnlineStorage: !BackupNow.isUploadToOnlineStorage });
//   }
//   const ChangeSendEmail = () => {
//     setBackupNow({ ...BackupNow, isForceBackup: !BackupNow.isForceBackup });
//   }


//   function _getConfirmationPopupData(mode) {
//     switch (mode) {
//       case 'activate': return {
//         icon: faCheck,
//         text: " Are you sure to active the selected Project?",
//         color: "#3a6d7e",
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
//         return {}
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
//           formik.setFieldValue("clientKey", _generatedKey)
//           setKeyGenerateLoading(false)
//         }
//       ).catch(
//         (err) => {
//           formik.setFieldTouched("clientKey", true)
//           setTimeout(
//             () => {
//               formik.setFieldError("clientKey", "Failed to generate key")

//             }, 50
//           )
//           setKeyGenerateLoading(false)
//         }
//       )
//     } catch (err) {
//       if (keyGenerateLoading) {
//         setKeyGenerateLoading(false)
//         formik.setFieldTouched("clientKey", true)
//         setTimeout(
//           () => {
//             formik.setFieldError("clientKey", "Failed to generate key")

//           }, 50
//         )
//       }
//     }
//   }

//   /**UI Piece */
//   function StatusChangedAlert({ _mode }) {
//     let _popupData = _getConfirmationPopupData(_mode);

//     return (
//       <div className="p-[15px]">

//         <div className="flex flex-col items-center gap-y-[10px]">

//           <div style={{ borderColor: _popupData.color }} className="w-[50px] h-[50px] rounded-full border-[2px] border-solid text-[#5bc0de] flex justify-center items-center" >
//             <FontAwesomeIcon className="text-[24px]" icon={_popupData.icon} style={{ color: _popupData.color }} />
//           </div>

//           <div className="font-semibold font-mulish text-[18px] text-[#696c74]">{_popupData.text}</div>

//         </div>


//       </div>
//     )
//   }
//   const onCategorySelect = (category) => {
//     setSelectedPostCategory(category);
//   };

//   const filterCategories = (query) => {
//     const filtered = categories.filter((category) =>
//       category.projectGroupName.toLowerCase().includes(query.toLowerCase())
//     );
//     setfilteredcategories(filtered);
//   };

//   const extendSearch = (
//     <div>
//       <div className="mb-4">
//         {/* <CustomDatePicker selectedDate={fromdate_search} selectedDateModifier={setFromDate_search} title="From Date" id="backuplog_search_fromdate" classNames="rounded-[3.75px]" /> */}

//         <div className={`combo-box ${isOpenDropDown ? 'box-open' : ''}`}>
//           <Combobox value={selectedPostCategory} onChange={onCategorySelect}>
//             <div id="" className="relative mb-[15px]">
//               <div id="categoryDropdown2" placeholder="categoryDropdown2" className=" peer relative w-full cursor-default overflow-hidden rounded-[3.75px] bg-white text-left  focus:outline-none ">
//                 <Combobox.Input
//                   className="capitalize   outline-none font-mulish text-[14px] h-[40px]  px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                   displayValue={(category) => category?.projectGroupName}
//                   onChange={(event) => {setAddPostCategoryQuery(event.target.value);
//                     filterCategories(event.target.value);}}
//                   onFocus={() => setIsOpenDropDown(true)}
//                   onBlur={() => setIsOpenDropDown(false)}

//                 />
//                 <Combobox.Button className="absolute inset-0 bg-transparent flex items-center justify-end pr-2">
//                   <span
//                     className="px-[12px] text-[13px]  font-mulish  text-[#696c74] transition-all  peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                     aria-hidden="true"
//                   >{selectedPostCategory === null && !isOpenDropDown && <> Project Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span></>}

//                   </span>
//                   <FontAwesomeIcon icon={faCaretDown} className="text-xs text-gray-400" />
//                 </Combobox.Button>
//               </div>
//               {(addPostCategoryQuery || isOpenDropDown || selectedPostCategory?.projectGroupName) && <label
//                 htmlFor="categoryDropdown2"
//                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//               >
//                 Project Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//               </label>}
//               <Transition
//                 as={Fragment}
//                 leave="transition ease-in duration-100"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//                 afterLeave={() => { setAddPostCategoryQuery(''); }}
//               >
//                 <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm rounded-b-lg  shadow-xl  ">
//                   {filteredCategories.length === 0 && addPostCategoryQuery !== '' ? (
//                     <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                       Nothing found.
//                     </div>
//                   ) : (
//                     filteredCategories.map((category) => (
//                       <Combobox.Option
//                         key={category.projectGroupId}
//                         className={({ active }) =>
//                           `relative  select-none py-2 pl-10 pr-4 ${active ? 'bg-[#2574ab] text-white' : 'text-gray-900'
//                           } w-full px-2  cursor-pointer hover:bg-[#2574ab] hover:text-white py-1 duration-150 capitalize `
//                         }
//                         value={category}
//                       >
//                         {({ selected, active }) => (
//                           <>
//                             <span
//                               className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                                 }`}
//                             >
//                               {category.projectGroupName}
//                             </span>
//                             {selected ? (
//                               <span
//                                 className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-900'
//                                   }`}
//                               >
//                               </span>
//                             ) : null}
//                           </>
//                         )}
//                       </Combobox.Option>
//                     ))
//                   )}
//                 </Combobox.Options>
//               </Transition>
//             </div>
//           </Combobox>
//         </div>
//       </div>
//     </div>
//   )
//   const onAddPostCategorySelect = (category) => {
//     setAddPostCategory(category);
//   };

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
//     )
//   }

//   const handleStatusChange = (clientStatus) => {
//     if (clientStatus === 'active') {
//       setHeaderButtons((prevButtons) => ({
//         ...prevButtons,
//         active: false,
//         deactive: true,
//       }));
//     } else if (clientStatus === 'deactive') {
//       setHeaderButtons((prevButtons) => ({
//         ...prevButtons,
//         active: true,
//         deactive: false,
//       }));
//     }
//   };

//   /**Effects */
//   useEffect(() => {
//     if (allClients.length > 0) {
//       let formData = {
//         clientSrNo: allClients[allClients.length - 1].serialNo + 1
//       }
//       // Update the form values using formik.setValues
//       formik.setValues(formData);
//     }
//   }, [allClients]);
//   useEffect(() => {
//     if (clientStatus === 1) {
//       setHeaderButtons((prevButtons) => ({
//         ...prevButtons,
//         active: false,
//         deactive: true,
//       }));
//     } else {
//       setHeaderButtons((prevButtons) => ({
//         ...prevButtons,
//         active: true,
//         deactive: false,
//       }));
//     }
//   }, [clientStatus]);

//   useEffect(() => {
//     setHeightOfGrid();
//     document.title = 'Project - Zibma Infotech';
//   }, []);

//   useEffect(
//     () => {
//       setShowSkeletonLoader(true)
//       setTimeout(
//         () => {
//           getgroup()
//           fetchAllClients()
//         }, 300
//       )
//     }, []
//   )

//   useEffect(() => {
//     if (clientStatus !== null) {
//       fetchAllClients(clientStatus);
//     }
//   }, [clientStatus, selectedProjectCategory, updateFlag, _searchText]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     const sortedClients = [...allClients];
//     if (sortType.clientName === 'asc') {
//       sortedClients.sort((a, b) => a.projectName?.localeCompare(b.projectName) || 0);
//     } else {
//       sortedClients.sort((a, b) => b.projectName?.localeCompare(a.projectName) || 0);
//     }
//     setAllClients(sortedClients);
//   }, [sortType.clientName]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     const sortedClients = [...allClients];
//     if (sortType.groupname === 'asc') {
//       sortedClients.sort((a, b) => a.projectGroupName?.localeCompare(b.projectGroupName) || 0);
//     } else {
//       sortedClients.sort((a, b) => b.projectGroupName?.localeCompare(a.projectGroupName) || 0);
//     }
//     setAllClients(sortedClients);
//   }, [sortType.groupname]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     setAllClients([...orderBy(allClients, 'serialNo', sortType.serialNo)]);
//   }, [sortType.serialNo]);

//   useEffect(() => {
//     if (!allClients || !allClients.length) return;
//     setAllClients([...orderBy(allClients, 'updateTime', sortType.updateTime)]);
//   }, [sortType.updateTime]);

//   useEffect(
//     () => {
//       if (allClients.length) {
//         if (allClients[0].serialNo && !hasSerialNo) {
//           setHasSerialNo(true)
//         }
//       }
//     }, [allClients]
//   )

//   useEffect(
//     () => {
//       if (showModal.show || showStatusUpdateModal.show) {
//         setPopupIsOpen(true)
//       } else {
//         setPopupIsOpen(false)
//       }
//     }, [showModal?.show, showStatusUpdateModal?.show]
//   )
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
//       }
//       document.onkeydown = _onAddKeyboard;
//       return () => {
//         document.removeEventListener("keydown", _onAddKeyboard)
//       }
//     }, [headerButtons, selectedClient, popupIsOpen]
//   )

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
//         <PathInfo fontAwesomeIcon={faHouse} />

//         {/* Add and Edit Popus */}
//         {showModal.show && (
//           <FormPopup openPopup={showModal.show} overlay={popupOverlay} submitMethod={formik.handleSubmit} submitText={"Save"} title={showModal.mode === 'add' ? 'Add Project' : 'Edit Project'} closingMethod={() => onCloseModal()} disabledSubmit={formik.isValid}>

//             <form onSubmit={formik.handleSubmit}>
//               <div className=" border-b w-full">
//                 <div className="px-[25px] py-[10px]">
//                   <div id="custom_select" className="relative" >
//                     <div className="relative flex "
//                     >
//                     </div>
//                     <div className="my-[15px] relative">
//                       <div className=" relative">
//                         <div className={`combo-box ${isCategoryDropdownOpen ? 'box-open' : ''}`}>
//                           <Combobox value={addPostCategory} onChange={onAddPostCategorySelect}>
//                             <div id="" className="relative mb-[15px]">
//                               <div id="categoryDropdown2" placeholder="categoryDropdown2" className=" peer relative w-full cursor-default overflow-hidden rounded-[3.75px] bg-white text-left  focus:outline-none ">
//                                 <Combobox.Input
//                                   className="capitalize   outline-none font-mulish text-[14px] h-[40px]  px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
//                                   displayValue={(category) => category?.projectGroupName}
//                                   onChange={(event) => {setAddPostCategoryQuery(event.target.value);
//                                     filterCategories(event.target.value);}}
//                                   onFocus={() => {
//                                     if (showModal.mode !== 'edit') {
//                                       setIsCategoryDropdownOpen(true);
//                                     }
//                                   }}
//                                   onBlur={() => setIsCategoryDropdownOpen(false)}
//                                   readOnly={showModal.mode === 'edit'}
//                                   autoFocus

//                                 />
//                                 <Combobox.Button className="absolute inset-0 bg-transparent flex items-center justify-end pr-2">
//                                   <span
//                                     className="px-[12px] text-[13px]  font-mulish  text-[#696c74] transition-all  peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                                     aria-hidden="true"
//                                   >{addPostCategory === null && !isCategoryDropdownOpen && <> Select Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span></>}</span>
//                                   <FontAwesomeIcon icon={faCaretDown} className="text-xs text-gray-400" />
//                                 </Combobox.Button>
//                               </div>
//                               {(addPostCategoryQuery || isCategoryDropdownOpen || addPostCategory?.projectGroupName) && <label
//                                 htmlFor="categoryDropdown2"
//                                 className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                               >
//                                 Select Group <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                               </label>}
//                               <Transition
//                                 as={Fragment}
//                                 leave="transition ease-in duration-100"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                                 afterLeave={() => { setAddPostCategoryQuery(''); }}
//                               >
//                                 <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm rounded-b-lg  shadow-xl  ">
//                                   {filteredCategories.length === 0 && addPostCategoryQuery !== '' ? (
//                                     <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
//                                       Nothing found.
//                                     </div>
//                                   ) : (
//                                     filteredCategories.map((category) => (
//                                       <Combobox.Option
//                                         key={category.projectGroupId}
//                                         className={({ active }) =>
//                                           `relative  select-none py-2 pl-10 pr-4 ${category.projectGroupName === 'All' ? 'hidden' : ''}  ${active ? 'bg-[#2574ab] text-white' : 'text-gray-900'
//                                           } w-full px-2  cursor-pointer hover:bg-[#2574ab] hover:text-white py-1 duration-150 capitalize `
//                                         }
//                                         value={category}
//                                       >
//                                         {({ selected, active }) => (
//                                           <>
//                                             <span
//                                               className={`block truncate ${selected ? 'font-medium' : 'font-normal'
//                                                 }`}
//                                             >
//                                               {category.projectGroupName}
//                                             </span>
//                                             {selected ? (
//                                               <span
//                                                 className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-900'
//                                                   }`}
//                                               >
//                                               </span>
//                                             ) : null}
//                                           </>
//                                         )}
//                                       </Combobox.Option>
//                                     ))
//                                   )}
//                                 </Combobox.Options>
//                               </Transition>
//                             </div>
//                           </Combobox>
//                         </div>
//                       </div>

//                     </div><div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                       {emailError}
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
//                         value={formik.values?.clientName}
//                         required
//                       />
//                       <label
//                         htmlFor="clientName"
//                         className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
//                       >
//                         Project Name <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
//                       </label>
//                     </div>
//                     <div className="text-[#dc3545] text-[12px] mt-[2px] ml-[4px]">
//                       {formik.errors.clientName && formik.touched.clientName && formik.errors.clientName}
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
//                         onChange={
//                           (event) => {
//                             event.preventDefault()
//                             const _key = event.nativeEvent.data;
//                             if (_key === "+" || _key === "-" || isNaN(_key)) return;
//                             if (event.target.value.length > 5 || (_key && event.target.value < 1)) return;
//                             formik.handleChange(event);
//                           }}
//                         onBlur={formik.handleBlur}
//                         value={formik.values?.clientSrNo}
//                         required
//                       />
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
//                   <button type='submit' className={`${formik.isValid ? 'cursor-pointer' : 'cursor-not-allowed'} bg-gradient-to-r from-[#259dab] to-[#2574ab] text-white rounded px-3 py-1.5 capitalize  max-[450px]:w-[100px] w-[85px]`} >{"Save"}</button>
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
//                   <div id="custom_select" className="relative mt-[5px] " >
//                     <div className="relative flex "
//                     >
//                     </div>
//                   </div>
//                   <div className="flex mb-[20px]">
//                     <div class="flex items-center">
//                       <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 dark:focus:ring-sky-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => ChangeUpload()}
//                         checked={BackupNow.isUploadToOnlineStorage}
//                       />
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
//                     <label className="mb-3 font-normal">Last Backup Time: <span className="font-medium">{formatTime(backupTime.lastBackupTime)}</span></label>
//                   </div>
//                   <div className="font-mulish text-[14px]">
//                     <label className="mb-3 font-normal">Last Upload Time: <span className="font-medium">{formatTime(backupTime.lastUploadTime)}</span></label>
//                   </div>
//                 </div>
//                 <div className='flex gap-4 justify-end text-[15px] max-[450px]:justify-center border-t px-[25px] py-3 font-semibold'>
//                   <button type='button' className={` rounded-[4px] pt-[5px] pb-[6px] max-[450px]:w-[100px] w-[85px] text-black bg-[#f6f0f6] hover:opacity-[0.88]`} onClick={() => closeBackupNowModal()}>Cancel</button>
//                   <button type='submit' className={` bg-gradient-to-r from-[#259dab] to-[#2574ab] text-white rounded px-3 py-1.5 capitalize  max-[450px]:w-[110px] w-[115px] cursor-pointer`} >{"Backup Now"}</button>
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
//             onProjectDB={onProjectDB}
//             initialSearchValue={_searchText}
//             activeStatus={clientStatus}
//             extendSearchBox={extendSearch}
//             searchStatusModifier={setActiveStatus_searchBar}
//           />

//           {/* Skeleton for Grid */}
//           <SkeletonLoaderForGrid show={showSkeletonLoader} />

//           {/* Grid */}

//           <div className={`${showSkeletonLoader ? 'opacity-0' : ''}  grid-sec bg-white h-[calc(100%-53px)] max-[767px]:h-[calc(100%-112px)] flex flex-col max-[767px]:overflow-x-auto `}>
//             <div className="grow flex flex-col max-[767px]:w-fit">

//               <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                 <div className={` flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[140px] px-[10px] ${hasSerialNo ? " w-[160px] " : " w-[140px] "} `}>
//                   <div>sr no.</div>
//                   {hasSerialNo &&
//                     <FontAwesomeIcon onClick={(e) => sortBySerialNo()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                   }

//                 </div>

//                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                   <div>Project Group Name</div>
//                   <FontAwesomeIcon onClick={(e) => sortBygroupname()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                 </div>

//                 <div className="flex items-center justify-between font-bold uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                   <div>Project Name</div>
//                   <FontAwesomeIcon onClick={(e) => sortByClientName()} className="cursor-pointer hover:text-[#88b1ce]" icon={faArrowDownWideShort} size="lg" />
//                 </div>

//               </div>
//               <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap w-full h-[377px]">
//                 {!!allClients.length && (
//                   allClients.map((_client, index) => {
//                     return (
//                       <div onClick={(e) => onClientSelect(_client)} onDoubleClick={(e) => openClientInEditMode(_client)} key={_client.projectId} className={`${(selectedClient && selectedClient.projectId === _client.projectId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'}  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`}>


//                         <div className={`flex items-center h-full w-[140px] px-[10px] py-[5px] overflow-hidden ${hasSerialNo ? " w-[160px] " : " w-[140px] "} `}>
//                           <div className="overflow-hidden text-ellipsis">{_client.serialNo}</div>
//                         </div>

//                         <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden ">
//                           <div className="overflow-hidden  text-ellipsis">{_client.projectGroupName}</div>
//                         </div>

//                         <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden ">
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

//             </div>
//             <div className="font-mulish font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center justify-between">Total Record Count: {allClients?.length}</div>

//           </div>



//         </div>

//         {/* </>
//         ) : (
//           <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-53px)] max-[767px]:max-h-[calc(100%-104px)] flex flex-col max-[767px]:overflow-x-auto `}>
//             <h3>Not Allowed</h3>
//           </div>
//         )
//         } */}
//       </div>
//     </>



//   )
// }