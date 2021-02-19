import {Container} from "inversify";
import {PostsController, PostsRoutes, PostsService} from './index';

export class PostsDi {
    public static registerDI(container: Container, symbols: any) {
        container.bind<PostsController>(symbols.PostsController).to(PostsController);
        container.bind<PostsRoutes>(symbols.PostsRoutes).to(PostsRoutes);
        container.bind<PostsService>(symbols.PostsService).to(PostsService);
    }
}
