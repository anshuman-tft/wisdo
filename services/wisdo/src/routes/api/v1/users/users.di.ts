import { Container } from "inversify";
import { UsersController, UsersRoutes, UsersService} from './index';

export class UsersDi {
    public static registerDI(container: Container, symbols: any) {
        container.bind<UsersController>(symbols.UsersController).to(UsersController);
        container.bind<UsersRoutes>(symbols.UsersRoutes).to(UsersRoutes);
        container.bind<UsersService>(symbols.UsersService).to(UsersService);
    }
}
