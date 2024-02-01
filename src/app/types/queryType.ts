export class GraphQLQueryBuilder {
  constructor(
    private first: boolean,
    private fields: string[] | string,
    private after?: string,
    private before?: string,
    private limit?: number,
  ) {}

  buildQuery(entity: string, filters?: string, sortedBy?: string): string {
    let fieldsString: string;
    if (typeof this.fields === 'string') {
      fieldsString = this.fields;
    } else {
      fieldsString = this.fields.join('\n');
    }
    const afterString = this.after ? `, after: "${this.after}"` : '';
    const beforeString = this.before ? `, before: "${this.before}"` : '';
    const limitString = this.limit ? `${this.first ? 'first' : 'last'}: ${this.limit}` : 'first: 10';
    const sortString = sortedBy ? `${sortedBy}` : `creationDate: DESC`;

    let filterString = '';
    if (filters && typeof this.fields !== 'string') {
      filterString =
        this.fields
          .filter(field => field !== 'id')
          .map(field => `${field}.contains(\\"${filters}\\")`)
          .join(' || ');
    }
    
    const query = `
      query { 
        ${entity}(sort: [{ ${sortString} }] ${limitString}${afterString}${beforeString}${
      filterString ? `, filter: "${filterString}"` : ''
    }) {
          edges {
            node {
              ${fieldsString}
            }
            cursor
          }
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    `;
    return query;
  }
}

export default GraphQLQueryBuilder;
