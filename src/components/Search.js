import React, { useContext } from "react";
import { personalContex } from "../contexts/context";

export default function Search() {
  const { searchQuery, setSearchQuery } = useContext(personalContex);

  return (
    <div>
      <div className="container mt-3">
        <h6>Çalışan Filtrele</h6>

        <input
          className="form-control"
          id="myInput"
          type="text"
          placeholder="Search.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
