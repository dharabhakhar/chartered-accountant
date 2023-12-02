// import React, { useCallback, useRef, useState } from 'react'
// import PageLoader from '../../../UIComponents/Loaders/PageLoader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PathInfo from '../../../UIComponents/Navigation/PathInfo/PathInfo';
// import { faArrowDownWideShort, faBan, faCheck, faHouse, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
// import { useFormik } from 'formik/dist';
// import { _saveClient } from '../../../Utils/APIs/SaveAPIs';
// import SkeletonLoaderForGrid from '../../../UIComponents/Loaders/SkeletonLoaderForGrid';
// import { Alert, Snackbar } from '@mui/material';
// import { useNavigate } from 'react-router-dom/dist';
// import { alertColors, statuses } from '../../../Utils/constants';
// import { _api } from '../../../Utils/Config/axiosConfig';
// import { _fetchAllClients } from '../../../Utils/APIs/FetchAPIs';
// import Header from '../../../UIComponents/SubHeader/Header';
// import { CheckBox } from '@mui/icons-material';

// export default function Permission() {
//     /**Mutable State */
//     //layouts
//     const [showPageLoader, setShowPageLoader] = useState(false);
//     const [showSkeletonLoader, setShowSkeletonLoader] = useState(false);
//     const [shouldRunEffect, setShouldRunEffect] = useState(false)
//     const [popupOverlay, setPopupOverlay] = useState(false);
//     const navigate = useNavigate();
//     const [headerButtons, setHeaderButtons] = useState(
//         {
//             add: true,
//             edit: true,
//             active: false,
//             deactive: false,
//             delete: true,
//             refresh: false,
//             permission: true,
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

//     // dynamic data
//     const [allClients, setAllClients] = useState([])
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [_searchText, set_SearchText] = useState("");
//     const [clientStatus, setClientStatus] = useState(statuses.active);
//     const [sortType, setSortType] = useState({
//         clientName: 'asc',
//         updateTime: 'asc'
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
//                 await _saveClient(showModal.mode === 'edit' ? selectedClient.clientId : undefined);
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


//         const response = await _fetchAllClients(_searchText, clientStatus)

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
//         };
//         formik.setValues(formData);

//         setShowPageLoader(false);
//         setShowModal((current) => {
//             return { ...current, show: true, mode: 'edit' };
//         });
//         validateForm();
//     };
//     const onPermission = async (_client) => {
//         if (!_client) {
//             _client = selectedClient;
//         }
//         setShowPageLoader(true)
//         const formData = {
//             clientName: _client?.clientName,
//         };
//         formik.setValues(formData);


//         setShowPageLoader(false);
//         // setShowModal((current) => {
//         //   return { ...current, show: true, mode: 'edit' };
//         // });
//         navigate('/User/permission');
//         validateForm();
//     };
//     const onDelete = () => {
//         setShowStatusUpdateModal({
//             show: true,
//             mode: 'delete'
//         });
//     }
//     const updateClientStatus = async (status) => {
//         setShowPageLoader(true);
//         const data = {
//             "clientId": selectedClient.clientId,
//             "eStatus": status,
//         };
//         const response = await _api.post('/client/change_status', data);

//         if (response && response.data && response.data.statusCode === 200) {

//             setSnackBarState({
//                 open: true, severity: 'success',
//                 bgcolor: alertColors.success, message: response.data.responseMessage || "Client has been saved!",

//             });
//             closeStatusUpdateModal();
//             fetchAllClients(true);
//         } else if (response) {
//             setSnackBarState({
//                 open: true, severity: 'error',
//                 bgcolor: alertColors.error, message: response.data.errors ? response.data.errors[0] : 'Client has not been saved!'
//             });
//             closeStatusUpdateModal();
//         }
//         setShowPageLoader(false);

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
//     const sortByClientName = () => {
//         setSortType((current) => {
//             return { ...current, clientName: current.clientName === 'asc' ? 'desc' : 'asc' };
//         });
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
//     function _getConfirmationPopupData(mode) {
//         switch (mode) {
//             case 'activate': return {
//                 icon: faCheck,
//                 text: "Are you sure to Activate this client?",
//                 onClick: (e) => updateClientStatus(statuses.active)
//             };
//             case 'deactivate': return {
//                 icon: faBan,
//                 text: "Are you sure to Deactivate this client?",
//                 onClick: (e) => updateClientStatus(statuses.deactive)
//             };
//             case 'delete': return {
//                 icon: faTrash,
//                 text: "Are you sure to Delete this client?",
//                 onClick: (e) => updateClientStatus(statuses.delete)
//             };
//             default:
//                 return {}
//         }
//     }
//     const handleSnackbarClose = () => {
//         setSnackBarState({ open: false, message: '' });
//     };
//     const handleAdd = () => {

