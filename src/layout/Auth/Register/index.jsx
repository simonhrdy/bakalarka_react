import {Helmet} from "react-helmet"
import Register from "./Register";

const index = () =>{
    return(
        <>
            <Helmet>
                <title>Zdravé recepty | Registrace</title>
            </Helmet>
            <Register></Register>
        </>
        );
}
export default index