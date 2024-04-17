import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("http://localhost:5000/api/auth");
            console.log(res);
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    //Register user
    const register = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(
                "http://localhost:5000/api/users",
                formData,
                config
            );

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg,
            });
        }
    };

    //Login user
    const login = () => console.log("login");

    //Logout
    const logout = () => console.log("logout");

    //Clear error
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
