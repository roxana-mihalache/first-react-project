import { useRecoilState } from "recoil";
import { useIntl } from "react-intl";
import { searchAtom } from "../searchAtom";

export const Search = () => {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useRecoilState(searchAtom);

  return (
    <input
      type="text"
      placeholder={intl.formatMessage({ id: "search" })}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 w-full max-w-xs border border-gray-300 rounded-md"
    />
  );
};
