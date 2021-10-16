import React from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { personalContex } from "../contexts/context";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function Update() {
  const { id } = useParams();
  const history = useHistory();
  const { updatePersonal } = useContext(personalContex);

  const [state, setState] = useState({
    name: "",
    department: "",
    salary: "",
    id: "",
  });
  console.log(state);

  useEffect(() => {
    const getPerson = async () => {
      const response = await axios.get("http://localhost:3000/personal/" + id);
      setState({
        name: response.data.name,
        department: response.data.department,
        salary: response.data.salary,
        id: id,
      });
      console.log(response.data);
    };

    getPerson();
  }, [id]);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updateBtn = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/personal/" + id, {
      method: "PUT", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        department: e.target.department.value,
        salary: e.target.salary.value,
      }),
    });

    updatePersonal(id, {
      name: e.target.name.value,
      department: e.target.department.value,
      salary: e.target.salary.value,
    });
    alertify.set("notifier", "position", "top-right");
    alertify.success("Personal Updated", 3);

    history.push("/");
  };

  return (
    <div>
      <form onSubmit={updateBtn}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Updated ID</label>
          <div className="col-sm-10">{id}</div>
        </div>
        <div className="form-group row mb-3">
          <label className="col-sm-2 col-form-label">Update to Name</label>
          <div className="col-sm-10 mb-2">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="name.."
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <label className="col-sm-2 col-form-label ">
            Update to Department
          </label>
          <div className="col-sm-10 mb-2">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="Department.."
              name="department"
              value={state.department}
              onChange={handleChange}
            />
          </div>
          <label className="col-sm-2 col-form-label">Update to salary</label>
          <div className="col-sm-10 mb-2">
            <input
              type="text"
              className="form-control"
              id="inputPassword"
              placeholder="Salary.."
              name="salary"
              value={state.salary}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-outline-success ">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
