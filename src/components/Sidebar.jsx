import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

import { logo } from '../assets';
import { links } from '../assets/constants';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState();

  // eslint-disable-next-line react/no-unstable-nested-components
  const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          to={item.to}
          key={item.name}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );

  return (
    <>
      <div className=" md:flex hidden  flex-col w-[240px] py-10 px-4 bg-[#191624] ">
        <img src={logo} alt="logo" className=" w-full h-14 object-contain" />
        <NavLinks />

      </div>
      {/* 手机屏幕下显示 */}
      <div className=" z-20 absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>
      <div className={` absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
