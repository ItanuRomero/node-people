import Joi from "joi";

export type People = {
    apelido: string
    nome: string
    nascimento: string
    stack?: string[]
}

export const peopleSchema = Joi.object({
    apelido: Joi.string().min(1).required(),
    nome: Joi.string().min(1).required(),
    nascimento: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .custom((value, helpers) => {
            const date = new Date(value);
            if (date.toISOString().slice(0, 10) !== value) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .required(),
    stack: Joi.array()
        .items(Joi.string().min(1)).allow(null)
});


export function validatePeople(people: People) {
    const { error, value } = peopleSchema.validate(people);

    if (error) {
        let statusCode = 400;

        const { nome, apelido } = people

        if (error.details.some(detail => detail.type === 'any.required') || !nome || !apelido) {
            statusCode = 422;
        } else if (error.details.some(detail => detail.type === 'string.base')) {
            statusCode = 400;
        }

        return { statusCode, error: error.details[0].message }
    }
    return { value }
}