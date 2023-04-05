import { useI18n } from '@solid-primitives/i18n';
import Translate from '../locale/en_us';

type TranslateKey = keyof typeof Translate;

export const useTranslate = () => {
  const [t] = useI18n();

  return (id: TranslateKey) => t(id);
};
