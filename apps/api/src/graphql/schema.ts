import { builder } from "./builder.js";
// Side-effect imports register scalars, root types, and fields on the singleton
// builder. Order matters: scalars and the empty roots must exist before the
// resolver modules attach their fields.
import "./scalars.js";
import "./roots.js";
import "./shared/success-message.js";
import "./shared/sort-order.js";
import "./user/user.type.js";
import "./user/inputs.js";
import "./user/me.js";
import "./user/register.js";
import "./user/login.js";
import "./user/signout.js";
import "./item/enums.js";
import "./item/size.type.js";
import "./item/item.type.js";
import "./item/inputs.js";
import "./item/item.query.js";
import "./item/items.query.js";

/** The assembled, executable GraphQL schema — the test seam and Yoga host. */
export const schema = builder.toSchema();
