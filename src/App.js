import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import moment from "moment-timezone";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { timeZones } from "./utils/timezone-name";

import "./assets/style.css";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  const timezoneCurrent = moment.tz.guess();
  const [timezone, setTimezone] = useState("");
  const [clocks, setClocks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("clocks"));

    if (storage) {
      setClocks(storage);
    }

    return function cleanup() {};
  }, []);

  const listItems = timeZones.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  const handleChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!timezone) {
      alert("Plase select timzone");
      return;
    }

    const temp = [...clocks];

    temp.push({
      timezone,
    });
    localStorage.setItem("clocks", JSON.stringify(temp));
    setClocks(temp);
    setTimezone("");
    setShowForm(!showForm);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (index) => {
    const temp = [...clocks];

    temp.splice(index, 1);
    localStorage.setItem("clocks", JSON.stringify(temp));
    setClocks(temp);
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div id="content">
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ width: 100 + "%" }}
          >
            <h1 className="h3 mb-0 text-gray-800">World Time Clock</h1>

            <button className="btn btn-success" onClick={toggleShowForm}>
              Add new clock
            </button>
          </div>
        </nav>

        <div className="container-fluid">
          {showForm && (
            <div className="row">
              <div className="col-md-3 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-success">
                      Add New Clock
                    </h6>
                  </div>
                  <div className="card-body">
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <select
                          className="form-control form-control-user--select text-capitalize"
                          value={timezone}
                          onChange={handleChange}
                        >
                          <option value="">Select timezone</option>
                          {listItems}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-user btn-block"
                      >
                        Thêm mới
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-success">
                    {timezoneCurrent}
                  </h6>
                  <button className="btn btn-success btn-circle btn-sm">
                    <i className="fa fa-clock-o" aria-hidden="true" />
                  </button>
                </div>
                <div className="card-body">
                  <h4>
                    <Clock format={"HH:mm:ss"} ticking={true} />
                  </h4>
                </div>
              </div>
            </div>

            {/* List clock */}
            {clocks.map((clock, index) => (
              <div className="col-md-3 mb-4" key={`${index}-${clock.timezone}`}>
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-success">
                      {clock.timezone}
                    </h6>
                    <button
                      className="btn btn-danger btn-circle btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="card-body">
                    <h4>
                      <Clock
                        format={"HH:mm:ss"}
                        ticking={true}
                        timezone={clock.timezone}
                      />
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AlertProvider>
  );
}

export default App;
