import "reflect-metadata";
import {Container} from 'inversify';
import {Bootstrap} from '../bootstarp';
import {DBFactory} from '../db';
import {Symbols} from './symbols';

import {ApiDi} from '../routes/api';
import {V1Di} from '../routes/api/v1';
import {HealthDi} from '../routes/api/v1/health';
import {UsersDi} from '../routes/api/v1/users';
import {ServicesDi} from '../services';

import {LocaleUtil, Util} from '../lib';
import {HttpClient} from '../lib/HttpClient';
import {Authenticate} from '../middleware/authenticate';

import {MiddlewaresValidateBody} from '../middleware/validate-body';
import {CommunitiesDi} from "../routes/api/v1/communities";
import {PostsDi} from "../routes/api/v1/posts";

const container = new Container();

ApiDi.registerDI(container, Symbols);
V1Di.registerDI(container, Symbols);
HealthDi.registerDI(container, Symbols);
UsersDi.registerDI(container, Symbols);
CommunitiesDi.registerDI(container, Symbols);
PostsDi.registerDI(container, Symbols);

ServicesDi.registerDI(container, Symbols);

container.bind<Bootstrap>(Symbols.Bootstrap).to(Bootstrap);
container.bind<DBFactory>(Symbols.DBFactory).to(DBFactory);
container.bind<MiddlewaresValidateBody>(Symbols.MiddlewaresValidateBody).to(MiddlewaresValidateBody);
container.bind<Util>(Symbols.Util).to(Util);
container.bind<LocaleUtil>(Symbols.LocaleUtil).to(LocaleUtil);
container.bind<HttpClient>(Symbols.HttpClient).to(HttpClient).inSingletonScope();
container.bind<Authenticate>(Symbols.Authenticate).to(Authenticate);

container.bind<string>(Symbols.JWT_SECRET).toConstantValue(process.env.JWT_SECRET);

export default container;
