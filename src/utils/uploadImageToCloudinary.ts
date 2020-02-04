export default async (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    const files = e.target.files;
    const form = new FormData();
    if (files) form.append('file', files[0]);

    form.append('upload_preset', process.env.CLOUDINARY_PRESET as string);
    const response = await fetch(process.env.CLOUDINARY_UPLOAD_URL as string, {
      method: 'POST',
      body: form
    });
    const file = await response.json();
    return file;
  } catch (error) {
    console.error(error);
  }
};
