import axios from "axios";
import {  useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const Resetpass=()=>
{
	const [newpass,setnewpass] = useState();
	const [cnewpass,setcnewpass] = useState();
	const [uname,setuname] = useState();
	const navigate = useNavigate();
    const [flag,setflag] = useState(false);
    const [msg,setmsg] = useState();
    const [params] = useSearchParams();
    const token = params.get("token");
    useEffect(()=>
    {
        if(token!==null)
        {
            verifytoken();
        }
    },[token])
    const verifytoken=async()=>
    {
        try
		{
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/checktoken?token=${token}`)
            if(apiresp.status===200)
            {
                if(apiresp.data.code===1)
                {
                    setflag(true);
                    setuname(apiresp.data.passdata.emailid)
                }
                else if(apiresp.data.code===2)
                {
                    setmsg("Link Expired. It was valid for only 15 mins")
                    setflag(false);
                }
                else if(apiresp.data.code===0)
                {
                    setmsg("Invalid Token")
                    setflag(false);
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
	const handlesubmit=async(e)=>
	{
		e.preventDefault();
		try
		{
            if(newpass===cnewpass)
            {
                const apidata = {newpass,uname}
                const apiresp = await axios.put(`${process.env.REACT_APP_APIURL}/api/resetpass`,apidata)
                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        toast.success("Password reset successfully");
                        toast.info("Please login with new password");
                        navigate("/") 
                    }
                    else
                    {
                        toast.error("Error while resetting password, try again")
                    }
                }
                else
                {
                    toast.error("Some error occured, try again")
                }
            }
            else
            {
                toast.warn("New Password and confirm new password doesn't  match")
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
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Reset Password</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
            {
            flag?
            <>
                <h2>Reset Password</h2>
                <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                <form name="form1" onSubmit={handlesubmit}>
                <input type="password" placeholder="New Password" name="npass" required=" " onChange={(e)=>setnewpass(e.target.value)}/>
                <input type="password" placeholder="Confirm New Password" name="cnpass" required=" " onChange={(e)=>setcnewpass(e.target.value)}/>
                <input type="submit" name="btn" value="Reset Password"/>
                </form>
                </div>
            </>:<h2>{msg}</h2>
            }
		</div>
	</div>
        </>
    )
}
export default Resetpass;