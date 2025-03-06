import { type UserConfig } from "vite";

export const builds: BuildConfig[] = [
	...createBuildMatrix({
		libraries: ["paraglide"],
		locales: [2],
		messages: [50],
		modes: ["spa-bundled"],
	}),
];

export function createViteConfig(args: {
	outdir: string;
	mode: string;
	library: string;
	base: string;
	generateAboutPage: boolean;
}): UserConfig {
	return {
		logLevel: "error",
		base: args.base,
		build: {
			outDir: args.outdir,
			minify: false,
			target: "es2024",
			// don't load the module preload to keep the bundle free
			// from side effects that could affect the benchmark
			//
			// doesn't work because of https://github.com/vitejs/vite/issues/18551
			modulePreload: false,
		},
		define: {
			// using process.env to make ssg build work
			"process.env.BASE": JSON.stringify(args.base),
			"process.env.MODE": JSON.stringify(args.mode),
			"process.env.LIBRARY": JSON.stringify(args.library),
			"process.env.GENERATE_ABOUT_PAGE": JSON.stringify(args.generateAboutPage),
			"process.env.IS_CLIENT": JSON.stringify("true"),
		},
	};
}

export function createBuildMatrix(config: {
	libraries: Array<BuildConfig["library"]>;
	locales: Array<number>;
	messages: Array<number>;
	modes: Array<BuildConfig["mode"]>;
	generateAboutPage?: boolean;
}): BuildConfig[] {
	const builds = [];
	for (const library of config.libraries) {
		for (const mode of config.modes) {
			for (const locale of config.locales) {
				for (const message of config.messages) {
					builds.push({
						library,
						locales: locale,
						messages: message,
						mode,
						generateAboutPage: config.generateAboutPage ?? false,
					});
				}
			}
		}
	}
	return builds;
}

export type BuildConfig = {
	locales: number;
	messages: number;
	mode: "spa-bundled" | "spa-on-demand" | "ssg";
	library: "paraglide" | "i18next";
	/**
	 * Mainly useful for testing routing.
	 */
	generateAboutPage: boolean;
};

export function buildConfigToString(config: BuildConfig): string {
	return `l${config.locales}-m${config.messages}-${config.mode}-${config.library}`;
}

export function buildConfigFromString(str: string): BuildConfig {
	const [locales, messages, mode, library] = str.split("-");
	return {
		locales: Number(locales),
		messages: Number(messages),
		mode: mode! as BuildConfig["mode"],
		library: library as BuildConfig["library"],
		generateAboutPage: false,
	};
}
