import { getGrowAnsData } from '../services/api';

export default {
  namespace: 'userans',
  state: {
    loading: false,
  },

  effects: {
    *fetchGrowAnalysis({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getGrowAnsData, payload);		
      yield put({
        type: 'saveres',
        payload: response,
      });
    },
  },

  reducers: {
    saveres(state, { payload }) {
      return {
        ...state,
        ...payload,
        loading: false,
      };
    },
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
};
