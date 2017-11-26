import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

import { Device } from './Device';

const encryptor = require('simple-encryptor')(process.env.ENCRYPT_KEY);

export interface IJWTobj {
  id: number,
  email: string,
  name: string,
  user_id: string,
  token?: string,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private email: string;

  @Column('text', {default: ''})
  private name: string;

  @Column()
  public user_id: string;

  @Column('text')
  private config: any;

  @Column({nullable: true})
  public accessToken: string;

  @Column({nullable: true})
  private accessTokenExpiresAt: Date;

  @Column({nullable: true})
  public refreshToken: string;

  @Column({nullable: true})
  private refreshTokenExpiresAt: Date;

  @OneToMany(type => Device, device => device.user)
  public devices: Device[];

  // Encrypt/decrypt config when setting or getting
  @BeforeInsert()
  beforeInsert() {
    this.encryptConfig();
  }

  @BeforeUpdate()
  beforeUption() {
    this.encryptConfig();
  }

  @AfterLoad()
  decryptConfig() {
    this.config = encryptor.decrypt(this.config);
  }

  private encryptConfig() {
    if (!this.config)
      this.config = {};
    this.config = encryptor.encrypt(this.config);
  }

  public static newUser(obj: {email?: string, name?: string, user_id?: string, config?: any}): User {
    const user = new User();

    if (obj.email)
      user.email = obj.email;
    if (obj.name)
      user.name = obj.name;
    if (obj.user_id)
      user.user_id = obj.user_id;
    if (obj.config)
      user.config = obj.config;

    return user;
  }

  public getObjForJwt(): IJWTobj {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      user_id: this.user_id,
    };
  }

  public get $id(): number {
    return this.id;
  }

  public get $email(): string {
    return this.email;
  }

  public get $name(): string {
    return this.name;
  }

  public get $user_id(): string {
    return this.user_id;
  }

  public get $config(): any {
    return this.config;
  }

  public get $accessToken(): string {
    return this.accessToken;
  }

  public get $accessTokenExpiresAt(): Date {
    return this.accessTokenExpiresAt;
  }

  public get $refreshToken(): string {
    return this.refreshToken;
  }

  public get $refreshTokenExpiresAt(): Date {
    return this.refreshTokenExpiresAt;
  }

  public get $devices(): Device[] {
    return this.devices;
  }

  public set $email(value: string) {
    this.email = value;
  }

  public set $name(value: string) {
    this.name = value;
  }

  public set $user_id(value: string) {
    this.user_id = value;
  }

  public set $config(value: any) {
    this.config = value;
  }

  public set $accessToken(value: string) {
    this.accessToken = value;
  }

  public set $accessTokenExpiresAt(value: Date) {
    this.accessTokenExpiresAt = value;
  }

  public set $refreshToken(value: string) {
    this.refreshToken = value;
  }

  public set $refreshTokenExpiresAt(value: Date) {
    this.refreshTokenExpiresAt = value;
  }
}