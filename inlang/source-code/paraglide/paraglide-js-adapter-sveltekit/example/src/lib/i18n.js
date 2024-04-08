import { createI18n } from "@inlang/paraglide-js-adapter-sveltekit"
import * as runtime from "$paraglide/runtime.js"
import * as m from "$paraglide/messages.js"

export const i18n = createI18n(runtime, {
	pathnames: {
		"/about": m.about_path,
		"/users": {
			en: "/users",
			de: "/benutzer",
		},
		"/users/[id]": {
			en: "/users/[id]",
			de: "/benutzer/[id]",
		},
		"/users/[id]/edit": {
			en: "/users/[id]/edit",
			de: "/benutzer/[id]/bearbeiten",
		},
		"/some-subpage": {
			en: "/some-subpage",
			de: "/irgendeine-unterseite",
		},
		"/matchall/[...rest]": {
			en: "/matchall/[...rest]",
			de: "/joker/[...rest]",
		},
	},
	exclude: ["/base/not-translated"],
	textDirection: {
		en: "ltr",
		de: "ltr",
	},
})
