import { AbstractEnttiy } from 'src/database/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { USER_ROLE_ENUM } from '../enums/role.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User extends AbstractEnttiy<User> {
  @Column({ type: 'nvarchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'mediumtext', nullable: true })
  image: string;

  @Column({ type: 'nvarchar', unique: true }) // ,unique:true,
  email: string;

  @Column()
  @Exclude()
  @Expose({ name: 'hashedpassword' })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // ,default:new Date()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Expose({
    name: 'Verification date',
  })
  emailVerified: Date;

  @Column({ type: 'enum', enum: USER_ROLE_ENUM })
  role: USER_ROLE_ENUM;

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts: Account[];

  @OneToMany(() => Session, (session) => session.user, { cascade: true })
  sessions: Session[];

  // relations
  // @ManyToOne(()=>Post,post=>post.owner)
  // posts: Post[]

  // @ManyToMany(()=> Post, post=>post.users)
  // @JoinTable()
  // savedPosts: Post[]
}

@Entity()
@Unique(['provider', 'providerAccountId'])
export class Account extends AbstractEnttiy<Account> {
  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  provider: string;

  @Column()
  providerAccountId: string;

  @Column({ type: 'text', nullable: true })
  refresh_token: string;

  @Column({ type: 'text', nullable: true })
  access_token: string;

  @Column({ type: 'int', nullable: true })
  expires_at: number;

  @Column({ nullable: true })
  token_type: string;

  @Column({ nullable: true })
  scope: string;

  @Column({ type: 'text', nullable: true })
  id_token: string;

  @Column({ nullable: true })
  session_state: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

@Entity()
export class Session extends AbstractEnttiy<Session> {
  @Column()
  sessionToken: string;

  @Column()
  userId: string;

  @Column({ type: 'timestamp' })
  expires: Date;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

@Entity()
@Unique(['identifier', 'token'])
export class VerificationToken extends AbstractEnttiy<VerificationToken> {
  @Column()
  identifier: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expires: Date;
}
