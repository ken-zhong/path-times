import React from 'react';
import logo from './logo.svg';
import './App.css';
import RestContainer from './app/rest-container';
import Layout from './app/layout';

const App: React.FC = () => {
  return (
    <div className="App">
      <RestContainer>
        <Layout />
      </RestContainer>
    </div>
  );
};

export default App;
