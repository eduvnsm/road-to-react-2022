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

const storiesReducer = (state, action) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            };
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                    (story) => action.payload.objectID !== story.objectID
                )
            };
        default:
            throw new Error();
    }
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {

    const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

    const [stories, dispatchStories] = React.useReducer(
        storiesReducer,
        {
            data: [],
            isLoading: false,
            isError: false
        }
    );

    React.useEffect(() => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        fetch(`${API_ENDPOINT}react`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                dispatchStories({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.hits
                });
            })
            .catch(() =>
                dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
            );
    }, []);


    const handleRemoveStory = (item) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const searchedStories = stories.data.filter((story) =>
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

            {stories.isError && <p>Oops, it's my bad...</p>}

            {stories.isLoading ? (
                <p>Loading...</p>
            ) : (
                <List
                    list={searchedStories}
                    onRemoveItem={handleRemoveStory}
                />
            )}

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
                <a href={item.url} target="_blank">
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
