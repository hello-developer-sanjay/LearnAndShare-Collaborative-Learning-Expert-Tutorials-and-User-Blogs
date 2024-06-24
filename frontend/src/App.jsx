import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import Notification from './components/Notification';
import Policy from './components/Policy';
import { loadUser } from './actions/authActions'; 
import CodeEditor from './components/CodeEditor';

const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [pathname]);
  
    return null; 
};

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const policyAccepted = useSelector(state => state.auth.policyAccepted);

    if (!isAuthenticated) {
        return <SignInSignUp />;
    }

    if (!policyAccepted) {
        return <Policy />;
    }

    return children;
};

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <ScrollToTop />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/category" element={<Category />} />
                        <Route exact path="/login" element={<SignInSignUp />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route path="/add-post" element={<PrivateRoute><AddPostForm /></PrivateRoute>} />
                        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/post/:slug" element={<PostPage />} />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route exact path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route exact path="/verify/:uniqueId" element={<VerifyCertificate />} />
                        <Route exact path="/posts-notification" element={<Notification />} />
                        <Route exact path="/explore" element={<PostList />} />
                        <Route exact path="/certificate-verification" element={<VerifyCertificate />} />
                                                <Route exact path="/editor" element={<CodeEditor />} />

                    </Routes>
                    <Footer />
                </Layout>
            </Router>
        </Provider>
    );
};

export default App;
