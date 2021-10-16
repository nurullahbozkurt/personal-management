import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect, useMemo } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export const personalContex = createContext();

export default function PersonalProvider(props) {
  const [personals, setPersonal] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPersonals = useMemo(() => {
    if (!searchQuery) {
      return personals;
    }

    return personals.filter((personal) =>
      personal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, personals]);

  useEffect(() => {
    jsonPlayersGet();
  }, []);

  const jsonPlayersGet = async () => {
    const response = await axios.get("http://localhost:3000/personal");
    setPersonal(response.data);
  };

  const showButton = () => {
    console.log("çalıştı");
  };

  const addNewPersonal = async (personal) => {
    const id = Math.floor(Math.random() * 101);
    await fetch("http://localhost:3000/personal", {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: personal.name,
        department: personal.department,
        salary: personal.salary,
      }),
    });
    setPersonal([
      ...personals,
      {
        id,
        name: personal.name,
        department: personal.department,
        salary: personal.salary,
      },
    ]);
  };

  const delPersonal = async (person) => {
    await fetch("http://localhost:3000/personal/" + person.id, {
      method: "DELETE",
    });
    setPersonal(personals.filter((p) => p.id !== person.id));
    alertify.error("Deleted personal.");
  };

  const allDelete = async (e) => {
    await personals.forEach((p) => {
      fetch("http://localhost:3000/personal/" + p.id, {
        method: "DELETE",
      });
    });
    setPersonal([]);
  };

  //
  const updatePersonal = async (id, data) => {
    const personaller = [...personals];

    const personal = personaller.find((p) => Number(p.id) === Number(id));

    personal.name = data.name;
    personal.salary = data.salary;
    personal.department = data.department;

    setPersonal(personaller);
  };
  const search = (e) => {};

  return (
    <personalContex.Provider
      value={{
        addNewPersonal,
        personals,
        delPersonal,
        updatePersonal,
        allDelete,
        showButton,
        search,
        searchQuery,
        setSearchQuery,
        filteredPersonals,
      }}
    >
      {props.children}
    </personalContex.Provider>
  );
}
