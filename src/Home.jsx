import React, { useState } from 'react';
import { Icon } from '@iconify/react';
 

const ImageGallery = () => {
  const images = [
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
    'https://placekitten.com/300/200',
    'https://placekitten.com/300/201',
    'https://placekitten.com/300/202',
    'https://placekitten.com/300/203',
    'https://placekitten.com/300/204',
    'https://placekitten.com/300/205',
  ];
 

  // sharing using Web share Api
  const handleShare = async (imageUrl) => {
    try {
      if (navigator.share) {
        // If Web Share API is supported, use it
        // if navigator.share exists then web share api is supported
        await navigator.share({
          title: 'Image Share',
          text: 'Check out this image!',
          url: imageUrl,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const dummyInput = document.createElement('input');
        document.body.appendChild(dummyInput);
        dummyInput.value = imageUrl;
        dummyInput.select();
        document.body.removeChild(dummyInput);
  
        // Inform the user that the link has been copied to the clipboard
        alert('Image URL has been copied to the clipboard. You can manually share it.');
      }
    } catch (error) {
      // Handle any errors that may occur during sharing
      console.error('Error sharing image:', error);
    }
  };
  

  const handleDownload = async (imageUrl, index) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob(); // converting imageurl to blob(binary large object) ; representation of binary raw data
      const url = window.URL.createObjectURL(blob); // converting to a temporary url that can be used for download

      const a = document.createElement('a');
      a.href = url;
      a.download = `Image${index + 1}.jpg`;
      a.click();

      window.URL.revokeObjectURL(url); // free up the memory space by releasing the memory associated with temporaraya url
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };


  return (
    <div className="container mx-auto mt-12 mb-12 px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-2xl relative">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          <div  >
        <div className='p-2 flex flex-row w-1/3 ml-auto'>
        <Icon
                  icon="majesticons:share"
                  onClick={() => handleShare(image)}
                  color="black"
                  className='cursor-pointer text-2xl flex ml-auto'
                />

          <Icon
           icon="solar:download-broken"
           onClick={() => handleDownload(image, index)} 
           color="black"
           className='cursor-pointer text-2xl flex ml-auto'
            />
            </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
