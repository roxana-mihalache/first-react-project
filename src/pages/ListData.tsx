import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { FormattedMessage, useIntl } from "react-intl";

const ListData = () => {
  const intl = useIntl();
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  });

  useEffect(() => {
    fetch("https://retoolapi.dev/JIvieP/items")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    {
      id: "id",
      header: intl.formatMessage({ id: "table.header.id" }),
      accessorKey: "id",
    },
    {
      id: "name",
      header: intl.formatMessage({ id: "table.header.name" }),
      accessorKey: "name",
    },
    {
      id: "amount",
      header: intl.formatMessage({ id: "table.header.amount" }),
      accessorKey: "amount",
    },
    {
      id: "url",
      header: intl.formatMessage({ id: "table.header.url" }),
      accessorKey: "url",
      cell: ({ getValue }: { getValue: () => string }) => (
        <a
          href={getValue()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {getValue()}
        </a>
      ),
    },
    {
      id: "tags",
      header: intl.formatMessage({ id: "table.header.tags" }),
      accessorKey: "tags",
    },
    {
      id: "type",
      header: intl.formatMessage({ id: "table.header.type" }),
      accessorKey: "type",
    },
    {
      id: "status",
      header: intl.formatMessage({ id: "table.header.status" }),
      accessorKey: "status",
    },
    {
      id: "deadline",
      header: intl.formatMessage({ id: "table.header.deadline" }),
      accessorKey: "deadline",
    },
    {
      id: "description",
      header: intl.formatMessage({ id: "table.header.description" }),
      accessorKey: "description",
    },
    {
      id: "isRepetable",
      header: intl.formatMessage({ id: "table.header.isRepetable" }),
      accessorKey: "isRepetable",
      cell: ({ getValue }: { getValue: () => boolean }) =>
        getValue() ? <FormattedMessage id="yes" /> : <FormattedMessage id="no" />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          borderBottom: "1px solid #ddd",
          pb: 2,
        }}
      >
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            table.setPageIndex(0);
          }}
          sx={{ width: 150, backgroundColor: "white", borderRadius: "8px" }}
        >
          {[2, 3, 4, 6, 10, 15].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              fontSize: "1.5rem",
              boxShadow: "none",
              backgroundColor: "#1976d2",
            }}
          >
            {"<<"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              fontSize: "1.5rem",
              boxShadow: "none",
              backgroundColor: "#1976d2",
            }}
          >
            {"<"}
          </Button>
          <Typography variant="body1" sx={{ mx: 1 }}>
            <FormattedMessage
              id="pagination.page"
              values={{
                currentPage: table.getState().pagination.pageIndex + 1,
                totalPages: table.getPageCount()
              }}
            />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              fontSize: "1.5rem",
              boxShadow: "none",
              backgroundColor: "#1976d2",
            }}
          >
            {">"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            sx={{
              minWidth: 32,
              borderRadius: "50%",
              fontSize: "1.5rem",
              boxShadow: "none",
              backgroundColor: "#1976d2",
            }}
          >
            {">>"}
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListData;
