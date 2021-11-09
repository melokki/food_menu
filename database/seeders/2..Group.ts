import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Group from 'App/Models/Group'

const groupsData = [
  {
    id: 160392,
    name: 'Toppings 1st half',
  },
  {
    id:	160393,
    name:	"Toppings 2nd half",
  },
  {
    id: 3692,
    name: 'Crust',
    required: true
  }
]
const groupOptions = {
  160392: [733146, 733147, 733148, 733149],
  160393: [733150, 733146, 733148, 733153],
  3692: [9371, 9372]
}

export default class GroupSeeder extends BaseSeeder {
  public async run () {
    groupsData.forEach(async group => {
      const newGroup = await Group.updateOrCreate({id: group.id}, group)
        try {
          await newGroup.related('options').attach(groupOptions[newGroup.id])
        } catch(error) {

        }
    })

  }
}
