import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { encryptPassword } from "../utils/encryptionutils";
import { Oval } from 'react-loader-spinner';

const Signup = () => {
    const [pname, setPname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const errors = {};

        if (pname.trim().length < 3) {
            errors.pname = 'Name must be at least 3 characters long';
        }

        if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone must be a 10-digit number';
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Invalid email format';
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(pass)) {
            errors.pass =
                'Password must contain at least 1 uppercase, 1 number, 1 special character, and be at least 6 characters long';
        }

        if (pass !== cpass) {
            errors.cpass = 'Passwords do not match';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const onSignup = async (e) => {
        e.preventDefault(); // Prevent form reload

        if (validateForm()) {
            if (!terms) {
                toast.warning("Please accept terms and conditions");
                return;
            }

            try {
                setLoading(true);
                const { encryptedData, iv } = await encryptPassword(pass);

                const signupdata = { pname, phone, email, pass: encryptedData, iv };
                const apires = await axios.post(`${process.env.REACT_APP_APIURL}/api/signup`, signupdata);

                if (apires.status === 200 && apires.data.code === 1) {
                    toast.success('Signup Successfully');
                    toast.info('Please Acctivate your Account . Check your Mail.')
                } else {
                    toast.error("Error in signup");
                }
            } catch (e) {
                toast.error(e.response?.data?.message || e.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="register">
            <div className="container">
                <h2>Signup Here</h2>
                <div className="login-form-grids">
                    <h5>Profile Information</h5><br />
                    <form onSubmit={onSignup}>
                        <input type="text" placeholder="First Name..." value={pname} onChange={(e) => setPname(e.target.value)} />
                        {errors.pname && <span>{errors.pname}</span>}
                        
                        <input type="number" placeholder="Phone no..." value={phone} onChange={(e) => setPhone(e.target.value)} /> <br /><br />
                        {errors.phone && <span>{errors.phone}</span>}

                        <h3>Login Information</h3><br />
                        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span>{errors.email}</span>}
                        
                        <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                        {errors.pass && <span>{errors.pass}</span>}
                        
                        <input type="password" placeholder="Password Confirmation" value={cpass} onChange={(e) => setCpass(e.target.value)} />
                        {errors.cpass && <span>{errors.cpass}</span>}
                        
                        <div className="register-check-box">
                                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} /> I accept the terms and conditions
                        </div><br/>
                        
                        <button type="submit">Signup</button>
                    </form>
                </div>
                {loading && (
                    <div className="spinner-overlay">
                        <Oval color="#00BFFF" height={100} width={100} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
