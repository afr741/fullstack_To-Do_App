import React, {Component}  from 'react';
import axios from 'axios';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import App from './App';
import '../stylesheets/App.css';
class AppBody extends Component {

    render() {


      return (
        <div className= "AppBody">
          <AppHeader/>
          <App/>
          <AppFooter/>

        </div>
      );
    }
}


export default AppBody;
