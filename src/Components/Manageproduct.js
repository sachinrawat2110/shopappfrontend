import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ManageProduct=()=>
{
	const [prodid,setprodid] = useState();
	const [subcatid,setsubcatid] = useState("");
	const [pname,setpname] = useState();
	const [prodpic,setprodpic] = useState(null);
	const [description,setdescrip] = useState();
	const [rate,setrate] = useState();
	const [discount,setdiscount] = useState();
	const [stock,setstock] = useState();
	const [feat,setfeat] = useState();

	const [catid,setcatid] = useState("");
    const [allcat,setallcat] = useState([]);
    const [subcatdata,setsubcatdata] = useState([]);
    const [prodsdata,setprodsdata] = useState([]);

	const fileInputRef = useRef(null);

	const [picname,setpicname] = useState();
	const [editmode,seteditmode] = useState(false);

	const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          ['link', 'image', 'video'],
          ['clean'], // remove formatting button
        ],
      };

	const onformsubmit=async(e)=>
	{
		if(editmode===false)
		{
			addproduct(e);
		}
		else if(editmode===true)
		{
			updatedb(e);
		}
	}
	const addproduct=async(e)=>
	{
		e.preventDefault();
		try
		{
            const myform = new FormData();
            myform.append("cid",catid)
            myform.append("scid",subcatid)
            myform.append("pname",pname)
            myform.append("description",description)
            myform.append("rate",rate)
            myform.append("dis",discount)
            myform.append("stock",stock)
            myform.append("feat",feat)
          
            if(prodpic!==null)
            {
                myform.append("ppic",prodpic)
            }
			const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/saveproduct`,myform,
			{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                   toast.success("Product added successfully")
				//    fetchsubcatbycat();
				   clearfields();
				}
				else
				{
					toast.error("Product not added");					
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
		setpname("");
		setdescrip("");
        setrate("")
        setdiscount("")
        setstock("")
        setfeat("")
		if (fileInputRef.current) 
		{
			fileInputRef.current.value = "";//it will clear only html field
			setprodpic(null);// it will clear file from state variable
		}
		setpicname("");
		setfeat("");
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

	useEffect(()=>
	{
		if(subcatid!=="")
		{
			fetchprodsbysubcat();	
		}
		// else if(catid==="")
		// {
		// 	setsubcatdata([]);
		// }
	},[subcatid])

	const fetchsubcatbycat=async()=>
	{
		try
		{
			const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getsubcatbycatid/${catid}`,
			{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
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

	const fetchprodsbysubcat=async()=>
	{
		try
		{
			const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbysubcat/${subcatid}`,
			{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setprodsdata(apiresp.data.productsdata)
				}
				else
				{
					toast.warning("No products found")
					setprodsdata([]);
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}

	const fetchallcat=async()=>
	{
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`,
			{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setallcat(apiresp.data.catdata)
				}
				else
				{
					setallcat([]);
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

	useEffect(()=>
	{
		fetchallcat();
	},[])

	const ondel=async(prodid)=>
	{
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delprod/?pid=${prodid}`,
				{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
				if(apiresp.status===200)
				{
					if(apiresp.data.code===1)
					{
						toast.success("Product deleted successfully");
						fetchprodsbysubcat();
					}
					else
					{
						toast.error("Product not deleted");
					}
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}

	const onupdate=(prodinfo)=>
	{
		seteditmode(true);
		setpname(prodinfo.prodname)
		setdescrip(prodinfo.description)
		setrate(prodinfo.Rate)
		setdiscount(prodinfo.Discount);
		setstock(prodinfo.Stock);
		setfeat(prodinfo.featured)
		setpicname(prodinfo.picture)
		setprodid(prodinfo._id)
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
			
			formdata.append("pid",prodid)
			formdata.append("cid",catid)
            formdata.append("scid",subcatid)
            formdata.append("pname",pname)
            formdata.append("description",description)
            formdata.append("rate",rate)
            formdata.append("dis",discount)
            formdata.append("stock",stock)
            formdata.append("feat",feat)
			formdata.append("oldpicname",picname)

			if(prodpic!==null)
			{
				formdata.append("ppic",prodpic) // if admin will select new image, then only new image file will be sent to api
			}

			const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/updateproduct`,formdata,
			{headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}})
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					toast.success("Product updated successfully")
					oncancel();
					fetchprodsbysubcat();
				}
				else
				{
					toast.error("Product not updated")
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
				<li className="active">Manage Product</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Product</h2>
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
        </select><br/>

        <select name="subcat" onChange={(e)=>setsubcatid(e.target.value)} className="form-control" value={subcatid}>
            <option value="">Choose Sub Category</option>
            {
                subcatdata.length>0?
                subcatdata.map((data,index)=>
                    <option key={index} value={data._id}>{data.subcatname}</option>
                ):null
            }
        </select><br/>
        
		<input type="text" value={pname} placeholder="Product Name" name="pname" required=" " onChange={(e)=>setpname(e.target.value)}/><br/>

		<ReactQuill
                style={{
                height: '300px',
                width: '100%',
                overflowY: 'auto', // Enables scrollbar when content overflows
                border: '1px solid #ccc', // Optional: to visualize the editor boundaries
                }}
                modules={modules} onChange={setdescrip} value={description}
        /><br/>

		<input type="text" value={rate} placeholder="Rate" name="rate" required=" " onChange={(e)=>setrate(e.target.value)} /><br/>
		<input type="text" value={discount} placeholder="Discount in percent, but do not add percent symbol" name="discount" required=" " onChange={(e)=>setdiscount(e.target.value)} /><br/>
		<input type="text" value={stock} placeholder="Stock" name="stock" required=" " onChange={(e)=>setstock(e.target.value)} /><br/>
        Featured &nbsp;
        <label><input type="radio" name="featured" checked={feat=== "yes"} onChange={(e)=>setfeat(e.target.value)} value="yes"/>Yes</label>&nbsp;
        <label><input type="radio" name="featured" checked={feat=== "no"} onChange={(e)=>setfeat(e.target.value)} value="no"/>No</label><br/><br/>

		{editmode?
		<>
			<img src={`upload/${picname}`} height='75' alt="ProductImage"/>
			Choose new image if required<br/><br/>
			</>:null
		}

        <input type="file" ref={fileInputRef} name="scpic" onChange={(e)=>setprodpic(e.target.files[0])}/>

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
				prodsdata.length>0?
				<>
					<h2>Added Products</h2><br/>
					<table className="timetable_sub">
						<tbody>
							<tr>
								<th>Picture</th>
								<th>Product Name</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
							{
							prodsdata.map((prod,index)=>
								<tr key={index}>
									<td><img alt="prodpic" src={`upload/${prod.picture}`} height='75'/></td>
									<td>{prod.prodname}</td>
									<td><button className="btn btn-primary" onClick={()=>onupdate(prod)}>Update</button></td>
									<td><button className="btn btn-danger" onClick={()=>ondel(prod._id)}>Delete</button></td>
								</tr>
							)
							}<br/>
							{prodsdata.length} products found
						</tbody>
					</table>
				</>:null
			}
			


		</div>
	</div>
        </>
    )
}
export default ManageProduct;
