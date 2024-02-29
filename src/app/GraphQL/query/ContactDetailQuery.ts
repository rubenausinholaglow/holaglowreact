import { gql } from '@apollo/client';

export function getContactWithTasks(id: string) {
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
        agent {
          id
        }
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
    }
}
  `;
}

export function getContactComments(id: string) {
  return gql`
  query User {
    user(id: "${id}") {
      comments {
        time
        text
        id
        creationDate
        active
      }
    }
  }
  `;
}

export function getContactCalls(id: string) {
  return gql`
  query User {
    user(id: "${id}") {
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
    }
}
  `;
}

export function getContactBudget(id: string) {
  return gql`
  query User {
    user(id: "${id}") {
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
}
}
  `;
}

export function getContactWhatsapps(id: string) {
  return gql`
  query User {
    user(id: "${id}") {
      whatsapps {
        time
        text
        received
        id
        creationDate
        active,
        urlFile
    }
  }
}
  `;
}

export function getContactAppointment(id: string) {
  return gql`
  query User {
    user(id: "${id}") {
        leads {
            origin
            treatment
            productId
            treatmentPrice
            status
            closedReason
            id
            creationDate
            active
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
                    province
                    country
                }
                treatments {
                    id
                    creationDate
                    active
                    treatment {
                        product {
                            id
                            title
                            description
                            longDescription
                            active
                        }
                    }
                }
            }
        }
    }
}


  `;
}
