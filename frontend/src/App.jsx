import React , {useEffect}from 'react';

import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout'; 
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import PostPage from './components/PostPage';
import PostList from './components/PostList';

import CategoryPage from './components/CategoryPage';
import AddPostForm from './components/AddPostForm';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword'; 
import VerifyCertificate from './components/VerifyCertificate';
import Category from './pages/Category';
import SignInSignUp from './components/SignInSignUp';
import Footer from './components/Footer';
const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page when the route changes.
    }, [pathname]);
  
    return null; // This component doesn't render anything.
  };
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout> 
                    
                <ScrollToTop />

                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path = "/category" element = {<Category/>}   />                   
                          <Route exact path="/login" element={<SignInSignUp />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-post" element={<AddPostForm/>} />
                        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
                                                <Route exact path="/explore" element={<PostList />} />

                        <Route path="/post/:slug" element={<PostPage/>} />
                        <Route path="/category/:category" element={<CategoryPage/>} />
                        <Route exact path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route exact path="/verify/:uniqueId" element={<VerifyCertificate />} />
                        <Route exact path="/certificate-verification" element={<VerifyCertificate />} />
                    </Routes>
                    <Footer/>

                </Layout>
            </Router>
        </Provider>
    );
};

export default App;

