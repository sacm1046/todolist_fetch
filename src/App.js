import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      li: [],
      msg: ""
    }
  }

  add(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
      const {li} = this.state;
            li.push({label: e.target.value, done: false})
            this.setState({
                li: li
      })
      e.target.value = "";
      fetch('https://assets.breatheco.de/apis/fake/todos/user/sacm', {
      method: "PUT",
      body: JSON.stringify(li),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        resp.json(); console.log(resp);
      })
      .then(data => {
        console.log(data);
        this.setState({
          msg: data
        });
      })
      .catch(error => {console.log(error);
      });
    } 
  }

  delete(e, i) {
    const { li } = this.state;
    li.splice(i, 1);
    this.setState({
      li:li
    });
    fetch('https://assets.breatheco.de/apis/fake/todos/user/sacm', {
      method: "PUT",
      body: JSON.stringify(li),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        resp.json(); console.log(resp);
      })
      .then(data => {
        console.log(data);
        this.setState({
          msg: data
        });
      })
      .catch(error => {console.log(error);
      });
  }

  get(url) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        data.msg ? this.post('https://assets.breatheco.de/apis/fake/contact/user/sacm') : this.setState({ li: data })
      })
      .catch(error => {
      });
  }

  post(url) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        data.result==="ok"?this.get('https://assets.breatheco.de/apis/fake/contact/user/sacm') : "";
      })
      .catch(error => {
      });
  }

  componentDidMount() {
    console.log("Despues de renderizar el componente");
    this.get('https://assets.breatheco.de/apis/fake/todos/user/sacm')
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-md-12 pt-5">
            <h1 className="text-center display-1">To Do List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div id="table" className="col-md-6 bg-white">
            <input type="text" placeholder="" className="form-control" onKeyDown={(e) => this.add(e)}></input>
            <ul className="list-group-flush p-0">
              {
                this.state.li.length > 0 &&
                this.state.li.map((item, i) => {
                  return (
                    <li key={i} className="list-group-item d-flex justify-content-between">{item.label}
                      <i className="fas fa-trash text-danger" onClick={(e) => this.delete(e, i)}></i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    )
  }
}
export default App;