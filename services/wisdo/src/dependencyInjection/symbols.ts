export interface MembershipSymbols {
    Util: symbol;
    LocaleUtil: symbol;
    HttpClient: symbol;
    Authenticate: symbol;

    Bootstrap: symbol;
    DBFactory: symbol;
    MiddlewaresValidateBody: symbol;

    ApiRoutes: symbol;
    V1Routes: symbol;

    HealthRoutes: symbol;
    HealthController: symbol;

    AuthRoutes: symbol;
    AuthController: symbol;

    UsersController: symbol;
    UsersRoutes: symbol;
    UsersService: symbol;
    UserUtil: symbol;

    CommunitiesController: symbol;
    CommunitiesRoutes: symbol;
    CommunitiesService: symbol;

    PostsController: symbol;
    PostsRoutes: symbol;
    PostsService: symbol;

    JWT_SECRET: symbol;
}

export const Symbols: MembershipSymbols = {
    Util: Symbol('Util'),
    LocaleUtil: Symbol('LocaleUtil'),
    HttpClient: Symbol('HttpClient'),
    Authenticate: Symbol('Authenticate'),
    Bootstrap: Symbol('Bootstrap'),
    DBFactory: Symbol('DBFactory'),
    MiddlewaresValidateBody: Symbol('MiddlewaresValidateBody'),

    ApiRoutes: Symbol('ApiRoutes'),
    V1Routes: Symbol('V1Routes'),

    HealthRoutes: Symbol('HealthRoutes'),
    HealthController: Symbol('HealthController'),

    AuthRoutes: Symbol('AuthRoutes'),
    AuthController: Symbol('AuthController'),

    UsersController: Symbol('UsersController'),
    UsersRoutes: Symbol('UsersRoutes'),
    UsersService: Symbol('UsersService'),

    CommunitiesController: Symbol('CommunitiesController'),
    CommunitiesRoutes: Symbol('CommunitiesRoutes'),
    CommunitiesService: Symbol('CommunitiesService'),

    PostsController: Symbol('PostsController'),
    PostsRoutes: Symbol('PostsRoutes'),
    PostsService: Symbol('PostsService'),

    UserUtil: Symbol('UserUtil'),

    JWT_SECRET: Symbol('JWT_SECRET')
};