/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { createI18nContext } from '@solid-primitives/i18n';
import './index.css';
import App from './App';
import zhCNMessages from './locale/zh_cn';
import enUSMessages from './locale/en_us';
import { I18nProvider } from './components/I18n/I18nProvider';

const messages = {
  en_US: enUSMessages,
  zh_CN: zhCNMessages,
};

render(
  () => (
    <Router>
      <I18nProvider locale="zh_CN" dict={messages}>
        <App />
      </I18nProvider>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
