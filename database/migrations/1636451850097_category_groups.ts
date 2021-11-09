import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryGroups extends BaseSchema {
  protected tableName = 'category_group'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('category_id').unsigned().references('categories.id')
      table.integer('group_id').unsigned().references('groups.id')
      table.unique(['category_id', 'group_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
