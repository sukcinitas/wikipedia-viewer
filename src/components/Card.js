import React from 'react';

export default function Card({ info }) {
  const timestamp = info.timestamp.slice(0, 10);
  const snippet =
    info.snippet
      .split(/\<span class\=\"searchmatch\"\>|\<\/span\>|\&quot\;/)
      .join('') + '...';
  const link = `https://en.wikipedia.org/wiki/${info.title
    .split(' ')
    .join('_')}`;
  return (
    <div className="card border-info mt-3 mb-3 ">
      <div className="card-body text-dark">
        <h4 className="card-title">{info.title}</h4>
        <h6 className="font-italic card-subtitle mb-2 text-muted">
          {timestamp}
        </h6>
        <p className="card-text">{snippet}</p>
        <a
          href={link}
          className="card-link stretched-link"
          noopener="true"
          noreferrer="true"
          target="_blank"
        >
          Read the full article
        </a>
      </div>
    </div>
  );
}
