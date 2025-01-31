import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file input change (when user selects an image)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      // Generate a preview URL for the uploaded image
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission (send image to backend)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Upload Image</h1>

      {/* Image upload form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center">
          <label
            htmlFor="image-upload"
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Select Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Image preview */}
        {preview && (
          <div className="text-center">
            <img
              src={preview}
              alt="Image preview"
              className="max-w-full h-auto rounded-md border-2 border-gray-300"
            />
          </div>
        )}

        {/* Submit button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
