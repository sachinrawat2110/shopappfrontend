import { Link } from "react-router-dom";
import useFetchcategory from "./useFetchcategory";

const Categories = () => 
{
    const { allcat, fetchAllCat } = useFetchcategory();

    return (
        <>
            <div className="login">
                <div className="container">
                <h2>Categories</h2><br/>
                {
                    allcat.length>0?
                    allcat.map((cdata,i)=>
                    <div class="col-md-4 top_brand_left" key={i}>
                        <div class="hover14 column">
                            <div class="agile_top_brand_left_grid">
                                <div class="agile_top_brand_left_grid1">
                                    <figure>
                                        <div class="snipcart-item block" >
                                            <div class="snipcart-thumb">
                                            <Link to={`/subcategories?cid=${cdata._id}`}>
                                                <img height='120' title=" " alt=" " src={`upload/${cdata.catpic}`} />
                                                <p>{cdata.catname}</p>
                                            </Link>	
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    ):null
                }
                </div>
            </div>
        </>
    )
}
export default Categories;