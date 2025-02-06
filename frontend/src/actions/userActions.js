// * Imported Libraries
import axios from 'axios'

//* Imported Constants
import {
  // * User Login Constants
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  // * User Register Constants
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  // * User Details Constants
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  // * User Update Profile Constants
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  //* User List Constants
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  //* User Delete Constants
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  //* User Update Data Constants
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import {API_BASE_URL} from "../../src/config"
// ? ============ 1) Action for User Login Reducer ==============
export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      { email, password },
      config
    )
    // !User Login Success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    // * Storing data in Local Storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    //! User Login Fail
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =========== Logout Action ============
export const logout = () => dispatch => {
  //? Removing data from Local Storage
  localStorage.removeItem('userInfo')

  dispatch({
    type: USER_LOGOUT,
  })
  dispatch({
    type: USER_DETAILS_RESET,
  })
  dispatch({
    type: ORDER_LIST_MY_RESET,
  })
  dispatch({
    type: USER_LIST_RESET,
  })
}

// ? =============== 2) Action for User Register Reducer ====================
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${API_BASE_URL}/api/users`,
      { name, email, password },
      config
    )
    //! User Register Success
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    // ! We want if user registers itself, then it should Automatically Login. So,
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    //! Setting data in Local Storage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    //! User Register Fail
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =============== 3) Action for User Details Reducer ====================
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    //! Accessing to the uerInfo to access token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API_BASE_URL}/api/users/${id}`, config)
    //! User Details Success
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    //! User Details Fail
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =============== 4) Action for User Update Profile Reducer ====================
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })
    //! Accessing to the uerInfo to access token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${API_BASE_URL}/api/users/profile`, user, config)
    //! User Details Success
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    // ! User LOGIN Success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    //! User Details Fail
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =============== 5) Action for User List Reducer ====================
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })
    //! Accessing to the uerInfo to access token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${API_BASE_URL}/api/users`, config)
    //! User List Success
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    //! User List Fail
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =============== 6) Action for User Delete Reducer ====================
export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
    //! Accessing to the uerInfo to access token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`${API_BASE_URL}/api/users/${id}`, config)
    //! User Delete Success
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    //! User Delete Fail
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// ? =============== 7) Action for User Update Reducer ====================
export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    //! Accessing to the uerInfo to access token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${API_BASE_URL}/api/users/${user._id}`, user, config)
    //! User Update Success
    dispatch({ type: USER_UPDATE_SUCCESS })
    //! User Details Success
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    //! User Update Fail
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
