import React, {Component}  from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
class App extends Component {
  // initialize our state
    state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message) => {
      let currentIds = this.state.data.map((data) => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }

      axios.post('http://localhost:3001/api/putData', {
        id: idToBeAdded,
        message: message,
      });
    };

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      parseInt(idTodelete);
      let objIdToDelete = null;
      this.state.data.forEach((dat) => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
      });

      axios.delete('http://localhost:3001/api/deleteData', {
        data: {
          id: objIdToDelete,
        },
      });
    };

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      this.state.data.forEach((dat) => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });

      axios.post('http://localhost:3001/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
      });
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {

      const { data } = this.state;
      return (
        <div className = "App">

        <h2>Welcome!</h2>
        <h3>To get started, add some items to your list:</h3>
          <div style={{ padding: '10px' }}>
            <input 
              type="text"
              onChange={(e) => this.setState({ message: e.target.value })}
              placeholder="add a task in the database"
              style={{ width: '200px', height: '30px', margin: '10px'}}
            />

            <Button variant="outline-success" onClick={() => this.putDataToDB(this.state.message)}>
              ADD
            </Button>

          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px', margin: '10px' }}
              onChange={(e) => this.setState({ idToDelete: e.target.value })}
              placeholder=" task # to delete here"
            />
            <Button variant = "outline-danger" onClick={() => this.deleteFromDB(this.state.idToDelete)}>
              DELETE
            </Button>
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px',  margin: '10px' }}
              onChange={(e) => this.setState({ idToUpdate: e.target.value })}
              placeholder=" task # to update"
            />
            <input
              type="text"
              style={{ width: '200px',  margin: '10px'}}
              onChange={(e) => this.setState({ updateToApply: e.target.value })}
              placeholder=" task value here"
            />
            <Button variant = "outline-primary"
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </Button>
          </div>
          <div className = "todoItems">
          <ul>
            {data.length <= 0
              ? 'NO DB ENTRIES YET'
              : data.map((dat) => (
                  <li style={{ padding: '10px' }} key={data.message}>
                    <span style={{ color: 'gray' }}> task #{dat.id} : </span>
                    {dat.message}
                  </li>
                ))}
          </ul>
          </div>
        </div>
      );
    }
}


export default App;
