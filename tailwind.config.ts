import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				yellow: "#F3CA52",
				red: "#C73659",
				blue: "#10439F",
				green: "#047857",
			},
			dropShadow: {
				leaderboard: "8px 8px 0 rgba(0, 0, 0, 1)",
				main: "12px 12px 0 rgba(0, 0, 0, 1)",
				button: "6px 6px 0 rgba(0, 0, 0, 1)",
				"button-hover": "3px 3px 0 rgba(0, 0, 0, 1)",
			},
		},
	},
	plugins: [],
};
export default config;
