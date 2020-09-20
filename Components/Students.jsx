import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEditStudentIndex,
  deleteStudentData,
  deleteAllStudents,
} from "../ReduxHandling/Reducers/insertedStudentSlice";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { Alert } from "react-bootstrap";

const Students = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [showTwo, setShowTwo] = useState(true);
  const fetchedState = useSelector((state) => {
    return {
      studentsData: state.InsertedStudentSlice.insertedStudentData,
    };
  });
  const editHandler = (index) => {
    dispatch(updateEditStudentIndex(index));
    history.push("/edit");
  };
  const deleteHandler = (index) => {
    dispatch(deleteStudentData(index));
    swal("Student Deleted!", "", "warning");
  };
  return (
    <Fragment>
      <div className="container">
        <div className="text-center students-list-heading">
          <h1>Students List</h1>
          {fetchedState.studentsData.length >= 2 ? (
            <div>
              <div>
                <button
                  className="btn btn-danger delete-all"
                  onClick={() => {
                    dispatch(deleteAllStudents());
                    swal("All Students Deleted!", "", "warning");
                  }}
                >
                  Delete All
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="table-responsive bootstap-table">
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Phone</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {fetchedState.studentsData.length > 0 ? (
                fetchedState.studentsData.map((student, studentIndex) => {
                  return (
                    <tr key={studentIndex}>
                      <th scope="row">{studentIndex}</th>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.phone}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            editHandler(studentIndex);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteHandler(studentIndex);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          {
            show === true && showTwo === true ?
            fetchedState.studentsData.length >= 1 ? (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Well Done! You Have Inserted Student/s Data!</Alert.Heading>
              <p>
                You can also Edit and Delete Student/s Data!
              </p>
              <a href="javascript:void(0);">Made By Sajjad Haider With React, Redux Toolkit and Bootstrap!</a>
            </Alert>
          ) : (
            <Alert variant="danger" onClose={() => setShowTwo(false)} dismissible>
              <Alert.Heading>Oop's You Have Not Inserted Any Student!</Alert.Heading>
              <p>
                Insert Student/s To Show Student/s Data! 
              </p>
              <Link to="/insert">Insert Student Now!</Link>
              <br></br>
              <a href="javascript:void(0);">Made By Sajjad Haider With React, Redux Toolkit and Bootstrap!</a>
            </Alert>
          ) : <div></div>}
        </div>
      </div>
    </Fragment>
  );
};

export default Students;
