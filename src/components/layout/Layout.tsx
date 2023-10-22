import { Outlet } from 'react-router-dom';
import { Navigations } from '../navigations';
import { Topbar } from '../top-bar';

export const AppLayout = () => {
  return (
    <>
      <Topbar />
      <div className='pl-[260px] pt-16 relative'>
        <Navigations />
        <Outlet />
      </div>
    </>
  )
}