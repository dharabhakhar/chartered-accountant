import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLoader from './UIComponents/Loaders/PageLoader';
import AppHeader from './Layout/AppHeader';
// import AppNavbar from './Layout/AppNavbar';
// import NewNavbar from './Layout/NewNavbar';
import NotFound from './Pages/not-found/NotFound';
// import NoOrganization from './Pages/error-pages/NoOrganization';

const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"))


function App() {

  return (
<>
<div className='w-full h-[80px]'>
        <AppHeader/>
      </div>

          <Suspense fallback={<PageLoader show={true} title={"Loading..."} bgOpacity={100} />} >

            <div className={` transition-[all] h-full duration-[250ms] bg-black`}>
              
    <Router>
      <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path='*' element={<NotFound />} />
                  </Routes>
    </Router>
            </div>

          </Suspense>
    </>

  );

}

export default App;
