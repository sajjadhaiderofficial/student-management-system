import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateStudentData } from "../ReduxHandling/Reducers/insertedStudentSlice";
import swal from 'sweetalert';

const EditStudent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fetchedStates = useSelector((state) => {
    return {
      StudentData: state.InsertedStudentSlice.insertedStudentData,
      StudentIndex: state.InsertedStudentSlice.beingEditStudentIndex,
    };
  });
  useEffect(() => {
    if (fetchedStates.StudentIndex == null) {
      history.push("/");
    }
  });
  const [updatedStudent, setUpdatedStudent] = useState({
    name:
      fetchedStates.StudentIndex === null
        ? "No Student Selected!"
        : fetchedStates.StudentData[fetchedStates.StudentIndex].name,
    age:
      fetchedStates.StudentIndex === null
        ? "No Student Selected!"
        : fetchedStates.StudentData[fetchedStates.StudentIndex].age,
    phone:
      fetchedStates.StudentIndex === null
        ? "No Student Selected!"
        : fetchedStates.StudentData[fetchedStates.StudentIndex].phone,
    checkBoxValue: false,
  });
  const nameHandler = (event) => {
    setUpdatedStudent({ ...updatedStudent, name: event.target.value });
  };
  const ageHandler = (event) => {
    setUpdatedStudent({ ...updatedStudent, age: event.target.value });
  };
  const phoneHandler = (event) => {
    setUpdatedStudent({ ...updatedStudent, phone: event.target.value });
  };
  const updateHandler = (event) => {
    event.preventDefault();
    if (updatedStudent.checkBoxValue === true) {
      if (updatedStudent.name.length >= 6 && updatedStudent.phone.length >= 11) {
        dispatch(updateStudentData(updatedStudent));
        swal("Student Edited!", "", "success");
        history.push("/");
      } else {
        swal("Error", "Check The Length Of Name Or Phone Number!", "error");
      }
    } else if (updatedStudent.checkBoxValue === false) {
      swal("Error", "Agree Box Should Be Checked!", "error");
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="text-center students-update-heading">
          <h1>
            Update Student,{" "}
            {fetchedStates.StudentIndex === null
              ? "No Student Selected!"
              : fetchedStates.StudentData[fetchedStates.StudentIndex].name}
          </h1>
        </div>
        <form className="bootstrap-update-form">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={updatedStudent.name}
              onChange={nameHandler}
            />
            <div id="emailHelp" className="form-text">
              Updated Name Should Be Greater Than Or Equals To Six.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={updatedStudent.age}
              onChange={ageHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              value={updatedStudent.phone}
              onChange={phoneHandler}
            />
            <div id="emailHelp" className="form-text">
              Updated Phone Should Be Greater Than Or Equals To Eleven.
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(event) => {
                setUpdatedStudent({
                  ...updatedStudent,
                  checkBoxValue: event.target.checked,
                });
              }}
            />
            <label className="form-check-label">Agree To Update</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateHandler}
          >
            Update Student
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditStudent;
