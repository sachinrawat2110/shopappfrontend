import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Rnap=()=>
{
    const[rollno,setrollno]=useState(``);
	const[name,setname]=useState(``);
	const[address,setaddress]=useState(``);
	const[phone,setphone]=useState(``);
	const[allstudent,setallstudent]=useState([]);

	const submit=async(e)=>
	{
		e.preventDefault();
    try
			{
					var stundent={name,phone,address,rollno}
					const apires= await axios.post("http://localhost:9000/api/Rnap",stundent)
					if(apires.status===200)
					{
						if(apires.data.code===1)
						{
						  toast.success(`Student Added Succesfully`)
						   clearfield();
						}
						else
						{
							toast.warning(`Student Not Added`)
						}
					}
					else
					{
						toast.warning("some error occured")
					}
			}
			catch(e)
			{
				toast.error(e.message)
			}
		}

		const clearfield=()=>
		{
			setrollno(``)
			setname(``)
			setaddress(``)
			setphone(``)
		}

		const fetchallstudent=async()=>
		{ 
			try
			{
				const apires=await axios.get(`http://localhost:9000/api/getallstudent`)
				if(apires.status===200)
				{
					if(apires.data.code===1)
					{
						setallstudent(apires.data.studentdata)
					}
					else
					{
						setallstudent([]);
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
		useEffect=(()=>
		{
			fetchallstudent();
		});

     const ondelete=async(stdid)=>
	 {
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apires = await axios.delete(`http://localhost:9000/api/delstd?std=${stdid}`)
				if(apires.status===200)
				{
					if(apires.data.code===1)
					{
						toast.success("Category deleted successfully");
						fetchallstudent();
					}
					else
					{
						toast.error("Category not deleted");
					}
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	 }

    return(
    <>
    <div className="register">
		<div className="container">
			<div className="login-form-grids">
				<h1>Student Form</h1><br/>
				<form onSubmit={submit}>
					<input type="number" placeholder="Enter roll no." value={rollno} onChange={(e)=>setrollno(e.target.value)}/>
					<input type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)}/>
					<input type="text" placeholder="Enter address" value={address} onChange={(e)=>setaddress(e.target.value)}/>
					<input type="number" placeholder="Phone no." value={phone} onChange={(e)=>setphone(e.target.value)}/>
					<input type="submit" value="Register"/>
				</form>
			</div>
            {
				allstudent.length>0?
				<>
				<h2>All Students</h2>
				<table className="timetable_sub">
				<tbody>
					<tr>
						<th>Rollnumber</th>
						<th>Name</th>
						<th>Address</th>
						<th>Phone Number</th>
						<th>Delete</th>
					</tr>
					{
						allstudent.map((studata,index)=>
						<tr key={index}>
							<td>{studata.rollno}</td>
							<td>{studata.name}</td>
							<td>{studata.address}</td>
							<td>{studata.phone}</td>
							<td><button className="btn btn-danger" onClick={()=>ondelete(studata._id)}>Delete</button></td>
						</tr>
						)
					}<br/><br/>
					<h2>{allstudent.length} Students found.</h2>
				</tbody>
				</table>
				</>:<h4>No Student Found</h4>
            }
		</div>
	</div>
     </>
     )
}
export default Rnap;