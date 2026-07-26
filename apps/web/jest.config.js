module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.test.json",
			},
		],
	},
	collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/"],
};
