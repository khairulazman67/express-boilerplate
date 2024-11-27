import { Request, Response, NextFunction } from "express";
import { autoInjectable, inject } from "tsyringe";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { IAuthService } from "../services/AuthService/IAuthService";
import { asyncHandler } from "../middleware/async-handler.middleware";

@autoInjectable()
export class AuthController {
  constructor(
    @inject("IAuthService")
    private authService: IAuthService
  ) {}

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.createUser(req.body);
    res.json(FormatterResponse.success(user, "User berhasil dibuat"));
  });

  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.authService.getUsers();
    res.json(FormatterResponse.success(users));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.login(req.body);
    res.json(FormatterResponse.success(user, "User berhasil login"));
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    res.json(
      FormatterResponse.success(
        await this.authService.refreshToken(req.body.refresh_token),
        "User berhasil login"
      )
    );
  });
}
