import * as Joi from 'joi';
import {injectable} from "inversify";

const JoiSchemas: any = {};

export enum BodyTypes {
    // Client request body
    UPDATE_POST_STATUS,
    ADD_POST,
    GET_POST_USER,
    GET_POST,
    CREATE_USER,
    AUTHENTICATE_USER,
    GET_USER,
    UPDATE_USER,
    UPDATE_USER_COMMUNITIES,

    CREATE_POST,
    UPDATE_POST,

    GET_COMMUNITY
}

@injectable()
export class MiddlewaresValidateBody {

    initValidationObject = () => {

        JoiSchemas[BodyTypes.ADD_POST] = Joi.object().keys({
            body: Joi.string().required(),
            summary: Joi.string().allow(null, '').max(150),
            title: Joi.string().max(60).required(), // Title text with up to 60 chars
            image: Joi.string().allow(null, ''),
            tags: Joi.array().items(Joi.string())
        });
        JoiSchemas[BodyTypes.GET_POST] = Joi.object().keys({
            postId: Joi.string().required()
        });
        JoiSchemas[BodyTypes.UPDATE_POST_STATUS] = Joi.object().keys({
            status: Joi.string().required()
        });

        JoiSchemas[BodyTypes.CREATE_USER] = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            image: Joi.string().allow(null, ''),
            countryId: Joi.string().required(),
            roleId: Joi.string().allow(null, '')
        });
        JoiSchemas[BodyTypes.AUTHENTICATE_USER] = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required()
        });
        JoiSchemas[BodyTypes.UPDATE_USER] = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            image: Joi.string().allow(null, ''),
            countryId: Joi.string().required(),
            roleId: Joi.string().allow(null, '')
        });
        JoiSchemas[BodyTypes.GET_USER] = Joi.object().keys({
            userId: Joi.string().required(),
        });
        JoiSchemas[BodyTypes.GET_POST_USER] = Joi.object().keys({
            userId: Joi.string().allow(null, '').optional(),
        });
        JoiSchemas[BodyTypes.GET_COMMUNITY] = Joi.object().keys({
            communityId: Joi.string().required()
        });
        JoiSchemas[BodyTypes.UPDATE_USER_COMMUNITIES] = Joi.object().keys({
            communities: Joi.array().items(Joi.string().required()).required()
        });
    };

    validateBody = async (type: any, requestBody: any): Promise<any> => {
        try {
            const schema: any = JoiSchemas[type];

            if (!schema) throw new Error('No validation schema has been implemented');
            return await Joi.validate(requestBody, schema);
        } catch (e) {
            throw e
        }
    }
}