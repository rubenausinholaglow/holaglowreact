"use client";
import { ApolloClient, ApolloLink,HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {

  const authLink = new ApolloLink((operation, forward) => {

    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjU2MDQxMjQzLWRhMGMtNGM2Ni1iZWI4LTBjMzgxZjM1OTVhOCIsInN1YiI6InJ1YmVuLmF1c2luQGhvbGFnbG93LmNvbSIsImVtYWlsIjoicnViZW4uYXVzaW5AaG9sYWdsb3cuY29tIiwianRpIjoiNDZjODNmZDEtMGNlOS00YjI5LWJiOTUtNjNiOThiOGEzODQ1IiwibmJmIjoxNzA2MTc2NTA3LCJleHAiOjE3MDYyMTI1MDcsImlhdCI6MTcwNjE3NjUwNywiaXNzIjoiSG9sYWdsb3ciLCJhdWQiOiJDUk0ifQ.ODmvkxkeSUTio7iOv4Z-uXV_04jiGPArbvqFzN7lEfY"; // Replace with your actual token

   /* operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });*/

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      authLink, 
      new HttpLink({
        uri: "https://localhost:7096/graphql",
        //uri: "https://rickandmortyapi.com/graphql",
      }),
    ]),
  });
});
