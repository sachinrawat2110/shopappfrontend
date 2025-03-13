import { useEffect, useState } from "react";
import { Link, useSearchParams} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Orderitems = () => {
    
    const [orderitems,setorderitems] = useState([])
    const [params] = useSearchParams();
    const oid = params.get("oid");

    const fetchorderitems=async()=>
    {
        try
        {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getorderitems?oid=${oid}`)
            if(apiresp.status===200)
            {
                if(apiresp.data.code===1)
                {
                    setorderitems(apiresp.data.itemsdata)
                }
                else
                {
                    toast.error("No order details found")
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
        fetchorderitems();
    },[])

    return (
        <>
           <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Order Items</li>
			</ol>
		</div>
	</div>
            <div className="login">
                <div className="container">
                    <h2>Order Items</h2><br/>
                    {
                        orderitems.length>0?
                        <>
                        <table className="timetable_sub">
                        <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                        </tr>
                        {
                            orderitems.map((data,i)=>
                            <tr key={i}>
                            <td><img src={`upload/${data.picture}`} height='75'/></td>
                            <td>{data.prodname}</td>
                            <td>₹{data.rate}/-</td>
                            <td>{data.qty}</td>
                            <td>₹{data.totalcost}/-</td>
                            </tr>
                            )
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
export default Orderitems;