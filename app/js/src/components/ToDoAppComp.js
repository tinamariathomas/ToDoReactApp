var React = require('react');
var Reflux = require('reflux');
var ToDoList= require('./ToDoList');
var ToDoInput= require('./ToDoInput');
var ToDoStore= require('./../stores/todostore');

const listener = Reflux.ListenerMixin;
var ToDoApp = React.createClass({
    
    getInitialState: function () {
        return ({todoelements: []});
    },
    componentDidMount: function(){
        this.list=[];
        listener.listenTo(ToDoStore, this.onUpdateList);
    },
    onUpdateList: function (result) {
        this.list.unshift(result.text);
        this.setState({
            todoelements : this.list
        });
    },
    render: function () {
        return (
            <div className="main-container">
                <div>
                    <ToDoInput/>
                    <ToDoList todoelements={this.state.todoelements}/>
                </div>
            </div>
        )
    }
});

module.exports = ToDoApp;