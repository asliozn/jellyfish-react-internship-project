import React from "react";

export const auth = {
    noAuth: {
        isAuthenticated: 'false',
    },
    yesAuth : {
        isAuthenticated: 'true',
    }

}
export const AuthContext = React.createContext(auth);
  