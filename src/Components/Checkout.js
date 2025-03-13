import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Checkout=()=>
{
    const navigate=useNavigate();
	const [hname,sethname] = useState();
	const [cardno,setcardno] = useState();
	const [exp,setexp] = useState();
	const [cvv,setcvv] = useState();
	const [addr,setaddr] = useState();
	const [flag,setflag] = useState(false);
	const [pmode,setpmode] = useState("");
    const {uname} = useSelector((state)=>state.auth)

	const saveorder=async(e)=>
	{
		e.preventDefault();
		try
		{
            const carddetails = {hname,cardno,exp,cvv}
            const apidata = {uname,addr,pmode,carddetails,tbill:sessionStorage.getItem("billamt"),orderitems:JSON.parse(sessionStorage.getItem("cartitems"))}

			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/saveorder`,apidata)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                   navigate("/ordersummary")
				}
				else
				{
					
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
        if(pmode==="Card Payment")
        {
            setflag(true)
        }
        else
        {
            setflag(false)
        }
    },[pmode])
    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Checkout</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Checkout</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={saveorder}>
                   <textarea name="saddr" placeholder="Full Name and Shipping Address with Pin Code and Phone" onChange={(e)=>setaddr(e.target.value)} className="form-control"></textarea><br/>
                   <select name="pmode" className="form-control" onChange={(e)=>setpmode(e.target.value)}>
                        <option value="">Choose Payment Mode</option>
                        <option>Card Payment</option>
                        <option>Cash on Delivery</option>
                    </select><br/>
                    {
                    flag?
                    <>
                    <input type="text" name="hname"  placeholder="Holder Name" onChange={(e)=>sethname(e.target.value)}/><br/>
                    <input type="text" name="cardno"  placeholder="Card Number" onChange={(e)=>setcardno(e.target.value)}/><br/>
                    <input type="text" name="exp"  placeholder="Expiry" onChange={(e)=>setexp(e.target.value)}/>
                    <input type="password" name="cvv"  placeholder="CVV" onChange={(e)=>setcvv(e.target.value)}/>
                    </>:null
                    }

                <input type="submit" name="btn" value="Make Payment"/><br/>
				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Checkout;