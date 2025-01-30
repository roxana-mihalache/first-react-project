import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';
import { searchAtom } from '../searhAtom';
import useApi from '../hooks/useApi';
import { Search } from '../components/Search';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

const ListPage = () => {
  const { data: items, deleteItem } = useApi('https://retoolapi.dev/JIvieP/items');
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [searchTerm] = useRecoilState(searchAtom);


  const filteredItems = useMemo(() => {
    return items?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [items, searchTerm]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => formatMessage({ id: 'table.header.name' }),
      },
      {
        accessorKey: 'amount',
        header: () => formatMessage({ id: 'table.header.amount' }),
      },
      {
        accessorKey: 'tags',
        header: () => formatMessage({ id: 'table.header.tags' }),
      },
      {
        id: 'actions',
        header: () => formatMessage({ id: 'actions' }),
        cell: ({ row }) => (
          <div>
            <Button onClick={() => navigate(`/edit-item/${row.original.id}`)}>
              {formatMessage({ id: 'editItem' })}
            </Button>
            <Button onClick={() => deleteItem(row.original.id)} color="error">
              {formatMessage({ id: 'delete' })}
            </Button>
          </div>
        ),
      },
    ],
    [deleteItem, navigate, formatMessage]
  );

  const table = useReactTable({
    data: filteredItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Search />
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
    </div>
  );
};

export default ListPage;
