import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-ui';
import Header from './BaseUI/Header';
import NavigationBar from './BaseUI/NavigationBar';
import Grid from './Students/Grid';

function App() {
  return (
      <div className="App">
         <Header/> 
         <NavigationBar/> 
         <Grid/>
    </div>
  );
}

export default App;
