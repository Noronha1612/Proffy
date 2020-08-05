import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

const routes = Router();

import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';

const classesController = new ClassesController();
const connectionController = new ConnectionController();

routes.get('/classes', classesController.index);
routes.post('/classes', celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        whatsapp: Joi.string().required(),
        bio: Joi.string().required(),
        subject: Joi.string().required(),
        cost: Joi.number().required(),
        schedule: Joi.array().items(Joi.object({
            week_day: Joi.number().required(),
            from: Joi.string().required(),
            to: Joi.string().required(),
        })).required(),
    })
}), classesController.create);

routes.get('/connections', connectionController.index);
routes.post('/connections', connectionController.create);

export default routes;