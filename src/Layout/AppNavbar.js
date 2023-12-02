// import NavbarLink from "../UIComponents/Navbar/NavbarLink"
// import { BiSolidUser, BiSolidUserCheck } from "react-icons/bi";
// import { GoProjectRoadmap } from "react-icons/go";
// import { SiOpenproject } from "react-icons/si";
// import { AiOutlineSchedule, AiFillFileText, AiFillHome } from "react-icons/ai";
// import { AiTwotoneSetting } from "react-icons/ai";
// import { BsFillCloudCheckFill } from "react-icons/bs";
// import { decode } from "../Utils/Config/axiosConfig";
// import { useEffect, useState } from "react";
// import { _fetchUser } from "../Utils/APIs/FetchAPIs";

// export default function AppNavbar({ isSidebarOpen }) {
//     const [allClients, setAllClients] = useState("");
//     const userId = localStorage.getItem('decodedUserId');
//     const [load, setload] = useState(false);
//     const fetchAllClients = async () => {
//         if (!userId) {
//             return;
//         }

//         try {
//             const response = await _fetchUser(userId)

//             if (response && response.status === 200) {
//                 setAllClients(response.data || []);
//                 setload(true);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     useEffect(
//         () => {
//             fetchAllClients()
//         }, [userId]
//     )

//     return (

//         // <div className={` h-full ${isSidebarOpen ? 'w-full' : 'w-0'} duration-200 `}>
//         <div className={`flex flex-col`}>
//             <div className='body flex h-[calc(100%-0px)] max-[991px]:relative'>
//                 <div className={`sidebar ${isSidebarOpen ? 'w-[220px]' : 'w-0'} h-full transition-[all] duration-[250ms] bg-white font-mulish text-[13px] font-bold overflow-y-auto`}>
//                     <NavbarLink title={"Dashboard"} link={"/dashboard"} icon={
//                         <AiFillHome />
//                     } />
//                     {
//                         decode?.claims.includes(26) ? <NavbarLink title={"User"} link={"/user"} icon={
//                             <BiSolidUser />
//                         } /> : null
//                     }

//                     {
//                         decode?.claims.includes(1) ? <NavbarLink title={"Project Group"} link={"/project-group"} icon={
//                             <SiOpenproject />
//                         } /> : null
//                     }

//                     {
//                         decode?.claims.includes(6) ? <NavbarLink title={"Project"} link={"/project"} icon={
//                             <GoProjectRoadmap />
//                         } /> : null
//                     }

//                     {
//                         decode?.claims.includes(21) ? <NavbarLink title={"Backup Log"} link={"/backup-log"} icon={
//                             <BsFillCloudCheckFill />
//                         } /> : null
//                     }
//                 </div>
//             </div>


//         </div>
//     )
// }