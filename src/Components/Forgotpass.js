import axios from "axios";
import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
const Forgotpass=()=>
{
	const [uname,setuname] = useState();
	const onsubmit=async(e)=>
	{
		e.preventDefault();
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/forgotpass/${uname}`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					toast.success("Please check your mail to reset password.")
				}
				else if(apiresp.data.code===0)
				{
					toast.error("Incorrect Username")
				}
                else if(apiresp.data.code===2)
                {
                    toast.error("Error send mail for resetting password. Try later")
                }
                else
                {
                    toast.error("Some error occured, try again")
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
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Forgot Password</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Forgot Password</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onsubmit}>
					<input type="email" placeholder="Email Address" name="em" required=" " onChange={(e)=>setuname(e.target.value)} />
					<input type="submit" name="btn" value="Submit"/>
				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Forgotpass;