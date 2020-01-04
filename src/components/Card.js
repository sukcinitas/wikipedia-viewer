import React from "react";

 export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const timestamp = this.props.info.timestamp.slice(0,10);
        const snippet = this.props.info.snippet.split(/\<span class\=\"searchmatch\"\>|\<\/span\>|\&quot\;/).join('') + "...";
        const link = `https://en.wikipedia.org/wiki/${this.props.info.title.split(" ").join("_")}`;
        return (
        <div className="card border-info mt-3 mb-3 ">
            <div className="card-body text-dark">
                <h4 className="card-title">{this.props.info.title}</h4>
                <h6 className="font-italic card-subtitle mb-2 text-muted">{timestamp}</h6>
                <p className="card-text">{snippet}</p>
                <a href={link} className="card-link stretched-link">Read the full article</a>
            </div>
        </div>
        )
    }
}