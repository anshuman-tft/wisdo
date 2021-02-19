import { Container } from "inversify";
import { V1Routes} from './index';

export class V1Di {
    public static registerDI(container: Container, symbols: any) {
        container.bind<V1Routes>(symbols.V1Routes).to(V1Routes);
    }
}
