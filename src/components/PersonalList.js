import React from "react";
import { useContext } from "react";
import { personalContex } from "../contexts/context";
import { Link } from "react-router-dom";

export default function PersonalList() {
  const { personals, filteredPersonals, delPersonal, allDelete } =
    useContext(personalContex);

  return (
    <div className="card-body">
      <hr />

      <h5 className="card-title" id="employees-title">
        Personals
      </h5>

      <hr />
      <div className="table-responsive">
        <table
          className="table "
          style={{ backgroundColor: "#446b75", color: "white", width: "100%" }}
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Salary</th>
              <th scope="col">ID</th>

              <th scope="col">
                <button
                  type="reset"
                  className="btn btn-warning btn-block"
                  onClick={allDelete}
                >
                  {personals.length === 0
                    ? "No Personal Found!"
                    : "Clear all staff !"}
                </button>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="employees">
            {filteredPersonals.map((p) => (
              <tr key={p.id}>
                <th scope="col">{p.name}</th>
                <th scope="col">{p.department}</th>
                <th scope="col">{p.salary}</th>
                <th scope="col">{p.id}</th>

                <td>
                  <Link
                    to={`/personals/${p.id}/edit`}
                    id="update-employee"
                    className="btn btn-outline-warning btn-sm"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    href="#"
                    id="delete-employee"
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => delPersonal(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
    </div>
  );
}
