import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Item } from "../hooks/useApi";

interface ItemFormProps {
  onSubmit: (data: Item) => void;
  initialData?: Item;
}

const ItemForm = ({ onSubmit, initialData }: ItemFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Item>({
    name: "",
    amount: "",
    url: "",
    tags: "",
    description: "",
    isRepetable: false,
    type: "",
    status: "",
    deadline: "",
    ...initialData,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/");
  };

  return (
    <Paper className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <TextField
          label={<FormattedMessage id="table.header.name" />}
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.amount" />}
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.url" />}
          name="url"
          value={formData.url || ""}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.tags" />}
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.type" />}
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.status" />}
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.deadline" />}
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={<FormattedMessage id="table.header.description" />}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <label>
          <FormattedMessage id="table.header.isRepetable" />
          <input
            type="checkbox"
            name="isRepetable"
            checked={formData.isRepetable || false}
            onChange={(e) =>
              setFormData({ ...formData, isRepetable: e.target.checked })
            }
          />
        </label>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          <FormattedMessage id="submit" />
        </Button>
      </form>
    </Paper>
  );
};

export default ItemForm;
