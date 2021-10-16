import React from "react";
import { useContext } from "react";
import { personalContex } from "../contexts/context";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function Form() {
  const { addNewPersonal } = useContext(personalContex);
  const personals = (e) => {
    const inputClear = (e) => {
      e.target.name.value = "";
      e.target.department.value = "";
      e.target.salary.value = "";
    };

    e.preventDefault();
    if (
      e.target.name.value === "" ||
      e.target.department.value === "" ||
      e.target.salary.value === ""
    ) {
      alertify.alert("Please fill the inputs..");
      inputClear(e);
      return;
    }
    addNewPersonal({
      name: e.target.name.value,
      department: e.target.department.value,
      salary: e.target.salary.value,
    });
    inputClear(e);
    alertify.success("Personal Added..", 2);
  };

  const imdb = (e) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://imdb-api.com/API/IMDbList/k_gwphfuyl/ls095521504",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <form id="employee-form" name="form" onSubmit={personals}>
        <div className="form-row">
          <div className="form-group col-md-6" style={{ alignItems: "center" }}>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Personals name.."
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name="department"
              id="department"
              placeholder="Department of personnel.."
            />
          </div>
          <div className="form-group col-md-6">
            <input
              className="form-control"
              type="text"
              name="salary"
              id="salary"
              placeholder="Salary.."
            />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          id="buttons"
        >
          <button id="form-button" type="submit" className="btn btn-danger ">
            Added Personal
          </button>
        </div>
      </form>
      <button className="btn btn-success" onClick={imdb}>
        imdb
      </button>
    </div>
  );
}
