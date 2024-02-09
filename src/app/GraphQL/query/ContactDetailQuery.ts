import { gql } from '@apollo/client';

export default function getContactDetail(id: string) {
  return gql`
      query User {
        user(id: "${id}") {
          flowwwToken
          firstName
          lastName
          secondLastName
          phone
          email
          blockCommunications
          country
          commercialCheck
          privacyCheck
          phonePrefix
          city
          province
          address
          birthday
          dni
          postalCode
          id
          creationDate
          active
          taskInstances {
            status
            completedTime
            reason
            id
            creationDate
            active
            taskTemplate {
              name
              description
              identifier
              order
              cancellationPolicy
              agentPolicy
              skills
              id
              creationDate
              active
            }
            executions {
              status
              startTime
              endTime
              id
              creationDate
              active
            }
          }
          whatsapps {
            time
            text
            received
            id
            creationDate
            active
          }
          comments {
            time
            text
            id
            creationDate
            active
          }
          calls {
            startTime
            endTime
            status
            referenceId
            received
            id
            creationDate
            active
          }
          budgets {
            discountCode
            priceDiscount
            percentageDiscount
            totalPrice
            manualPrice
            totalPriceWithIVA
            flowwwId
            referenceId
            statusBudget
            id
            creationDate
            active
          }
        }
      }
    `;
}
