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
  rows: string;
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
      host: this.options.host,
      port: this.options.port,
      user: this.options.name,
      password: this.options.pass,
      database: this.options.db,
    });
  }

  parseConditions(query: string = "test->asefasef->[key,value]") {
    const match =
      /(?<key>[\w\W\d\D]+)->(?<value>[\w\W\d\D]+)?->\[(?<rows>[\w\W\d\D,]+)\]/g.exec(
        query
      );
    if (!match) return;
    return {
      key: match.groups?.key,
      value: match.groups?.value,
      rows: match.groups?.rows
        .split(",")
        .map((v) => v.trim())
        .join(","),
      operator: "eq",
    } as SQLConditions;
  }

  run(condition: SQLConditions) {
    if (!this.connection) return;
    if (condition.operator === "eq") {
      this.connection.query("SELECT ? FROM ? WHERE ? = ?", [
        condition.rows,
        condition.key,
        condition.key,
        condition.value,
      ]);
    }
  }

  quqery(query: string) {
    if (!this.connection) return;
    const condition = this.parseConditions(query);
    if (!condition) return;
    this.run(condition);
  }
};
