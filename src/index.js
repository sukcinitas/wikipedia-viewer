import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import Card from "./components/Card"


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            wikipediaEntries: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let phrase = encodeURI(this.state.input);
        fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${phrase}&format=json&origin=*`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    wikipediaEntries: [...data.query.search],
                    input: ""
                })
            });
    }

    render () {
        return (
        <div className="d-flex flex-column align-items-center mb-5">
            <h1 className="display-3 mt-5">Wikipedia Viewer</h1>
            <form className="mt-5 mb-2">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search" value={this.state.input} onChange={this.handleChange}/>
                    <div className="input-group-append">
                    <button className="btn btn-dark" type="submit" onClick={this.handleSubmit}>
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
            </form>
            <a className="btn btn-dark" href="https://en.wikipedia.org/wiki/Special:Random">Get a random article</a>
            <div className="mt-5 w-75">
                {this.state.wikipediaEntries.map(entry => {
                    return <Card key={entry.pageid} info={entry}/>
                })} 
            </div> 
        </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))