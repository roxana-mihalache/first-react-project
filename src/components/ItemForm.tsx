import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';


const ItemForm = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    url: '',
    tags: '',
    description: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('https://retoolapi.dev/JIvieP/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => navigate('/'));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">
        <FormattedMessage id="addItem" />
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.name' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.amount' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.url' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.description' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          <FormattedMessage id="submit" />
        </button>
      </form>
    </div>
  );
};

export default ItemForm;