import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractEnttiy<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
