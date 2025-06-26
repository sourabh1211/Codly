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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1c1c1e',
      borderColor: '#555',
      color: '#fff',
      padding: '5px',
      borderRadius: '0.5rem',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#fff',
      width: "100%",
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#000',
      color: '#fff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();
    const filteredLanguages = ["python", "javascript", "c", "c++", "java", "bash"];
    const options = data
      .filter(runtime => filteredLanguages.includes(runtime.language.toLowerCase()))
      .map(runtime => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language.toLowerCase() === "c++" ? "cpp" : runtime.language.toLowerCase(),
        version: runtime.version,
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

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-8 md:px-16 mt-8">
        <h3 className="text-3xl font-bold text-white relative group transition-all duration-300">
          👋 <span className="inline-block group-hover:scale-105 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-500 ease-in-out">
            Welcome To Codly
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full"></span>
        </h3>
        <button
          onClick={() => setIsCreateModelShow(true)}
          className="px-6 py-2 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
        >
          + Create Project
        </button>
      </div>

      <div className="projects px-8 md:px-16 mt-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          projects && projects.length > 0 ? projects.map((project, index) => (
            <div
              key={index}
              className="project relative group overflow-hidden p-5 bg-[#121212] border border-gray-700 rounded-2xl transition-all duration-300 shadow-md hover:shadow-2xl hover:scale-[1.01] hover:ring-2 hover:ring-white"
            >
              <div
                onClick={() => navigate("/editior/" + project._id)}
                className="flex items-center gap-6 cursor-pointer"
              >
                <img
                  className="w-[80px] h-[60px] object-contain rounded-lg border border-gray-600 bg-white p-1"
                  src={
                    project.projLanguage === "python" ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png" :
                      project.projLanguage === "javascript" ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" :
                        project.projLanguage === "cpp" ? "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png" :
                          project.projLanguage === "c" ? "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" :
                            project.projLanguage === "java" ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" :
                              project.projLanguage === "bash" ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png" : ""
                  }
                  alt=""
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">{new Date(project.date).toDateString()}</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => {
                    setIsEditModelShow(true);
                    setEditProjId(project._id);
                    setName(project.name);
                  }}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          )) : (
            <p className="text-gray-400 text-lg text-center mt-10 col-span-2">🚫 No Project Found!</p>
          )
        }
      </div>

      {/* Create Modal */}
      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className="modelCon fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50"
        >
          <div className="bg-[#1c1c1e] p-8 rounded-2xl w-[90%] md:w-[30vw] border border-gray-600 shadow-[0_0_20px_2px_rgba(255,255,255,0.1)] transition-all">
            <h3 className="text-2xl font-bold text-white text-center mb-6">🚀 Create New Project</h3>
            <div className="inputBox mb-5">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <Select
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
                  className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
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
          className="modelCon fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50"
        >
          <div className="bg-[#1c1c1e] p-8 rounded-2xl w-[90%] md:w-[30vw] border border-gray-600 shadow-[0_0_20px_2px_rgba(255,255,255,0.1)] transition-all">
            <h3 className="text-2xl font-bold text-white text-center mb-6">✏️ Update Project</h3>
            <div className="inputBox mb-5">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Update your project name"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <button
              onClick={updateProj}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
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
