import React, { Component } from 'react'
import styles from "components/Searchbar/Searchbar.module.css"

const {searchbar, form, button, button_label, input} = styles

export class Searchbar extends Component {
  state= {
    searchedValue: ''
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]:value});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchedValue);
    this.setState({searchedValue: ''});
  }

  render() {
    return (
        <header className={searchbar}>
        <form className={form} onSubmit={this.handleSubmit}>
          <button type="submit" className={button}>
            <span className={button_label}>Search</span>
          </button>
      
          <input
            className={input}
            type="text"
            name="searchedValue"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchedValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar