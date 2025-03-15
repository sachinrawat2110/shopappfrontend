import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Listuser = () => {
    const [userdata, setuserdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = userdata.slice(indexOfFirstProduct, indexOfLastProduct);

    const fetchuser = async () => {
        try {
            const apires = await fetch(`${process.env.REACT_APP_APIURL}/api/alluser`, 
            {
                headers: { authorization: `Bearer ${sessionStorage.getItem("jtoken")}` }
            });
            if (apires.ok)
             {
                const result = await apires.json();
                if (result.code === 1)
                 {
                    setuserdata(result.membsdata);
                } else
                 {
                    toast.error('No members found');
                    setuserdata([]);
                }
            } else {
                toast.warning("Some error occurred, oops!");
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
                const apires = await fetch(`${process.env.REACT_APP_APIURL}/api/deluser?uid=${id}`, {
                    method: "DELETE"
                });
                if (apires.ok) {
                    const result1 = await apires.json();
                    if (result1.code === 1) {
                        toast.success("User deleted successfully");
                        fetchuser();
                    } else {
                        toast.error("User not deleted");
                    }
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
                                <h2>List User</h2>
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
                                </table>
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
