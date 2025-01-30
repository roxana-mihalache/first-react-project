import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Select, MenuItem } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { useLanguage } from './components/LanguageContext';
import { messages, Language } from './assets/translations/messages';
import ListPage from './pages/ListPage';
import ItemForm from './components/ItemForm';
import EditItemPage from './pages/EditItemPage';
import ListData from './pages/ListData';
import { RecoilRoot } from 'recoil';

const App = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <RecoilRoot>
      <IntlProvider locale={language} messages={messages[language]}>
        <BrowserRouter>
          <AppBar position="sticky">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                <FormattedMessage id="home" />
              </Button>
              <Button color="inherit" component={Link} to="/add-item">
                <FormattedMessage id="addItem" />
              </Button>
              <Button color="inherit" component={Link} to="/data">
                <FormattedMessage id="paginatedData" />
              </Button>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                sx={{ color: 'white', ml: 2 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ro">Română</MenuItem>
              </Select>
            </Toolbar>
          </AppBar>

          <div style={{ padding: '25px' }}>
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/data" element={<ListData />} />
              <Route path="/add-item" element={<ItemForm />} />
              <Route path="/edit-item/:id" element={<EditItemPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </IntlProvider>
    </RecoilRoot>
  );
};

export default App;