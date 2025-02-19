import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import useApi from '../hooks/useApi';
import { endpoint } from '../assets/constants/constants';

const ListPage = () => {
  const { data: items, isLoading, deleteItem } = useApi(endpoint);
  const navigate = useNavigate();

  if (isLoading) return <p><FormattedMessage id="loading" /></p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><FormattedMessage id="table.header.name" /></TableCell>
            <TableCell><FormattedMessage id="table.header.amount" /></TableCell>
            <TableCell><FormattedMessage id="actions" /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit-item/${item.id}`)}><FormattedMessage id="editItem" /></Button>
                <Button onClick={() => item.id !== undefined && deleteItem(item.id)} color="error"><FormattedMessage id="delete" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListPage;
