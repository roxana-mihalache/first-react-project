import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import ListData from './pages/ListData';
import { RecoilRoot } from 'recoil';
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<ListPage />} />
              <Route path="data" element={<ListData />} />
              <Route path="add-item" element={<AddItemPage />} />
              <Route path="edit-item/:id" element={<EditItemPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot >
    </QueryClientProvider>
  );
};

export default App;