import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { insertStudentData } from "../ReduxHandling/Reducers/insertedStudentSlice";
import swal from 'sweetalert';

const InsertStudent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    phone: "",
    checkBoxValue: false,
  });
  const nameHandler = (event) => {
    setStudentData({ ...studentData, name: event.target.value });
  };
  const ageHandler = (event) => {
    setStudentData({ ...studentData, age: event.target.value });
  };
  const phoneHandler = (event) => {
    setStudentData({ ...studentData, phone: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (studentData.checkBoxValue === true) {
      if (studentData.name.length >= 6 && studentData.phone.length >= 11) {
        dispatch(insertStudentData(studentData));
        setStudentData({
          ...studentData,
          name: "",
          age: "",
          phone: "",
        });
        swal("Student Inserted!", "", "success");
        history.push("/");
      } else {
        swal("Error", "Check The Length Of Name Or Phone Number!", "error");
      }
    } else if (studentData.checkBoxValue === false) {
      swal("Error", "Agree Box Should Be Checked!", "error");
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="text-center students-insert-heading">
          <h1>Insert A Student</h1>
        </div>
        <form className="bootstrap-insert-form">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={studentData.name}
              onChange={nameHandler}
            />
            <div className="form-text">
              Name Length Should Be Greater Than Or Equals To 6.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={studentData.age}
              onChange={ageHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              value={studentData.phone}
              onChange={phoneHandler}
            />
            <div className="form-text">
              Phone Number Should Be Greater Than Or Equals To 11 Digits.
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(event) => {
                setStudentData({
                  ...studentData,
                  checkBoxValue: event.target.checked,
                });
              }}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Agreed To Insert A Student
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Add Student
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default InsertStudent;
