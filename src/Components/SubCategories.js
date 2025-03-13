import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const SubCategories = () => 
{
    const[params]=useSearchParams();
    const catid=params.get(`cid`);

    const [subcatdata,setsubcatdata] = useState([]);
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
					setsubcatdata([]);
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
           fetchsubcatbycat();
        },[catid])
    
    return (
        <>
            <div className="login">
                <div className="container">
                {
                    subcatdata.length>0?
                    <>
                    <h2>{subcatdata[0].catid.catname}</h2><br/>
                    {
                     subcatdata.map((scdata,i)=>
                    <div class="col-md-4 top_brand_left" key={i}>
                        <div class="hover14 column">
                            <div class="agile_top_brand_left_grid">
                                <div class="agile_top_brand_left_grid1">
                                    <figure>
                                        <div class="snipcart-item block" >
                                            <div class="snipcart-thumb">
                                            <Link to={`/products?scid=${scdata._id}`}>
                                                <img height='120' title=" " alt=" " src={`upload/${scdata.subcatpic}`} />
                                                <p>{scdata.subcatname}</p>
                                            </Link>	
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                    }</>:<h2>No SubCategories found</h2>
                 }
                </div>
            </div>
        </>
    )
}
export default SubCategories;