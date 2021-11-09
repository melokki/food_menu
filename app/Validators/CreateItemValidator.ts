import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateItemValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    data: schema.object().members({
      name: schema.string(),
      description: schema.string(),
      price: schema.number()
    }),

  })


  public messages = {}
}
