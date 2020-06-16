import types from './auth.types';

const INITIAL_STATE = {
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.FETCH_USER_START:
      return { ...state, loading: true };
    case types.FETCH_USER_SUCCESS:
      return { ...state, user: payload, loading: false, error: null };
    case types.FETCH_USER_FAILURE:
      return { ...state, error: payload, loading: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
