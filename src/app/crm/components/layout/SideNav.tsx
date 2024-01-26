'use client';
import { useState } from 'react';
import { HOLAGLOW_COLORS } from '@utils/colors';
import { SideNavItem } from 'app/crm/types/SideNavItem';
import { SIDENAV_ITEMS } from 'app/crm/utils/constants';
import { SvgHolaglow } from 'app/icons/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNav = () => {
  return (
    <div
      className="md:w-56 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex flex-col m-4 rounded-xl"
      style={{ height: 'calc(100vh - 2rem)' }}
    >
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/crm/menu"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 pt-6 h-12 w-full"
        >
          <SvgHolaglow
            fill={HOLAGLOW_COLORS['secondary']}
            className="h-[24px] lg:h-[32px] w-[98px] lg:w-[130px]"
          />
        </Link>
        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item}></MenuItem>;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathName = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between ${
              pathName.includes(item.path) ? 'bg-zinc-100 text-white' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="font-semibold text-ms flex hover:text-hg-secondary">
                {item.title}
              </span>
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.submenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathName ? 'font-bold' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg  ${
            item.path === pathName
              ? 'bg-hg-secondary700 text-white hover:opacity-100'
              : ''
          }`}
        >
          <span className="font-semibold text-ms flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
