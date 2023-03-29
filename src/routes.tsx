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
    title: '所有服务器列表',
    icon: <ListIcon />,
  },
  {
    link: '/invasion_list',
    title: '官方入侵服务器列表',
    icon: <ListIcon />,
  },
  {
    link: '/ww2_invasion_list',
    title: '官方二战服务器列表',
    icon: <ListIcon />,
  },
  {
    link: '/favorite_list',
    title: '收藏服务器列表',
    icon: <StarIcon />,
  },
  {
    link: '/setting',
    title: '设置',
    icon: <SettingsIcon />,
  },
  {
    link: '/about',
    title: '关于',
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
          () => import('./entries/ww2InvasionList/Ww2InvasionList')
        ),
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
