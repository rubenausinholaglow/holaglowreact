import { ApolloClient, DocumentNode, gql } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import GraphQLQueryBuilder from '@interface/queryType';
import { ColumnDataTable } from 'app/GraphQL/common/types/column';
import { createApolloClient } from 'lib/client';

export interface Cursor {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TableQuery {
  nextPage: boolean;
  queryToExecute: string[] | string;
  entity?: string;
  stringFilter?: string;
  numberPerPage?: number;
  sortedBy?: string;
  lastCursor?: string;
  nextCursor?: string;
  columnsToIgnoreSearch?: string[];
}

export function createQuery(
  params: TableQuery,
  filterValue?: string
): DocumentNode {
  const {
    nextPage,
    queryToExecute,
    entity,
    stringFilter,
    numberPerPage,
    sortedBy,
    lastCursor,
    nextCursor,
    columnsToIgnoreSearch,
  } = params;

  const nextPageFlag = nextPage ? true : false;

  const queryBuilder = new GraphQLQueryBuilder(
    nextPageFlag,
    queryToExecute,
    nextPage && !stringFilter && !sortedBy && !numberPerPage ? nextCursor : '',
    !nextPage && !stringFilter && !sortedBy && !numberPerPage ? lastCursor : '',
    numberPerPage ? numberPerPage : 10,
    columnsToIgnoreSearch
  );

  const queryString = queryBuilder.buildQuery(
    entity!,
    stringFilter,
    sortedBy,
    filterValue
  );
  return gql(queryString);
}

export async function executeQuery(params: TableQuery) {
  const query = createQuery(params);
  try {
    const client = createApolloClient(
      process.env.NEXT_PUBLIC_CONTACTS_API!,
      ''
    );
    const response = await fetchData(query, client);
    return response;
  } catch (error) {
    console.error('Error executing query:', error);
    return undefined;
  }
}

const fetchData = async (query: DocumentNode, client: ApolloClient<any>) => {
  try {
    const { data } = await client.query({ query });
    if (data) {
      return data;
    } else {
      Bugsnag.notify('Error getting data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    Bugsnag.notify('Error fetching data');
  }
};
