import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => 
{
    const[params]=useSearchParams();
    const subcatid=params.get(`scid`);

    const [prodsdata,setprodsdata] = useState([]);
    const fetchprodsbysubcat=async()=>
	{
		try
		{
			const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getprodsbysubcat/${subcatid}`)
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

        useEffect(()=>
        {
            fetchprodsbysubcat();
        },[subcatid])
    
    return (
        <>  
            <div className="login">
                <div className="container">
                {
                    prodsdata.length>0?
                    <>
                    <h2>{prodsdata[0].subcatid.subcatname}</h2><br/>
                    {
                     prodsdata.map((pdata,i)=>
                    <div class="col-md-4 top_brand_left" key={i}>
                        <div class="hover14 column">
                            <div class="agile_top_brand_left_grid">
                                <div class="agile_top_brand_left_grid1">
                                    <figure>
                                        <div class="snipcart-item block" >
                                            <div class="snipcart-thumb">
                                            <Link to={`/details?pid=${pdata._id}`}>
                                                <img height='120' title=" " alt=" " src={`upload/${pdata.picture}`} />
                                                <p>{pdata.prodname}</p>
                                            </Link>	
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    }</>:<h2>No Products found</h2>
                 }
                </div>
            </div>
        </>
    )
}
export default Products;