// import React, { useEffect, useState } from 'react';
// import Navbar from "../components/Navbar";
// import Select from 'react-select';
// import { api_base_url } from '../helper';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Home = () => {
//   const [isCreateModelShow, setIsCreateModelShow] = useState(false);
//   const [languageOptions, setLanguageOptions] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [isEditModelShow, setIsEditModelShow] = useState(false);
//   const [name, setName] = useState("");
//   const [projects, setProjects] = useState(null);
//   const [editProjId, setEditProjId] = useState("");
//   const navigate = useNavigate();

//   // --- theme-matched react-select styles ---
//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       backgroundColor: 'rgba(2,6,23,0.6)',
//       borderColor: 'rgba(255,255,255,0.12)',
//       color: '#fff',
//       padding: 6,
//       borderRadius: 12,
//       boxShadow: 'none',
//       ':hover': { borderColor: 'rgba(99,102,241,0.6)' },
//     }),
//     menu: (p) => ({ ...p, background: 'rgba(2,6,23,0.95)', color: '#fff', backdropFilter: 'blur(8px)' }),
//     option: (p, s) => ({
//       ...p,
//       backgroundColor: s.isFocused ? 'rgba(99,102,241,0.2)' : 'transparent',
//       color: '#fff',
//       cursor: 'pointer',
//     }),
//     singleValue: (p) => ({ ...p, color: '#fff' }),
//     placeholder: (p) => ({ ...p, color: 'rgba(148,163,184,0.9)' }),
//     input: (p) => ({ ...p, color: '#fff' }),
//   };

//   const getRunTimes = async () => {
//     let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
//     let data = await res.json();
//     const filtered = ["python", "javascript", "c", "c++", "java", "bash"];
//     const options = data
//       .filter(r => filtered.includes(r.language.toLowerCase()))
//       .map(r => ({
//         label: `${r.language} (${r.version})`,
//         value: r.language.toLowerCase() === "c++" ? "cpp" : r.language.toLowerCase(),
//         version: r.version,
//       }));
//     setLanguageOptions(options);
//   };

//   const getProjects = async () => {
//     fetch(api_base_url + "/getProjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token: localStorage.getItem("token") })
//     }).then(res => res.json()).then(data => {
//       if (data.success) setProjects(data.projects);
//       else toast.error(data.msg);
//     });
//   };

//   const createProj = () => {
//     fetch(api_base_url + "/createProj", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name,
//         projLanguage: selectedLanguage.value,
//         token: localStorage.getItem("token"),
//         version: selectedLanguage.version
//       })
//     }).then(res => res.json()).then(data => {
//       if (data.success) {
//         setName("");
//         navigate("/editior/" + data.projectId);
//       } else toast.error(data.msg);
//     });
//   };

//   const deleteProject = (id) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       fetch(api_base_url + "/deleteProject", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ projectId: id, token: localStorage.getItem("token") })
//       }).then(res => res.json()).then(data => {
//         if (data.success) getProjects();
//         else toast.error(data.msg);
//       });
//     }
//   };

//   const updateProj = () => {
//     fetch(api_base_url + "/editProject", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ projectId: editProjId, token: localStorage.getItem("token"), name })
//     }).then(res => res.json()).then(data => {
//       setIsEditModelShow(false);
//       setName("");
//       setEditProjId("");
//       getProjects();
//       if (!data.success) toast.error(data.msg);
//     });
//   };

//   useEffect(() => {
//     getProjects();
//     getRunTimes();
//   }, []);

//   // --- cursor spotlight for cards (UI-only) ---
//   const handleCardMouseMove = (e) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     card.style.setProperty('--mx', `${x}px`);
//     card.style.setProperty('--my', `${y}px`);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Page background to match Login/SignUp */}
//       <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-8 md:px-16 pt-10">
//           <h3 className="text-3xl font-bold text-white relative group transition-all duration-300">
//             👋{" "}
//             <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               Welcome To Codly
//             </span>
//             <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
//           </h3>

//           <button
//             onClick={() => setIsCreateModelShow(true)}
//             className="px-6 py-2 text-lg font-semibold rounded-xl text-white
//                        bg-gradient-to-r from-indigo-600 to-violet-600
//                        shadow-lg shadow-indigo-900/30
//                        transform-gpu transition-all duration-300
//                        hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.03]
//                        active:scale-[0.98]"
//           >
//             + Create Project
//           </button>
//         </div>

