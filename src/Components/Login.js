import axios from "axios";
import {useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { login } from "../slices/authslice";
import { useDispatch } from "react-redux";

const Login=()=>
{
	const[uname,setuname]=useState()
	const[pass,setpass]=useState()
	const[rembme,setrembme]=useState()
	const navigate=useNavigate();
	const dispatch = useDispatch();
    const cobj = new Cookies();
	const location = useLocation();
	const from = location.state?.from || "/"; // Default to homepage if no previous path exists

	const logined=async(e)=>
	{
		e.preventDefault();
		try
		{

		   const apidata={uname,pass};
		   
		   const apires= await axios.post(`${process.env.REACT_APP_APIURL}/api/login/`,apidata)
		   if(apires.status===200)
		   {
             if(apires.data.code===1)
			 {
				if(apires.data.membdata.isActivated===true)
				{ 
				    sessionStorage.setItem(`udata`,JSON.stringify(apires.data.membdata))
					dispatch(login(apires.data.membdata))
					sessionStorage.setItem("jtoken",apires.data.jstoken)
					if(apires.data.membdata.usertype==="admin")
					{
					  navigate("/adminhome")
					}
					else 
					{
					if(rembme===true)
					{
						cobj.set("ucookie",apires.data.membdata.id,{maxAge:60*60*24*7})
					}
					navigate("/")
					}
				}
				else
				{
					toast.error(`Your Account is not activated.Activate First in Mail`)
				}
			 }
			 else
			 {
				toast.warning("incorrect password/username")
			 }
			}
			 else 
			 {
				toast.warning("Some Error Occured")
			 }
		   }
	    
		catch(e)
		{
           toast.warning(e.message)
		}
		navigate(from);
    }
	
return(
	<>
	<div className="login">
		<div className="container">
			<h2>Login Form</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form onSubmit={logined}>
					<input type="email" placeholder="Email Address" required=" " onChange={(e)=>setuname(e.target.value)}/>
					<input type="password" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)}/><br/>
					<label><input type="checkbox" onChange={(e)=>setrembme(e.target.checked)}/> Stay logged in </label>
					<div className="forgot">
					<Link to="/forgotpass">Forgot Password?</Link></div>
					<input type="submit" value="Login"/>
				</form>
			</div>
			<h4>For New People</h4>
			<p><a href="registered.html">Register Here</a></p>
		</div>
	</div>
	</>
)
}
export default Login;