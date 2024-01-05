import React, { useEffect } from "react";
import axios from "axios";
function useUsageTime() {
  let count = 0;
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      sendHeartbeat();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const sendHeartbeat = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/usage",
        {
          value: 5,
          email: localStorage.getItem("email"),
        },
        { headers: { auth: localStorage.getItem("access-token") } }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export default useUsageTime;
