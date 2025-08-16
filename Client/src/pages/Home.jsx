import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Tabs   from '../components/Tabs';
import { useNavigate } from 'react-router-dom';

import Signup from './signup.jsx';
import Signin from './signin.jsx';

const Home = () => {
  const [UserActivation, setUserActivation] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('');
  const navigate= useNavigate();
  const handleRoute=(route) => {
   navigate(route);
  }
  React.useEffect(() => {
    const user = localStorage.getItem("data.token");
    if (user) {
      setUserActivation(true);
    } else {
      setUserActivation(false);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("data.token");
    setUserActivation(false);
    navigate("/");
  }
  return (
    




    <main >
      <div className=" min-h-screen bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/dashboard-BG.png')" }}>
       <div className="">
        <div className='w-10' style={{ backgroundImage: "url('/default-Avatar.jpg')" }}></div>
       </div>
        <div className='px-20 '>

          <img src="/logo.png" alt="" className='h-40 object-contain ' />

        </div>
        <div>
          <h1 className="text-4xl font-bold font-serif px-20 text-[#1E3A8A]">
            Connect. Compete. <br /> Create.
          </h1>
        </div>
        {UserActivation===true&&(
          <div>
          <button  onClick={logout}  className="bg-[#e6c08b] mt-2  hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-5 border-2 border-[#e3b672] rounded active:rounded-md active:border-[#1E3A8A]">
            Exit CampusSphere
            </button>
          </div>
        )}
        {UserActivation===false && (
          <div>
            <button  onClick={()=>{handleRoute("/Signup")}}  className="bg-[#e6c08b] mt-2  hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-5 border-2 border-[#e3b672] rounded active:rounded-md active:border-[#1E3A8A]">
              Join CampusSphere
            </button>
          </div>
        )}
        {UserActivation===false && (
          <div>
            <button onClick={(signin)=>{handleRoute("/Signin")}}  className="bg-[#e6c08b] mt-2 hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-3 border-2 border-[#e3b672] rounded active:rounded-md  active:border-[#1E3A8A]">
              Access CampusSphere
            </button>
          </div>
        )}

        <div className="flex space-x-4 p-4">
      <Tabs
        label="Hackathons"
        isActive={activeTab === 'Hackathons'}
        onClick={() => setActiveTab('Hackathons')}
      />
      <Tabs
        label="Contests"
        isActive={activeTab === 'Contests'}
        onClick={() => setActiveTab('Contests')}
      />
      <Tabs
        label="Internships"
        isActive={activeTab === 'Internships'}
        onClick={() => setActiveTab('Internships')}
      />
      <Tabs
        label="Festivals"
        isActive={activeTab === 'Festivals'}
        onClick={() => setActiveTab('Festivals')}
      />
    </div>


      </div>
    </main>





  )
}

export default Home
