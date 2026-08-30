import { useState } from "react";
import { FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

     const response = await api.post("/upload-resume", formData);

      toast.success(response.data.message);
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">

      <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-xl p-8">

        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          📄 Upload Resume
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Upload your latest resume in PDF format.
        </p>

        {/* Upload Box */}
        <label className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-cyan-500 rounded-2xl p-10 cursor-pointer hover:bg-slate-700 transition">

          <FaCloudUploadAlt className="text-6xl text-cyan-400 mb-4" />

          <span className="text-white font-medium">
            Click to choose a PDF
          </span>

          <span className="text-gray-400 text-sm mt-2">
            PDF files only
          </span>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

        </label>

        {/* Selected File */}
        {file && (
          <div className="bg-slate-700 rounded-xl p-4 mt-6 flex items-center gap-4">

            <FaFilePdf className="text-red-500 text-3xl" />

            <div>
              <p className="text-white font-semibold">
                {file.name}
              </p>

              <p className="text-gray-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

      </div>

    </div>
  );
}

export default UploadResume;