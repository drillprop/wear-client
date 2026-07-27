import type { Metadata } from "next";
import AdminOrders from "@/components/AdminOrders/AdminOrders";

export const metadata: Metadata = { title: "wear | admin — orders" };

export default function AdminOrdersPage() {
	return <AdminOrders />;
}
