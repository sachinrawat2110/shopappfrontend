import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Ordersummary = () => {
    const {uname} = useSelector((state)=>state.auth)
    const [orderinfo, setorderinfo] = useState({});
    const [orderitems, setorderitems] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    const fetchorderdetails = async () => {
        try {
            setLoading(true); // Start loading
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorderdetails?un=${uname}`);
            if (apiresp.status === 200) {
                if (apiresp.data.code === 1) {
                    setorderinfo(apiresp.data.orderdet);
                    setorderitems(apiresp.data.orderdet.items);
                    toast.Success('We Have Sent You an Email Please Check It.');
                } else {
                    toast.error("No order details found");
                }
            } else {
                toast.error("Some error occurred, try again");
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        if (uname!== "") {
            fetchorderdetails();
        }
    }, [uname]);

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order Summary</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Order Summary</h2><br />
                    
                    {loading ? (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                            <p>Please Wait a Minute....</p>
                        </div>
                    ) : (
                        <>
                            <p><b>Thanks for shopping on our website. Your order number is {orderinfo._id}</b></p>
                            <p><b>Your order status is {orderinfo.status}</b></p><br />
                            <h3>Order Items:</h3>
                            {orderitems.length > 0 ? (
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Rate</th>
                                            <th>Quantity</th>
                                            <th>Total Cost</th>
                                        </tr>
                                        {orderitems.map((data, i) => (
                                            <tr key={i}>
                                                <td><img src={`upload/${data.picture}`} height='75' alt="Product" /></td>
                                                <td>{data.prodname}</td>
                                                <td>₹{data.rate}/-</td>
                                                <td>{data.qty}</td>
                                                <td>₹{data.totalcost}/-</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
                        </>
                    )}
                </div>
            </div>

        </>
    );
};

export default Ordersummary;
