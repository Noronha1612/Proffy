import { Request, Response } from 'express';

import convertHourToMinutes from '../utils/convertHourToMinutes';

import db from '../database/connection';

interface Schedule {
    week_day: number;
    from: string;
    to: string;
}

class classes {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const time = filters.time as string;
        const week_day = filters.week_day as string;

        if ( !filters.subject || !filters.week_day || !filters.time ) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time);
    
        const classes = await db('classes')
            .whereExists(function() {
                this.select("class_schedule.*")
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {    
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });

            const user_id = insertedUsersIds[0];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const class_id = insertedClassesIds[0];

            const formatedSchedule = schedule.map((sch: Schedule) => {
                return {
                    week_day: sch.week_day,
                    from: convertHourToMinutes(sch.from),
                    to: convertHourToMinutes(sch.to),
                    class_id
                };
            });

            await trx('class_schedule').insert(formatedSchedule);

            await trx.commit();

            return response.status(201).json();
        }
        catch (err) {
            await trx.rollback();

            return response.status(400).json({ error: 'Unexpected error while creating new class' });
        }
    }
}

export default classes;