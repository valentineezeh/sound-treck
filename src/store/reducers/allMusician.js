import {
  GET_ALL_MUSICIANS,
  GET_ALL_MUSICIANS_ERROR,
  GET_ALL_MUSICIANS_START
} from "../actions/types";

const initialState = {
  error: null,
  data: [],
  loading: false
};

const musicians = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MUSICIANS:
      return {
        ...state,
        error: null,
        data: action.data,
        loading: false
      };
    case GET_ALL_MUSICIANS_ERROR:
      return {
        ...state,
        error: action.error,
        data: [],
        loading: false
      };
    case GET_ALL_MUSICIANS_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default musicians;
