import { roles } from "../../middleware/Authorization.middle.js";

const postendpoint = {
  create: [roles.user, roles.admin, roles.superadmin],
  delete: [roles.user, roles.admin, roles.superadmin],
  update: [roles.user, roles.admin, roles.superadmin],
  like:[roles.user],
  unlike:[roles.user],

};

export default postendpoint;
