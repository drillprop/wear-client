import type { Metadata } from "next";
import Profile from "@/components/Profile/Profile";

export const metadata: Metadata = { title: "wear | profile" };

export default function ProfilePage() {
	return <Profile />;
}
