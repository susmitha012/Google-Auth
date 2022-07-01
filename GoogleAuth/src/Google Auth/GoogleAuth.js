import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Convertor from "./Converter";

const GoogleAuth = () => {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  const google = window.google;

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1075265340991-qb4ijjbutkr10eqqmeho34o8mki44fg3.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  return (
    <>
      <div id="signInDiv"></div>
      <div style={{ marginTop: "50px", position: "relative" }}>
        <div>
          {user && (
            <div className="picture">
              <img src={user.picture} alt="" />
              <h3>{user.name}</h3>
              <h4>{user.email}</h4>
              {Object.keys(user).length != 0 && (
                <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
              )}
            </div>
          )}
        </div>
        {user?.email ? (
          <>
            <Convertor />
          </>
        ) : null}
      </div>
    </>
  );
};

export default GoogleAuth;
