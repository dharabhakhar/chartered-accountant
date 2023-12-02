import './App.css';
import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLoader from './UIComponents/Loaders/PageLoader';
import AppHeader from './Layout/AppHeader';
// import AppNavbar from './Layout/AppNavbar';
// import NewNavbar from './Layout/NewNavbar';
import NotFound from './Pages/not-found/NotFound';
// import NoOrganization from './Pages/error-pages/NoOrganization';

const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"))
// const User = lazy(() => import("./Pages/user/User"))
// const Permission = lazy(() => import("./Pages/user/permission/Permission"))
// const ProjectGroup = lazy(() => import("./Pages/project-group/ProjectGroup"))
// const ProjectDB = lazy(() => import("./Pages/projectDB/ProjectDB"))
// const Project = lazy(() => import("./Pages/project/Project"))
// const BackupSchedule = lazy(() => import("./Pages/backup-schedule/BackupSchedule"))
// const BackupSetting = lazy(() => import("./Pages/backup-setting/BackupSetting"))
// const BackupLog = lazy(() => import("./Pages/backup-log/BackupLog"))
// const ProjectWise = lazy(() => import("./Pages/project-wise/ProjectWise"))
// const UserPermission = lazy(() => import("./Pages/user-permission/UserPermission"))


function App() {



  return (
<>
<div className='w-full h-[80px]'>
        <AppHeader/>
      </div>
    {/* <div className={`flex flex-col bg-[#d8dce3] h-[calc(100vh-50px)]  overflow-auto w-screen  ${openSidebar ? "  max-[500px]:w-fit " : " "} `}> */}
      

      {/* <section className='flex  gap-2 h-[calc(100vh-50px)] overflow-auto '> */}
      {/* <div className='flex gap-2 h-[calc(100%-0px)] w-full'> */}

        {/* <div className={` ${openSidebar ? "w-[220px] " : "w-0"} duration-300 h-full bg-white`}>
        </div>
        <AppNavbar isSidebarOpen={openSidebar} />
        <NewNavbar showSidebar={openSidebar} /> */}


        {/* <div className={`${openSidebar ? 'w-[calc(100%-0px)] left-sidebar' : 'w-[calc(100%-16px)]'}  transition-[all] duration-[250ms] `}>
          <div className={`overflow-auto w-screen ${openSidebar ? "  max-[500px]:w-fit " : " "}  transition-[all] duration-[250ms]  relative flex flex-col    `}> */}

          <Suspense fallback={<PageLoader show={true} title={"Loading..."} bgOpacity={100} />} >

            <div className={` transition-[all] h-full duration-[250ms] bg-black`}>
              
    <Router>
      <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/User" element={<User />} />
                  <Route path="/User/permission" element={<Permission />} />
                  <Route path="/project/projectDB" element={<ProjectDB />} />
                  <Route path="/project-group" element={<ProjectGroup />} />
                  <Route path="/project" element={<Project />} />
                  <Route path="/project/backup-schedule" element={<BackupSchedule />} />
                  <Route path="/project/backup-setting" element={<BackupSetting />} />
                  <Route path="/backup-log" element={<BackupLog />} />
                  <Route path="/backup-log/:projectname" element={<ProjectWise />} />
                  <Route path="/user/permission" element={<UserPermission />} />

                  <Route path='*' element={<NotFound />} /> */}
                  <Route path='*' element={<NotFound />} />
                  </Routes>
    </Router>
            </div>

          </Suspense>
{/* 
        </div>

      </div>

    </div>
    </section>
    </div> */}
    </>

  );

}

export default App;
