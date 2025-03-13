import { Link } from "react-router-dom";

const Admin=()=>
{
return(
    <>
    <h1>Welcome Admin</h1><br/>
    <Link to="/listuser"><h3>list user</h3></Link>
    <Link to="/search"><h3>search user</h3></Link>
    <Link to="/ManageCategory"><h3>Manage Category</h3></Link>
    <Link to="/SubmanageCat"><h3>Submanage Category</h3></Link>
    <Link to="/Manageproduct"><h3>Manageproduct</h3></Link>
    <Link to="/vieworder"><h3>View Order</h3></Link>

    </>
)
}
export default Admin;