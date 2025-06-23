import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { getProfileFromCookie, saveProfileToCookie } from "../utils/cookieUtils";
import "./Settings.css";
import { FaEdit } from "react-icons/fa";

const Settings = ({ toggleTheme, currentTheme, showToast }) => {
    const [view, setView] = useState("main");
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState(getProfileFromCookie());

    const goBack = () => {
        setEditing(false);
        setView("main");
    };

    const handleProfileSave = (newProfile) => {
        saveProfileToCookie(newProfile);
        setProfile(newProfile);
        setEditing(false);
        showToast("Profile updated!");
    };

    return (
        <div className="settings-container">
            {view !== "main" && (
                <div className="back-button" onClick={goBack}>
                    ← Back
                </div>
            )}

            {view === "main" && (
                <ul className="settings-menu">
                    <li onClick={() => setView("profile")}>👤 Profile</li>
                    <li onClick={() => setView("preferences")}>⚙️ Preferences</li>
                </ul>
            )}

            {view === "profile" && (
                <div className="setting-section">
                    <div className="settings-heading">
                        <h2>Profile</h2>
                        <FaEdit
                            className="edit-icon"
                            onClick={() => setEditing(true)}
                            title="Edit Profile"
                        />
                    </div>
                    {!profile || editing ? (
                        <ProfileForm
                            profile={profile}
                            showToast={showToast}
                            onSave={handleProfileSave}
                        />
                    ) : (
                        <div className="profile-display">
                            <p><strong>Name:</strong> {profile.name}</p>
                            <p><strong>Age:</strong> {profile.age}</p>
                            <p><strong>Weight:</strong> {profile.weight} kg</p>
                            <p><strong>Height:</strong> {profile.height} cm</p>
                            <p><strong>TDEE:</strong> {profile.TDEE} kcal</p>
                        </div>
                    )}
                </div>
            )}

            {view === "preferences" && (
                <div className="setting-section">
                    <h2>⚙️ Preferences</h2>
                    <div className="theme-toggle">
                        <span>Theme</span>
                        <button onClick={toggleTheme}>
                            Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
