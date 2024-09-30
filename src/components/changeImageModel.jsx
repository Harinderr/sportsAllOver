import { useState ,useEffect} from "react";
import { app } from "@/utility/firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";

const ChangeImageModel = ({setIsImgChangerOpen, src, email}) => {
   const storage = getStorage(app);
   const [selectedImage,setSelectedImage] = useState(null)
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
          console.log("there is error upload unsuccess", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);
  
async function changeProfileImage() {
    try {
        if(!url) return 
        const res = await fetch('/api/change-profile-image',{
            method : 'PATCH',
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify({url, email})
        })
        const result = await res.json()
        if(res.ok) console.log(result)
    } catch (error) {
        throw error
    }
}

useEffect(()=> {
setSelectedImage(src)

},[])
  
   
    
  return (
  

    
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-hoverBg rounded-lg shadow-lg p-6 z-10 w-1/3">
          <h2 className="text-2xl font-bold mb-4">Change Profile Image</h2>
          <div className="mb-4">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="flex justify-between flex-col gap-4">
            <div className="flex justify-between">
            <button
              onClick={()=> setIsImgChangerOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <label className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
              Upload/Change Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            </div>
            <div className="">
                <button onClick={changeProfileImage} className="bg-blue-700 w-full hover:bg-blue-400 text-white px-4 py-2 rounded">Set as Profile</button>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export default ChangeImageModel








