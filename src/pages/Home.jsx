import React, { useState, useEffect } from 'react'
import { Package, House, PencilRuler, LayoutGrid, History, MessageSquare, FileUp, LogOut, User, } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './subcomponents/Dashboard'
import AddProject from './subcomponents/AddProject'
import AddSkill from './subcomponents/AddSkill'
import AddTimeline from './subcomponents/AddTimeline'
import Messages from './subcomponents/Messages'
import Account from './subcomponents/Account'
import AddSoftwareApplications from './subcomponents/AddSoftwareApplications'
import { clearAllUserErrors, logout } from '../redux/slices/userSlice'
import { toast } from 'react-toastify'


export default function Home() {

  const [active, setActive] = useState("")
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.user)
  console.log(isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //console.log(user)
  const handleLogout = () => {
    dispatch(logout())
    toast.success("logged out")
  }
  //console.log(active)
  console.log(isAuthenticated)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (

    <div className="flex min-h-screen w-full flex-col bg-muted/40 ">


      <div className='border-black border-2 h-14 flex items-center ml-20 gap-2 mt-4'>
        <img src={user && user?.avatar?.url} className='w-16 h-16 rounded-full border-2 border-black' />
        <h1 className="text-4xl max-[900px]:text-2xl">Welcome Back &nbsp; {user?.fullName}</h1>
      </div>
      <aside className="fixed inset-y-0 left-0  w-20 flex-col border-black border-2 bg-background   z-50">
        <nav className='gap-4 flex flex-col mt-8'>
          

          <Link href="#" className={`flex items-center gap-4 px-2.5 ${active === "dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={() => setActive("dashboard")}>
            <House className="h-5 w-5 " />
          </Link>


        


          <Link className={`flex items-center gap-4 px-2.5 ${active === "Add-Project" ? "text-foreground" : " hover:transition-all group-hover:scale-110 "}`}
            onClick={() => setActive("Add-Project")}>
            <FileUp  />
          </Link>

          <Link className={`flex items-center gap-4 px-2.5 ${active === "Add-Skill" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={() => setActive("Add-Skill")}>
            <PencilRuler className='h-5 w-5' />
          </Link>

          <Link className={`flex items-center gap-4 px-2.5 ${active === "Add-Application" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={() => setActive("Add-Application")}>
            <LayoutGrid className='h-5 w-5' />
          </Link>
          <Link
            className={`flex items-center gap-4 px-2.5 ${active === "Profile"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground "
              }`}
            onClick={() => setActive("Account")}
          >
            <User className="h-5 w-5" />

          </Link>

          <Link className={`flex items-center gap-4 px-2.5 ${active === "Add-Timeline" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={() => setActive("Add-Timeline")}>
            <History className='h-5 w-5' />
          </Link>

          <Link className={`flex items-center gap-4 px-2.5 ${active === "Messages" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={() => setActive("Messages")}>
            <MessageSquare className='h-5 w-5' />
          </Link>

          <Link className={`flex items-center gap-4 px-2.5 ${active === "Logout" ? "text-foreground" : "text-muted-foreground hover:text-foreground "}`}
            onClick={handleLogout}>
            <LogOut className='h-5 w-5' />
          </Link>
        </nav>
      </aside>





      <div className='border-2  overflow-x-hidden ml-20 mr-20 bg-slate-100'>
        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
              break;
            case "Add-Project":
              return <AddProject />;
              break;
            case "Add-Skill":
              return <AddSkill />;
              break;
            case "Add-Application":
              return <AddSoftwareApplications />;
              break;
            case "Add-Timeline":
              return <AddTimeline />;
              break;
            case "Messages":
              return <Messages setActive={setActive} />;
              break;
            case "Account":
              return <Account />;
              break;

            default:
              return <Dashboard />;
              break;
          }

        })()}
      </div>
    </div>
  )
}
