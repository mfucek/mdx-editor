import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--color-primary)',
					strong: 'var(--color-primary-strong)',
					medium: 'var(--color-primary-medium)',
					weak: 'var(--color-primary-weak)'
				},
				neutral: {
					DEFAULT: 'var(--color-neutral)',
					strong: 'var(--color-neutral-strong)',
					medium: 'var(--color-neutral-medium)',
					weak: 'var(--color-neutral-weak)'
				},
				section: 'var(--color-section)',
				background: 'var(--color-background)',
				success: {
					DEFAULT: 'var(--color-success)',
					weak: 'var(--color-success-weak)'
				},
				danger: {
					DEFAULT: 'var(--color-danger)',
					strong: 'var(--color-danger-strong)',
					medium: 'var(--color-danger-medium)',
					weak: 'var(--color-danger-weak)'
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					strong: 'var(--color-warning-strong)',
					medium: 'var(--color-warning-medium)',
					weak: 'var(--color-warning-weak)'
				},
				info: {
					DEFAULT: 'var(--color-info)',
					strong: 'var(--color-info-strong)',
					medium: 'var(--color-info-medium)',
					weak: 'var(--color-info-weak)'
				},
				special: {
					black: 'var(--color-special-black)',
					white: 'var(--color-special-white)'
				}
			}
		},
		fontFamily: {
			gilroy: ['Gilroy', 'sans-serif'],
			nunito: ['Nunito Sans', 'sans-serif'],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'Liberation Mono',
				'Courier New'
			]
		}
	},
	plugins: [require('tailwindcss-3d')]
};
export default config;
