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

    const initialStories = [
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
    const [stories, setStories] = React.useState(initialStories);

    const handleRemoveStory = (item) => {
        const newStories = stories.filter(
            (story) => item.objectID !== story.objectID
        );

        setStories(newStories);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>My Hacker Stories</h1>

            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={handleSearch}
            >
                <strong>Search:</strong>
            </InputWithLabel>

            <hr />

            <List list={searchedStories} onRemoveItem={handleRemoveStory} />

        </div>
    );
}

const InputWithLabel = ({
    id,
    value,
    type = 'text',
    onInputChange,
    isFocused,
    children
}) => {
    // A
    const inputRef = React.useRef();
    // C
    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            // D
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            {/* B */}
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
            />
        </>
    );
}

const Search = ({ term, onSearch }) => (
    <>
        <label htmlFor="search" placeholder="Search">Search: </label>
        <input id="search" type="text" onChange={onSearch} value={term} />

        <p>
            Search for: <strong>{term}</strong>
        </p>
    </>
);

const List = ({ list, onRemoveItem }) => (
    <ul>
        {list.map((item) => (
            <Item
                key={item.objectID}
                item={item}
                onRemoveItem={onRemoveItem}
            />
        ))}
    </ul>
);


const Item = ({ item, onRemoveItem }) => {
    return (
        <li>
            <span>
                <a href={item.url}>
                    {item.title}
                </a>
            </span><br />
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
                <button type="button" onClick={() => onRemoveItem(item)}>
                    Dismiss
                </button>
            </span>
        </li>
    );
}

export default App;
