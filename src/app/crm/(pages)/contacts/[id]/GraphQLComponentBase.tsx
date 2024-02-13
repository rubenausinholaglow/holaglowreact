'use client';
import React from 'react';
import useAsyncClientGQL from '@utils/useAsyncClientGQL';
import SimpleDataTable from 'app/crm/components/simpleTable/SimpleDataTable';
import { ColumnType } from 'app/crm/utils/contactColumns';
import { SvgSpinner } from 'app/icons/Icons';

interface GraphQLComponentBaseProps {
  columns: ColumnType[];
  mapping: (params: any) => any;
  tabName: string;
  idLabel: string;
  gqlName: any;
  statusTypeSwitch?: any;
}

export default function GraphQLComponentBase({
  columns,
  mapping,
  tabName,
  idLabel,
  gqlName,
  statusTypeSwitch = undefined,
}: GraphQLComponentBaseProps) {
  const { dataApi, error, isLoading } = useAsyncClientGQL(gqlName);

  return (
    <>
      {isLoading ? (
        <SvgSpinner height={24} width={24} />
      ) : dataApi === null || error ? (
        <div className="pl-5">No se ha encontrado {tabName}.</div>
      ) : (
        <SimpleDataTable
          columns={columns}
          rows={mapping(dataApi?.user[idLabel])}
          statusTypeSwitch={statusTypeSwitch}
        />
      )}
    </>
  );
}
