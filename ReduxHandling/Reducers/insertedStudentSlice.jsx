import { createSlice } from "@reduxjs/toolkit";

const insertedStudentSlice = createSlice({
  name: "insertedStudentSlice",
  initialState: {
    insertedStudentData: [],
    beingEditStudentIndex: null,
    beingDeleteStudentIndex: null,
  },
  reducers: {
    insertStudentData: (state, action) => {
      state.insertedStudentData = [
        ...state.insertedStudentData,
        action.payload,
      ];
    },
    updateEditStudentIndex: (state, action) => {
      state.beingEditStudentIndex = action.payload;
    },
    updateStudentData: (state, action) => {
      state.insertedStudentData[state.beingEditStudentIndex] = action.payload;
    },
    deleteStudentData: (state, action) => {
      state.beingDeleteStudentIndex = action.payload;
      state.insertedStudentData.splice(state.beingDeleteStudentIndex, 1);
    },
    deleteAllStudents: (state) => {
      state.insertedStudentData = [];
    },
  },
});

export default insertedStudentSlice.reducer;
export const {
  insertStudentData,
  updateEditStudentIndex,
  updateStudentData,
  deleteStudentData,
  deleteAllStudents,
} = insertedStudentSlice.actions;
