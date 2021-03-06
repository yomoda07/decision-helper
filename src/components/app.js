import React, { Component } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h3>{props.subtitle}</h3>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Desicion Helper',
}

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
        >What shoud I do?
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove ALL</button>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
         />
      ))}
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
}

class AddOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));
  }

  render() {
	   return (
       <div>
         {this.state.error && <p>{this.state.error}</p>}
         <form onSubmit={this.handleAddOption} >
           <input type="text" name="option" />
           <button>Add Option</button>
         </form>
      </div>
     );
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }))
  }

  handlePick() {
    const randomIndex = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomIndex]);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item'
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState(prevState => ({ options: prevState.options.concat([option])}));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
         />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
         />
      </div>
    );
  }
}

App.defaultProps = {
  options: []
}
