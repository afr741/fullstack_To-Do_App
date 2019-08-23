import React, {Component}  from 'react';
import axios from 'axios';
class AppFooter extends Component {

    render() {


      return (
        <div className= "AppFooter">
        <h4>Made using React, NodeJS, ExpressJS, MongoDB - <a href = 'https://github.com/afr741/fullstack_app'>@Anushervon Rakhmatov</a></h4>

        </div>
      );
    }
}


export default AppFooter;
