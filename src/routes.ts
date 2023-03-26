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
    link: '/about',
    title: '关于',
    component: About,
  },
];
