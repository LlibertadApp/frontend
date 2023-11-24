import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { ReactNode } from 'react';
import spanishTranslations from '#/translations/es/es';

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'es',
	resources: {
		es: spanishTranslations,
	},
	returnNull: false,
});

interface Props {
	children: ReactNode;
}

const TranslationWrapper = ({ children }: Props) => {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export default TranslationWrapper;
