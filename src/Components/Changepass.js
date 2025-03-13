import axios from "axios";
import {useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authslice";

const Changepass=()=>
{
	const[currpass,setcurrpass]=useState()
	const[newpass,setnewpass]=useState()
    const[cnewpass,setcnewpass]=useState()
	const navigate=useNavigate();
	const dispatch = useDispatch();
	const {uname} = useSelector((state)=>state.auth)

  useEffect(()=>
  {
  if(uname==="")
  {
	toast.warn(`Please Login To Change Password`)
	navigate(`/login`)
  }
  },[])

	const submit=async(e)=>
	{
		e.preventDefault()
		try
		{
            if(newpass===cnewpass)
            {
            const apidata={currpass,newpass,uname}
		    const apires= await axios.put(`${process.env.REACT_APP_APIURL}/api/changepass/`,apidata,{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
		   if(apires.status===200)
		   {
             if(apires.data.code===1)
			 { 
				toast.success(`Password Change successfully`);
				toast.info(`you have been log out,login with new passwrod`);
                dispatch(logout())
                sessionStorage.clear();
                navigate(`/`)
             }
				else if(apires.data.code===2)
                {
                    toast.error(`current password Incorret`)
                }
			
			 else if(apires.data.code===0)
			 {
				toast.error("error while changing password")
			 }
		   }
		   else
		   {
			toast.error("some error occured")
		   }
	    }
        else
        {
            toast.warn(`new password & current password does'nt ,match`)
        }
    }
		catch(e)
		{
           toast.warning(e.message)
		}
    }
	
return(
	<>
	<div className="login">
		<div className="container">
			<h2>Change Password</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form onSubmit={submit}>
					<input type="password" placeholder="Current password" required=" " onChange={(e)=>setcurrpass(e.target.value)}/>
                    <input type="password" placeholder="New password" required=" " onChange={(e)=>setnewpass(e.target.value)}/>
					<input type="password" placeholder="Confirm new password" required=" " onChange={(e)=>setcnewpass(e.target.value)}/>
					
					<input type="submit" value="change password"/>
				</form>
			</div>
		</div>
	</div>
	</>
)
}
export default Changepass  ;