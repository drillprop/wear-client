import { builder } from "./builder.js";
// Side-effect imports register scalars, root types, and fields on the singleton
// builder. Order matters: scalars and the empty roots must exist before the
// resolver modules attach their fields.
import "./scalars.js";
import "./roots.js";
import "./shared/success-message.js";
import "./shared/sort-order.js";
import "./address/address.type.js";
import "./user/user.type.js";
import "./user/inputs.js";
import "./user/me.js";
import "./user/register.js";
import "./user/login.js";
import "./user/signout.js";
import "./user/personal-info.js";
import "./user/newsletter.js";
import "./user/delete-account.js";
import "./user/change-role.js";
import "./user/users.js";
import "./user/user.query.js";
import "./user/reset-password.js";
import "./user/change-password.js";
import "./address/update-address.js";
import "./item/enums.js";
import "./item/size.type.js";
import "./item/item.type.js";
import "./item/inputs.js";
import "./item/item.query.js";
import "./item/items.query.js";
import "./item/create-item.js";
import "./item/update-item.js";
import "./item/delete-item.js";
import "./order/enums.js";
import "./order/ordered-item.type.js";
import "./order/order.type.js";
import "./order/inputs.js";
import "./order/create-order.js";
import "./order/delete-order.js";
import "./order/manage-order.js";
import "./order/customer-orders.query.js";
import "./order/admin-orders.query.js";

/** The assembled, executable GraphQL schema — the test seam and Yoga host. */
export const schema = builder.toSchema();
