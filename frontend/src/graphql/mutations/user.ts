import { graphql } from "../../../gql";
export const SignUp = graphql(`
  #graphql
  mutation Mutation(
    $name: String!
    $email: String!
    $password: String!
    $confirmPass: String!
  ) {
    signUp(
      name: $name
      email: $email
      password: $password
      confirmPass: $confirmPass
    )
  }
`);
