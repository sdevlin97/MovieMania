import React from 'react';
import {Link} from "react-router-dom";

export const Header = () => {
  return (
    <header>
        <div className='container'>
            <div className='inner-content'>
                <div className='brand'>
                    <link to="/">Watchlist</link>
                </div>
                
                <ul className='"nav-links'>
                    <li>
                        <link to ='/'>Watch List</link>
                    </li>

                </ul>

            </div>
        </div>
    </header>
  )
}

export default Header;