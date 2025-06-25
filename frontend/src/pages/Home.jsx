import React, { useEffect, useState, version } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#000',
    borderColor: '#555',
    color: '#fff',
    padding: '5px',
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

  const filteredLanguages = [
    "python",
    "javascript",
    "c",
    "c++",
    "java",
    "bash"
  ];

  const options = data
    .filter(runtime => filteredLanguages.includes(runtime.language.toLowerCase()))
    .map(runtime => ({
      label: `${runtime.language} (${runtime.version})`,
      value: runtime.language.toLowerCase() === "c++" ? "cpp" : runtime.language.toLowerCase(),
      version: runtime.version,
    }));

  setLanguageOptions(options);
};


  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.success) {
        setProjects(data.projects);
      }
      else {
        toast.error(data.msg);
      }
    });
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setName("");
        navigate("/editior/" + data.projectId)
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          getProjects();
        }
        else {
          toast.error(data.msg);
        }
      });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
      else {
        toast.error(data.msg);
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
    })
  };

return (
  <>
    <Navbar />
    <div className="flex items-center justify-between px-16 mt-8">
      <h3 className="text-3xl font-semibold text-white">
        👋 Welcome To Codly
      </h3>
      <div className="flex items-center">
        <button
          onClick={() => setIsCreateModelShow(true)}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          + Create Project
        </button>
      </div>
    </div>

    <div className="projects px-16 mt-8 pb-10">
      {
        projects && projects.length > 0 ? projects.map((project, index) => (
          <div
            key={index}
            className="project w-full mb-4 p-5 flex items-center justify-between bg-[#1a1a1a] border border-gray-700 rounded-2xl hover:scale-[1.01] transition-transform duration-200"
          >
            <div
              onClick={() => navigate("/editior/" + project._id)}
              className="flex w-full items-center gap-6 cursor-pointer"
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
                <h3 className="text-xl font-medium text-white">{project.name}</h3>
                <p className="text-sm text-gray-400">{new Date(project.date).toDateString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
                onClick={() => {
                  setIsEditModelShow(true);
                  setEditProjId(project._id);
                  setName(project.name);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(project._id)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )) : (
          <p className="text-gray-400 text-lg text-center mt-10">🚫 No Project Found!</p>
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
        className="modelCon flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      >
        <div className="modelBox bg-[#1e1e1e] p-8 rounded-2xl w-[90%] md:w-[30vw] shadow-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Create Project</h3>
          <div className="inputBox mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your project name"
              className="w-full px-4 py-2 rounded-lg border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <Select
            placeholder="Select a Language"
            options={languageOptions}
            styles={customStyles}
            onChange={handleLanguageChange}
          />
          {selectedLanguage && (
            <>
              <p className="text-sm text-green-400 mt-2">Selected Language: {selectedLanguage.label}</p>
              <button
                onClick={createProj}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
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
        className="modelCon flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
      >
        <div className="modelBox bg-[#1e1e1e] p-8 rounded-2xl w-[90%] md:w-[30vw] shadow-2xl">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Update Project</h3>
          <div className="inputBox mb-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your project name"
              className="w-full px-4 py-2 rounded-lg border-none text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={updateProj}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
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
