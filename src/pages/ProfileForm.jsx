import { useState, useEffect } from "react";
import API from "../api";
import "./App.css"

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    github: "",
    projects: [{ title: "", description: "", link: "" }]
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        const skillsArray = Array.isArray(res.data?.skills) ? res.data.skills : [];
        const projectsArray = Array.isArray(res.data?.projects) && res.data.projects.length
          ? res.data.projects
          : [{ title: "", description: "", link: "" }];

        setForm({
          ...res.data,
          skills: skillsArray.join(", "),
          projects: projectsArray
        });
      } catch {
        console.log("No profile yet");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleProjectChange = (index, e) => {
    const newProjects = [...form.projects];
    newProjects[index][e.target.name] = e.target.value;
    setForm({ ...form, projects: newProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim())
      };
      await API.post("/profile", payload);
      alert("Profile saved");
    } catch {
      alert("Error saving profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>My Profile</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
      <input name="github" placeholder="GitHub Link" value={form.github} onChange={handleChange} />

      <h3>Projects</h3>
      {form.projects.map((proj, idx) => (
        <div key={idx}>
          <input name="title" placeholder="Title" value={proj.title} onChange={(e) => handleProjectChange(idx, e)} />
          <input name="description" placeholder="Description" value={proj.description} onChange={(e) => handleProjectChange(idx, e)} />
          <input name="link" placeholder="Project Link" value={proj.link} onChange={(e) => handleProjectChange(idx, e)} />
        </div>
      ))}

      <button type="submit">Save Profile</button>
    </form>
  );
}
