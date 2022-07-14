import faunadb from "faunadb";
import "dotenv/config";
const q = faunadb.query;
const { Let, Update, CreateFunction, Query, Do, Var, If, Exists, Lambda } = q;

const Second = function (theArg) {
  return Let(
    {
      thing1: "ok",
    },
    Var("thing1")
  );
};

const LetItBe = function () {
  return Do(
    Let(
      {
        thing1: 1,
      },
      Second(Var("thing1"))
    )
  );
};

const CreateOrUpdateFunction = function (obj) {
  return If(
    Exists(q.Function(obj.name)),
    Update(q.Function(obj.name), { body: obj.body, role: obj.role }),
    CreateFunction({ name: obj.name, body: obj.body, role: obj.role })
  );
};

const LetTest = CreateOrUpdateFunction({
  name: "let_test",
  body: Query(Lambda("ref", LetItBe())),
  role: "admin",
});

var client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.us.fauna.com",
});
client.query(LetTest).then((response) => console.log(response));
