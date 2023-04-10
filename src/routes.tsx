import { RouteDefinition } from '@solidjs/router';
import { Component, JSX, lazy } from 'solid-js';
import ListIcon from '@suid/icons-material/List';
import InfoIcon from '@suid/icons-material/Info';
import HomeIcon from '@suid/icons-material/Home';
import SettingsIcon from '@suid/icons-material/Settings';
import StarIcon from '@suid/icons-material/Star';
import About from './entries/about/About';

interface IMenuDefine {
  link: string;
  title: string;
  component?: Component;
  icon: JSX.Element;
}

export const HOME_MENU: IMenuDefine = {
  link: '/',
  title: '欢迎',
  icon: <HomeIcon />,
};

export const MENU_LIST: IMenuDefine[] = [
  {
    link: '/all_list',
    title: 'menu_all_server_list',
    icon: <ListIcon />,
  },
  {
    link: '/invasion_list',
    title: 'menu_invasion_server_list',
    icon: <ListIcon />,
  },
  {
    link: '/ww2_invasion_list',
    title: 'menu_ww2_invasion_server_list',
    icon: <ListIcon />,
  },
  {
    link: '/mod_list',
    title: 'menu_mod_server_list',
    icon: <ListIcon />,
  },
  {
    link: '/favorite_list',
    title: 'menu_favorite',
    icon: <StarIcon />,
  },
  {
    link: '/setting',
    title: 'setting',
    icon: <SettingsIcon />,
  },
  {
    link: '/about',
    title: 'about',
    icon: <InfoIcon />,
  },
];

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./entries/home/Home')),
    children: [
      {
        path: '/all_list',
        component: lazy(() => import('./entries/allList/AllList')),
      },
      {
        path: '/invasion_list',
        component: lazy(() => import('./entries/invasionList/InvasionList')),
      },
      {
        path: '/ww2_invasion_list',
        component: lazy(
          () => import('./entries/ww2InvasionList/WW2InvasionList')
        ),
      },
      {
        path: '/mod_list',
        component: lazy(() => import('./entries/modList/ModList')),
      },
      {
        path: '/favorite_list',
        component: lazy(() => import('./entries/favoriteList/FavoriteList')),
      },
      {
        path: '/setting',
        component: lazy(() => import('./entries/setting/Setting')),
      },
      {
        path: '/about',
        component: lazy(() => import('./entries/about/About')),
      },
    ],
  },
  {
    path: '*',
    component: lazy(() => import('./entries/home/Home')),
  },
];
