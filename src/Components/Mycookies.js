import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const Mycookies=()=>
 {
	const cobj = new Cookies();
    const[cdata,setcdata]=useState();
	const[cdata2,setcdata2]=useState();
	
    const onsubmit=async(e)=>
    {
       try
	   {
		cobj.set("ucookie",cdata,{maxAge:60*60*24*7})
	   }
	   catch(e)
	   {
		toast.error(e.message)
	   }
    }

	const onread=async(e)=>
    {
       try
	   {
		if(cobj.get('ucookie'))
			{
              setcdata2(cobj.get('ucookie'));
			}
			else
			{
				setcdata2('Cookie not Available')
			}
	   }
	   catch(e)
	   {
		toast.error(e.message)
	   }
    }

  return(
    <>
        	<div className="login">
		     <div className="container">
			<h2>Cookies</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form>
					<input type="text" placeholder="Name" required=" " onChange={(e)=>setcdata(e.target.value)}/>
					<input type="button" value="Save" onClick={onsubmit}/>
					<input type="button" value="Read" onClick={onread}/><br/>
					{cdata2}
				</form>
			</div>
		     </div>
	       </div>
        </>
  )
 }
 export default Mycookies;