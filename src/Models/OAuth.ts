import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IOAuthCode {
  user: string,
  client: string,
  expiresAt: Date,
  authorizationCode: string
}

@Entity()
export class OAuthToken {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  public authorizationCode: string;

  @Column()
  private expiresAt: Date;

  @Column()
  private clientId: string;

  @Column()
  public userId: string;

  public static newToken(data: IOAuthCode): OAuthToken {
    const token = new OAuthToken();
    token.authorizationCode = data.authorizationCode;
    token.expiresAt = data.expiresAt;
    token.clientId = data.client;
    token.userId = data.user;

    return token;
  }

  public get $id(): number {
    return this.id;
  }

  public get $authorizationCode(): string {
    return this.authorizationCode;
  }

  public get $expiresAt(): Date {
    return this.expiresAt;
  }

  public get $clientId(): string {
    return this.clientId;
  }

  public get $userId(): string {
    return this.userId;
  }

  public set $authorizationCode(value: string) {
    this.authorizationCode = value;
  }

  public set $expiresAt(value: Date) {
    this.expiresAt = value;
  }

  public set $clientId(value: string) {
    this.clientId = value;
  }

  public set $userId(value: string) {
    this.userId = value;
  }
}
