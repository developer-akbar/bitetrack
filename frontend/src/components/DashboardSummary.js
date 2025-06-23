import React, { useEffect, useState } from "react";
import { getProfileFromCookie } from "../utils/cookieUtils";
import './DashboardSummary.css';
import { FaSmile, FaCheckCircle, FaExclamationTriangle, FaBalanceScale } from 'react-icons/fa';

const DashboardSummary = () => {
  const [consumed, setConsumed] = useState(0);
  const [burned, setBurned] = useState(0);
  const [name, setName] = useState("");
  const [forceShow, setForceShow] = useState(false);
  const threshold = 100;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const fetchFood = async () => {
      const res = await fetch("http://localhost:5000/api/food/history");
      const data = await res.json();
      const todayFood = data.filter(entry =>
        entry.createdAt.startsWith(today)
      );
      const totalCalories = todayFood.reduce((sum, e) => sum + (e.macros?.calories || 0), 0);
      setConsumed(totalCalories);
    };

    const fetchBurn = async () => {
      const res = await fetch("http://localhost:5000/api/burn/history");
      const data = await res.json();
      const todayBurn = data.filter(entry =>
        entry.createdAt.startsWith(today)
      );
      const totalBurned = todayBurn.reduce((sum, e) => sum + (e.burn?.calories || 0), 0);
      setBurned(totalBurned);
    };

    const profile = getProfileFromCookie();
    if (profile?.name) {
      setName(profile.name);
    }

    fetchFood();
    fetchBurn();
  }, []);

  const net = consumed - burned;

  return (
    <div className="dashboard-summary">
      {name ? (
        <>
          {(() => {
            const profile = getProfileFromCookie();
            const currentHour = new Date().getHours();

            if (!profile?.TDEE) {
              return <p>Alert: Profile info missing for TDEE comparison.</p>;
            }

            if (currentHour >= 21 || forceShow) {
              if (net < profile.TDEE - threshold) {
                return (
                  <p className="deficit">
                    <FaCheckCircle />
                    You're in a calorie deficit today.
                  </p>
                );
              } else if (net > profile.TDEE + threshold) {
                return (
                  <p className="surplus">
                    <FaExclamationTriangle />
                    You're in a calorie surplus today.
                  </p>
                );
              } else {
                return (
                  <p className="maintenance">
                    <FaBalanceScale />
                    You're close to your maintenance calories.
                  </p>
                );
              }
            } else {
              return (
                <p>
                  We'll show your calorie balance after 9:00 PM.{" "}
                  <button
                    className="toggle-balance"
                    onClick={() => setForceShow(true)}
                  >
                    Click to show now
                  </button>
                </p>
              );
            }
          })()}

          <p>
            <FaSmile /> Great work! You've consumed{" "}
            <strong>{consumed} kcal</strong> and burned{" "}
            <strong>{burned} kcal</strong> today. <br />
            Net: <strong>{net} kcal</strong>
          </p>
        </>
      ) : (
        <p>
          <FaSmile /> Welcome! Please enter your profile to get personalized
          insights.
        </p>
      )}
    </div>
  );
};

export default DashboardSummary;
