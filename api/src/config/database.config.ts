import { registerAs } from '@nestjs/config';
import { IsBoolean, isBoolean, IsOptional, IsString } from 'class-validator';
import { validateConfig } from 'src/common/utils/validate-config';

interface DatabaseConfigProps {
  cassandra_cluster_name?: string;
  cassandra_datacenter?: string;
  cassandra_endpoint_snitch?: string;
  cassandra_keyspace?: string;
  cassandra_auth_username?: string;
  cassandra_auth_password?: string;
}

class DatabaseConfigValidator {
  @IsString()
  @IsOptional()
  CASSANDRA_CLUSTER_NAME?: string = 'cassandra';

  @IsOptional()
  @IsString()
  CASSANDRA_DC?: string = 'datacenter1';

  @IsString()
  @IsOptional()
  CASSANDRA_ENDPOINT_SNITCH?: string = 'SimpleStrategy';

  @IsString()
  @IsOptional()
  CASSANDRA_KEYSPACE?: string = 'test_keyspace';

  @IsString()
  @IsOptional()
  CASSANDRA_AUTH_USERNAME?: string;

  @IsString()
  @IsOptional()
  CASSANDRA_AUTH_PASSWORD?: string;
}

// main config function
export default registerAs<DatabaseConfigProps>('database', () => {
  validateConfig(process.env, DatabaseConfigValidator);

  return {
    cassandra_cluster_name: process.env.CASSANDRA_CLUSTER_NAME!,
    cassandra_datacenter: process.env.CASSANDRA_DC,
    cassandra_endpoint_snitch: process.env.CASSANDRA_ENDPOINT_SNITCH,
    cassandra_keyspace: process.env.CASSANDRA_KEYSPACE!,
    cassandra_auth_username: process.env.CASSANDRA_AUTH_USERNAME,
    cassandra_auth_password: process.env.CASSANDRA_AUTH_PASSWORD,
  };
});
