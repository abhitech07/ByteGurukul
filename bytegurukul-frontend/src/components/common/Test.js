import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouterasRouter } from 'react-router-dom';

function Test() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/message")
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{data ? data : "Loading..."}</h1>
      <br/>
      <br/>
      <br/>

      <br/>
      <h1>This is testing purpose</h1>

    </div>
  );
}

export default Test;
