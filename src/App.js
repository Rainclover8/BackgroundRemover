import React, { useState } from "react";
import axios from "axios";

function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const apiKey = "3Yg7WEdzqzNRZwQi9VDWiybs";

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setProcessedImage(null);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    axios
      .post(`https://api.remove.bg/v1.0/removebg`, formData, {
        headers: {
          "X-Api-Key": apiKey,
        },
        responseType: "blob",
      })
      .then((response) => {
        const imageURL = URL.createObjectURL(response.data);
        setProcessedImage(imageURL);
        setDownloadUrl(imageURL);
      })
      .catch((error) => console.error("Hata:", error));
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "background_removed_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="d-flex flex-column">
      <input type="file" onChange={handleFileChange} className="border-0 w-50 p-4 rounded-5 mt-2 mx-auto" />
      <button onClick={handleUpload} className="border-0 w-50 p-4 rounded-5 mt-2 mx-auto">Arka Planı Kaldır</button>
      {processedImage && (
        <div>
          <img src={processedImage} alt="Processed" className="border-0 w-50 mt-2 mx-auto" />
          <button onClick={handleDownload} className="border-0 w-50 p-4 rounded-5 mt-2 mx-auto">Resmi İndir</button>
        </div>
      )}
    </div>
  );
}

export default BackgroundRemover;
