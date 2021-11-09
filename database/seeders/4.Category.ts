import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

const categories = [
  {
    id: 2861,
    name: 'Pizza',
    description: 'Best Pizza, authentic Italian style, fresh ingredients'
  },
  {
    id: 2862,
    name: 'Pasta',
    description: 'Delicious pasta'
  }
]

const categoryGroup = {
  2861: [3692],
  2862: []
}

export default class CategorySeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'
    const newCategoriues = await Category.updateOrCreateMany(uniqueKey,categories)
    newCategoriues.forEach(async newCategory => {
      try {
        await newCategory.related('groups').attach(categoryGroup[newCategory.id])
      } catch(error){}
    })

  }

}