//     };
//     const handleEdit = () => {

//     };
//     const handleView = () => {

//     };
//     const handleDelete = () => {

//     };
//     const handlePrint = () => {

//     };

//     /**UI Piece */
//     function StatusChangedAlert({ _mode }) {
//         let _popupData = _getConfirmationPopupData(_mode);

//         return (
//             <div className="p-[15px]">

//                 <div className="flex flex-col items-center gap-y-[10px]">

//                     <div className="w-[50px] h-[50px] rounded-full border-[2px] border-solid border-[#5bc0de] text-[#5bc0de] flex justify-center items-center">
//                         <FontAwesomeIcon className="text-[24px]" icon={_popupData.icon} />
//                     </div>

//                     <div className="font-semibold font-mulish text-[18px] text-[#696c74]">{_popupData.text}</div>

//                 </div>
//             </div>
//         )
//     }
//     return (
//         <>
//             <div className="mb-1 relative overflow-hidden bg-[#D8DCE3] ">
//                 <PageLoader show={showPageLoader} />
//                 <Snackbar
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                     open={snackBarState.open}
//                     severity={snackBarState.severity}
//                     onClose={handleSnackbarClose}
//                     key={'top' + 'right'}
//                     autoHideDuration={5000}
//                 >
//                     <Alert onClose={handleSnackbarClose} severity={snackBarState.severity} sx={{ width: '100%', color: '#fff', background: snackBarState.bgcolor }}>
//                         {snackBarState.message}
//                     </Alert>
//                 </Snackbar>
//                 <PathInfo fontAwesomeIcon={faUser} />
//             </div>

//             {/* Skeleton for Grid */}
//             <SkeletonLoaderForGrid show={showSkeletonLoader} />

//             {/* Grid */}
//             <div className="flex flex-col h-full overflow-hidden bg-white w-full  ">
//                 <div className={`${showSkeletonLoader ? 'opacity-0' : ''} grid-sec  h-[calc(100%-3px)] flex flex-col max-[767px]:overflow-x-auto overflow-hidden`}>
//                     <div className="grow flex flex-col max-[767px]:w-full h-full">
//                         <div className="flex font-open-sans-bold text-white text-[12px] h-[37px] gap-x-[2px] whitespace-nowrap select-none">

//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>Permission Name</div>
//                             </div>

//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>Add</div>
//                             </div>

//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>Edit</div>
//                             </div>
//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>Delete</div>
//                             </div>
//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>View</div>
//                             </div>
//                             <div className="flex items-center justify-between uppercase bg-[#2574ab] h-full w-[50%] px-[10px]">
//                                 <div>Print</div>
//                             </div>

//                         </div>
//                         <div ref={gridListDivRef} className="grow overflow-auto table-list whitespace-nowrap  h-full w-full">
//                             {!!allClients.length && (
//                                 allClients.map((_client, index) => {
//                                     return (
//                                         <div onClick={(e) => onClientSelect(_client)} onDoubleClick={(e) => openClientInEditMode(_client)} key={_client.clientId} className={`${(selectedClient && selectedClient.clientId === _client.clientId) ? 'bg-[#d5e8f6] border-x-[#2574ab]' : 'border-x-[transparent]'} 
//                                  hover:bg-[#e7e9ee] border-x-[3px] border-x-solid w-full  border-b border-b-solid border-b-[#dee2e6] flex items-center font-mulish text-[14px] text-black min-h-[40px] cursor-pointer`} >

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden text-ellipsis">{_client.clientName}</div>
//                                             </div>

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden  text-ellipsis">
//                                                     <input type="checkbox" name="" id="" onChange={handleAdd()} />
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden text-ellipsis capitalize">
//                                                     <input type="checkbox" name="" id="" onChange={handleEdit()} />
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden text-ellipsis">
//                                                     <input type="checkbox" name="" id="" onChange={handleDelete()} />
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden  text-ellipsis">
//                                                     <input type="checkbox" name="" id="" onChange={handleView()} />
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center h-full w-[50%] px-[10px] py-[5px] overflow-hidden border-r border-r-solid border-r-[#353535]">
//                                                 <div className="overflow-hidden text-ellipsis capitalize">
//                                                     <input type="checkbox" name="" id="" onChange={handlePrint()} />
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     );
//                                 })
//                             )}

//                             {!!!allClients.length && (
//                                 <div className="flex mt-[30px] justify-center font-mulish font-semibold text-[#696c74bd] text-[17px]">No Data Available!</div>
//                             )}
//                         </div>

//                         <div className="font-mulish px-2 font-semibold text-[#696c74] text-[14px] h-[34px] border-t border-t-solid border-t-[#dbdfe6] flex items-center">Total Record Count: {allClients?.length}</div>
//                     </div>

//                 </div>

//             </div>
//         </>
//     )
// }
