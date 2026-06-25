import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import studentReducer from "./features/studentSlice";
import classReducer from "./features/classSlice";
import subjectReducer from "./features/subjectSlice";
import resultReducer from "./features/resultSlice";
import dashboardReducer from "./features/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    classes: classReducer,
    subjects: subjectReducer,
    results: resultReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