//         {/* Projects */}
//         <div className="projects px-8 md:px-16 mt-8 pb-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {projects && projects.length > 0 ? (
//             projects.map((project, index) => (
//               <div
//                 key={project._id || index}
//                 onMouseMove={handleCardMouseMove}
//                 className="group relative overflow-hidden p-5 rounded-2xl
//                            bg-white/5 backdrop-blur-xl border border-white/10
//                            shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]
//                            transition-all duration-300 transform-gpu will-change-transform
//                            hover:-translate-y-0.5 hover:scale-[1.01]
//                            hover:ring-1 hover:ring-indigo-400/40"
//               >
//                 {/* cursor spotlight */}
//                 <div
//                   className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   style={{
//                     background:
//                       "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.25), transparent 60%)",
//                   }}
//                 />

//                 <div
//                   onClick={() => navigate("/editior/" + project._id)}
//                   className="relative flex items-center gap-6 cursor-pointer z-[1]"
//                 >
//                   <img
//                     className="w-[80px] h-[60px] object-contain rounded-lg border border-white/10 bg-white p-1"
//                     src={
//                       project.projLanguage === "python" ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png" :
//                       project.projLanguage === "javascript" ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" :
//                       project.projLanguage === "cpp" ? "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png" :
//                       project.projLanguage === "c" ? "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" :
//                       project.projLanguage === "java" ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" :
//                       project.projLanguage === "bash" ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png" :
//                       ""
//                     }
//                     alt=""
//                   />
//                   <div>
//                     <h3 className="text-xl font-semibold text-white">{project.name}</h3>
//                     <p className="text-sm text-slate-400">{new Date(project.date).toDateString()}</p>
//                   </div>
//                 </div>

//                 <div className="absolute top-4 right-4 flex gap-2 z-[1]">
//                   <button
//                     onClick={() => {
//                       setIsEditModelShow(true);
//                       setEditProjId(project._id);
//                       setName(project.name);
//                     }}
//                     className="px-3 py-1 text-sm rounded-lg text-white
//                                bg-white/10 border border-white/10
//                                hover:bg-white/15 hover:border-white/20
//                                transition transform hover:scale-105"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteProject(project._id)}
//                     className="px-3 py-1 text-sm rounded-lg text-white
//                                bg-red-500/80 hover:bg-red-500
//                                transition transform hover:scale-105"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-slate-300 text-lg text-center mt-10 col-span-full">
//               🚫 No Project Found!
//             </p>
//           )}
//         </div>
//       </main>

