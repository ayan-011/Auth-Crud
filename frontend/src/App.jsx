//import FloatingShape from "./components/FloatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react"; 
import axios from "axios";



import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import Crud from "./crud/Crud";
import EditUpdate from './crud/editupdate.jsx';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated || !user) {
		return <Navigate to='/' replace />;
	  }

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(()=>{
		axios.post('/api/auth', {}, { withCredentials: true }) // send empty body and credentials
		.then((response)=>{
           checkAuth(response.data) 
		})
		.catch((error)=>{
      console.log('proxy error', error)
		})
	},[])
 
	useEffect(() => {
		 checkAuth();
	}, [checkAuth]);



	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div
			className='min-h-screen  bg-[#151719] not-visited: relative overflow-hidden'
		>
		

			<Routes>
				<Route
					path='/'
					element={
						<Home />
					}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
						<DashboardPage />
					    </ProtectedRoute>
							
						 
					}
				/>
					<Route
					path='/crud'
					element={	
						<ProtectedRoute>
							<Crud />  						 
						</ProtectedRoute>					 
					}
				/>
					<Route
					path='/editupdate/:id' 
					element={						 
						<EditUpdate />  						 
					}
				/>
					 
					 
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				 
				 
				 
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/dashborad' replace />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;