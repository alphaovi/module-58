import { useContext } from "react";
import { UserContext } from "../../Providers/UserProviders";

const Home = () => {
    const user = useContext(UserContext);
    return (
        <div>
            <h2>This is Home: {user && user.displayName}</h2>
        </div>
    );
};

export default Home;