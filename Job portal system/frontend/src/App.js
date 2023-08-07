import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login  from './pages/Login';
import Dashboard from './pages/Dashboard';
import Main from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Mainpage from './pages/Mainpage';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import ProfileAdd from './pages/AddprofileDetails';
import AdminHome from './pages/AdminHome';
import PrivateRoute from './PrivateRoute';
import Addjobs from './pages/Addjobs';
import Showjobs from './pages/Showjobs';
import DisplayJobs from './pages/DisplayJobs';
import Displayimage from './pages/Displayimage';
import JobDesc from './pages/JobDesc';
import ApplyForm from './pages/ApplyForm';
import FileUpload from './pages/FileUpload';
import JobApplications from './pages/JobApplications';
import Resumeselection from './pages/Resumeselection';
import AppliedJobbyuser  from './pages/AppliedJobbyuser';
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<Admin />}/>
        
        <Route path="/dashboard" element={
    <ProtectedRoute element={<Dashboard/>}>
      <Dashboard />
      </ProtectedRoute>
    
  }/>

 
 
      <Route path="/main" element={
    <ProtectedRoute element={<Mainpage/>}>
      <Mainpage />
    </ProtectedRoute>
    
  }/>
       <Route path="/profileview" element={
    <ProtectedRoute element={<Profile/>}>
      <Profile />
    </ProtectedRoute>
      
    
  }/>
  <Route path="/profileadd" element={
    <ProtectedRoute element={<ProfileAdd/>}>
      <ProfileAdd />
    </ProtectedRoute>
    
    
  }/>
  <Route path="/resumeselect" element={
    <PrivateRoute element={<Resumeselection/>}>
      <Resumeselection />
    </PrivateRoute>
    
    
  }/>
 
  <Route path="/showjobs" element={
    <ProtectedRoute element={<Displayimage/>}>
      <Displayimage />
    </ProtectedRoute>
    
    
  }/>
   <Route path="/appliedjob" element={
    <ProtectedRoute element={<AppliedJobbyuser/>}>
      <AppliedJobbyuser/>
      </ProtectedRoute>
    
  }/>
   <Route path="/delete" element={
    <PrivateRoute element={<DisplayJobs/>}>
      <DisplayJobs />
    </PrivateRoute>
    
    
  }/>
  <Route path="/applications" element={
     <PrivateRoute element={<JobApplications/>}>
      <JobApplications />
    </PrivateRoute>
    
    
  }/>
  
   <Route path="/adminhome" element={
    <PrivateRoute element={<AdminHome/>}>
      <AdminHome />
    </PrivateRoute>
    
    
  }/>
    <Route path="/showjobs/:jobId" element={
    <ProtectedRoute element={<JobDesc/>}>
      <JobDesc />
    </ProtectedRoute>
    
    
  }/>
   <Route path="/apply/:jobId" element={
    <ProtectedRoute element={<ApplyForm/>}>
      <ApplyForm />
    </ProtectedRoute>
    
    
  }/>
  <Route path="/upload" element={
    <ProtectedRoute element={<FileUpload/>}>
      <FileUpload />
    </ProtectedRoute>
    
    
  }/>
   <Route path="/addjobs" element={
    <PrivateRoute element={<Addjobs/>}>
      <Addjobs />
    </PrivateRoute>
    
    
  }/>
    
  

      
      </Routes>
    
    

    
  );
}

export default App;
