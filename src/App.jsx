import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Products from './Products/Products';
import Users from './Users/Users';
import Login from './Login/Login';
import NewProduct from './New/NewProduct';
import { AuthContextProvider } from './Context/AuthContext';
import Cookies from 'universal-cookie'

const ProtectRoute = (props) => {
	const cookies = new Cookies()
	const userCurrentLogin = cookies.get('userLogin', { path: '/' })
	if (!userCurrentLogin || userCurrentLogin.role !== 'admin') {
		// cookies.remove('userLogin', { path: '/' })
		return <Navigate to='/login' replace />
	}
	return props.children
}

function App() {
	return (
		<div className='App'>
			<AuthContextProvider>
				<BrowserRouter>
					<div
						id='main-wrapper'
						data-theme='light'
						data-layout='vertical'
						data-navbarbg='skin6'
						data-sidebartype='full'
						data-sidebar-position='fixed'
						data-header-position='fixed'
						data-boxed-layout='full'>
						<Header />

						<Menu />

						<Routes>
							<Route exact path='/' element={
								<ProtectRoute>
									<Home />
								</ProtectRoute>} />
							<Route path='/users' element={
								<ProtectRoute>
									<Users />
								</ProtectRoute>} />
							<Route path='/products' element={
								<ProtectRoute>
									<Products />
								</ProtectRoute>} />
							<Route path='/login' element={<Login />} />
							<Route path='/new' element={
								<ProtectRoute>
									<NewProduct />
								</ProtectRoute>} />
						</Routes>
					</div>
				</BrowserRouter>
			</AuthContextProvider>
		</div>
	);
}

export default App;
