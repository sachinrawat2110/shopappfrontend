import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Listuser = () => {
    const [userdata, setuserdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = userdata.slice(indexOfFirstProduct, indexOfLastProduct);

    const fetchuser = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_APIURL}/api/alluser`);

            if (data.code === 1) {
                setuserdata(data.membsdata);
            } else {
                toast.error('No members found');
                setuserdata([]);
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        fetchuser();
    }, []);

    const ondel = async (id) => {
        try {
            const uchoice = window.confirm("Are you sure to Delete?");
            if (uchoice) {
                const { data } = await axios.delete(`${process.env.REACT_APP_APIURL}/api/deluser?uid=${id}`);
                if (data.code === 1) {
                    toast.success("User deleted successfully");
                    fetchuser(); // Refresh the list after delete
                } else {
                    toast.error("User not deleted");
                }
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <div className="login">
                <div className="container">
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        {currentProducts.length > 0 ? (
                            <>
                                <h2>List Of Users</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Username</th>
                                            <th>Delete</th>
                                        </tr>
                                        {currentProducts.map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.name}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.emailid}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => ondel(data._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table><br />
                                <div>
                                    <button className="btn btn-primary"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span> Page {currentPage} of {Math.ceil(userdata.length / productsPerPage)} </span>
                                    <button className="btn btn-primary"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(userdata.length / productsPerPage)}>
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <h2>No User Found</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Listuser;
