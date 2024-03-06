import React, { useState } from 'react';
import DataTable from 'app/crm/components/table/DataTable';
import {
  createQuery,
  Cursor,
  TableQuery,
} from 'app/crm/components/table/TableFunctions';
import { ColumnDataTable } from 'app/GraphQL/common/types/column';
import { PageInfo } from 'app/GraphQL/PageInfo';

interface TableDashboardProps {
  pendingTasks: any;
}

export default function TableDashboard({ pendingTasks }: TableDashboardProps) {
  const [pageInfo, setPageInfo] = useState<PageInfo>(pendingTasks);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const entity = 'taskInstances';
  const pendingTasksData = pendingTasks.taskInstances.edges.map(
    (edge: any) => edge.node
  );

  const columns: ColumnDataTable[] = [
    { label: 'Fecha', key: 'creationDate', format: 'string' },
    {
      label: 'Nombre de tarea',
      key: 'taskTemplate.name',
      format: 'string',
      nestedField: 'taskTemplate',
    },
    {
      label: 'Contacto',
      key: 'user.firstName',
      format: 'string',
      nestedField: 'user',
    },
    { label: 'Estado', key: 'status', format: 'string' },
    {
      label: 'Agente',
      key: 'user.agent.username',
      format: 'string',
      nestedField: 'user.agent',
    },
  ];

  const executeQuery = async (
    nextPage: boolean,
    stringFilter?: string,
    numberPerPage?: number,
    sortedBy?: string
  ) => {
    
  };

  return (
    <div>
      TableDashboard
      <DataTable
        data={pendingTasksData}
        columns={columns}
        showActionsColumn={false}
        executeQuery={executeQuery}
        pageInfo={pageInfo!}
        totalCount={totalCount}
        entity={entity}
      />
    </div>
  );
}
