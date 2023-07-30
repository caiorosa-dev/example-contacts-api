import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import StoreValidator from 'App/Validators/Category/StoreValidator'
import UpdateValidator from 'App/Validators/Category/UpdateValidator'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    return await Category.query().orderBy('name', 'asc')
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const category = await Category.create(data)

    return category
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    if (!id) return response.notAcceptable('Precisa informar id')

    const category = await Category.findOrFail(id)

    return category
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await request.validate(UpdateValidator)

    if (!id) return response.notAcceptable('Precisa informar id')

    const category = await Category.findOrFail(id)

    category.merge(data)
    await category.save()

    return category
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    if (!id) return response.notAcceptable('Precisa informar id')

    const category = await Category.findOrFail(id)

    await category.delete()

    return response.ok('Apagado')
  }
}
