import { roles } from "../../middleware/Authorization.middle.js";

const commentendpoint = {
  create: [roles.user, roles.admin, roles.superadmin],
};

export default commentendpoint;
