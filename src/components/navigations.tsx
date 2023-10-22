import { FC } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FaUser, FaClipboardList, FaMoneyBillAlt, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';
import { AiFillDashboard, AiFillTag } from 'react-icons/ai';
import { FaUserGroup } from 'react-icons/fa6';

export const Navigations: FC = () => {
  const location = useLocation();
  const navLinks = [
    {
      title: "Dashbord",
      icon: (<AiFillDashboard size={18} />),
      link: "/dashboard",
    },
    {
      title: "Products",
      icon: (<AiFillTag size={18} />),
      link: "/products",
    },
    {
      title: "Categories",
      icon: (<FaClipboardList size={18} />),
      link: "/category"
    },
    {
      title: "Orders",
      icon: (<FaBoxOpen size={18} />),
      link: "/orders",
      subMenus: [
        {
          title: "Invoices",
          icon: (<FaMoneyBillAlt size={18} />),
          link: "/invoices"
        },
        {
          title: "Payments",
          icon: (<FaMoneyCheckAlt size={18} />),
          link: "/payments"
        }
      ]
    },
    {
      title: "Customers",
      icon: (<FaUserGroup size={18} />),
      link: "/customers"
    },
  ]

  return (
    <div className='fixed inset-y-0 left-0 w-[260px] border-r border-r-gray-300 bg-white z-20 px-2 pt-20'>
      {navLinks.map((nav, parentIndex) => {
        return (
          <div className='relative' key={parentIndex}>
            <NavLink
              to={nav.link}
              className={({ isActive, isPending }) => `py-2.5 px-4 mx-2 flex flex-row items-center rounded-md cursor-pointer my-0.5 no-underline relative group
              ${!isActive ? 'hover:bg-blue-50' : ''} 
              ${isActive ? 'bg-blue-50 text-blue-500 is-active peer' : 'text-black opacity-80'}  
            `}
              key={parentIndex}
            >
              {nav.icon}
              <p className={`font-medium ml-4 flex flex-1}`}>
                {nav.title}
              </p>
              {!!nav.subMenus?.length && <i className='icon-ChevronDownMinor' />}
              {/* <span className='absolute left-0 top-1/2 -mt-2.5 h-5 bg-purple-800 w-1 hidden group-[.is-active]:block rounded-r-md'
              /> */}
            </NavLink>
            {nav.subMenus && nav.subMenus.some(n => location.pathname.includes(n.link)) && <span className='hidden peer is-active' />}
            {nav.subMenus?.map((nav, subIndex) =>
              <NavLink
                to={nav.link}
                className={({ isActive, isPending }) => `py-2.5 rounded-lg ml-6 mr-2 px-4 flex-row items-center cursor-pointer no-underline relative group z-[1]
                  ${!isActive && 'hover:bg-blue-50'} 
                  ${isActive ? 'bg-blue-50 text-blue-500 flex is-active peer' : 'text-[#444444] peer-[.is-active]:flex hidden'}  
                `}
                key={subIndex}
              >
                {/* <i className={`icon-${nav.icon} invisible text-xl`} /> */}
                {nav.icon}
                <p className='font-medium ml-4'>
                  {nav.title}
                </p>
                {/* <span className='absolute left-0 top-1/2 -mt-2.5 h-5 bg-purple-800 w-1 hidden group-[.is-active]:block rounded-r-md'
                /> */}
              </NavLink>
            )}
            <div className='absolute left-8 ml-0.5 top-10 bottom-0 border-l border-l-contrast-15 z-[0]'></div>
          </div>
        )
      })}
    </div>
  )
}


{/* <div className='fixed inset-y-0 left-0 w-[260px] border-r border-r-gray-300 bg-white z-20 px-4 pt-20'>
      {navLinks.map((nav, parentIndex) => {
        return (
          <div className='relative' key={parentIndex}>
            <NavLink
              to={nav.link}
              className={({ isActive, isPending }) => `py-1.5 px-4 mx-2 flex flex-row items-center rounded-lg bg-gray-200 cursor-pointer my-0.5 no-underline relative group
              ${!isActive ? 'hover:bg-purple-100' : ''} 
              ${isActive ? 'bg-purple-200 text-purple-700 is-active peer' : 'text-black opacity-80'}  
            `}
              key={parentIndex}
            >
              {nav.icon}
              <p className='font-medium ml-4 flex flex-1'>
                {nav.title}
              </p>
              {!!nav.subMenus?.length && <i className='icon-ChevronDownMinor' />}
              <span className='absolute left-0 top-1/2 -mt-2.5 h-5 bg-purple-800 w-1 hidden group-[.is-active]:block rounded-r-md'
              />
            </NavLink>
            {nav.subMenus && nav.subMenus.some(n => location.pathname.includes(n.link)) && <span className='hidden peer is-active' />}
            {nav.subMenus?.map((nav, subIndex) =>
              <NavLink
                to={nav.link}
                className={({ isActive, isPending }) => `py-1.5 rounded-lg ml-6 mr-2 px-4 flex-row items-center cursor-pointer no-underline relative group z-[1]
                  ${!isActive && 'hover:bg-purple-100'} 
                  ${isActive ? 'bg-purple-200 text-purple-700 flex is-active peer' : 'text-[#444444] peer-[.is-active]:flex hidden'}  
                `}
                key={subIndex}
              >
                <i className={`icon-${nav.icon} invisible text-xl`} />
                <p className='font-medium ml-0'>
                  {nav.title}
                </p>
                <span className='absolute left-0 top-1/2 -mt-2.5 h-5 bg-purple-800 w-1 hidden group-[.is-active]:block rounded-r-md'
                />
              </NavLink>
            )}
            <div className='absolute left-8 ml-0.5 top-10 bottom-0 border-l border-l-contrast-15 z-[0]'></div>
          </div>
        )
      })}
    </div> */}