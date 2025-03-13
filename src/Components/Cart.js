import axios from "axios";
import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Cart=()=>
{
    const [cartdata,setcartdata] = useState([]);
    const [billamt,setbillamt] = useState();
    const navigate = useNavigate();
    const {uname} = useSelector((state)=>state.auth)

	const fetchcart=async()=>
	{
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getusercart/${uname}`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setcartdata(apiresp.data.usercart)
				}
				else
				{
                    setcartdata([]);
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
        if(uname!=="")
        {
            fetchcart();
        }
    },[uname])
    
	const ondel=async(id)=>
	{
		try
        {
            const uchoice = window.confirm("Are you sure to delete item from your cart?")
            if(uchoice===true)
            {
                const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcartitem?id=${id}`)
                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        toast.success("Item deleted from your cart");
                        fetchcart();
                    }
                    else
                    {
                        toast.error("Item not deleted from your cart");
                    }
                }
            }
        }
        catch(e)
        {
            toast.error(e.message)
        }
	}

    useEffect(()=>
    {
        if(cartdata.length>0)
        {
            var cartsum=0;
            for(var x=0;x<cartdata.length;x++)
            {
                //cartsum+=cartdata[x].totalcost
                cartsum=cartsum+cartdata[x].totalcost//200+450=650
            }
            setbillamt(cartsum)
        }
    },[cartdata])

    useEffect(()=>
    {
        sessionStorage.setItem("billamt",billamt)
        sessionStorage.setItem("cartitems", JSON.stringify(cartdata));
    },[billamt])

    const oncheckout=()=>
    {
        navigate("/checkout")
    }
    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Your shopping cart</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			{
                cartdata.length>0?
                <>
                    <h2>Your Cart</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Rate</th>
                                <th>Quantity</th>
                                <th>Total Cost</th>
                                <th>Delete</th>
                            </tr>
                            {
                                cartdata.map((data,i)=>
                                    <tr key={i}>
                                        <td><img src={`upload/${data.picture}`} height='75'/></td>
                                        <td>{data.prodname}</td>
                                        <td>₹{data.rate}/-</td>
                                        <td>{data.qty}</td>
                                        <td>₹{data.totalcost}/-</td>
                                        <td><button className="btn btn-danger" onClick={()=>ondel(data._id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        {cartdata.length} items in your cart <br/>
                        ₹{billamt}/- is your total bill amount<br/><br/>
                        <button className="btn btn-primary" onClick={oncheckout}>Checkout</button>

                        </tbody>
                    </table>
                </>:<h2>Your shopping cart is empty.</h2>
            }
		</div>
	</div>
        </>
    )
}
export default Cart;