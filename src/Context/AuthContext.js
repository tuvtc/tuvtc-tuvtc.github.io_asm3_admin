import { createContext, useEffect, useReducer } from "react";
import Cookies from 'universal-cookie'

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem("asm03-user")) || null,
	loading: false,
	error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_START":
			return {
				user: null,
				loading: true,
				error: null,
			};
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				loading: false,
				error: null,
			};
		case "LOGIN_FAILURE":
			return {
				user: null,
				loading: false,
				error: action.payload,
			};
		case "LOGOUT":
			const cookies = new Cookies()
			cookies.remove('userLogin', { path: '/' })
			return {
				user: null,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		const cookies = new Cookies()
		const userLogin = cookies.get('userLogin', { path: '/' })
		if (userLogin) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: userLogin});
		}
	}, [])

	useEffect(() => {
		if (state.user) {
			const cookies = new Cookies()
			cookies.set('userLogin', state.user, { path: '/' })
		}
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				loading: state.loading,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
