import React from 'react';
import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // 🔹 Ajout de React Router
import Logo from "../../assets/logo.png";
import Person from "../../assets/person.svg";

const Navlink = [
  { id: "2", name: "Partenaires", link: "/#partenaires" },
  { id: "5", name: "Ajouter un Partenaire", link: "/ajouter-partenaire" }, // 🔹 Nouveau lien
];

const Navbar = ({ theme, setTheme }) => {
  return (
    <nav className='shadow-md bg-white dark:bg-dark dark:text-white duration-300'>
      <div className='container md:py-0'>
        <div className='flex justify-between items-center'>
          {/* 🔹 Logo */}
          <div>
            <img src={Logo} alt="logo" />
          </div>

          {/* 🔹 Menu Desktop */}
          <div className='hidden md:block'>
            <ul className='flex gap-4 items-center gap-8'>
              {Navlink.map((data) => (
                <li key={data.id} className='py-4'>
                  <Link
                    to={data.link}
                    className='py-2 hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 text-lg font-medium'
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🔹 Icône utilisateur */}
          <div className="w-30 h-30">
            <img src={Person} alt="person" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
