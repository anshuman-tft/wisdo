import {Container} from "inversify";
import {CommunitiesController, CommunitiesRoutes, CommunitiesService} from './index';

export class CommunitiesDi {
    public static registerDI(container: Container, symbols: any) {
        container.bind<CommunitiesController>(symbols.CommunitiesController).to(CommunitiesController);
        container.bind<CommunitiesRoutes>(symbols.CommunitiesRoutes).to(CommunitiesRoutes);
        container.bind<CommunitiesService>(symbols.CommunitiesService).to(CommunitiesService);
    }
}
