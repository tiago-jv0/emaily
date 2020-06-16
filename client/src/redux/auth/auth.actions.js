import types from './auth.types';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
  dispatch(fetchUserStart());

  try {
    const response = await axios.get('/api/current_user');
    const user = response.data.data.user;
    if (!user) {
      return dispatch(fetchUserFailure('User not found'));
    }
    return dispatch(fetchUserSuccess(user));
  } catch (error) {
    return dispatch(fetchUserFailure(error));
  }
};

export const handleToken = (token) => async (dispatch) => {
  try {
    const response = await axios.post('/api/stripe', token);
    const user = response.data.data.user;
    if (!user) {
      return dispatch(fetchUserFailure('User not found'));
    }
    return dispatch(fetchUserSuccess(user));
  } catch (error) {
    return dispatch(fetchUserFailure(error));
  }
};

export const fetchUserStart = () => ({
  type: types.FETCH_USER_START,
});

export const fetchUserSuccess = (user) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: types.FETCH_USER_FAILURE,
  payload: error,
});
