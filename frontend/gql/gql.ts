/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  #graphql\n  mutation Mutation(\n    $name: String!\n    $email: String!\n    $password: String!\n    $confirmPass: String!\n  ) {\n    signUp(\n      name: $name\n      email: $email\n      password: $password\n      confirmPass: $confirmPass\n    )\n  }\n": types.MutationDocument,
    "\n  #graphql\n  query getData {\n  getData {\n    day\n    age\n    gender\n    a\n    b\n    c\n    d\n    e\n    f\n  }\n}\n": types.GetDataDocument,
    "\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      id\n      name\n      email\n      token\n    }\n  }\n": types.LogInDocument,
    "\n  #graphql\n  query getUser {\n    getUser {\n      id\n      name\n      email\n      token\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation Mutation(\n    $name: String!\n    $email: String!\n    $password: String!\n    $confirmPass: String!\n  ) {\n    signUp(\n      name: $name\n      email: $email\n      password: $password\n      confirmPass: $confirmPass\n    )\n  }\n"): (typeof documents)["\n  #graphql\n  mutation Mutation(\n    $name: String!\n    $email: String!\n    $password: String!\n    $confirmPass: String!\n  ) {\n    signUp(\n      name: $name\n      email: $email\n      password: $password\n      confirmPass: $confirmPass\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getData {\n  getData {\n    day\n    age\n    gender\n    a\n    b\n    c\n    d\n    e\n    f\n  }\n}\n"): (typeof documents)["\n  #graphql\n  query getData {\n  getData {\n    day\n    age\n    gender\n    a\n    b\n    c\n    d\n    e\n    f\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      id\n      name\n      email\n      token\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query logIn($email: String!, $password: String!) {\n    logIn(email: $email, password: $password) {\n      id\n      name\n      email\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUser {\n    getUser {\n      id\n      name\n      email\n      token\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUser {\n    getUser {\n      id\n      name\n      email\n      token\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;