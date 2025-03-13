import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [cpverif, setcpverif] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!cpverif) {
      toast.warn("Captcha Verification Failed");
      return;
    }

    try {
      setLoading(true); // Show spinner

      const apidata = { name, phone, email, msg: message };
      const apires = await axios.post(`${process.env.REACT_APP_APIURL}/api/contactus/`, apidata);

	  if(apires.status===200)
	  {
		  toast.success("Email Sent Succesfully")
	  }
	  else {
        toast.error("Some error occurred");
      }
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const gcaptchaonchange = (value) => {
    setcpverif(value !== null);
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <h2>Contact Form</h2>

          <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
            <form onSubmit={onsubmit}>
              <input type="text" placeholder="Name" required onChange={(e) => setname(e.target.value)} />
              <input type="text" placeholder="Phone number" required onChange={(e) => setphone(e.target.value)} />
              <input type="email" placeholder="Email Address" required onChange={(e) => setemail(e.target.value)} />
              <br />
              <textarea className="form-control" placeholder="Message" onChange={(e) => setmessage(e.target.value)}></textarea>

              <ReCAPTCHA sitekey="6Ldm9ucqAAAAAFCfWc6dgWAi-k19db8a_W7OhHYQ" onChange={gcaptchaonchange} />

              {/* Spinner and Submit Button */}
              {loading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <input type="submit" value="Submit" disabled={loading} />
              )}
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Contact;
