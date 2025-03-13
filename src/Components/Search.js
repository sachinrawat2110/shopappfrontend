import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Search=()=>
 {
    const[uname,setuname]=useState();
    const[pdata,setpdata]=useState({});
	
    const Onsearch=async(e)=>
    {
        e.preventDefault();
		try
	   { 
       const apires= await axios.get(`${process.env.REACT_APP_APIURL}/api/search?un=${uname}`,{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
		if(apires.status===200)
		{
         if(apires.data.code===1)
		 {
            setpdata(apires.data.membdata)
		 }
		 else if(apires.data.code===0)
		 {
			toast.error("incorrect username")
			setpdata({});
		 }
		}
		else if(apires.data.code===-1)
		{
			toast.error("some error occured")
		}
	   }
		catch(e)
		{
          toast.error(e.message+"catch error")
		}
    }

  return(
    <>
        	<div className="login">
		     <div className="container">
			<h2>Search Form</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form onSubmit={Onsearch}>
					<input type="email" placeholder="Email Address" required=" " onChange={(e)=>setuname(e.target.value)}/>
					<div className="forgot">
						<a href="/forgot">Forgot Password?</a>
					</div>
					<input type="submit" value="Search"/>
					{
						Object.keys(pdata).length>0?
						<>
						Name:-{pdata.name}<br/>
						Phone:-{pdata.phone}
						</>:null
					}
				</form>
			</div>
		     </div>
	       </div>
        </>
  )
 }
 export default Search;