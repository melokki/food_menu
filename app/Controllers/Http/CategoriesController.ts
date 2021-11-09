import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoriesController {
  public async index({response, logger}:HttpContextContract) {
    try {
      const categories = await Category.query().preload('items', (groupsQuery) => {
        groupsQuery.preload('groups', (optionsQuery) => {
          optionsQuery.preload('options')
        })
      }).preload('groups')

      return response.json({
        data: categories
      })

    } catch(error) {
      logger.error(error, 'Could not load menu categories')
      return response.badRequest({
        message: 'Could not load menu categories'
      })
    }
  }
  public async show({response, logger, params}: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.load('items', (groupsQuery) => {
        groupsQuery.preload('groups', (optionsQuery) => {
          optionsQuery.preload('options')
        })
      })
      await category.load('groups')

      return response.ok({
        data: category
      })

    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the category'
        })
      }
      logger.error(error, 'Could not show category information')
      return response.badRequest({
        message: 'Could not show category information'
      })
    }
  }

  public async store({request, response, logger}:HttpContextContract) {
    try {
      await request.validate(CreateCategoryValidator)
      const category = await Category.firstOrCreate({name: request.input('data.name')}, request.input('data'))
      return response.created({
        data: category,
        messag: 'Category successfully created'
      })
    } catch(error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.badRequest(error.messages)
      }
      logger.error(error, 'Could not store the caregory')
      return response.badRequest({
        message: 'Could not store the category'
      })
    }
  }

  public async update({request, response, logger, params}:HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id)
      category.merge(request.input('data'))

      await category.save()

      return response.ok({
        data: category,
        message: "Category successfully updated"
      })

    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the category'
        })
      }
      logger.error(error, 'Could not update the category')
      return response.badRequest({
        message: 'Could not update the category'
      })
    }
  }

  public async destroy({response, logger, params}: HttpContextContract) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()

      return response.ok({
        data: category,
        message: 'Category successfully deleted'
      })

    } catch(error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          message: 'Could not find the category'
        })
      }
      logger.error(error, 'Could not delete the category')
      return response.badRequest({
        message: 'Could not delete the category'
      })
    }
  }
}
