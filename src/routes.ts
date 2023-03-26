import { RouteDefinition } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import About from './entries/about/About';

interface IMenuDefine {
  link: string;
  title: string;
  component?: Component;
}

export const HOME_MENU: IMenuDefine = {
  link: '/',
  title: '欢迎',
};

export const MENU_LIST: IMenuDefine[] = [
  {
    link: '/all_list',
    title: '所有列表',
  },
  {
    link: '/about',
    title: '关于',
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
