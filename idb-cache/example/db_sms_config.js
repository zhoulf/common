export default {
  dbName: "sms",
  version: 1,
  tables: [
    {
      tableName: "user",
      option: { keyPath: "name" },
      indexs: [
        {
          key: "name",
          option:{
            unique: true
          }
        },
        {
          key: "age"
        },
        {
          key: "sex"
        }
      ]
    },
    {
      tableName: "menu",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "id",
          option:{
            unique: true
          }
        },
        {
          key: "pid"
        },
        {
          key: "name"
        },
        {
          key: "link"
        }
      ]
    },
    {
      tableName: "permision",
      option: { keyPath: "id" },
      indexs: [
        {
          key: "name"
        },
        {
          key: "f"
        },
        {
          key: "m"
        },
        {
          key: "d"
        }
      ]
    },
    {
      tableName: "biz",
      option: { keyPath: "sec_code" },
      indexs: [
        {
          key: "sec_code",
          option:{
            unique: true
          }
        },
        {
          key: "sec_name"
        }
      ]
    }
  ]
};
