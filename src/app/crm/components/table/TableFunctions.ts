import { DocumentNode,gql } from '@apollo/client'; 
import GraphQLQueryBuilder from '@interface/queryType';

export interface Cursor {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CreateQuery {
  nextPage: boolean;
  stringFilter?: string;
  numberPerPage?: number;
  sortedBy?: string;
  columnKeys: string[];
  entity: string;
}

export function createQuery(
  params: CreateQuery,
  cursors: Cursor[],
): DocumentNode {
  const { nextPage, columnKeys, entity, stringFilter, numberPerPage, sortedBy } = params;

  const lastCursor = cursors[cursors.length - 2]?.endCursor || '';
  const nextCursor = cursors[cursors.length - 1]?.endCursor || '';


  const nextPageFlag = nextPage ? true : false;

  const queryBuilder = new GraphQLQueryBuilder(
    nextPageFlag,
    columnKeys,
    nextPage && !stringFilter && !sortedBy && !numberPerPage ? nextCursor : '',
    !nextPage && !stringFilter && !sortedBy && !numberPerPage ? lastCursor : '',
    numberPerPage ? numberPerPage : 10
  );

  const queryString = queryBuilder.buildQuery(entity, stringFilter, sortedBy);

  return gql(queryString);
}
