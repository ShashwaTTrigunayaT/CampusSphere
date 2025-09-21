import React, { act, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Tabs from '../components/Tabs';
import { useNavigate } from 'react-router-dom';

import Signup from './signup.jsx';
import Signin from './signin.jsx';
const logout = (setUserActivation,navigate) => {
    localStorage.removeItem("data.token");
    setUserActivation(false);
    navigate("/");
  }

const Home = () => {
  const [UserActivation, setUserActivation] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('');
  const navigate = useNavigate();
  const eventViewer = (tab) => {
    localStorage.setItem("activeTab", tab);
    
    navigate("/events");

  }
  const handleRoute = (route) => {
    navigate(route);
  }
  useEffect(() => {
    const user = localStorage.getItem("data.token");
    if (user) {
      setUserActivation(true);
    } 
  }, []);
  
  const profileImage = localStorage.getItem("data.profileImageURL");
  const name = localStorage.getItem("data.name");

  return (





    <main >
      <div className=" min-h-screen bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/dashboard-BG.png')" }}>
        {UserActivation === true && (
          <div className="flex justify-end">
            <p className="text-lg py-3 font-semibold text-[#1E3A8A] font-sans text-center">{name}</p>
            <img src={profileImage} alt="" className='w-10  rounded-3xl  mx-5 my-2  ' />
          </div>




        )}
        <div className='px-20 '>

          <img src="/logo.png" alt="" className='h-40 object-contain ' />

        </div>
        <div>
          <h1 className="text-4xl font-bold font-serif px-20 text-[#1E3A8A]">
            Connect. Compete. <br /> Create.
          </h1>
        </div>
        {UserActivation === true && (
          <div>
            <button onClick={() => logout(setUserActivation,navigate)} className="bg-[#e6c08b] mt-2  hover:bg-[#e6c08b] mx-20  text-[#1E3A8A] font-bold py-2 px-5 border-2 border-[#e3b672] rounded active:rounded-md active:border-[#1E3A8A]">
              Exit CampusSphere
            </button>
            <button onClick={() => handleRoute("/profile")} className="bg-[#e6c08b] mt-2  hover:bg-[#e6c08b] mx-20  text-[#1E3A8A] font-bold py-2 px-5 border-2 border-[#e3b672] rounded active:rounded-md active:border-[#1E3A8A]">
              Profile
            </button>
            
          </div>
          
        )}
        {UserActivation === false && (
          <div>
            <button onClick={() => { handleRoute("/Signup") }} className="bg-[#e6c08b] mt-2  hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-5 border-2 border-[#e3b672] rounded active:rounded-md active:border-[#1E3A8A]">
              Join CampusSphere
            </button>
          </div>
        )}
        {UserActivation === false && (
          <div>
            <button onClick={(signin) => { handleRoute("/Signin") }} className="bg-[#e6c08b] mt-2 hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-3 border-2 border-[#e3b672] rounded active:rounded-md  active:border-[#1E3A8A]">
              Access CampusSphere
            </button>
          </div>
        )}
        <div>
            <button onClick={() => { handleRoute("/About") }} className="bg-[#e6c08b] mt-2 hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-3 border-2 border-[#e3b672] rounded active:rounded-md  active:border-[#1E3A8A]">
              About CampusSphere
            </button>
          </div>
        <div>
            <button onClick={() => { handleRoute("/Contacts") }} className="bg-[#e6c08b] mt-2 hover:bg-[#e6c08b] mx-20 text-[#1E3A8A] font-bold py-2 px-3 border-2 border-[#e3b672] rounded active:rounded-md  active:border-[#1E3A8A]">
              Contacts CampusSphere
            </button>
          </div>


        <div className="flex space-x-4 p-4">
          <Tabs
            label="Hackathons"
            isActive={activeTab === 'Hackathons'}
            onClick={() => {
              setActiveTab('Hackathons');
              eventViewer('Hackathons');
            }}
          />
          <Tabs
            label="Contests"
            isActive={activeTab === 'Contests'}
            onClick={() => {
              setActiveTab('Contests');
              eventViewer('Coding Competition');
            }}
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
export default Home;
export { logout };

 
