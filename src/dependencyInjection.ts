import { container } from "tsyringe";
import { IAuthService } from "./services/AuthService/IAuthService";
import { AuthService } from "./services/AuthService/AuthService";
import { IAuthRepository } from "./repositories/StockOpnameRepository/IAuthRepository";
import { AuthRepository } from "./repositories/StockOpnameRepository/AuthRepository";

container.registerSingleton<IAuthService>("IAuthService", AuthService);
container.registerSingleton<IAuthRepository>("IAuthRepository", AuthRepository);
