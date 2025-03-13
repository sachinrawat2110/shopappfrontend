import axios from "axios";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import useFetchcategory from "./useFetchcategory";

const ManageCategory=()=>
{
    const [catname,setcatname]=useState();
    const [catpic,setcatpic]=useState(null);
    const [disporder,setdisporder]=useState(); 
	const [catid,setcatid]=useState();     
    const fileInputRef= useRef(null)
    // const [allcat,setallcat] = useState([]);
	const [editmode,seteditmode] = useState(false);
	const [picname,setpicname] = useState();
	const { allcat, fetchAllCat } = useFetchcategory();


    const onformsub=async(e)=>
    {
		
		if(editmode===false)
		{
			addcategory(e);
		}
		else if(editmode===true)
		{
			updatedb(e);
		}
    }
	const addcategory=async(e)=>
	{
		e.preventDefault();
     try
     {
       const myform= new FormData();
       myform.append(`cname`,catname)
       myform.append(`disporder`,disporder)
       if(catpic!==null)
       {
          myform.append(`cpic`,catpic)
       }
       const apires =await axios.post(`${process.env.REACT_APP_APIURL}/api/category`,myform,
	   {headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}}
	   )
       if(apires.status===200)
       {
        if(apires.data.code===1)
        {
          toast.success(`Category Added Succesfully`)
		  fetchAllCat();
          clearfields();
        }
        else
        {
         toast.error(`Category not added`)
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
    
    const clearfields=()=>
    {
      setcatname(``)
      setdisporder(``)
      if(fileInputRef.current)
      {
        fileInputRef.current.value=""; //(it will clear only html field)
        setcatpic(null); //it will clear file from state variable
      }
	  setpicname(``)
	  setcatid(``)
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

	const ondel=async(catid)=>
	{
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcat?cid=${catid}`)
				if(apiresp.status===200)
				{
					if(apiresp.data.code===1)
					{
						toast.success("Category deleted successfully");
						fetchAllCat();
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

	const onupdate=(catinfo)=>
	{
		seteditmode(true);
		setcatname(catinfo.catname)
		setdisporder(catinfo.disporder)
		setpicname(catinfo.catpic)
		setcatid(catinfo._id)
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
			formdata.append("cname",catname)   //either older or new name
			formdata.append("disporder",disporder) //either old display no. or new numnber
			formdata.append(`oldpicname`,picname) //current image name
			formdata.append(`cid`,catid)  // id

			if(catpic!==null)
			{
				formdata.append("cpic",catpic)
			}
			const apires=await axios.put(`${process.env.REACT_APP_APIURL}/api/updatecat`,formdata)
			if(apires.status===200)
			{
				if(apires.data.code===1)
				{
					toast.success("Category updated successfuly")
					fetchAllCat();
					oncancel();
				}
				else
				{
					toast.error(`Category Not Updated`)
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
			<h2>Manage Category</h2>
			<div className="login-form-grids">
				<h5>profile information</h5><br/>
				<form onSubmit={onformsub}>
					<input type="text" value={catname} placeholder="Category name" required=" " onChange={(e)=>setcatname(e.target.value)}/>
					<input type="number"value={disporder} placeholder="Display order" required=" " onChange={(e)=>setdisporder(e.target.value)}/><br/>
					{editmode?
					<>
					<img src={`upload/${picname}`} height='65' alt="CategoryImage"/>
					<br/><br/><h5>Choose new image if required</h5></>:null}
					<input type="file" ref={fileInputRef} name="cpic" onChange={(e)=>setcatpic(e.target.files[0])}/>

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
				allcat.length>0?
				<>
					<h2>Added Categories</h2><br/>
					<table className="timetable_sub">
						<tbody>
							<tr>
								<th>Picture</th>
								<th>Category Name</th>
								<th>Display Order</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
							{
							allcat.map((cat,index)=>
								<tr key={index}>
									<td><img src={`upload/${cat.catpic}`} alt="CategoryImage" height='75'/></td>
									<td>{cat.catname}</td>
									<td>{cat.disporder}</td>
									<td><button className="btn btn-primary" onClick={()=>onupdate(cat)}>Update</button></td>
									<td><button className="btn btn-danger" onClick={()=>ondel(cat._id)}>Delete</button></td>
								</tr>
							)
							}<br/>
							{allcat.length} categories found
						</tbody>
					</table>
				</>:<h2>No Categories available</h2>
			}

		</div>
	</div>
    </>
    )
}
export default ManageCategory;