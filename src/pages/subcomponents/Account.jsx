import React, { useState } from 'react'
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import { Link } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';

export default function Account() {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  return (
    <div className=" min-h-screen w-full flex-col  grid grid-cols-3 border-black border-2">
     
    
        <div className="  w-full max-w-6xl items-start gap-6  col-span-1">
        <div className=" grid w-full max-w-6xl gap-2 mt-4">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="#"
              className={
                selectedComponent === "Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelectedComponent("Profile")}
            >
              Profile
            </Link>
            <Link
              href="#"
              className={
                selectedComponent === "Update Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelectedComponent("Update Profile")}
            >
              Update Profile
            </Link>
            <Link
              href="#"
              className={
                selectedComponent === "Update Password"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelectedComponent("Update Password")}
            >
              Update Password
            </Link>
          </nav>
         
        </div>
        <div className="grid gap-6 col-span-2">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile/>;
                  break;
                case "Update Profile":
                  return <UpdateProfile />;
                  break;
                case "Update Password":
                  return <UpdatePassword/>;
                  break;
                default:
                  return <Profile />;
                  break;
              }
            })()}
          </div>
    </div>
  );
};
  

