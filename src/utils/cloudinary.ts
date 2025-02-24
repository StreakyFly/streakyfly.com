/**
 * Get the Cloudinary image URL for a given public ID.
 * Specifically optimized for OpenGraph images.
 * @param publicId
 */
export function getCloudinaryImageUrl(publicId: string): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const transformations = 'w_1200,h_630,c_fill,f_auto,q_auto';  // Optimize for OpenGraph
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
