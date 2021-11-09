import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'
import { dinero, toFormat } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    prepare: (value: number) => {
      const factor = USD.base ** USD.exponent;
      const amount = Math.round(value * factor);

      const price = dinero({ amount, currency: USD });
      return price.toJSON().amount
    },
    consume: (value: number) => {
      const price = dinero({amount: value, currency: USD})
      return parseFloat(toFormat(price, ({ amount }) => `${amount}`));
    },
  }
  )
  public price: number

  @column()
  public groupId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => Group)
  public groups: ManyToMany<typeof Group>
}
