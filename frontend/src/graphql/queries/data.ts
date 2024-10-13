import { graphql } from "../../../gql";
export const GetData = graphql(`
  #graphql
  query getData {
  getData {
    day
    age
    gender
    a
    b
    c
    d
    e
    f
  }
}
`);
