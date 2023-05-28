import React, { createContext, useState } from 'react';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState('#home');

  const handlePageChange = (pageId) => {
    setSelectedPage(pageId);
  };

  return (
    <PageContext.Provider value={{ selectedPage, handlePageChange }}>
      {children}
    </PageContext.Provider>
  );
};
