import { gql } from '@apollo/client';

export function getPendingTasks() {
  return gql`
    query User {
      taskInstances(
        sort: [{ creationDate: DESC }]
        first: 10
        filter: "status == Pending"
      ) {
        totalCount
        edges {
          cursor
          node {
            completedTime
            reason
            id
            creationDate
            active
            status
            taskTemplate {
              name
            }
            user {
              firstName
              lastName
              agent {
                username
              }
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;
}
