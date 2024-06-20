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
import { useCrmStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { createApolloClient } from 'lib/client';

export default function TableBudgets() {
  const [budgets, setBudgets] = useState<BudgetsResponseNode[] | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const { setClinicId } = useCrmStore(state => state);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filterStatus, setFilterStatus] = useState('');
  const [clinicFlowwwId, setClinicFlowwwId] = useState('');
  const [cursors, setCursors] = useState<Cursor[]>([]);

  const columns: ColumnDataTable[] = [
    { label: 'ID', key: 'id', format: 'string' },
    { label: 'Fecha', key: 'creationDate', format: 'date' },
    { label: 'Cliente', key: 'fullName', format: 'string' },
    { label: 'Teléfono', key: 'user.phone', format: 'string' },
    { label: 'Comercial', key: 'professional.name', format: 'string' },
    {
      label: 'Importe',
      key: 'totalWithEuro',
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
    'totalPriceWithIVA',
    'statusBudget',
    'manualPrice',
    'priceDiscount',
    'percentageDiscount',
    'products.priceDiscount',
    'products.percentageDiscount',
    'products.product.title',
    'products.price',
    'clinicInfo.flowwwId',
  ];
  const queryToExecute = [
    `
      id
      creationDate
      totalPriceWithIVA
      statusBudget
      manualPrice
      priceDiscount
      percentageDiscount
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
        priceDiscount
        percentageDiscount
        price
      }
      clinicInfo {
        flowwwId
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
    if (clinicFlowwwId) executeQuery(true);
  }, [filterStatus, clinicFlowwwId]);

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const clinicId = params.get('clinicId') ?? '';
    setClinicFlowwwId(clinicId);
    setClinicId(clinicId);
    if (clinicFlowwwId) executeQuery(true);
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
    let filterValue = '';
    if (filterStatus != '') {
      filterValue =
        'statusBudget == ' +
        filterStatus +
        ' && clinicInfo.flowwwId == \\"' +
        clinicFlowwwId +
        '\\"';
    } else {
      filterValue = 'clinicInfo.flowwwId == \\"' + clinicFlowwwId + '\\"';
    }
    const queryBuilders = createQuery(params, filterValue);
    await fetchBudgets(queryBuilders, nextPage);
  };

  return (
    <div>
      {budgets ? (
        <>
          Filtro:{' '}
          <Button
            type="primary"
            customStyles="bg-hg-black500 mr-4"
            className={filterStatus !== 'Open' ? 'opacity-30' : ''}
            onClick={() => {
              if (filterStatus == 'Open') setFilterStatus('');
              else setFilterStatus('Open');
            }}
          >
            Pendiente
          </Button>
          <Button
            type="primary"
            customStyles="bg-hg-tertiary mr-4"
            className={filterStatus !== 'Contacted' ? 'opacity-30' : ''}
            onClick={() => {
              if (filterStatus == 'Contacted') setFilterStatus('');
              else setFilterStatus('Contacted');
            }}
          >
            En seguimiento
          </Button>
          <Button
            type="primary"
            customStyles="bg-hg-error mr-4"
            className={filterStatus !== 'Rejected' ? 'opacity-30' : ''}
            onClick={() => {
              if (filterStatus == 'Rejected') setFilterStatus('');
              else setFilterStatus('Rejected');
            }}
          >
            Rechazado
          </Button>
          <Button
            type="primary"
            customStyles="bg-hg-green mr-4"
            className={filterStatus !== 'Paid' ? 'opacity-30' : ''}
            onClick={() => {
              if (filterStatus == 'Paid') setFilterStatus('');
              else setFilterStatus('Paid');
            }}
          >
            Pagado
          </Button>
          <DataTable
            data={budgets}
            columns={columns}
            showActionsColumn={false}
            executeQuery={executeQuery}
            pageInfo={pageInfo!}
            totalCount={totalCount}
            entity={entity}
          />
        </>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>Cargando Presupuestos...</p>
      )}
    </div>
  );
}
