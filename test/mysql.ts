import { SQL } from "../src/sql/ext-sql";

const sql = new SQL({
  db: "test",
  host: "192.168.1.5",
  name: "root",
  pass: "",
  port: 3306,
});

sql.parseConditions("test->asefasef");
