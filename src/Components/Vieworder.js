import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Vieworder=()=>
{
    const [ordersdata,setordersdata] = useState([]);
    const [orddt,setorddt] = useState();
    const navigate = useNavigate();
	const fetchorders=async()=>
	{
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getorders?odt=${orddt}`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setordersdata(apiresp.data.orddata)
				}
				else
				{
                    setordersdata([]);
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
    useEffect(()=>
    {
        // fetchorders();
    },[])
	const onorderupdate=async (id,st)=>
	{
		navigate(`/updatestatus?oid=${id}&currst=${st}`);
	}

    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">List of Orders</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
            Choose Date <input type="date" name="orddt" onChange={(e)=>setorddt(e.target.value)}/>&nbsp;
            <button className="btn btn-primary" onClick={fetchorders}>Submit</button>
			{
                ordersdata.length>0?
                <>
                    <h2>List of Orders</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>Order ID</th>
                                <th>Username</th>
                                <th>Address</th>
                                <th>Pay Mode</th>
                                <th>Amount</th>
                                <th>Date/Time</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                            {
                                ordersdata.map((data,i)=>
                                {
                                    const readableDate = new Date(data.orderdt).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      });
                                      return(
                                        <tr key={i}>
                                            <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                            <td>{data.emailid}</td>
                                            <td>{data.address}</td>
                                            <td>{data.pmode}</td>
                                            <td>{data.billamt}</td>
                                            <td>{readableDate}</td>
                                            <td>{data.status}</td>
                                            <td><button className="btn btn-danger" onClick={()=>onorderupdate(data._id,data.status)}>Update</button></td>
                                        </tr>
                                    );
                                })
                            }
                               
                        </tbody>
                    </table>
                </>:null
            }
		</div>
	</div>
        </>
    )
}
export default Vieworder;