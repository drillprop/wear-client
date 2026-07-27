import { expect, test } from "vitest";
import { createUserToken, readUserIdFromToken } from "./token.js";

const SECRET = "test-secret";

test("a minted token round-trips back to its user id", () => {
	const token = createUserToken({ id: "user-1", email: "a@wear.test" }, SECRET);
	expect(readUserIdFromToken(token, SECRET)).toBe("user-1");
});

test("a malformed token yields null rather than throwing", () => {
	expect(readUserIdFromToken("not-a-jwt", SECRET)).toBeNull();
});

test("a token signed with a different secret is rejected", () => {
	const token = createUserToken({ id: "user-1", email: "a@wear.test" }, SECRET);
	expect(readUserIdFromToken(token, "other-secret")).toBeNull();
});
