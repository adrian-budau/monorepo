import { newLixFile, openLixInMemory, uuidv4 } from "@lix-js/sdk"
import type { ProjectSettings } from "../schema/settings.js"
import { contentFromDatabase, createDialect, createInMemoryDatabase } from "sqlite-wasm-kysely"
import { Kysely, sql } from "kysely"

/**
 * Creates a new inlang project.
 *
 * The app is responsible for saving the project "whereever"
 * e.g. the user's computer, cloud storage, or OPFS in the browser.
 */
export async function newProject(args?: { settings?: ProjectSettings }): Promise<Blob> {
	const sqlite = await createInMemoryDatabase({
		readOnly: false,
	})
	const db = new Kysely({
		dialect: createDialect({
			database: sqlite,
		}),
	})

	try {
		await sql`
CREATE TABLE bundle (
  id TEXT PRIMARY KEY,
  alias TEXT NOT NULL
);

CREATE TABLE message (
  id TEXT PRIMARY KEY, 
  bundle_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  declarations TEXT NOT NULL,
  selectors TEXT NOT NULL
);

CREATE TABLE variant (
  id TEXT PRIMARY KEY, 
  message_id TEXT NOT NULL,
  match TEXT NOT NULL,
  pattern TEXT NOT NULL
);
  
CREATE INDEX idx_message_bundle_id ON message (bundle_id);
CREATE INDEX idx_variant_message_id ON variant (message_id);
		`.execute(db)

		const inlangDbContent = contentFromDatabase(sqlite)

		const lix = await openLixInMemory({ blob: await newLixFile() })

		// write files to lix
		await lix.db
			.insertInto("file")
			.values([
				{
					// TODO ensure posix paths validation with lix
					path: "/db.sqlite",
					// TODO let lix generate the id
					id: uuidv4(),
					data: inlangDbContent,
				},
				{
					path: "/settings.json",
					id: uuidv4(),
					data: await new Blob([
						JSON.stringify(args?.settings ?? defaultProjectSettings, undefined, 2),
					]).arrayBuffer(),
				},
			])
			.execute()
		return lix.toBlob()
	} catch (e) {
		throw new Error(`Failed to create new inlang project: ${e}`, { cause: e })
	} finally {
		sqlite.close()
		await db.destroy()
	}
}

const defaultProjectSettings = {
	$schema: "https://inlang.com/schema/project-settings",
	baseLocale: "en",
	locales: ["en", "de"],
	modules: [
		// for instant gratification, we're adding common rules
		// "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern@latest/dist/index.js",
		// "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation@latest/dist/index.js",
		// "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-without-source@latest/dist/index.js",
		// default to the message format plugin because it supports all features
		// "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@latest/dist/index.js",
		// the m function matcher should be installed by default in case Sherlock (VS Code extension) is adopted
		// "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@latest/dist/index.js",
	],
} satisfies ProjectSettings
