import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
const Updatestatus=()=>
{
    const [params] = useSearchParams();
    const ordid=params.get("oid")
    const currstatus = params.get("currst");
    const [newstatus,setnewstatus] = useState();
    const navigate = useNavigate();

	const onupdate=async(e)=>
	{
		e.preventDefault();
		try
		{
            const apidata = {newstatus,ordid}
			const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/updatestatus`,apidata)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                    toast.success("Status updated successfully")
                    navigate("/vieworder");

				}
				else
				{
					toast.error("Status not updated")
				}
			}
			else
			{
				toast.error("Some error occured, try again")
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}
    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Update Status</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Search User</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onupdate}>
					<b>Current Status :-</b> {currstatus}<br/><br/>
                    <select name="newst" className="form-control" onChange={(e)=>setnewstatus(e.target.value)}>
                        <option value="">Choose New Status</option>
                        <option>Confirmed</option>
                        <option>Packed</option>
                        <option>Shipped</option>
                        <option>In-Transit</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Returned</option>
                    </select>
					<input type="submit" name="btn" value="Update"/><br/>
					

				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Updatestatus;