import React from "react";
export const currentUser = {
    name: '', 
    about: '',
    avatar: ''
}

export const CurrentUserContext = React.createContext(currentUser);