import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// The 'react-toastify/dist/ReactToastify.css' import has been removed to fix a compilation error.
// For toast notifications to be styled correctly, please ensure you add the following stylesheet link
// to your main index.html file:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css" />


// It's assumed that the lord-icon script is included in your main HTML file,
// for example: <script src="https://cdn.lordicon.com/lordicon.js"></script>

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Load passwords from localStorage on initial component mount
  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      try {
        setPasswordsArray(JSON.parse(passwords));
      } catch (error) {
        console.error("Failed to parse passwords from localStorage", error);
        setPasswordsArray([]);
      }
    }
  }, []);

  // Function to copy text to the clipboard and show a toast notification
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("Copied to Clipboard!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error("Failed to copy!", { theme: "dark" });
    });
  };

  // Toggles the visibility of the password in the input field using state
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handles saving or updating a password
  const savePassword = () => {
    // Validate input fields: ensure they are longer than 3 characters
    if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
      toast.error("All fields must be at least 4 characters long.", {
        position: "top-right",
        theme: "dark",
      });
      return; // Stop execution if validation fails
    }

    let updatedPasswords;
    // If form has an ID, it means we are editing an existing password
    if (form.id) {
      updatedPasswords = passwordsArray.map(p => p.id === form.id ? { ...form } : p);
      toast.success('Password Updated Successfully!', { theme: "dark" });
    } else {
      // Otherwise, we are adding a new password
      const newPassword = { ...form, id: uuidv4() };
      updatedPasswords = [...passwordsArray, newPassword];
      toast.success('Password Saved Successfully!', { theme: "dark" });
    }
    
    setPasswordsArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    
    // Reset form to initial state
    setForm({ site: "", username: "", password: "", id: "" });
  };

  // Handles deleting a password
  const deletePassword = (id) => {
    // Removed confirm() dialog for a smoother experience
    const updatedPasswords = passwordsArray.filter(item => item.id !== id);
    setPasswordsArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    toast("Password Deleted", {
      position: "top-right",
      theme: "dark",
    });
  };

  // Prepares the form for editing a password
  const editPassword = (id) => {
    const passwordToEdit = passwordsArray.find(item => item.id === id);
    if (passwordToEdit) {
      // Set the form state to the password being edited, including its ID
      setForm(passwordToEdit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Updates the form state as the user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="fixed inset-0 -z-10 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className=" flex flex-col  mx-auto max-w-4xl min-h-screen">
        <div className="flex-grow">
            <h1 className="text-4xl mb-3 text-center text-white font-bold pt-4">
              Pass<span className="text-[#6c16c7] ">Cool</span>
            </h1>
            <p className="text-white text-xl text-center ">
              Your <span className="text-[#6c16c7] font-bold">Own</span> Password
              Manager
            </p>
            <div className="text-white flex flex-col p-4 gap-6">
              <input
                value={form.site}
                name="site"
                onChange={handleChange}
                placeholder="Enter Website Url 🔗"
                className="rounded-full border focus:outline-none focus:border-[#B388FF] px-4 py-1 bg-transparent"
                type="text"
              />
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-3 w-full">
                <input
                  value={form.username}
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter Username"
                  className="rounded-full border w-full sm:w-1/2 focus:outline-none focus:border-[#B388FF] px-4 py-1 bg-transparent"
                  type="text"
                />
                <div className="relative w-full sm:w-1/2 rounded-full border flex items-center focus-within:border-[#B388FF]">
                  <input
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                    className="focus:outline-none w-full bg-transparent px-4 py-1"
                    placeholder="Enter Password"
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <span
                    className="absolute right-[10px] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <img width={20} src={isPasswordVisible ? "icons8-hide-30.png" : "icons8-eye-30.png"} alt="Toggle visibility" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/20x20/000000/FFFFFF?text=👁️' }}/>
                  </span>
                </div>
              </div>
              <button
                onClick={savePassword}
                className="flex justify-center gap-2 rounded-full py-1 w-fit px-4 m-auto items-center bg-white hover:bg-slate-300  font-semibold text-[#6c16c7]"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/gzqofmcx.json"
                  trigger="hover"
                  colors="primary:#6c16c7,secondary:#16c7a8"
                ></lord-icon>
                {form.id ? 'UPDATE' : 'SAVE'}
              </button>
            </div>
            <div className="passwords text-white px-4">
              <h2 className="text-2xl font-bold">
                Your <span className="text-[#6c16c7]">Passwords</span>
              </h2>
              {passwordsArray.length === 0 && <div className="text-center py-4 text-xl text-slate-600 font-bold"> No Password To Show </div>}
              {passwordsArray.length !== 0 && (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="table-auto w-full border-separate border-spacing-y-2">
                      <thead>
                        <tr>
                          <th className="backdrop-blur-md bg-black/40 text-white px-4 py-2 rounded-lg text-left">Site</th>
                          <th className="backdrop-blur-md bg-black/40 text-white px-4 py-2 rounded-lg text-left">Username</th>
                          <th className="backdrop-blur-md bg-black/40 text-white px-4 py-2 rounded-lg text-left">Password</th>
                          <th className="backdrop-blur-md bg-black/40 text-white px-4 py-2 rounded-lg">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passwordsArray.map((item) => (
                          <tr key={item.id}>
                            <td className="backdrop-blur-md bg-black/30 text-white px-4 py-2 rounded-lg align-middle">
                              <div className="flex items-center gap-2 break-all">
                                <a href={item.site} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.site}</a>
                                <div className="cursor-pointer" onClick={() => { copyText(item.site); }}><lord-icon style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div>
                              </div>
                            </td>
                            <td className="backdrop-blur-md bg-black/30 text-white px-4 py-2 rounded-lg align-middle">
                              <div className="flex items-center gap-2 break-all">{item.username}<div className="cursor-pointer" onClick={() => { copyText(item.username); }}><lord-icon style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div>
                            </td>
                            <td className="backdrop-blur-md bg-black/30 text-white px-4 py-2 rounded-lg align-middle">
                              <div className="flex items-center gap-2 break-all">{"*".repeat(item.password.length)}<div className="cursor-pointer" onClick={() => { copyText(item.password); }}><lord-icon style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div>
                            </td>
                            <td className="py-2 text-center backdrop-blur-md bg-black/30 text-white px-1 rounded-lg align-middle">
                              <span className="cursor-pointer mx-1" onClick={() => { editPassword(item.id); }}><lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8"></lord-icon></span>
                              <span className="cursor-pointer mx-1" onClick={() => { deletePassword(item.id); }}><lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8"></lord-icon></span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-4 py-4">
                    {passwordsArray.map(item => (
                      <div key={item.id} className="backdrop-blur-md bg-black/30 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 break-all">
                          <span className="font-semibold w-20">Site:</span>
                          <a href={item.site} target="_blank" rel="noopener noreferrer" className="hover:underline flex-1">{item.site}</a>
                          <div className="cursor-pointer" onClick={() => copyText(item.site)}><lord-icon style={{ width: "20px", height: "20px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" /></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 break-all">
                          <span className="font-semibold w-20">Username:</span>
                          <span className="flex-1">{item.username}</span>
                          <div className="cursor-pointer" onClick={() => copyText(item.username)}><lord-icon style={{ width: "20px", height: "20px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" /></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 break-all">
                          <span className="font-semibold w-20">Password:</span>
                          <span className="flex-1">{"*".repeat(item.password.length)}</span>
                          <div className="cursor-pointer" onClick={() => copyText(item.password)}><lord-icon style={{ width: "20px", height: "20px" }} colors="primary:#6c16c7,secondary:#16c7a8" src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" /></div>
                        </div>
                        <div className="flex justify-end items-center gap-3 mt-3">
                          <span className="cursor-pointer" onClick={() => editPassword(item.id)}><lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8" /></span>
                          <span className="cursor-pointer" onClick={() => deletePassword(item.id)}><lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }} colors="primary:#6c16c7,secondary:#16c7a8" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
        </div>
      
      </div>
    </>
  );
};

export default Manager;
