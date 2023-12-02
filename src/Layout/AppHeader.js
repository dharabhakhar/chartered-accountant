// import AppsIcon from '@mui/icons-material/Apps';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import Popover from '@mui/material/Popover';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faListCheck, faDna, faTicket, faDisplay } from '@fortawesome/free-solid-svg-icons';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {  useState } from 'react';
// import { http } from '../Utils/api';
// import { ImageSizeVariants, getImageFromDrive } from '../Utils/Services/drive'
// import { eFileModule } from '../Utils/constants';
// import { APPID, ProjectUrl } from '../Utils/Config/envConfig';
// import { _api, _getAccountAPI } from '../Utils/Config/axiosConfig';
// import { faPaste } from '@fortawesome/free-regular-svg-icons';

export default function AppHeader() {
  /**Helpers */
  // const navigate = useNavigate();
  // const __location = useLocation()
  // const pathName = __location.pathname;


  // let [searchParams, setSearchParams] = useSearchParams();
  // const key = searchParams.get('key');
  // const logout = searchParams.get('logout');
  // const continueSegment = searchParams.get('continue');
  // const [hideHeader, setHideHeader] = useState(pathName.includes("/auth"))

  // /**Mutable State */
  // const [showLoader, setShowLoader] = useState(false);
  // const [searchText, setSearchText] = useState('');
  // const [organizations, setOrganizations] = useState([]);
  // const [selectedOrganization, setSelectedOrganization] = useState(null);
  // const [fullName, setFullName] = useState('');
  // const [profilePicture, setProfilePicture] = useState('');
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [appsAnchor, setAppsAnchor] = useState(null);
  // const [organizationsAnchor, setOrganizationsAnchor] = useState(null);
  // const open = Boolean(anchorEl);
  // const showApps = !!appsAnchor;
  // const showOrganizations = !!organizationsAnchor;
  const [header, setheader] = useState(false);
  const [option, setoption] = useState(false);

  const toggleHeader = () => {
    setheader(!header);
  }
   
  const dropdown = () =>{
    setoption(!option);
    console.log(option);
  }


  // const [filteredOrganizations, setFilteredOrganizations] = useState([]);


  // const id = open ? 'profile-dropdown' : undefined;
  // const appsDropdownId = showApps ? 'appsDropdown' : undefined;
  // const organizationDropdownId = showOrganizations ? 'orgaizationDropdown' : undefined;

  // /**Internal Methods */
  // const onLogout = () => {
  //   localStorage.clear();
  //   window.location.href = `${ProjectUrl[0].url}?logout=0`;
  // };

  // const onProfileButtonClick = (event) => {
  //   addClassToBody('profileOpened');
  //   setAnchorEl(event.currentTarget);
  // };

  // const onAppsClick = (event) => {
  //   addClassToBody('appsOpened');
  //   setAppsAnchor(event.currentTarget);
  // };

  // const addClassToBody = (className) => {
  //   document.body.classList.add(className);
  // };

  // const removeClassFromBody = (className) => {
  //   setTimeout(() => {
  //     document.body.classList.remove(className);
  //   }, 500);
  // };

  // const onOrganizationClick = (event) => {
  //   addClassToBody('organizationListOpened');
  //   setOrganizationsAnchor(event.currentTarget);
  // };

  // const handleClose = () => {
  //   removeClassFromBody('profileOpened');
  //   setAnchorEl(null);
  // };

  // const handleAppsClose = () => {
  //   removeClassFromBody('appsOpened');
  //   setAppsAnchor(null);
  // };

  // const handleOrganizationsClose = (event) => {
  //   removeClassFromBody('organizationListOpened');
  //   setOrganizationsAnchor(null);
  // };

  // const setAccountToken = async () => {
  //   try {
  //     const token = localStorage.getItem('accountAccessToken');
  //     if (token) {
  //       setShowLoader(true);
  //       const response = await _getAccountAPI().post('token/set', { token });
  //       if (response && response.data && response.data.key) {
  //         return response.data.key;
  //       }
  //       setShowLoader(false);
  //     }
  //   } catch (err) {
  //     setShowLoader(false);
  //   }
  // };
  // const getAccountToken = async () => {
  //   try {
  //     const response = await _getAccountAPI().get('token/get', {
  //       params: {
  //         key
  //       }
  //     });
  //     if (response && response.data && response.data.token) {
  //       localStorage.setItem('accountAccessToken', response.data.token);
  //       _getAccountAPI(response.data.token);
  //       updateUserProfile();
  //       getOrganizationList(response.data.token);
  //     }
  //   } catch (err) {
  //   }
  // };

  // const updateUserProfile = async () => {
  //   try {
  //     const response = await _getAccountAPI().post('profile/get_by_id');
  //     if (response.data) {
  //       if (response.data.firstName) {
  //         setFullName(`${response.data.firstName} ${response.data.lastName}`);
  //       }

  //       if (response.data.photoGuid) {
  //         const imageRes = await getImageFromDrive([response.data.photoGuid], ImageSizeVariants._100X100, eFileModule.profilePicture);
  //         if (imageRes.data && imageRes.data.lstFile && imageRes.data.lstFile.length) {
  //           setProfilePicture(imageRes.data.lstFile[0].fileURL);
  //         }
  //       }
  //     }
  //   } catch (err) {
  //   }
  // };

  // const getOrganizationList = async (accountToken) => {
  //   try {
  //     const data = {
  //       appId: APPID,
  //     };
  //     const response = await _getAccountAPI(accountToken).post('organization/get_by_appid', data);
  //     if (response && response.data && response.data.lstOrganization && response.data.lstOrganization.length) {
  //       getAppToken(accountToken, response.data.lstOrganization);
  //       updateOrganizationDetails(response.data.lstOrganization);
  //       _setHasOrganization(true)
  //     }
  //     else {
  //       _setHasOrganization(false)
  //       navigate("/dashboard")
  //       setHideHeader(false)
  //     }
  //   } catch (err) {
  //   }
  // };

  // const fetchOrganizations = async () => {
  //   try {
  //     const accountAccessToken = localStorage.getItem('accountAccessToken');
  //     if (accountAccessToken) {
  //       const data = {
  //         appId: APPID,
  //       };
  //       const response = await _getAccountAPI(accountAccessToken).post('organization/get_by_appid', data);
  //       if (response && response.data) {
  //         if (response.data.lstOrganization && response.data.lstOrganization.length) {
  //           _setHasOrganization(true)
  //           updateOrganizationDetails(response.data.lstOrganization)
  //         } else {
  //           _setHasOrganization(false)
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     _setHasOrganization(false)
  //   }
  // };

  // const updateOrganizationDetails = (organizationList) => {
  //   setOrganizations(organizationList);
  //   let savedOrg = localStorage.getItem('selectedOrganization');
  //   savedOrg = savedOrg ? JSON.parse(savedOrg) : undefined;
  //   if (savedOrg && savedOrg.OrganizationId && organizationList.some((org) => org.OrganizationId === savedOrg.OrganizationId)) {
  //     setSelectedOrganization(savedOrg);
  //     getAppToken(savedOrg.OrganizationId);
  //   } else {
  //     setSelectedOrganization(organizationList[0]);
  //     localStorage.setItem('selectedOrganization', JSON.stringify(organizationList[0]));
  //     getAppToken(organizationList[0].OrganizationId);
  //   }
  // };

  // const getAppToken = async (organizationId) => {
  //   try {
  //     if (isNaN(parseInt(organizationId))) {
  //       return
  //     }
  //     const accountAccessToken = localStorage.getItem('accountAccessToken');
  //     if (accountAccessToken) {
  //       const data = {
  //         accountAccessToken,
  //         organizationId
  //       };
  //       const response = await _api.post('/access_token/get', data);
  //       if (response && response.data && response.data.accessToken) {
  //         localStorage.setItem('accessToken', response.data.accessToken);
  //         //   http(undefined, undefined, response.data.accessToken);
  //         setShowLoader(false);
  //         if (continueSegment) {
  //           window.location.replace(`/${continueSegment}`);
  //         }
  //       }
  //     }

  //   } catch (err) {
  //   }
  // };
  // const onSelectOrg = (org) => {
  //   setSelectedOrganization(org);
  //   setOrganizationsAnchor(null);
  //   setTimeout(() => {
  //     updateDisplayToken(org);
  //   }, 0);
  // };


  // const updateDisplayToken = async (org) => {
  //   try {
  //     const accountAccessToken = localStorage.getItem('accountAccessToken');
  //     if (accountAccessToken) {
  //       setShowLoader(true);
  //       const data = {
  //         accountAccessToken,
  //         organizationId: org.OrganizationId
  //       };
  //       const response = await _api.post('/access_token/get', data);
  //       if (response && response.data && response.data.accessToken) {
  //         localStorage.setItem('accessToken', response.data.accessToken);
  //         //   http(undefined, undefined, response.data.accessToken);
  //         localStorage.setItem('selectedOrganization', JSON.stringify(org));
  //         setShowLoader(false);
  //         window.location.reload();
  //       }
  //     }
  //   } catch (err) {
  //   }
  // };

  // const redirectToWebsite = (url) => {
  //   window.open(url, '_blank');
  // }

  // const goToTasks = async () => {
  //   const key = await setAccountToken();
  //   redirectToWebsite(`${ProjectUrl[0].url}?key=${key}&continue=dashboard`);
  // };

  // const goToTicket = async () => {
  //   const key = await setAccountToken();
  //   redirectToWebsite(`${ProjectUrl[2].url}#/?key=${key}&continue=dashboard`);
  // };

  // const goToBiometric = async () => {
  //   const key = await setAccountToken();
  //   redirectToWebsite(`${ProjectUrl[1].url}#/?key=${key}&continue=dashboard`);
  // };

  // const goToDisplaySite = async () => {
  //   const key = await setAccountToken();
  //   redirectToWebsite(`${ProjectUrl[3].url}#/?key=${key}&continue=dashboard`);
  // };

  // const goToActiveReports = async () => {
  //   const key = await setAccountToken();
  //   redirectToWebsite(`${ProjectUrl[4].url}#/?key=${key}&continue=dashboard`);
  // };

  // const onSearchOrganization = (text) => {
  //   setSearchText(text);
  //   if (organizations && organizations.length) {
  //     if (text) {
  //       const result = organizations.filter((org) => org.organizationName.toLowerCase().includes(text.toLowerCase()));
  //       setFilteredOrganizations([...result]);
  //     } else {
  //       setFilteredOrganizations([...organizations]);
  //     }
  //   } else {
  //     setFilteredOrganizations([]);
  //   }
  // };

  // const checkIfUserIsLoggedIn = () => {

  //   const accessToken = localStorage.getItem('accessToken');
  //   const accountAccessToken = localStorage.getItem('accountAccessToken');
  //   // if ((!accessToken || !accountAccessToken) ) {
  //   if ((!accessToken || !accountAccessToken)) {
  //     localStorage.clear();
  //     window.location.href = `${ProjectUrl[0].url}?continue=backup+dashboard`;
  //   } else {
  //     updateUserProfile();
  //     fetchOrganizations();
  //     if (pathName === '/') {
  //       navigate('/dashboard');
  //     }
  //   }
  // };

  // function _setHasOrganization(_value) {
  //   if (setHasOrganization) setHasOrganization(_value)
  // }

  // /**Effects */
  // useEffect(() => {
  //   if (organizations && organizations.length) {
  //     if (searchText) {
  //       const result = organizations.filter((org) => org.organizationName.toLowerCase().includes(searchText.toLowerCase()));
  //       setFilteredOrganizations([...result]);
  //     } else {
  //       setFilteredOrganizations([...organizations]);
  //     }
  //   } else {
  //     setFilteredOrganizations([]);
  //   }
  // }, [organizations]);

  // useEffect(() => {
  //   if (key) {
  //     getAccountToken();
  //   } else if (logout !== undefined && logout !== null && !isNaN(Number(logout))) {
  //     const index = Number(logout);
  //     localStorage.clear();
  //     if (ProjectUrl[index + 1]) {
  //       window.location.href = `${ProjectUrl[index + 1].url}?logout=${index + 1}`;
  //     } else {
  //       window.location.href = ProjectUrl[0]?.url;
  //     }
  //   } else {
  //     checkIfUserIsLoggedIn();
  //   }
  // }, []);

  return (
    <div className={`header flex justify-between items-center max-h-[80px] h-full bg-black px-10 relative`}>
      <div>
        {/* <Link to={''}> */}
        <img src={require('../Images/4.png')} alt="" className='h-[60px] w-[100px] cursor-pointer my-[10px]' />
        {/* </Link> */}
      </div>

      <div className="hidden lg:block">
        <div className='flex gap-14'>
          <div>
            <a href="/" class="text-white relative z-10 hover:text-[#6fb7c2]">
              <div class="py-5 head overflow-hidden">Home
                <span class="underline-effect"></span>
              </div>
            </a>
          </div>

          <div className='relative sub-header'>
            <div href="/" class="text-white relative z-10 hover:text-[#6fb7c2]">
              <div class="py-5 flex head overflow-hidden">About us <IoMdArrowDropdown className='my-[6px]' />
                <span class="underline-effect"></span>
              </div>
            </div>

            <ul className="absolute sub1-header bg-white w-[200px] px-4 py-2 rounded left-[-60%] z-10">
              <li className='py-3'>
                <a href="/" className='hover:text-[#6fb7c2]'>Who We Are</a>
              </li>
              <li className='py-3'>
                <a href="/" className='hover:text-[#6fb7c2]'>Culture and Values</a>
              </li>
              <li className='py-3'>
                <a href="/" className='hover:text-[#6fb7c2]'>Why Choose Us</a>
              </li>
            </ul>
          </div>


          <div>
            <a href="/" class="text-white relative z-10 hover:text-[#6fb7c2]">
              <div class="py-5 head overflow-hidden">
                Services
                <span class="underline-effect"></span>
              </div>
            </a>
          </div>

          <div>
            <a href="/" class="text-white relative z-10 hover:text-[#6fb7c2]">
              <div class="py-5 head overflow-hidden">Our Team
                <span class="underline-effect"></span>
              </div>
            </a>
          </div>

          <div>
            <a href="/" class="text-white relative z-10 hover:text-[#6fb7c2]">
              <div class="py-5 head overflow-hidden">Contact
                <span class="underline-effect"></span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="lg:hidden ">
        <div className="toggle-button text-white">
          <IoEllipsisHorizontalSharp onClick={toggleHeader} />
        </div>
        {
          header && (
            <>
              <div className={`h-[${header ? '325px' : '0'}] absolute top-full left-0 right-0 z-[1] bg-black px-6`}>
                <div className='border-b-[1px]'>
                  <a href="/" class="text-white relative z-10">
                    <div class="py-5 head overflow-hidden">Home
                    </div>
                  </a>
                </div>
                <div className='relative sub-header border-b-[1px]'>
                  <div href="/" class="text-white relative z-10">
                    <div class="py-5 flex head overflow-hidden justify-between" onClick={dropdown}>About us <IoMdArrowDropdown className='my-[6px]' />
                    </div>
                  </div>
                  {
                    option &&(
                      <>
                       <ul className={`h-[${option ? '150px' : '0'}] absolute top-full left-0 right-0 z-[50] bg-black text-white px-6`}>
                    <li className='py-3'>
                      <a href="/">Who We Are</a>
                    </li>
                    <li className='py-3'>
                      <a href="/">Culture and Values</a>
                    </li>
                    <li className='py-3'>
                      <a href="/">Why Choose Us</a>
                    </li>
                  </ul>
                      </>
                    )
                  }

                 
                </div>


                <div className='border-b-[1px]'>
                  <a href="/" class="text-white relative z-10">
                    <div class="py-5 head overflow-hidden">
                      Services
                    </div>
                  </a>
                </div>

                <div className='border-b-[1px]'>
                  <a href="/" class="text-white relative z-10">
                    <div class="py-5 head overflow-hidden">Our Team
                    </div>
                  </a>
                </div>

                <div className='border-b-[1px]'>
                  <a href="/" class="text-white relative z-10">
                    <div class="py-5 head overflow-hidden">Contact
                    </div>
                  </a>
                </div>
                </div>
            </>
          )
        }

      </div>
      {/*


      <div className='flex gap-x-[18px]'>

        <div>
          <button className='text-[#ced5e3] hover:text-[#778395]' aria-describedby={appsDropdownId} onClick={onAppsClick}>
            <AppsIcon sx={{ fontSize: '30px' }} className='text-white hover:text-[#778395] cursor-pointer text-[30px]' />
          </button>

          <Popover
            id={appsDropdownId}
            open={showApps}
            anchorEl={appsAnchor}
            onClose={handleAppsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className='p-[10px]'>

              <div className='flex flex-wrap w-[278px]'>

                <div onClick={(e) => goToTasks()} className='flex items-center flex-col gap-[10px] p-[10px] w-[33.33%] hover:bg-[#e6e7e9] group cursor-pointer'>
                  <FontAwesomeIcon className='text-[25px] max-[767px]:text-[20px] text-[#086aaf] group-hover:text-[#242525]' icon={faListCheck} />
                  <span className='text-[#505b72] text-[14px] font-mulish group-hover:text-[#242525]'>Task</span>
                </div>

                <div onClick={(e) => goToTicket()} className='flex items-center flex-col gap-[10px] p-[10px] w-[33.33%] hover:bg-[#e6e7e9] group cursor-pointer'>
                  <FontAwesomeIcon className='text-[25px] max-[767px]:text-[20px] text-[#086aaf] group-hover:text-[#242525]' icon={faTicket} />
                  <span className='text-[#505b72] text-[14px] font-mulish group-hover:text-[#242525]'>Ticket</span>
                </div>

                <div onClick={(e) => goToBiometric()} className='flex items-center flex-col gap-[10px] p-[10px] w-[33.33%] hover:bg-[#e6e7e9] group cursor-pointer'>
                  <FontAwesomeIcon className='text-[25px] max-[767px]:text-[20px] text-[#086aaf] group-hover:text-[#242525]' icon={faDna} />
                  <span className='text-[#505b72] text-[14px] font-mulish group-hover:text-[#242525]'>Biometric</span>
                </div>

                <div onClick={(e) => goToDisplaySite()} className='flex items-center flex-col gap-[10px] p-[10px] w-[33.33%] hover:bg-[#e6e7e9] group cursor-pointer'>
                  <FontAwesomeIcon className='text-[25px] max-[767px]:text-[20px] text-[#086aaf] group-hover:text-[#242525]' icon={faDisplay} />
                  <span className='text-[#505b72] text-[14px] font-mulish group-hover:text-[#242525]'>Display Site</span>
                </div>

                <div onClick={(e) => goToActiveReports()} className='flex items-center flex-col gap-[10px] p-[10px] w-[33.33%] hover:bg-[#e6e7e9] group cursor-pointer'>
                  <FontAwesomeIcon className='text-[25px] max-[767px]:text-[20px] text-[#086aaf] group-hover:text-[#242525]' icon={faPaste} />
                  <span className='text-[#505b72] text-[14px] font-mulish group-hover:text-[#242525] text-center'>Active Reports</span>
                </div>

              </div>

            </div>
          </Popover>


        </div>

        <div className='flex gap-x-[5px] items-center pr-5'>
          <img loading='lazy' className='rounded-full w-[30px] h-[30px]' src={profilePicture ? profilePicture : '/images/avatar.jpg'} width={30} height={30} alt='Avatar' />

          <div className='profile-settings'>
            <button className='text-[#ced5e3] flex items-center hover:text-[#778395]' aria-describedby={id} onClick={onProfileButtonClick}>
              <div className='font-mulish text-[15px] block w-[120px] overflow-hidden text-ellipsis whitespace-nowrap max-[767px]:hidden'>{fullName || ''}</div>
              <ArrowDropDownIcon sx={{ fontSize: '19px' }} />
            </button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className='p-[10px]'>

                <Link to={`${ProjectUrl[0].url}#/my-profile`}>
                  <div className='hover:bg-[#262b36] hover:text-[#9fa8bc] gap-x-[8px] flex items-center font-mulish tracking-[0.25px] h-[36px] px-[10px] text-[rgb(80,91,114)] text-[14px]'>
                    <PersonIcon sx={{ fontSize: '18px' }} />
                    <span>My Profile</span>
                  </div>
                </Link>

                <Link to={`${ProjectUrl[0].url}#/change-password`}>
                  <div className='hover:bg-[#262b36] hover:text-[#9fa8bc] gap-x-[8px] flex items-center font-mulish tracking-[0.25px] h-[36px] px-[10px] text-[rgb(80,91,114)] text-[14px]'>
                    <SettingsIcon sx={{ fontSize: '18px' }} />
                    <span>Change Password</span>
                  </div>
                </Link>

                <div onClick={(e) => onLogout()} className='hover:bg-[#262b36] hover:text-[#9fa8bc] gap-x-[8px] flex items-center font-mulish tracking-[0.25px] h-[36px] px-[10px] text-[rgb(80,91,114)] text-[14px] cursor-pointer'>
                  <LogoutIcon sx={{ fontSize: '18px' }} />
                  <span>Log Out</span>
                </div>

              </div>
            </Popover>
          </div>
        </div>

      </div> */}
    </div>

  )
}