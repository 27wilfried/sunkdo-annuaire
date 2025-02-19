import React, { useState } from 'react';
import { BiSolidMoon, BiSolidSun, BiMenu } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import Person from "../../assets/person.svg";
import { useAuth } from '../../hooks/useAuth';

const Navlink = [
  { id: "5", name: "Ajouter un Partenaire", link: "/ajouter-partenaire" },
];

const Navbar = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='shadow-md bg-white dark:bg-dark dark:text-white duration-300 mt-5 p-5'>
      <div className='container md:py-0'>
        <div className='flex justify-between items-center'>
          {/* Logo avec lien vers la page d'accueil */}
          <Link to="/">
            <div>
              <img src={Logo} alt="logo" />
            </div>
          </Link>

          {/* Icône hamburger pour mobile */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-2xl'>
              <BiMenu />
            </button>
          </div>

          {/* Menu Desktop */}
          <div className='hidden md:flex items-center gap-8'>
            {user?.isAdmin && (
              <ul className='flex gap-4 items-center'>
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
            )}

            {/* Icône utilisateur (Desktop) */}
            <button
              onClick={() => {
                if (user?.isAdmin) {
                  navigate("/ajouter-partenaire");
                } else {
                  navigate("/auth");
                }
              }}
              className="w-30 h-30"
            >
              <img src={Person} alt="person" />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className='md:hidden bg-white dark:bg-dark shadow-lg rounded-lg mt-2 mx-4'>
            <ul className='flex flex-col gap-4 items-center py-4 px-6'>
              {user?.isAdmin && (
                <>
                  {Navlink.map((data) => (
                    <li key={data.id} className='w-full text-center'>
                      <Link
                        to={data.link}
                        className='block py-2 hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-500 text-lg font-medium'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}

              {/* Icône utilisateur (Mobile) */}
              <li className='w-full text-center'>
                <button
                  onClick={() => {
                    if (user?.isAdmin) {
                      navigate("/ajouter-partenaire");
                    } else {
                      navigate("/auth");
                    }
                    setIsMenuOpen(false); // Ferme le menu après la navigation
                  }}
                >
                  <img src={Person} alt="person" className="w-8 h-8 mx-auto" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
