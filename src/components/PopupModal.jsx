"use client";
import { useEffect, useState } from "react";
import * as Yup from 'yup'

export default function Modal({ setIsOpen ,email}) {
  const [existingPass, setExistingPass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState({})
  const validationSchema = Yup.object({
    existingPass: Yup.string().required('existing password is required'),
    newPass : Yup.string().required('New password is required'),
    confirmNewPass : Yup.string().oneOf([Yup.ref('newPass'), null], 'confirm password must match with new Password').required('confirm password is required')
        
    })

  async function handleChangePass() {
   
    try {
      const valid = await validationSchema.validate({newPass, existingPass, confirmNewPass}, {abortEarly:false})
      if (valid){
      const response = await fetch("/api/change-pass", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ existingPass, newPass, confirmNewPass,email }),
      });
      setIsOpen(false)
      if (response.ok) {
        const res = await response.json()
        console.log(res.message);
      }}
    
    } catch (error) {
      const err = {}
       error.inner.forEach(e => {
         err[e.path]= e.message
        
      });
      setError(err)
    }
  }

 
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-hoverBg p-6 rounded-lg shadow-lg w-2/3">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form action="" className="flex flex-col gap-2">
            <label htmlFor="exitingPass text-sm">Existing Password</label>
            <input
              onChange={(e) => setExistingPass(e.target.value)}
              placeholder="Enter existing password"
              id="existingPass"
              className="rounded-lg p-3 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              required
            />
            {error?.existingPass && <div className="text-red-500 text-xs">{error.existingPass}</div>}
            <label htmlFor="newPass text-sm">New Password</label>
            <input
              onChange={(e) => setNewpass(e.target.value)}
              placeholder="Enter new password"
              id="newPass"
              className="rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              required
            />
            {error?.newPass && <div className="text-red-500 text-xs">{error.newPass}</div>}
            <label htmlFor="confirmPass text-sm">Confirm new Password</label>
            <input
              onChange={(e) => setConfirmNewPass(e.target.value)}
              placeholder="Confirm new password"
              id="confirmPass"
              className="rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              required
            />
            {error?.confirmNewPass && <div className="text-red-500 text-xs">{error.confirmNewPass}</div>}
          </form>
          <div className="buttonwrapper flex justify-between">
            <button
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button onClick={()=> handleChangePass()} className="bg-blue-500 mt-4 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
