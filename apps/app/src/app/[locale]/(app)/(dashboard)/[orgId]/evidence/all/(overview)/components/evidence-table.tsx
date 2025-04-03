"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { getEvidence } from "../data/queries";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { getEvidenceColumns } from "./evidence-table-columns";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { CreatePolicySheet } from "@/components/sheets/create-policy-sheet";

interface EvidenceTableProps {
  promises: Promise<[
    Awaited<ReturnType<typeof getEvidence>>
  ]>;
}

export function EvidenceTable({ promises }: EvidenceTableProps) {
  const [{ data, pageCount }] = React.use(promises);

  const columns = React.useMemo(() => getEvidenceColumns(), []);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        getRowId={(row) => row.id}
        rowClickBasePath="/evidence/all"
      >
        <DataTableToolbar table={table} sheet="create-evidence-sheet" action="Create Evidence">
          <DataTableSortList table={table} align="end" />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}