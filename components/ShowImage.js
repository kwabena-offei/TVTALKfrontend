import Image from "next/image";

/**
 * Utility function to normalize image URIs
 */
function getImageUrl(uri) {
  if (!uri) return '/assets/live.jpg';
  if (uri.startsWith('http')) return uri;
  if (uri.startsWith('/')) return uri;
  return `https://${uri}`;
}

export default function ShowImage({ 
  src,
  title,
  alt,
  width = 720,
  height = 540,
  layout = "responsive",
  quality = 75,
  loading = "lazy",
  ...props 
}) {
  // Use explicit alt if provided, otherwise generate from title
  const altText = alt || (title ? `${title} Image` : "TV Show Image");
  
  return (
    <Image
      src={getImageUrl(src)}
      alt={altText}
      width={width}
      height={height}
      layout={layout}
      quality={quality}
      loading={loading}
      {...props}
    />
  );
}

