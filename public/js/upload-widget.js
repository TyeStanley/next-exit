const cloudName = 'next-exit'; // replace with your own cloud name
const uploadPreset = 'next_exit_profile_pics'; // replace with your own upload preset

//   https://cloudinary.com/documentation/upload_widget_reference

async function updateProfilePicture(newUrl) {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      newUrl
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    console.log('Updated');
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multiple: false, //restrict upload to a single file
    cropping: true //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info);
      document
        .getElementById('profile-image')
        .setAttribute('src', result.info.secure_url);

      updateProfilePicture(result.info.secure_url);
    }
  }
);

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);
