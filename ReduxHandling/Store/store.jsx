import { configureStore } from "@reduxjs/toolkit";
import insertedStudentSliceReducer from "../Reducers/insertedStudentSlice";

const store = configureStore({
    reducer: {
        InsertedStudentSlice: insertedStudentSliceReducer,
    }
});

export default store;
