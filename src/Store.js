import { configureStore } from "@reduxjs/toolkit";

// 임시 더미 reducer (나중에 실제 reducer로 교체) -> 없으면 오류 발생
const dummyReducer = (state = {}, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
  devTools: true,
});

export default store;
