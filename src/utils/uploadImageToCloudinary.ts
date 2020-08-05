const uploadImageToCloudinary = async (base64: string) => {
  try {
    const file = new File([base64], 'name');
    const form = new FormData();
    form.append('file', file);

    form.append('upload_preset', process.env.CLOUDINARY_PRESET as string);
    const response = await fetch(process.env.CLOUDINARY_UPLOAD_URL as string, {
      method: 'POST',
      body: form,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default uploadImageToCloudinary;
