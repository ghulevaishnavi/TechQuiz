import React from 'react'
import {navbarStyles} from '../assets/dummyStyles';
import { useNavigate } from 'react-router-dom';
import {useAuth, useUser} from '@clerk/react'

const Navbar = ({logoSrc = null, siteName="Tech Quiz Master", rightContent= null, onNavigate = null}) => {
  
  const [mobileOpen, setMobile] = useState(false);
  const {isSignedIn} = useUser();
  const {getToken} = useAuth();
  const navigate = useNavigate();
  const handleNavigate = (href) => {
    setMoblieOpen(false);
    if(onNavigate) return onNavigate(href);
    try {
        navigate(href);
    } catch (error) {
        window.location.href = href;

    }
  };
    return (
       <nav className={navbarStyles.nav}>
        <div className={navbarStyles.container}>
            <div className={navbarStyles.innerContainer}>
                <div className={navbarStyles.homeButton}>
                    <button type='button' onClick={() => handleNavigate("/dashboard")} className={navbarStyles.homeButton}>
                        <div className={navbarStyles.logoWrapper}>

                        </div>
                    </button>
                </div>
        </div>
     </div>
 </nav>
    )
}

export default Navbar