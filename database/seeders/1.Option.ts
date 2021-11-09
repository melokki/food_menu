import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Option from 'App/Models/Option'

export default class OptionSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'id'
    await Option.updateOrCreateMany(uniqueKey, [
      {
        id: 733146,
        name:	"Ham",
        price: 1.2,
      },
      {
        id:	733147,
        name:	"Mushrooms",
        price:	1.2,
      },
      {
        id:	733148,
        name:	"Salami",
        price:	1.2,
      },
      {
        id:	733149,
        name:	"Onion rings",
        price:	0.7,
      },

      {
        id: 733150,
        name: "Olives",
        price: 1.2
      },

      {
        id: 733153,
        name: "Corn",
        price: 1.2
      },
      {

        id: 9371,
        name: "Thick",
        price: 0
    },
    {
        id: 9372,
        name: "Crispy",
        price: 0
    }

    ])
  }
}
