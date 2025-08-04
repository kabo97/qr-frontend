import { useState } from "react";
import axios from "axios";

export default function CreateEmployee() {
  const [employee, setEmployee] = useState({
    fullName: "",
    jobTitle: "",
    phoneNumber: "",
    email: "",
    website: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://your-backend-url/api/employees", employee);
    alert("Created! QR code at: " + res.data.profileUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Full Name" onChange={e => setEmployee({...employee, fullName: e.target.value})} />
      <input placeholder="Job Title" onChange={e => setEmployee({...employee, jobTitle: e.target.value})} />
      {/* Add more inputs... */}
      <button type="submit">Create</button>
    </form>
  );
}
