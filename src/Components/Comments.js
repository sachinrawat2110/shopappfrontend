import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Comments=()=>
{
    const[userdata,setuserdata]=useState([])

    const Fetchcomments=async()=>
{
     try
     {
        const apires= await axios.get(`https://jsonplaceholder.typicode.com/comments`)
        if(apires.status===200)
        {
             setuserdata(apires.data)
        }
        
        else
        {
            toast.warning("some error occured oops")
        }
     }
     
     catch(e)
     {
       toast.error(e.message)
     }
 }

 useEffect(()=>
 {
    Fetchcomments();
 },[])


    return(
        <>
        <div className="login">
		     <div className="container">
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
            {
                userdata.length>0?
                <>
                  <h2>Comments</h2>
                  <table className="timetable_sub">
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>Username</th>
                            <th>Body</th>


                        </tr>
                        {
                            userdata.map((data,i)=>
                              <tr key={i}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td><Link to="/viewcomment">View Comments</Link></td>
                              </tr>
                            )
                        }
                    </tbody>
                  </table>
                </>:<h2>No Comments Found</h2>
            }
			</div>
		     </div>
	       </div>
           </>
    )
}
export default Comments;