import { createContext } from "react";

export const UserContext = createContext(null);

const UserProviders = ({children}) => {
    const user = {displayName: "Sagor Nodi"}
    return (
        <div>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProviders;