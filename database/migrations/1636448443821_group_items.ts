import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GroupItems extends BaseSchema {
  protected tableName = 'group_item'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('item_id').unsigned().references('items.id')
      table.integer('group_id').unsigned().references('groups.id')
      table.unique(['item_id', 'group_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
