import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SideBarData = [
    {
        title: 'Actor',
        path: '/',
        icon: <AiIcons.AiFillStar />,
        cName: 'nav-text'
    },
    {
        title: 'User',
        path: '/user',
        icon: <BsIcons.BsPeopleCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Movie',
        path: '/movie',
        icon: <IoIcons.IoIosFilm />,
        cName: 'nav-text'
    },
    {
        title: 'Show Time',
        path: '/showtime',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }
]