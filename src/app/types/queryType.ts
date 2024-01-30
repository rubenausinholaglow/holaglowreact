export class GraphQLQueryBuilder {
  constructor(private fields: string[], private after?: string,  private before?: string, private limit?: number) {}

  buildQuery(entity: string): string {
    const fieldsString = this.fields.join('\n');
    const afterString = this.after ? `, after: "${this.after}"` : '';
    const beforeString = this.before ? `, before: "${this.before}"` : '';
    const limit = this.limit ? this.limit : 10;

    const allFields = [...this.fields]; 
    if (this.fields && this.fields.length > 0) {
      allFields.push(...this.fields);
    }

    const query =`
      query {
        ${entity}(first:${limit}${afterString}${beforeString}) {
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
