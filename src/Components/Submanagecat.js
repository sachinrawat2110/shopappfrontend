import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import useFetchcategory from "./useFetchcategory";
const Submanagecat=()=>
{
	const [subcatid,setsubcatid]=useState()
	const [subcatname,setsubcatname] = useState();
	const [subcatpic,setsubcatpic] = useState(null);
	const [disporder,setdisporder] = useState();
	const [catid,setcatid] = useState("");
    // const [allcat,setallcat] = useState([]);
	const { allcat, fetchAllCat } = useFetchcategory();
    const [subcatdata,setsubcatdata] = useState([]);
	const fileInputRef = useRef(null);
   
	const [picname,setpicname] = useState();
	const [editmode,seteditmode] = useState(false);

	const onformsubmit=async(e)=>
	{
		if(editmode===false)
		{
			addsubcategory(e);
		}
		else if(editmode===true)
		{
			updatedb(e);
		}
	}
	const addsubcategory=async(e)=>
	{
		e.preventDefault();
		try
		{
            const myform = new FormData();
            myform.append("cid",catid)
            myform.append("scname",subcatname)
            myform.append("disporder",disporder)
            if(subcatpic!==null)
            {
                myform.append("scpic",subcatpic)
            }
			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/savesubcategory`,myform)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                   toast.success("Sub Category added successfully")
				   fetchsubcatbycat();
				   clearfields();
				}
				else
				{
					toast.error("Sub Category not added");					
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
	const clearfields=()=>
	{
		setsubcatname("");
		setdisporder("");
		if (fileInputRef.current) 
		{
			fileInputRef.current.value = "";//it will clear only html field
			setsubcatpic(null);// it will clear file from state variable
		}
		setpicname("");
		setsubcatid("")
	}
	useEffect(()=>
	{
		if(catid!=="")
		{
			fetchsubcatbycat();	
		}
		else if(catid==="")
		{
			setsubcatdata([]);
		}
	},[catid])

	const fetchsubcatbycat=async()=>
	{
		try
		{
			const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycatid/${catid}`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setsubcatdata(apiresp.data.subcatdata)
				}
				else
				{
					toast.warning("No Sub Categories found")
					setsubcatdata([]);
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}
	
	// const fetchallcat=async()=>
	// {
	// 	try
	// 	{
	// 		const apiresp = await axios.get(`http://localhost:9000/api/getallcat`)
	// 		if(apiresp.status===200)
	// 		{
	// 			if(apiresp.data.code===1)
	// 			{
	// 				setallcat(apiresp.data.catdata)
	// 			}
	// 			else
	// 			{
	// 				setallcat([]);
	// 			}
	// 		}
	// 		else
	// 		{
	// 			toast.error("Some error occured, try again")
	// 		}
	// 	}
	// 	catch(e)
	// 	{
	// 		toast.error(e.message)
	// 	}
	// }

	// useEffect(()=>
	// {
	// 	fetchallcat();
	// },[])

	const ondel=async(subcatid)=>
	{
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apires = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delsubcat/${subcatid}`)
				if(apires.status===200)
				{
					if(apires.data.code===1)
					{
						toast.success("SubCategory deleted successfully");
						fetchAllCat();
						fetchsubcatbycat();
					}
					else
					{
						toast.error("SubCategory not deleted");
					}
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}

	const onupdate=(subcatinfo)=>
	{
		console.log(subcatinfo._id);
		seteditmode(true);
		setsubcatname(subcatinfo.subcatname)
		setdisporder(subcatinfo.disporder)
		setpicname(subcatinfo.subcatpic);
		// setcatid(subcatinfo._id)
		setsubcatid(subcatinfo._id)
	}

	const oncancel=()=>
	{
		seteditmode(false)
		clearfields();
	}

	const updatedb=async(e)=>
	{
		e.preventDefault();
		try
		{
			const formdata = new FormData();
			formdata.append("scname",subcatname) // either oldname or new name
			formdata.append("disporder",disporder) //either old displayorder or new
			formdata.append("oldpicname",picname) // current image name
			formdata.append("cid",catid);
			formdata.append("scid",subcatid)
			if(subcatpic!==null)
			{
				formdata.append("scpic",subcatpic) // if admin will select new image, then only new image file will be sent to api
			}

			const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/updatesubcat`,formdata)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					toast.success("Sub Category updated successfully")
					fetchsubcatbycat();
					oncancel();
				}
				else
				{
					toast.error("Sub Category not updated")
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
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Sub Category</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Sub Category</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
		<form name="form1" onSubmit={onformsubmit}>

        <select name="cat" onChange={(e)=>setcatid(e.target.value)} className="form-control" value={catid}>
            <option value="">Choose Category</option>
            {
                allcat.length>0?
                allcat.map((data,index)=>
                    <option key={index} value={data._id}>{data.catname}</option>
                ):<option>No Category added</option>
            }
        </select>
        
		<input type="text" value={subcatname} placeholder="Sub Category Name" name="scname" required=" " onChange={(e)=>setsubcatname(e.target.value)}/><br/>

		<input type="text" value={disporder} placeholder="Display Order" name="dorder" required=" " onChange={(e)=>setdisporder(e.target.value)} /><br/>

		{editmode?
		<>
			<img src={`upload/${picname}`} height='75' alt="SubCategoryImage"/>
			Choose new image if required<br/><br/>
			</>:null
		}

        <input type="file" ref={fileInputRef} name="scpic" onChange={(e)=>setsubcatpic(e.target.files[0])}/>

		{editmode===false?<input type="submit" name="btn" value="Add"/>:null}

				{
				editmode?
				<>
				<input type="submit" name="btn2" value="Update"/>
				<input type="button" onClick={oncancel} name="btn3" value="Cancel"/>
				</>:null
				}
				</form>
			</div><br/>
			{
				subcatdata.length>0?
				<>
					<h2>Added Sub Categories</h2><br/>
					<table className="timetable_sub">
						<tbody>
							<tr>
								<th>Picture</th>
								<th>Sub Category Name</th>
								<th>Display Order</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
							{
							subcatdata.map((subcat,index)=>
								<tr key={index}>
									<td><img alt="subcategorypic" src={`upload/${subcat.subcatpic}`} height='75'/></td>
									<td>{subcat.subcatname}</td>
									<td>{subcat.disporder}</td>
									<td><button className="btn btn-primary" onClick={()=>onupdate(subcat)}>Update</button></td>
									<td><button className="btn btn-danger" onClick={()=>ondel(subcat._id)}>Delete</button></td>
								</tr>
							)
							}<br/>
							{subcatdata.length} categories found
						</tbody>
					</table>
				</>:null
			}
			


		</div>
	</div>
        </>
    )
}
export default Submanagecat;