import { ColumnDataTable } from 'app/GraphQL/common/types/column';

export class GraphQLQueryBuilder {
  constructor(
    private first: boolean,
    private fields: string[] | string,
    private after?: string,
    private before?: string,
    private limit?: number,
    private columnsToIgnoreSearch?: string[]
  ) {}

  buildQuery(
    entity: string,
    filters?: string,
    sortedBy?: string,
    filterValue?: string
  ): string {
    let fieldsString: string;
    let fieldNames: string[];

    if (typeof this.fields === 'string') {
      fieldsString = this.fields;
      fieldNames = this.fields.split('\n').map(field => field.trim());
    } else {
      fieldsString = this.fields.join('\n');
      fieldNames = this.fields;
    }

    const afterString = this.after ? `, after: "${this.after}"` : '';
    const beforeString = this.before ? `, before: "${this.before}"` : '';
    const limitString = this.limit
      ? `${this.first ? 'first' : 'last'}: ${this.limit}`
      : 'first: 10';
    const sortString = sortedBy ? `${sortedBy}` : `creationDate: DESC`;

    let filterString = '';
    const fieldsArray = fieldsString
      .split('\n')
      .map(line => line.trim())
      .filter(
        line =>
          line !== '' &&
          !line.includes('id') &&
          !line.includes('creationDate') &&
          !line.includes('completedTime')
      );
    if (fieldsArray) {
      fieldNames = fieldsArray;
    }

    if (filters && fieldNames && !filterValue) {
      const parseNestedFields = (fieldsArray: string[]): string[] => {
        const filterableFields: string[] = [];

        let i = 0;
        while (i < fieldsArray.length) {
          const field = fieldsArray[i];
          if (field.includes('{')) {
            const base = field.split('{')[0].trim();
            let nextFieldIndex = i + 1;
            let nextField = fieldsArray[nextFieldIndex]?.trim();
            while (nextField && !nextField.includes('}')) {
              let fieldToFilter = `${base}.${nextField}`;
              fieldToFilter = fieldToFilter
                .replaceAll(' ', '')
                .replaceAll(',', '')
                .replaceAll('{', '');
              const shouldIgnore = !this.columnsToIgnoreSearch
                ? false
                : this.columnsToIgnoreSearch.findIndex(
                    x => x == fieldToFilter
                  ) >= 0;
              if (!shouldIgnore) {
                console.log(fieldToFilter);
                filterableFields.push(
                  `${fieldToFilter}.contains(\\"${filters}\\")`
                );
              }
              nextFieldIndex++;
              nextField = fieldsArray[nextFieldIndex]?.trim();
            }
            i = nextFieldIndex;
          } else if (!field.includes('}')) {
            const shouldIgnore = !this.columnsToIgnoreSearch
              ? false
              : this.columnsToIgnoreSearch.findIndex(x => x == field) >= 0;
            if (!shouldIgnore)
              filterableFields.push(`${field}.contains(\\"${filters}\\")`);
            i++;
          } else {
            i++;
          }
        }

        return filterableFields;
      };

      filterString = parseNestedFields(fieldsArray).join(' || ');
    }
    if (filterValue) filterString = filterValue;
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
