import { Component } from 'solid-js';
import { createI18nContext, I18nContext } from '@solid-primitives/i18n';

export const I18nProvider: Component<{
  dict?: Record<string, Record<string, any>>;
  locale?: string;
  children?: any;
}> = (props) => {
  const value = createI18nContext(props.dict, props.locale);

  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
};
