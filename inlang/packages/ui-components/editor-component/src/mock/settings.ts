import type { ProjectSettings } from "@inlang/sdk";

export const mockSettings: ProjectSettings = {
  $schema: "https://inlang.com/schema/project-settings",
  baseLocale: "en",
  locales: ["en", "de", "nl"],
  // lintConfig: [
  // 	{
  // 		ruleId: "messageBundleLintRule.inlang.identicalPattern",
  // 		level: "error",
  // 	},
  // ],
  modules: [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-i18next@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-identical-pattern@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js",
  ],
  "plugin.inlang.i18next": {
    pathPattern: {
      brain: "./frontend/public/locales/{languageTag}/brain.json",
      chat: "./frontend/public/locales/{languageTag}/chat.json",
      config: "./frontend/public/locales/{languageTag}/config.json",
      contact: "./frontend/public/locales/{languageTag}/contact.json",
      deleteOrUnsubscribeFormBrain:
        "./frontend/public/locales/{languageTag}/deleteOrUnsubscribeFormBrain.json",
      explore: "./frontend/public/locales/{languageTag}/explore.json",
      external_api_definition:
        "./frontend/public/locales/{languageTag}/external_api_definition.json",
      home: "./frontend/public/locales/{languageTag}/home.json",
      invitation: "./frontend/public/locales/{languageTag}/invitation.json",
      knowledge: "./frontend/public/locales/{languageTag}/knowledge.json",
      login: "./frontend/public/locales/{languageTag}/login.json",
      logout: "./frontend/public/locales/{languageTag}/logout.json",
      monetization: "./frontend/public/locales/{languageTag}/monetization.json",
      translation: "./frontend/public/locales/{languageTag}/translation.json",
      upload: "./frontend/public/locales/{languageTag}/upload.json",
      user: "./frontend/public/locales/{languageTag}/user.json",
    },
  },
};
