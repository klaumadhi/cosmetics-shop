export default function truncateText(text, length) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

// Define the cropImageToSquare function at the top of your file
function cropImageToSquare(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height); // Square size (smaller of width or height)
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = size;
        canvas.height = size;

        // Draw the square crop from the center of the image
        ctx.drawImage(
          img,
          (img.width - size) / 2, // Source x
          (img.height - size) / 2, // Source y
          size, // Source width
          size, // Source height
          0, // Destination x
          0, // Destination y
          size, // Destination width
          size // Destination height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], imageFile.name, {
              type: imageFile.type,
              lastModified: Date.now(),
            });
            resolve(croppedFile);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        }, imageFile.type);
      };
      img.src = event.target.result;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile);
  });
}

export function formatNumber(value) {
  // Ensure the value is a number
  const number = Number(value);
  if (isNaN(number)) return value;

  // Convert to string and use regular expression to add commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
