import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            msg: ''
        }
    }
    componentDidMount() {
        this.getTasks("https://assets.breatheco.de/apis/fake/todos/user/yana");
    }
    getTasks(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if(data.msg){
                    this.setState({
                        tasks: []
                    });
                }else{
                    this.setState({
                        tasks: data
                    });
                }
            })
            .catch(error => console.log(error));
    }
    postUser(url) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify([]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if(data.result === "ok"){
                    this.getTasks(url)
                }else{
                    this.setState({
                        tasks: data
                    });
                }
            })
            .catch(error => console.log(error));
    }
    addTask(e) {
        if (e.keyCode === 13 && e.target.value !== '') {
            const {tasks} = this.state;
            tasks.push({label: e.target.value, done: false})
            this.setState({
                tasks: tasks
            })
            e.target.value = '';
            fetch("https://assets.breatheco.de/apis/fake/todos/user/yana", {
                method: 'PUT',
                body: JSON.stringify(tasks),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        msg: data
                    });
                })
                .catch(error => console.log(error));
        }
    }
    delTask(i) {
        const tasks = this.state.tasks;
        tasks.splice(i, 1);
        this.setState({
            tasks: tasks
        })
        fetch("https://assets.breatheco.de/apis/fake/todos/user/yana", {
                method: 'PUT',
                body: JSON.stringify(tasks),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        msg: data
                    });
                })
                .catch(error => console.log(error));
    }
    addButton(e) {
         const {tasks} = this.state;
         let a = document.getElementById("addToDo")
         console.log(tasks)
         tasks.push({label: a.value, done: false})
            this.setState({
                tasks: tasks
            })
            a.value = '';
            fetch("https://assets.breatheco.de/apis/fake/todos/user/yana", {
                method: 'PUT',
                body: JSON.stringify(tasks),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        msg: data
                    });
                })
                .catch(error => console.log(error));
        }
    delButton(i) {
        const tasks = this.state.tasks;
        tasks.splice(i);
        this.setState({
            tasks: tasks
        })
        fetch("https://assets.breatheco.de/apis/fake/todos/user/yana", {
            method: 'PUT',
            body: JSON.stringify(tasks),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.setState({
                    msg: data
                });
                this.postUser("https://assets.breatheco.de/apis/fake/todos/user/yana");
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div className="card m-auto paper" style={form}>
                <div className="input-group">
                    <input id="addToDo" type="text" className="form-control" placeholder="What needs to be done?"
                        onKeyDown={(e) => this.addTask(e)} />
                    <div className="input-group-append" id="button-addon4">
                        <button className="btn btn-outline-secondary" value="yana" onClick={(e) => this.addButton(e)} type="button">Add</button>
                        <button className="btn btn-outline-secondary" onClick={() => this.delButton(0)} type="button">Delete</button>
                    </div>
                </div>
                {
                    this.state.tasks.length > 0 ? (
                        <ul id="list">
                            {
                                this.state.tasks.map((task, i) => {
                                    return (
                                        <li key={i}>
                                            {task.label}
                                            <span><i className="fa fa-times" onClick={() => this.delTask(i)}></i></span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) : (
                            <p style={parag}>No task, add a tasks</p>
                        )
                }
                <p id="parag" style={parag}></p>
            </div>
        )
    }
}
export default TodoList;