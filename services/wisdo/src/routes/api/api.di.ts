import { Container } from "inversify";
import { ApiRoutes} from './index';

export class ApiDi {
    public static registerDI(container: Container, symbols: any) {
        container.bind<ApiRoutes>(symbols.ApiRoutes).to(ApiRoutes);
    }
}
