import axios from "axios";
import {useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Details = () => {
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const [pdata, setpdata] = useState({});
    const [remamt,setremamt] = useState();
    const [qty,setqty] = useState();
    const [availstock,setavailstock] = useState([]);
    const {uname} = useSelector((state)=>state.auth)
    const navigate = useNavigate();

    const fetchproddetails = async () => {
        try {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getproddetails/${prodid}`)
            if (apiresp.status === 200) {
                if (apiresp.data.code === 1)
                {
                    setpdata(apiresp.data.proddata)
                }
                else {
                    toast.warning("No Details found")
                    setpdata({});
                }
            }
        }
        catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        fetchproddetails();
    }, [prodid])

    const cart=()=>
    {
        navigate("/cart")
    }
    useEffect(()=>
    {
        const disamt = (pdata.Rate*pdata.Discount)/100
        setremamt(pdata.Rate-disamt);

        var quantity=[];
        if(pdata.Stock>10)
        {
            for(var x=1;x<=10;x++)
            {
                quantity.push(x);
            }
        }
        else
        {
            for(var x=1;x<=pdata.Stock;x++)
            {
                quantity.push(x);
            }
        }
        setavailstock(quantity)
    },[pdata])

    const savetocart=async(e)=>
    {
        e.preventDefault();
        if(uname==="")
        {
            toast.info("Please login to add to cart");
            navigate("/login",{ state: { from: window.location.pathname + window.location.search } });
        }
        else
        {
            try
            {
                var tc=remamt*qty;
                const cartdata = {prodid,pic:pdata.picture,pname:pdata.prodname,rate:remamt,qty,tc,uname}
                const apiresp = await axios.post(`http://localhost:9000/api/addtocart`,cartdata)
                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        navigate("/showcart")
                    }
                    else
                    {
                        toast.error("Problem while adding to cart, try again")
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
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Product Details</li>
			</ol>
                </div>
            </div>
            <div className="products">
                <div className="container">
                    <div className="agileinfo_single">

                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`upload/${pdata.picture}`} alt=" " className="img-responsive" />
                        </div>
                        <div className="col-md-8 agileinfo_single_right">
                            <h2>{pdata.prodname}</h2>

                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p dangerouslySetInnerHTML={{ __html: pdata.description }}/>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">₹{remamt}/- <span>₹{pdata.Rate}/-</span></h4>
                                </div>
                                <div className="snipcart-details agileinfo_single_right_details">
                                    <form method="post" onSubmit={savetocart}>
                                        <fieldset>
                                        <select name="qty" className="form-control" onChange={(e)=>setqty(e.target.value)}>
                                                <option value="">Choose Quantity</option>
                                                {
                                                    availstock.length>0?
                                                    availstock.map((data,i)=>
                                                    <option key={i}>{data}</option>
                                                    ):<option value="">No Stock available</option>
                                                }
                                            </select><br/>
                                            <input type="submit" name="submit" value="Add to cart" className="button" onClick={cart}/>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Details;