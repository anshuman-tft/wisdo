import { Container } from "inversify";
import { HealthController, HealthRoutes} from './index';

export class HealthDi {
    public static registerDI(container: Container, symbols: any) {
        container.bind<HealthController>(symbols.HealthController).to(HealthController);
        container.bind<HealthRoutes>(symbols.HealthRoutes).to(HealthRoutes);
    }
}
