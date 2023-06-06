import * as React from 'react';

const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};

const App = () => {

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

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <Search term={searchTerm} onSearch={handleSearch} />

            <hr />

            <List list={searchedStories} />

        </div>
    );
}

const Search = ({ term, onSearch }) => (
    <div>
        <label htmlFor="search" placeholder="Search">Search: </label>
        <input id="search" type="text" onChange={onSearch} value={term} />

        <p>
            Search for: <strong>{term}</strong>
        </p>
    </div>
);

const List = ({ list }) => (
    <ul>
        {list.map(({ objectID, ...item }) => (
            <Item key={objectID} {...item} />
        ))}
    </ul>
);


const Item = ({ title, url, author, num_comments, points, objectID }) => (
        <li key={objectID} style={{paddingTop: '1em'}}>
            <span>
                <a href={url}>
                    {title}
                </a>
            </span><br />
            <span>{author}</span><br />
            <span>{num_comments}</span><br />
            <span>{points}</span>
        </li>
);

export default App;
