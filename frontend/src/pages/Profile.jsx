import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    career_goal: "",
    education: "",
    experience: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      await api.put("/profile", profile);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="profile-page min-h-screen py-10 px-4">
      <div className="profile-card max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="profile-cover h-40"></div>

        {/* Avatar */}
        <div className="flex flex-col items-center -mt-16">
          <div className="profile-avatar w-32 h-32 rounded-full shadow-xl border-4 flex items-center justify-center text-5xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="profile-name text-3xl font-bold mt-4">
            {profile.name}
          </h1>

          <p className="profile-email">
            {profile.email}
          </p>
        </div>

        {/* Form */}
        <div className="profile-form grid md:grid-cols-2 gap-8 p-10">

          {/* Name */}
          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              type="text"
              value={profile.name}
              disabled
              className="profile-input mt-2 w-full p-3 rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
              className="profile-input mt-2 w-full p-3 rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Career Goal */}
          <div>
            <label className="font-semibold">
              Career Goal
            </label>

            <input
              type="text"
              value={profile.career_goal || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  career_goal: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* Education */}
          <div>
            <label className="font-semibold">
              Education
            </label>

            <input
              type="text"
              value={profile.education || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  education: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="font-semibold">
              Experience
            </label>

            <input
              type="text"
              value={profile.experience || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  experience: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="font-semibold">
              Skills
            </label>

            <textarea
              rows="4"
              value={profile.skills || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="font-semibold">
              GitHub
            </label>

            <input
              type="url"
              value={profile.github || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  github: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="font-semibold">
              LinkedIn
            </label>

            <input
              type="url"
              value={profile.linkedin || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedin: e.target.value,
                })
              }
              className="profile-input mt-2 w-full p-3 rounded-xl border outline-none"
            />
          </div>

        </div>

        {/* Save Button */}
        <div className="flex justify-center pb-10">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="profile-save px-10 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;