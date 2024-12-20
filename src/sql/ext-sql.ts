import mysql, { type Connection } from "mysql";

export interface SQLOptions {
  host: string;
  port: number;
  name: string;
  pass: string;
  db: string;
}

export interface SQLConditions {
  operator: string;
  value: string;
  key: string;
  table: string;
}

export const SQL = class {
  private options: SQLOptions;
  private connection: Connection | undefined;
  constructor(
    options: SQLOptions = {
      host: "",
      name: "",
      pass: "",
      port: 3306,
      db: "",
    }
  ) {
    this.options = options;
    this.connection = mysql.createConnection({
      host: options.host,
      port: options.port,
      user: options.name,
      password: options.pass,
      database: options.db,
    });
  }

  parseConditions(sql: string = "test->asefasef") {
    return {} as SQLConditions;
  }
};
