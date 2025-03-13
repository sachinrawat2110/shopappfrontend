import Listuser from "./Listuser";
import Login from "./Login"
import Search from "./Search";
import Signup from "./Signup";
import Admin from "./Admin";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import ManageCategory from "./ManageCategory";
import Rnap from "./Rnap";
import Submanagecat from "./Submanagecat";
import Manageproduct from "./Manageproduct";
import Changepass from "./Changepass";
import Adminheader from "./Adminheader";
import Createadmin from "./Createadmin";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Products from "./Products";
import Details from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Ordersummary from "./Ordersummary";
import Searchprods from "./Searchprods";
import Vieworder from "./Vieworder";
import Orderold from "./Orderold";
import Orderitems from "./Orderitems";
import Updatestatus from "./Updatestatus";
import Comments from "./Comments";
import Contact from "./Contact";
import Forgotpass from "./Forgotpass";
import Resetpass from "./Resetpass";
import AccActivate from "./AccActivate";
import Mycookies from "./Mycookies";


var Routing=()=>
{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/adminhome" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/listuser" element={<Listuser/>}/>
            <Route path="/ManageCategory" element={<ManageCategory/>}/>
            <Route path="/SubmanageCat" element={<Submanagecat/>}/>
            <Route path="/Rnap" element={<Rnap/>}/>
            <Route path="/Manageproduct" element={<Manageproduct/>}/>
            <Route path="/Createadmin" element={<Createadmin/>}/>
            <Route path="/changepass" element={<Changepass/>}/>
            <Route path="/Adminheader" element={<Adminheader/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/subcategories" element={<SubCategories/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/details" element={<Details/>}/>
            <Route path="/showcart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/ordersummary" element={<Ordersummary/>}/>
            <Route path="/searchresults" element={<Searchprods/>}/>
            <Route path="/vieworder" element={<Vieworder/>}/>
            <Route path="/orderold" element={<Orderold/>}/>
            <Route path="/orderitems" element={<Orderitems/>}/>
            <Route path="/updatestatus" element={<Updatestatus/>}/>
            <Route path="/comments" element={<Comments/>}/>
            <Route path="/contactus" element={<Contact/>}/>
            <Route path="/forgotpass" element={<Forgotpass/>}/>
            <Route path="/resetpassword" element={<Resetpass/>}/>
            <Route path="/activate" element={<AccActivate/>}/>
            <Route path="/cookies" element={<Mycookies/>}/>

        </Routes>
        </>
    )
}
export default Routing;