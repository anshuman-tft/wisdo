import * as express from 'express';
/**
 * We are using
 * - "import cors from 'cors'" instead of "import * as cors from 'cors'"
 * So to use this, we made changes in gruntfile.js by adding options
 * allowSyntheticDefaultImports: true, esModuleInterop: true,
 */
import cors from "cors";

export class Cors {

    public static implementCors(app: express.Application){
        const corsOptions: any = {
            allowedHeaders: ["Origin, X-Requested-With, Content-Type", "Authorization, Accept, Authorization"],
            methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: "*",
            preflightContinue: false
        };
        app.use(cors(corsOptions))
    }
}
