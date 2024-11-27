import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";
import validate from "../middleware/payload-validation.middleware";
import {
  createUsersSchema,
  loginSchema,
  refreshTokenSchema,
} from "../utils/validations/AuthRequest";
import { verifyAccessToken } from "../middleware/auth.middleware";

const router = Router();
const authController = container.resolve(AuthController);

router.post(
  "/users",
  validate(createUsersSchema),
  authController.createUser.bind(authController)
);

router.get(
  "/users",
  verifyAccessToken,
  authController.getUsers.bind(authController)
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  "/refresh_token",
  validate(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

export default router;
