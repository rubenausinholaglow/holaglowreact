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
        budgets {
          flowwwId
          referenceId
          statusBudget
          id
          creationDate
          active
          products {
            quantity
            price
            priceDiscount
            percentageDiscount
            id
            creationDate
            active
            product {
              title
              isPack
              type
              firstRecurrency
              secondRecurrency
              order
              cardBackgroundColor
              unityType
              packMoreInformation
              productCardImagePosition
              emlaType
              numProductCardPhotos
              stripeId
              videoUrl
              id
              creationDate
              active
              description
              longDescription
              detail
            }
          }
          totalPriceWithIVA
          manualPrice
          totalPrice
          percentageDiscount
          priceDiscount
          discountCode
        }
        leads {
          appointments {
            date
            startTime
            endTime
            status
            cancelDate
            arrival
            finished
            boxId
            flowwwId
            doctoraliaId
            url
            id
            creationDate
            active
            clinic {
              city
            }
            treatments {
              treatment {
                product {
                  title
                  description
                  longDescription
                }
              }
            }
          }
        }
      }
    }
  `;
}
