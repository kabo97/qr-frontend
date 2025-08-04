import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRCodeWithLogo({ url, id }) {
  const qrInstance = useRef(null);

  useEffect(() => {
    if (!url) return;

    qrInstance.current = new QRCodeStyling({
      width: 280,
      height: 280,
      data: url,
      image: "/combined.png",
      dotsOptions: {
        color: "#000000",
        type: "square"
      },
      backgroundOptions: {
        color: "#ffffff"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: 0.5,
        margin: 1
      }
    });
  }, [url]);

  const handleDownload = () => {
    qrInstance.current?.download({
      extension: "png",
      name: `employee_${id}_qr`
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
    >
      Download QR Code
    </button>
  );
}
