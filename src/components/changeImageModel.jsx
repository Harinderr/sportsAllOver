import { useState ,useEffect} from "react";
import { app } from "@/utility/firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import Image from "next/image";

const ChangeImageModel = ({setIsImgChangerOpen, src, email}) => {
   const storage = getStorage(app);
   const [selectedImage,setSelectedImage] = useState(null)
   const [loading, setLoading] = useState(false)
   const [uploading, setUploading] = useState(false)
   const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const upload = () => {
      setUploading(true)
      let time = new Date();
      let filename = time.getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setUploading(false)
          console.log("there is error upload unsuccess", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUploading(false)
            setUrl(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);
  
async function changeProfileImage() {
    try {
      setLoading(true)
        if(!url) return 
        const res = await fetch('/api/change-profile-image',{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify({url, email})
        })
        const result = await res.json()
        if(res.ok) setLoading(false)
    } catch (error) {
  setLoading(false)
        throw error
    }
}

useEffect(()=> {
setSelectedImage(src)

},[])
  
   
    
  return (
  

    
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-hoverBg rounded-lg shadow-lg p-6 z-10 xl:w-2/5 sm:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Change Profile Image</h2>
          <div className="mb-4">
            {selectedImage ? (
              <div className="relative w-44 h-44 border-8 mx-auto border-white rounded-full">
              <Image
                src={src}
                alt="Selected Profile"
                objectFit="cover"
                 layout="fill"
                className=" rounded-full "
              />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="flex justify-between flex-col gap-4">
            <div className="flex justify-between sm:flex-row flex-col gap-3">
            <button
              onClick={()=> setIsImgChangerOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <label className="bg-blue-700 text-white px-4 py-2  rounded cursor-pointer">
            {uploading ? 'Uploading' : 'Upload/Change Image'}  
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            </div>
            <div className="">
                <button onClick={changeProfileImage} disabled={loading} className="bg-blue-700 w-full disabled:opacity-40 hover:bg-blue-400 text-white px-4 py-2 rounded">{loading ? 'Setting Profile...':'Set as Profile'}</button>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export default ChangeImageModel








