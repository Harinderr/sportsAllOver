import { clsx } from "clsx";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertTime(date) {
  const now = new Date();
  const secondsPast = Math.floor((now - new Date(date)) / 1000);

  if (secondsPast < 60) {
    return `${secondsPast} second${secondsPast !== 1 ? 's' : ''} ago`;
  } else if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (secondsPast < 2592000) { // 30 days
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (secondsPast < 31536000) { // 12 months
    const months = Math.floor(secondsPast / 2592000);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(secondsPast / 31536000);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}

export function checkBookmark(arr,val) {
 
  const item = arr?.filter(i =>{
    
    return i.postId === val}
    )

  if(item.length) {
    return true
  }
  return false
}

export async function deleteImagesFromFirebase(imageUrls) {
  const storage = getStorage(app);

  const deletionPromises = imageUrls.map(async (url) => {
    const imageRef = ref(storage, url);
    try {
      await deleteObject(imageRef);
      console.log(`Deleted image: ${url}`);
    } catch (error) {
      console.error(`Error deleting image: ${url}`, error);
    }
  });

  // Wait for all images to be deleted
  await Promise.all(deletionPromises);
}