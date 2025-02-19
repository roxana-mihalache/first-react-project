import { AppBar, Toolbar, Button, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../assets/translations/messages';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();

  return (
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
          className="ml-4 text-white bg-transparent border-none"
        >
          <MenuItem value="en">
            <FormattedMessage id="language.option.english" />
          </MenuItem>
          <MenuItem value="ro">
            <FormattedMessage id="language.option.romanian" />
          </MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
