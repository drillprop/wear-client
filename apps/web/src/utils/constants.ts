import type { Category, Gender, SizeSymbol, UserRole } from "@/gql/graphql";

export const GenderArr: Gender[] = ["MAN", "WOMAN"];

export const CategoryArr: Category[] = [
	"TROUSERS",
	"DRESS",
	"BLOUSE",
	"TSHIRT",
	"SHIRT",
	"JACKET",
	"BLAZER",
	"SWEATSHIRT",
];

export const SizesArr: SizeSymbol[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const UserRoleArr: UserRole[] = ["ADMIN", "EMPLOYEE", "CUSTOMER"];
