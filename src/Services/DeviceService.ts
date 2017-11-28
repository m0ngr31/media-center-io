import { Inject, Singleton } from 'typescript-ioc';

import { Device } from '../Models/Device';
import { User } from '../Models/User';
import DeviceRepository from '../Repositories/DeviceRepository';

@Singleton
export default class DeviceService {
  constructor( @Inject private deviceRepository: DeviceRepository) { }

  public async findOrCreate(device: Device, user: User): Promise<Device> {
    try {
      return await this.findByDeviceId(device.$device_id);
    } catch (e) {
      return await this.create(device, user);
    }
  }

  public async findById(id: number): Promise<Device> {
    return this.deviceRepository.findDeviceById(id);
  }

  public async findByDeviceId(deviceId: string): Promise<Device> {
    return this.deviceRepository.findDevicebyDeviceId(deviceId);
  }

  public async findAll(): Promise<Device[]> {
    return this.deviceRepository.getAllDevices();
  }

  public async create(device?: Device, user?: User): Promise<Device> {
    if (device && user)
      return this.deviceRepository.createDevice(device, user);
    else
      return this.deviceRepository.createDevice();
  }

  public async save(device: Device): Promise<Device> {
    return this.deviceRepository.saveDevice(device);
  }

  public async update(device: Device) {
    try {
      await this.deviceRepository.findDeviceById(device.$id);
      return this.deviceRepository.saveDevice(device);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('The given device does not exist yet.');
      }
    }
  }

  public async delete(deviceId: number) {
    return this.deviceRepository.deleteDeviceWithId(deviceId);
  }
}