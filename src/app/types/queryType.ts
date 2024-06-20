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

    if (filters && fieldNames) {
      const parseNestedFields = (fieldsArray: string[]): string[] => {
        let filterableFields: string[] = [];

        let i = 0;
        while (i < fieldsArray.length) {
          const field = fieldsArray[i];
          if (field.includes('{')) {
            const nextBase = field.split('{')[0].trim();
            const childRes = processChild(
              nextBase,
              this.columnsToIgnoreSearch,
              fieldsArray,
              filterableFields,
              filters,
              i
            );
            i = childRes.nextFieldIndex;
            filterableFields = childRes.filterableFields;
          } else if (!field.includes('}')) {
            filterableFields = processElement(
              field,
              this.columnsToIgnoreSearch,
              filters,
              filterableFields
            );
            i++;
          } else {
            i++;
          }
        }

        return filterableFields;
      };

      filterString = parseNestedFields(fieldsArray).join(' || ');
    }
    if (filterValue) {
      if (filterString)
        filterString = '(' + filterString + ') && ' + filterValue;
      else filterString = filterValue;
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
function processChild(
  base: string,
  columnsToIgnoreSearch: string[] | undefined,
  fieldsArray: string[],
  filterableFields: string[],
  filters: string,
  i: number
) {
  let nextFieldIndex = i + 1;
  let nextField = fieldsArray[nextFieldIndex]?.trim();
  while (nextField && !nextField.includes('}')) {
    let fieldToFilter = `${base}.${nextField}`;
    if (nextField.includes('{')) {
      const nextBase = nextField.split('{')[0].trim();
      fieldToFilter = `${base}.${nextBase}`;
      const childRes = processChild(
        fieldToFilter,
        columnsToIgnoreSearch,
        fieldsArray,
        filterableFields,
        filters,
        nextFieldIndex
      );
      filterableFields = childRes.filterableFields;
      nextFieldIndex = childRes.nextFieldIndex;
    } else {
      fieldToFilter = fieldToFilter
        .replaceAll(' ', '')
        .replaceAll(',', '')
        .replaceAll('{', '');
      filterableFields = processElement(
        fieldToFilter,
        columnsToIgnoreSearch,
        filters,
        filterableFields
      );
      nextFieldIndex++;
    }
    nextField = fieldsArray[nextFieldIndex]?.trim();
  }
  if (nextField.includes('}')) nextFieldIndex++;
  return { nextFieldIndex, filterableFields };
}

function processElement(
  field: string,
  columnsToIgnoreSearch: string[] | undefined,
  filters: string,
  filterableFields: string[]
): string[] {
  const shouldIgnore = !columnsToIgnoreSearch
    ? false
    : columnsToIgnoreSearch.findIndex(x => x == field) >= 0;
  if (!shouldIgnore)
    filterableFields.push(`${field}.contains(\\"${filters}\\")`);
  return filterableFields;
}
export default GraphQLQueryBuilder;
