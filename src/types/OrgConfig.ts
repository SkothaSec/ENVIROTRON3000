export interface OrgConfig {
  orgName: string;
  userCount: number;
  locations: string[]; // array of country codes
  departments: string[]; // selected department names
  enableRemoteUsers: boolean;
  enableForeignRemoteUsers: boolean;
  dataSources: string[]; // selected data source names
}
