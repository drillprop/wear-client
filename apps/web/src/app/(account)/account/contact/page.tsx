import type { Metadata } from "next";
import ContactDetails from "@/components/ContactDetails/ContactDetails";

export const metadata: Metadata = { title: "wear | contact details" };

export default function ContactPage() {
	return <ContactDetails />;
}
