import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GroupOptions extends BaseSchema {
  protected tableName = 'group_option'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('option_id').unsigned().references('options.id')
        table.integer('group_id').unsigned().references('groups.id')
        table.unique(['group_id', 'option_id'])
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
