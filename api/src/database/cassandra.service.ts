import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as CassandraClient, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService {
  client: CassandraClient;
  mapper: mapping.Mapper;

  constructor(private readonly configService: ConfigService) {}

  private createClient() {
    this.client = new CassandraClient({
      contactPoints: ['0.0.0.0'],
      keyspace: this.configService.get('database.secretKey'),
      localDataCenter: this.configService.get('database.cassandra_datacenter'),
      authProvider: new auth.PlainTextAuthProvider(
        this.configService.get('database.cassandra_auth_username'),
        this.configService.get('database.cassandra_auth_password'),
      ),
      //   credentials: {
      //     username: 'cassandra',
      //     password: 'cassandra',
      //   },
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions); // mappingoptions in them u have to define your database entites
  }
}
