import faunadb from "faunadb";
import "dotenv/config";
const q = faunadb.query;
const { Let, Do, Var } = q;

const runMe = function () {
  return Let(
    {
      thing1: 1,
    },
    Var("thing1")
  );
};

var client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

client.query(runMe).then((response) => console.log(response));
