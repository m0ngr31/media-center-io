import { getManager } from 'typeorm';
import { Singleton } from 'typescript-ioc';

import { Device } from '../Models/Device';
import { User } from '../Models/User';

@Singleton
export default class DeviceRepository {
  constructor() { }

  protected getRepository() {
    return getManager().getRepository(Device);
  }

  public async getAllDevices(): Promise<Device[]> {
    return this.getRepository().find();
  }

  public async findDeviceById(id: number): Promise<Device> {
    const result = await this.getRepository().findOneById(id);
    if (!result) {
      throw new Error('No device was found for ID: ' + id);
    }
    return result;
  }

  public async findDevicebyDeviceId(device_id: string): Promise<Device> {
    const result = await this.getRepository().findOne({ device_id });
    if (!result) {
      throw new Error('No device was found for device_id: ' + device_id);
    }
    return result;
  }

  public async createDevice(device?: Device, user?: User): Promise<Device> {
    let newDevice = this.getRepository().create();

    if (device && user) {
      newDevice.$device_id = device.$device_id;
      newDevice.$user = user;

      newDevice = await this.saveDevice(newDevice);
    }

    return newDevice;
  }

  public async saveDevice(device: Device): Promise<Device> {
    return this.getRepository().save(device);
  }

  public async deleteDeviceWithId(id: number) {
    await this.getRepository()
      .createQueryBuilder('device')
      .delete()
      .where('device.id = :id', { id })
      .execute();
    return Promise.resolve();
  }
}