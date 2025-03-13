import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const Createadmin=()=>
{
    const[pname,setpname]=useState();
	const[phone,setphone]=useState();
	const[email,setemail]=useState();
	const[pass,setpass]=useState();
	const[cpass,setcpass]=useState();
	const[terms,setterms]=useState();

    const onsignup=async(e)=>
    { 
     e.preventDefault();
     if(terms===true)
     {
        if(pass===cpass)
        {
			try
			{
					var signupdata={pname,phone,email,pass}
					const apires= await axios.post(`${process.env.REACT_APP_APIURL}/api/createadmin`,signupdata,
					{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}}
					)
					if(apires.status===200)
					{
						toast.success(`Admin Created Succesfully`)
					}
					else
					{
						toast.error("error in signup")
					}
			}
			catch(e)
			{
				toast.error(e.message)
			}
       }
	 else
	 {
		toast.warning("password doesnt match")
	 }
	}
	
        else
        {
            toast.warning("Please accept terms and condition")
        }
     
    }
    return(
    <>
    <div className="register">
		<div className="container">
			<h2>Create Admin</h2>
			<div className="login-form-grids">
				<h5>profile information</h5><br/>
				<form onSubmit={onsignup}>
					<input type="text" placeholder="First Name..." required=" " onChange={(e)=>setpname(e.target.value)}/>
					<input type="number" placeholder="phone no..." required=" " onChange={(e)=>setphone(e.target.value)}/> <br/><br/> 
			
				<h3>Login information</h3><br/>
					<input type="email" placeholder="Email Address" required=" " onChange={(e)=>setemail(e.target.value)}/>
					<input type="password" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)}/>
					<input type="password" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpass(e.target.value)}/>
					<div className="register-check-box">
						<div className="check">
							<label className="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>setterms(e.target.checked)} /><i> </i>I accept the terms and conditions</label>
						</div>
					</div>
					<input type="submit" value="create admin"/>
				</form>
			</div>
		</div>
	</div>
     </>
     )
}
export default Createadmin;