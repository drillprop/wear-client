"use client";
import { useState } from "react";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";

/**
 * Sign-in / register client island. Toggles between the two mutation forms; the
 * server page ahead of it has already reverse-gated authenticated visitors.
 */
export default function SignContent() {
	const [isNewUser, setIsNewUser] = useState(false);
	return isNewUser ? (
		<Register setIsNewUser={setIsNewUser} />
	) : (
		<Login setIsNewUser={setIsNewUser} />
	);
}
