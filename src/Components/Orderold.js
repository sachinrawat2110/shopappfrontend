import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Orderold=()=>
{
    const [ordersdata,setordersdata] = useState([]);
    const {uname} = useSelector((state)=>state.auth)
	const fetchorders=async()=>
	{
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getuserorders?un=${uname}`)
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
        fetchorders();
    },[])

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
                            </tr>
                            {
                                ordersdata.map((data,i)=>
                                    <tr key={i}>
                                        <td><Link to={`/orderitems?oid=${data._id}`}>{data._id}</Link></td>
                                        <td>{data.emailid}</td>
                                        <td>{data.address}</td>
                                        <td>{data.pmode}</td>
                                        <td>{data.billamt}</td>
                                        <td>{data.orderdt}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>:<h2>No orders found</h2>
            }
		</div>
	</div>
        </>
    )
}
export default Orderold;