//       {/* Create Modal */}
//       {isCreateModelShow && (
//         <div
//           onClick={(e) => {
//             if (e.target.classList.contains("modelCon")) {
//               setIsCreateModelShow(false);
//               setName("");
//             }
//           }}
//           className="modelCon fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
//         >
//           <div className="relative bg-white/8 backdrop-blur-xl p-8 rounded-2xl w-[90%] md:w-[32rem]
//                           border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]
//                           transform-gpu transition-all duration-300">
//             <h3 className="text-2xl font-bold text-white text-center mb-6">🚀 Create New Project</h3>
//             <div className="mb-5">
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 type="text"
//                 placeholder="Enter your project name"
//                 className="w-full h-12 px-4 rounded-xl bg-slate-900/70 text-white
//                            border border-white/10 placeholder-slate-400
//                            focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
//                            outline-none transition-all"
//               />
//             </div>
//             <Select
//               placeholder="Select a Language"
//               options={languageOptions}
//               styles={customStyles}
//               onChange={(opt) => setSelectedLanguage(opt)}
//             />
//             {selectedLanguage && (
//               <>
//                 <p className="text-sm text-green-400 mt-3">
//                   Selected: {selectedLanguage.label}
//                 </p>
//                 <button
//                   onClick={createProj}
//                   className="mt-4 w-full h-11 rounded-xl text-white font-semibold
//                              bg-gradient-to-r from-indigo-600 to-violet-600
//                              shadow-lg shadow-indigo-900/30
//                              transform-gpu transition-all duration-300
//                              hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.02]
//                              active:scale-[0.98]"
//                 >
//                   Create
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {isEditModelShow && (
//         <div
//           onClick={(e) => {
//             if (e.target.classList.contains("modelCon")) {
//               setIsEditModelShow(false);
//               setName("");
//             }
//           }}
//           className="modelCon fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
//         >
//           <div className="relative bg-white/8 backdrop-blur-xl p-8 rounded-2xl w-[90%] md:w-[32rem]
//                           border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]
//                           transform-gpu transition-all duration-300">
//             <h3 className="text-2xl font-bold text-white text-center mb-6">✏️ Update Project</h3>
//             <div className="mb-5">
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 type="text"
//                 placeholder="Update your project name"
//                 className="w-full h-12 px-4 rounded-xl bg-slate-900/70 text-white
//                            border border-white/10 placeholder-slate-400
//                            focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
//                            outline-none transition-all"
//               />
//             </div>
//             <button
//               onClick={updateProj}
//               className="w-full h-11 rounded-xl text-white font-semibold
//                          bg-gradient-to-r from-indigo-600 to-violet-600
//                          shadow-lg shadow-indigo-900/30
//                          transform-gpu transition-all duration-300
//                          hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.02]
//                          active:scale-[0.98]"
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const [name, setName] = useState("");
  const [projects, setProjects] = useState(null);
  const [editProjId, setEditProjId] = useState("");
  const navigate = useNavigate();

  // --- react-select: theme-matched styles + scrollable menu ---
  const customStyles = {
    control: (p, s) => ({
      ...p,
      backgroundColor: 'rgba(2,6,23,0.6)',
      borderColor: s.isFocused ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.12)',
      color: '#fff',
      padding: 6,
      borderRadius: 14,
      boxShadow: s.isFocused ? '0 0 0 4px rgba(99,102,241,0.20)' : 'none',
      transition: 'all 200ms ease',
      cursor: 'text',
    }),
    valueContainer: (p) => ({ ...p, paddingInline: 2 }),
    input: (p) => ({ ...p, color: '#fff' }),
    placeholder: (p) => ({ ...p, color: 'rgba(148,163,184,0.9)' }),
    singleValue: (p) => ({ ...p, color: '#fff' }),

    menu: (p) => ({
      ...p,
      backgroundColor: 'rgba(2,6,23,0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 14,
      overflow: 'hidden',
      marginTop: 8,
      boxShadow: '0 10px 40px -10px rgba(0,0,0,0.7)',
      animation: 'fadeScaleIn 160ms ease-out',
      transformOrigin: 'top',
    }),
    // KEY: scrollable list
    menuList: (p) => ({
      ...p,
      maxHeight: 240,        // ~h-60
      overflowY: 'auto',     // enable scroll
      overscrollBehavior: 'contain',
      paddingBlock: 6,
    }),
    option: (p, s) => ({
      ...p,
      backgroundColor: s.isFocused ? 'rgba(99,102,241,0.18)' : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      paddingBlock: 10,
      transition: 'background-color 120ms ease',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (p, s) => ({
      ...p,
      color: s.isFocused ? 'rgba(99,102,241,0.9)' : 'rgba(203,213,225,0.9)',
      transition: 'transform 160ms ease',
      transform: s.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();
    const filtered = ["python", "javascript", "c", "c++", "java", "bash"];
    const options = data
      .filter(r => filtered.includes(r.language.toLowerCase()))
      .map(r => ({
        label: `${r.language} (${r.version})`,
        value: r.language.toLowerCase() === "c++" ? "cpp" : r.language.toLowerCase(),
        version: r.version,
      }));
    setLanguageOptions(options);
  };

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token") })
    }).then(res => res.json()).then(data => {
      if (data.success) setProjects(data.projects);
      else toast.error(data.msg);
    });
  };

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setName("");
        navigate("/editior/" + data.projectId);
      } else toast.error(data.msg);
    });
  };

  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(api_base_url + "/deleteProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id, token: localStorage.getItem("token") })
      }).then(res => res.json()).then(data => {
        if (data.success) getProjects();
        else toast.error(data.msg);
      });
    }
  };

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: editProjId, token: localStorage.getItem("token"), name })
    }).then(res => res.json()).then(data => {
      setIsEditModelShow(false);
      setName("");
      setEditProjId("");
      getProjects();
      if (!data.success) toast.error(data.msg);
    });
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  // cursor spotlight
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-8 md:px-16 pt-10">
          <h3 className="text-3xl font-bold text-white relative group transition-all duration-300">
            👋 <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Welcome To Codly</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
          </h3>

          <button
            onClick={() => setIsCreateModelShow(true)}
            className="px-6 py-2 text-lg font-semibold rounded-xl text-white
                       bg-gradient-to-r from-indigo-600 to-violet-600
                       shadow-lg shadow-indigo-900/30
                       transform-gpu transition-all duration-300
                       hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.03]
                       active:scale-[0.98]"
          >
            + Create Project
          </button>
        </div>

        <div className="projects px-8 md:px-16 mt-8 pb-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={project._id || index}
                onMouseMove={handleCardMouseMove}
                className="group relative overflow-hidden p-5 rounded-2xl
                           bg-white/5 backdrop-blur-xl border border-white/10
                           shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]
                           transition-all duration-300 transform-gpu will-change-transform
                           hover:-translate-y-0.5 hover:scale-[1.01]
                           hover:ring-1 hover:ring-indigo-400/40"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.25), transparent 60%)",
                  }}
                />

                <div
                  onClick={() => navigate("/editior/" + project._id)}
                  className="relative flex items-center gap-6 cursor-pointer z-[1]"
                >
                  <img
                    className="w-[80px] h-[60px] object-contain rounded-lg border border-white/10 bg-white p-1"
                    src={
                      project.projLanguage === "python" ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png" :
                      project.projLanguage === "javascript" ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" :
                      project.projLanguage === "cpp" ? "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png" :
                      project.projLanguage === "c" ? "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" :
                      project.projLanguage === "java" ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" :
                      project.projLanguage === "bash" ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png" :
                      ""
                    }
                    alt=""
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-slate-400">{new Date(project.date).toDateString()}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2 z-[1]">
                  <button
                    onClick={() => {
                      setIsEditModelShow(true);
                      setEditProjId(project._id);
                      setName(project.name);
                    }}
                    className="px-3 py-1 text-sm rounded-lg text-white
                               bg-white/10 border border-white/10
                               hover:bg-white/15 hover:border-white/20
                               transition transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="px-3 py-1 text-sm rounded-lg text-white
                               bg-red-500/80 hover:bg-red-500
                               transition transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-300 text-lg text-center mt-10 col-span-full">🚫 No Project Found!</p>
          )}
        </div>
      </main>

      {/* Create Modal */}
      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className="modelCon fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        >
          <div className="relative bg-white/8 backdrop-blur-xl p-8 rounded-2xl w-[90%] md:w-[32rem]
                          border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]
                          transform-gpu transition-all duration-300">
            <h3 className="text-2xl font-bold text-white text-center mb-6">🚀 Create New Project</h3>

            <div className="mb-5">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="w-full h-12 px-4 rounded-xl bg-slate-900/70 text-white
                           border border-white/10 placeholder-slate-400
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
                           outline-none transition-all"
              />
            </div>

            <Select
              className="mt-2"
              classNamePrefix="lang"                 // enables CSS targeting below
              isSearchable
              placeholder="Select a Language"
              options={languageOptions}
              styles={customStyles}
              onChange={(opt) => setSelectedLanguage(opt)}
            />

            {selectedLanguage && (
              <>
                <p className="text-sm text-green-400 mt-3">Selected: {selectedLanguage.label}</p>
                <button
                  onClick={createProj}
                  className="mt-4 w-full h-11 rounded-xl text-white font-semibold
                             bg-gradient-to-r from-indigo-600 to-violet-600
                             shadow-lg shadow-indigo-900/30
                             transform-gpu transition-all duration-300
                             hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.02]
                             active:scale-[0.98]"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}
          className="modelCon fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        >
          <div className="relative bg-white/8 backdrop-blur-xl p-8 rounded-2xl w-[90%] md:w-[32rem]
                          border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]
                          transform-gpu transition-all duration-300">
            <h3 className="text-2xl font-bold text-white text-center mb-6">✏️ Update Project</h3>

            <div className="mb-5">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Update your project name"
                className="w-full h-12 px-4 rounded-xl bg-slate-900/70 text-white
                           border border-white/10 placeholder-slate-400
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
                           outline-none transition-all"
              />
            </div>

            <button
              onClick={updateProj}
              className="w-full h-11 rounded-xl text-white font-semibold
                         bg-gradient-to-r from-indigo-600 to-violet-600
                         shadow-lg shadow-indigo-900/30
                         transform-gpu transition-all duration-300
                         hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.02]
                         active:scale-[0.98]"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
