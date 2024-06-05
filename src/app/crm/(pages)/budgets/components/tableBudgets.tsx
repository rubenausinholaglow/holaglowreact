'use client';
import { useEffect, useState } from 'react';
import { DocumentNode } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import DataTable from 'app/crm/components/table/DataTable';
import {
  createQuery,
  Cursor,
  TableQuery,
} from 'app/crm/components/table/TableFunctions';
import {
  BudgetsQueryResponse,
  BudgetsResponse,
  BudgetsResponseNode,
} from 'app/GraphQL/BudgetsQueryResponse';
import { ColumnDataTable } from 'app/GraphQL/common/types/column';
import { PageInfo } from 'app/GraphQL/PageInfo';
import { mapBudgetsData } from 'app/GraphQL/utils/utilsMapping';
import { createApolloClient } from 'lib/client';

export default function TableBudgets() {
  const [budgets, setBudgets] = useState<BudgetsResponseNode[] | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const columns: ColumnDataTable[] = [
    { label: 'ID', key: 'id', format: 'string' },
    { label: 'Fecha', key: 'creationDate', format: 'date' },
    { label: 'Cliente', key: 'fullName', format: 'string' },
    { label: 'Teléfono', key: 'user.phone', format: 'string' },
    { label: 'Comercial', key: 'professional.name', format: 'string' },
    {
      label: 'Importe',
      key: 'totalPrice',
      format: 'string',
    },
    { label: 'Servicios', key: 'services', format: 'string' },
    {
      label: 'Estado',
      key: 'statusBudget',
      format: 'status',
    },
  ];

  const columnsToIgnoreSearch: string[] = [
    'totalPrice',
    'statusBudget',
    'products.product',
    'products.title',
  ];
  const queryToExecute = [
    `
      id
      creationDate
      totalPrice
      statusBudget
      user {
        firstName
        lastName
        secondLastName
        phone
      }
      professional {
        name
      }
      products {
        product {
          title
        }
      }
    `,
  ];

  const entity = 'budgets';
  const client = createApolloClient(process.env.NEXT_PUBLIC_PATIENTS_API!, '');

  const fetchBudgets = async (query: DocumentNode, nextPage?: boolean) => {
    try {
      const { data } = await client.query<BudgetsQueryResponse>({
        query: query,
      });
      if (data.budgets.edges) {
        updateCursor(data.budgets, nextPage);
        setPageInfo(data.budgets.pageInfo);
        setTotalCount(data.budgets.totalCount);
        const budgetsData = data.budgets.edges.map(edge => edge.node);
        const mappedBudgets = mapBudgetsData(budgetsData);
        setBudgets(mappedBudgets);
      } else {
        setErrorMessage(
          'Error cargando budgets - Contacte con el administrador'
        );
        Bugsnag.notify('Error getting budgets CRM');
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
      setErrorMessage('Error cargando budgets - Contacte con el administrador');
      Bugsnag.notify('Error getting budgets CRM');
    }
  };

  const updateCursor = (budgetsData: BudgetsResponse, nextPage = false) => {
    const createCursor = (): Cursor => {
      return {
        startCursor: budgetsData.pageInfo.startCursor,
        endCursor: budgetsData.pageInfo.endCursor,
        hasNextPage: budgetsData.pageInfo.hasNextPage,
        hasPreviousPage: budgetsData.pageInfo.hasPreviousPage,
      };
    };
    if (nextPage) {
      setCursors(prev => [...prev, createCursor()]);
    }
  };

  useEffect(() => {
    executeQuery(true);
  }, []);

  const executeQuery = async (
    nextPage: boolean,
    stringFilter?: string,
    numberPerPage?: number,
    sortedBy?: string
  ) => {
    if (!nextPage) {
      setCursors(prev => prev.slice(0, -1));
    }
    const lastCursor = cursors[cursors.length - 2]?.endCursor || '';
    const nextCursor = cursors[cursors.length - 1]?.endCursor || '';
    const params: TableQuery = {
      nextPage,
      queryToExecute,
      entity,
      stringFilter,
      numberPerPage,
      sortedBy,
      lastCursor,
      nextCursor,
      columnsToIgnoreSearch,
    };
    const queryBuilders = createQuery(params);
    await fetchBudgets(queryBuilders, nextPage);
  };

  return (
    <div>
      {budgets ? (
        <DataTable
          data={budgets}
          columns={columns}
          showActionsColumn={false}
          executeQuery={executeQuery}
          pageInfo={pageInfo!}
          totalCount={totalCount}
          entity={entity}
        />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Presupuestos...</p>
      )}
    </div>
  );
}
