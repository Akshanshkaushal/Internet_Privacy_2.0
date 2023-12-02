import React, { useState } from 'react';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
     
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
  
    //Upload logic

    if (selectedImage) {
      console.log('Selected Image:', selectedImage);
    } else {
      console.error('No image selected.');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
        Select Image
      </label>
      <input
        type="file"
        id="image"
        onChange={handleImageChange}
        className="border rounded py-2 px-3 w-full"
      />

      <div className="mt-4">
        {selectedImage && (
          <div>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="mt-2 mb-4 rounded"
              style={{ maxWidth: '100%' }}
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Upload Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
