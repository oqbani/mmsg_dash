import { ReactNode, createContext } from "react";
import { FaHome } from "react-icons/fa";
import { FaBlog, FaUserDoctor, FaUserPlus, FaUserCheck } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

interface NavLinks {
  id: number;
  link: string;
  slug: string;
  icon: React.ComponentType;
}
export const NavLinksContext = createContext<NavLinks[] | null>(null);

const NavLinksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navlinks: NavLinks[] = [
    {
      id: 0,
      link: "dashboard",
      slug: "",
      icon: FaHome,
    },
    {
      id: 1,
      link: "blogs",
      slug: "blogs",
      icon: FaBlog,
    },
    {
      id: 2,
      link: "medecins",
      slug: "medecins",
      icon: FaUserDoctor,
    },
    {
      id: 3,
      link: "coordonnées",
      slug: "coordonnees",
      icon: TbListDetails,
    },
    {
      id: 4,
      link: "rendez-vous",
      slug: "rendez-vous",
      icon: RiCalendarScheduleLine,
    },
    {
      id: 5,
      link: "prescriptions",
      slug: "prescriptions",
      icon: IoIosPaper,
    },
    {
      id: 6,
      link: "candidatures",
      slug: "candidatures",
      icon: FaUserPlus,
    },
    {
      id: 7,
      link: "utilisateur",
      slug: "utilisateur",
      icon: FaUserCheck,
    },
  ];
  return (
    <NavLinksContext.Provider value={navlinks}>
      {children}
    </NavLinksContext.Provider>
  );
};

export default NavLinksProvider;
