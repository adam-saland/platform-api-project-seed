/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function App({ fin }) {
  const [version, setVersion] = useState("");
  useEffect(() => {
    async function ofVersion() {
      const v = await fin.System.getVersion();
      setVersion(v);
    }

    ofVersion();
  }, []);

  return (
    <div className="main">
      <div className="logo-container">
        <img src="assets/logo.svg" />
      </div>
      <div>
        <h1>Hello, world!</h1>
        <p>This is a template for an OpenFin React Application</p>
        <p>Current Version: {version}</p>
      </div>
    </div>
  );
}

App.propTypes = {
  fin: PropTypes.object.isRequired
};

export default App;
