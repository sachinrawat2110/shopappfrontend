import axios from "axios";
import {useEffect} from "react";
import {useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const AccActivate=()=>
{
	const navigate=useNavigate();
    const[params]=useSearchParams();
    const token=params.get('token')

	const accactivate=async()=>
	{
		try
		{
		   const apires= await axios.get(`${process.env.REACT_APP_APIURL}/api/activateacc?token=${token}`)
		   if(apires.status===200)
		   {
             if(apires.data.code===1)
			 {
				toast.success('Your Account is Activated Succesfully Login Again to Aour Account ')
                navigate("/login")
			 }
			 else
			 {
				toast.warning("issue while activating account")
			 }
			}
			 else 
			 {
				toast.error("Some Error Occured")
			 }
		   }
	    
		catch(e)
		{
           toast.warning(e.message)
		}
    }
	useEffect(()=>
    {
     accactivate();
    },[])

return(
	<>
	<div className="login">
		<div className="container">
			
		</div>
	</div>
	</>
)
}
export default AccActivate;