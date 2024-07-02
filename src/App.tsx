import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Home from './Pages/Home';
import Login from './Pages/Login';
import HomeLayout from './Components/HomeLayout';
import Dossier from './Pages/Dossier';
import ChoosePlace from './Pages/ChoosePlace';
import Ward from './Pages/Ward';
import { AuthProtectedRoute, WorkPlaceProtectedRoute } from './HOC/ProtectedRoutes';
import { createContext } from 'react';
import Database from './Pages/Database';
import Assignments from './Pages/Assignments';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProtectedRoute />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<WorkPlaceProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path='dossier/:id' element={<Dossier />} />
            <Route path="ward/*" element={<Ward />} />
            <Route path="assignments/:id" element={<Assignments />}/>
          </Route>
          <Route path="choosePlace/" element={<ChoosePlace />} />
          <Route path="database/" element={<Database />} />
        </Route>
      </Route>
      <Route path='login/' element={<Login />} />
    </Routes >
  );
};

export default App;
