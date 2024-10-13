import { graphql } from "../../../gql";
export const LogIn = graphql(`
  #graphql
  query logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      name
      email
      token
    }
  }
`);

export const GetUser = graphql(`
  #graphql
  query getUser {
    getUser {
      id
      name
      email
      token
    }
  }
`);
