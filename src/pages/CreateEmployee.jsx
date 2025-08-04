import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeWithLogo from "../components/QRCodeWithLogo";

export default function CreateEmployee() {
  const [employee, setEmployee] = useState({
    FullName: "",
    JobTitle: "",
    PhoneNumber: "",
    Email: "",
    Website: "",
    Facebook: "",
    Instagram: "",
    Snapchat: "",
    WhatsApp: "",
    X: "",
    LinkedIn: "",
    ProfileImage: "",
    Location: ""
  });

  const [createdId, setCreatedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/Employees/generate-url", employee);
      const id = res.data.id;
      setCreatedId(id);

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        await axios.post(`/employees/upload-image/${id}`, formData);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create employee.");
    }
  };

  const profileUrl = `${window.location.origin}/view-employee/${createdId}`;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Create Employee Profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {[
          "FullName",
          "JobTitle",
          "PhoneNumber",
          "Email",
          "Website",
          "Facebook",
          "Instagram",
          "Snapchat",
          "WhatsApp",
          "X",
          "LinkedIn",
          "Location"
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={employee[field]}
            onChange={handleChange}
            className="p-2 bg-gray-800 rounded"
            required={["FullName", "JobTitle", "Email"].includes(field)}
          />
        ))}

        {/* Upload Image Field */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm text-gray-400">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-800 p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-purple-600 p-2 rounded hover:bg-purple-700 transition"
        >
          Create + Generate QR
        </button>
      </form>

      {createdId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">QR Code:</h3>
          <QRCodeWithLogo url={profileUrl} />          
          <p className="mt-2 text-sm break-all">{profileUrl}</p>
        </div>
      )}
    </div>
  );
}
