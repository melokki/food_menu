import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import CreateItemValidator from 'App/Validators/CreateItemValidator'

export default class ItemsController {
  public async index({response, logger}:HttpContextContract) {
    try {
      const items = await Item.query().preload('groups', (groupsQuery) => {
        groupsQuery.preload('options')
      })

      return response.json({
        data: items
      })

    } catch(error) {
      logger.error(error, 'Could not load menu items')
      return response.badRequest({
        message: 'Could not load menu items'
      })
    }
  }
  public async show({response, logger, params}: HttpContextContract) {
    try {
      const item = await Item.findOrFail(params.id)

      return response.ok({
        data: item
      })
    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the item'
        })
      }
      logger.error(error, 'Could not show item information')
      return response.badRequest({
        message: 'Could not show item information'
      })
    }
  }

  public async store({request, response, logger}:HttpContextContract) {
    try {
      await request.validate(CreateItemValidator)
      const category = await Item.firstOrCreate({name: request.input('data.name')}, request.input('data'))
      return response.created({
        data: category,
        messag: 'Item successfully created'
      })
    } catch(error) {
      logger.error(error, 'Could not create the item')
      return response.badRequest({
        message: 'Caould not create the item'
      })
    }
  }

  public async update({request, response, logger, params}:HttpContextContract) {
    try {
      const item = await Item.findOrFail(params.id)
      item.merge(request.input('data'))

      await item.save()

      return response.ok({
        data: item,
        message: "Item successfully updated"
      })

    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the item'
        })
      }
      logger.error(error, 'Could not update the item')
      return response.badRequest({
        message: 'Could not update the item'
      })
    }
  }

  public async destroy({response, logger, params}: HttpContextContract) {
    try {
      const item = await Item.findOrFail(params.id)
      await item.delete()

      return response.ok({
        data: item,
        message: 'Item successfully deleted'
      })

    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the item'
        })
      }
      logger.error(error, 'Could not delete the item')
      return response.badRequest({
        message: 'Could not delete the item'
      })
    }
  }
}
