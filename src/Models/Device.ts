import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

import { User } from './User';

const encryptor = require('simple-encryptor')(process.env.ENCRYPT_KEY);

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private device_id: string;

  @ManyToOne(type => User, user => user.devices)
  public user: User;

  // Encrypt/decrypt device_id when setting or getting
  @BeforeInsert()
  beforeInsert() {
    this.encryptDeviceId();
  }

  @BeforeUpdate()
  beforeUption() {
    this.encryptDeviceId();
  }

  @AfterLoad()
  decryptConfig() {
    this.device_id = encryptor.decrypt(this.device_id);
  }

  private encryptDeviceId() {
    this.device_id = encryptor.encrypt(this.device_id);
  }

  public static newDevice(deviceId: string): Device {
    const device = new Device();
    device.device_id = deviceId;

    return device;
  }

  public get $id(): number {
    return this.id;
  }

  public get $device_id(): string {
    return this.device_id;
  }

  public get $user(): User {
    return this.user;
  }
}