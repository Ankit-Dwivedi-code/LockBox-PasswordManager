import React, { useRef, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    // if (form.site.length === 0 || form.username.length === 0 || form.password === "") {
    //   alert("All field are required")
    // }
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!📋", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    //   alert("Show")
    console.log(ref.current.src);
    ref.current.src = ref.current.src.includes("/view.png")
      ? "/hide.png"
      : "/view.png";
    passwordRef.current.type = passwordRef.current.type.includes("password")
      ? "text"
      : "password";
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      
      console.log(form);
      setPasswordArray([...passwordArray, {...form, id : uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id : uuidv4()}]));
    // console.log(passwordArray);
    console.log([...passwordArray, form]);
    setForm({ site: "", username: "", password: "" })
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else{
    toast("Error : All fields are required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  };

  const deletePassword = (id) => {
    console.log("Deleting the password whose id is", id);
    let c = confirm("Do you really want to delete your password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item=>item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)));
      toast("Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing the password whose id is", id);
    setForm(passwordArray.filter(item=>item.id === id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id !== id))
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition="Bounce"/>
    <ToastContainer />
      <div className="fixed inset-0 z-[-2] w-screen h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <div className="md:mycontainer p-2 md:p-0 text-white">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-amber-400">&lt;</span>
          Lock
          <span className="text-amber-400">Box/&gt;</span>
        </h1>
        <p className="text-amber-300 text-lg text-center">
          Securely store and manage all your passwords in one place.
        </p>

        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter website url or name"
            className="rounded-full border border-amber-400 text-black w-full p-4 py-1 bg-amber-200"
          />
          <div className="flex w-full gap-8 md:flex-row flex-col">
            <input
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="rounded-full border border-amber-400 text-black w-full p-4 py-1 bg-amber-200"
            />
            <div className="relative">
              <input
                type="password"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                className="rounded-full border border-amber-400 text-black w-full pl-4 pr-8 py-1 bg-amber-200"
              />
              <span
                className="absolute right-[2px] top-[0px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  src="/view.png"
                  alt="view"
                  width={36}
                  ref={ref}
                  className="p-2 ml-3"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center  rounded-full px-4 gap-2 font-bold py-2 w-fit bg-amber-400 hover:bg-amber-300 border border-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="loop"
              colors="primary:#ffffff"
              delay="2000"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-center font-bold text-2xl py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-screen rounded overflow-hidden mb-9">
              <thead className="bg-amber-600">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-amber-300 text-black ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center  border border-white ">
                        <div
                          className="flex items-center "
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            className="w-6  cursor-pointer"
                            title="copy"
                            src="/copy.gif"
                            alt="copy gif"
                          />
                        </div>
                      </td>
                      <td className="py-2 text-center  border border-white ">
                        <div
                          className="flex items-center "
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          {item.username}
                          <img
                            className="w-6 cursor-pointer"
                            title="copy"
                            src="/copy.gif"
                            alt="copy gif"
                          />
                        </div>
                      </td>
                      <td className="py-2 text-center  border  border-white ">
                        <div
                          className="flex items-center"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          {item.password}
                          <img
                            className="w-6 cursor-pointer"
                            title="copy"
                            src="/copy.gif"
                            alt="copy gif"
                          />
                        </div>
                      </td>
                      <td className="py-2 text-center  border  border-white ">
                      <div className="flex items-center justify-evenly">
                      <span className="cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/lsrcesku.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span className=" cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        
                      </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
