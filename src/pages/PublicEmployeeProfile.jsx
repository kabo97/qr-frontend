import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import {
  FaLink,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin
} from "react-icons/fa";


export default function PublicEmployeeProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [hideEmpty, setHideEmpty] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await axios.get(`/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        setError("Employee not found.");
        console.error(err);
      }
    }

    fetchEmployee();
  }, [id]);

  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!employee) return <div className="text-center mt-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white flex flex-col items-center relative">
      {/* Header / Banner */}
    <div className="w-full h-40 md:h-48 bg-center bg-cover flex items-center justify-center relative"
     style={{ backgroundImage: "url('/cover2.png')" }}>
        <div className="absolute bottom-[-60px]">
            <img
            src={
                employee.ProfileImage
                ? `http://localhost:5014${employee.ProfileImage}`
                : "/avatar.jpg"
            }  
            alt="Profile"
            className="rounded-full border-4 border-gray-900 w-24 h-24 md:w-28 md:h-28 object-cover"
            />
        </div>
      </div>

      {/* Info Card */}
      <div className="w-full bg-gradient-to-tr from-gray-800 via-gray-900 to-black px-8 py-6 rounded-xl text-center w-[90%] max-w-md shadow-xl">
        <div className="mt-10"></div>
        <h2 className="text-xl font-bold mt-3">{employee.FullName}</h2>
        <p className="text-purple-400 font-medium">{employee.JobTitle}</p>
        <div className="mt-4 flex justify-center gap-4">
        {employee.Email && (
            <a href={`mailto:${employee.Email}`} title="Email">
            <IconCircle icon={<FaEnvelope />} />
            </a>
        )}
        {employee.PhoneNumber && (
            <a href={`tel:${employee.PhoneNumber}`} title="Call">
            <IconCircle icon={<FaPhone />} />
            </a>
        )}
        {employee.WhatsApp && (
            <a href={`${employee.WhatsApp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
            <IconCircle icon={<FaWhatsapp />} />
            </a>
        )}
        </div>


        <div className="mt-6 space-y-4 text-left">
          <LinkButton icon={<FaLink />} label="Website" value={employee.Website} />
          <LinkButton icon={<FaLinkedin />} label="LinkedIn" value={employee.LinkedIn} />
          <LinkButton icon={<FaWhatsapp />} label="WhatsApp" value={employee.WhatsApp} />
          <LinkButton icon={<FaTwitter />} label="X" value={employee.X} />
          <LinkButton icon={<FaFacebook />} label="Facebook" value={employee.Facebook} />
          <LinkButton icon={<FaInstagram />} label="Instagram" value={employee.Instagram} />
          <LinkButton icon={<FaSnapchat />} label="Snapchat" value={employee.Snapchat} />
        </div>
        {employee.Location && (
            <div className="mt-4 flex items-center justify-center text-sm text-gray-300 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                </svg>
                {employee.Location}
            </div>
            )}

        <div className="mt-6 flex justify-center">
            <button
                onClick={() => downloadVCard(employee)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full"
            >
                Add to Contacts
            </button>
        </div>
        <div className="mt-12 flex justify-center gap-8 items-center pb-10">
            <img
                src="/lynk.png"
                alt="LYNK & CO"
                className="h-20 max-w-[120px] brightness-0 invert"
            />
            <img
                src="/aljabr.png"
                alt="Aljabr"
                className="h-9 max-w-[140px] brightness-0 invert"
            />
        </div>



      </div>
    </div>
  );
}

// Circle icon button (for top right of banner)
function IconCircle({ icon }) {
  return (
    <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center shadow-md">
      {icon}
    </div>
  );
}

function LinkButton({ icon, label, value }) {
  if (!value) return null;

  // Color map for real-brand colors
  const brandColors = {
    Website: "#8b5cf6",      // purple
    X: "#1DA1F2",            // Twitter (X)
    Facebook: "#1877F2",
    Instagram: "#E1306C",
    Snapchat: "#FFFC00",
    WhatsApp: "#25D366",
    LinkedIn: "#0077B5"
  };

  const iconColor = brandColors[label] || "#ffffff";

  return (
    <a
      href={value.startsWith("http") ? value : `https://${value}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-gray-800 hover:bg-gray-700 transition-colors px-6 py-4 rounded-xl flex items-center gap-4 shadow-md"
    >
      <span className="text-xl" style={{ color: iconColor }}>{icon}</span>
      <span className="text-base font-semibold text-white">{label}</span>
    </a>
  );
}

function downloadVCard(employee) {
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${employee.FullName}
TITLE:${employee.JobTitle || ""}
TEL;TYPE=WORK,VOICE:${employee.PhoneNumber || ""}
EMAIL;TYPE=PREF,INTERNET:${employee.Email || ""}
URL:${window.location.href}
${employee.WhatsApp ? `item1.URL:${employee.WhatsApp}\nitem1.X-ABLabel:WhatsApp` : ""}
${employee.LinkedIn ? `item2.URL:${employee.LinkedIn}\nitem2.X-ABLabel:LinkedIn` : ""}
${employee.Instagram ? `item3.URL:${employee.Instagram}\nitem3.X-ABLabel:Instagram` : ""}
${employee.Facebook ? `item4.URL:${employee.Facebook}\nitem4.X-ABLabel:Facebook` : ""}
${employee.X ? `item5.URL:${employee.X}\nitem5.X-ABLabel:X` : ""}
END:VCARD
  `.trim();

  const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${employee.FullName.replace(/\s/g, "_")}_contact.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
