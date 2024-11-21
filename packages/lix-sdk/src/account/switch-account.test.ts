import { test, expect } from "vitest";
import { openLixInMemory } from "../lix/open-lix-in-memory.js";
import { createAccount } from "./create-account.js";
import { switchAccount } from "./switch-account.js";

test("should switch the current account", async () => {
	const lix = await openLixInMemory({});

	// Create two accounts
	const account1 = await createAccount({ lix, name: "account1" });
	const account2 = await createAccount({ lix, name: "account2" });

	// Switch to account1
	await switchAccount({ lix, to: account1 });

	// Verify the current account is account1
	let currentAccount = await lix.db
		.selectFrom("current_account")
		.selectAll()
		.executeTakeFirstOrThrow();

	expect(currentAccount.id).toBe(account1.id);

	// Switch to account2
	await switchAccount({ lix, to: account2 });

	// Verify the current account is account2
	currentAccount = await lix.db
		.selectFrom("current_account")
		.selectAll()
		.executeTakeFirstOrThrow();

	expect(currentAccount.id).toBe(account2.id);
});

test("should handle switching to the same account", async () => {
	const lix = await openLixInMemory({});

	// Create an account
	const account = await createAccount({ lix, name: "account" });

	// Switch to the account
	await switchAccount({ lix, to: { id: account.id } });

	// Verify the current account is the created account
	let currentAccount = await lix.db
		.selectFrom("current_account")
		.selectAll()
		.executeTakeFirstOrThrow();

	expect(currentAccount.id).toBe(account.id);

	// Switch to the same account again
	await switchAccount({ lix, to: { id: account.id } });

	// Verify the current account is still the same account
	currentAccount = await lix.db
		.selectFrom("current_account")
		.selectAll()
		.executeTakeFirstOrThrow();

	expect(currentAccount.id).toBe(account.id);
});
