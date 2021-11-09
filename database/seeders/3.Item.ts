import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Item from 'App/Models/Item'

const items = [
  {
    id: 9240,
    name: 'Pizza Margherita',
    description:	"Tomato sauce, oregano, garlic and fresh basil",
    price: 8,
    categoryId: 2861
  },
  {
    id: 713427,
    name: 'Pizza Prosciutto',
    description: 'Splitted half / half. For each half you can choose your own toppings',
    price: 10,
    categoryId: 2861
  },
  {
    id: 9259,
    name: "Traditional Lasagna",
    description: "Home made pasta, ground beef, tomato sauce, bechamel sauce and parmesan",
    price: 11,
    categoryId: 2862
  },
  {
    id: 9260,
    name: "Spaghetti Pomodoro",
    description: "Spaghetti, tomatoes, mushrooms, garlic, basil",
    price: 9,
    categoryId: 2862
  },
  {
    id: 125860,
    name: "Spaghetti carbonara",
    description: "Spaghetti, bacon, egg, garlic, parsley",
    price: 15,
    categoryId: 2862
  }]

const itemsGroup = {
  9240: [],
  713427: [160392, 160393],
  9259: [],
  9260: [],
  125860: []
}
export default class ItemSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'
    const newItems = await Item.updateOrCreateMany(uniqueKey, items)
    newItems.forEach(async newItem => {
      try {
        await newItem.related('groups').attach(itemsGroup[newItem.id])

      }catch(error){}
    })
  }
}
