import * as React from 'react';

const stories = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    {
        title: 'Redux',
        url: 'https://redus.js.org/',
        author: 'Dan Abramov, Adrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1
    }
];

const App = () => {

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <Search />

            <hr />

            <List list={stories} />

        </div>
    );
}

const Search = () => {

    const handleChange = (e) => {
        console.log(e);
        console.log(e.target.value);
    };

    return (
        <div>
            <label htmlFor="search" placeholder="Search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
        </div>
    )
}

const Item = (props) => (
    <li key={props.item.objectID} style={{paddingTop: '1em'}}>
        <span>
            <a href={props.item.url}>
                {props.item.title}
            </a>
        </span><br />
        <span>{props.item.author}</span><br />
        <span>{props.item.num_comments}</span><br />
        <span>{props.item.points}</span>
    </li>
);

const List = (props) => (
    <ul>
        {props.list.map((item) => (
            <Item key={item.objectID} item={item} />
        ))}
    </ul>
);

export default App;
