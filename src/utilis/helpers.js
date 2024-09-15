export default function truncateText(text, length) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

// Define the cropImageToSquare function at the top of your file

export function formatNumber(value) {
  // Ensure the value is a number
  const number = Number(value);
  if (isNaN(number)) return value;

  // Convert to string and use regular expression to add commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
