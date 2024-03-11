import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react';
import ThemeContextProvider from './contexts/theme-context';
import Greeting from './Greeting';
import Message from './Message';
import List from './List';

// useEffect, executa um bloco de código quando alguma dependencia (estado) mudar
// useLayoutEffect vai ser executado antes do DOM ser montado pelo react, useEffect vai ser executado depois que o DOM tiver sido montado pelo react
// useRef, pegar referencia de elemento HTML, guardar valor anterior de um state, evitar renderização
// useMemo, usar quanto tiver problema de performance
// useCallback, passando função como prop pra algum componente? tem algum custo grande de performance (fetch)? função sendo executada desnecessariamente?

const App = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add-task':
        return {
          ...state,
          tasks: [...state.tasks, { name: action.payload, isCompleted: false }],
          tasksCount: state.tasksCount + 1,
        };
      case 'toggle-task':
        return {
          ...state,
          tasks: state.tasks.map((item, index) =>
            index === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
          ),
        };
      default:
        return state;
    }
  };

  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [resourceType, setResourceType] = useState('users');
  const [name, setName] = useState('');
  const [rendersInput, setRendersInput] = useState('');
  const [focusInput, setFocusInput] = useState('');
  const inputRef = useRef();
  const renders = useRef(0);
  const previousName = useRef();
  const [state, dispatch] = useReducer(reducer, { tasks: [], tasksCount: 0 });
  const [inputValue, setInputValue] = useState('');
  const [number, setNumber] = useState(1);
  const [text, setText] = useState('1');

  const getItems = useCallback(
    async (number) => {
      console.log('getItems is being called!');
      console.log({ number });
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${resourceType}`
      );
      const responseJSON = await response.json();

      return responseJSON;
    },
    [resourceType]
  );

  const focusInputFunction = () => {
    inputRef.current.focus();
  };

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const changeResourceType = (resourceType) => {
    setResourceType(resourceType);
  };

  const slowFunction = (num) => {
    console.log('Slow function is being called!');
    for (let i = 0; i <= 10000; i++) {}
    return num * 2;
  };

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  useEffect(() => {
    const fetchResourceTypes = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${resourceType}`
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      setItems(responseJSON);
    };

    fetchResourceTypes();
  }, [resourceType]);

  useEffect(() => {
    // componentDidMount
    console.log('componentDidMount');
    return () => {
      // componentWillUnmount
      console.log('componentWillUnmount');
    };
  }, []);

  useEffect(() => {
    renders.current = renders.current + 1;
  }, [rendersInput]);

  useEffect(() => {
    previousName.current = name;
  }, [name]);

  return (
    <>
      <div style={{ margin: '0 auto', width: '800px', textAlign: 'center' }}>
        <div className="useState">
          <h2>useState()</h2>
          <h2>{count}</h2>
          <button onClick={incrementCount}>Increment</button>
        </div>
        <div className="useEffect">
          <h2>useEffect()</h2>
          <h2>{resourceType}</h2>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button onClick={() => changeResourceType('posts')}>Posts</button>
            <button onClick={() => changeResourceType('comments')}>Comments</button>
            <button onClick={() => changeResourceType('todos')}>Todos</button>
          </div>

          {items.map((item) => (
            <p>{item.id}</p>
          ))}
        </div>
        <div className="useRef">
          <h2>useRef()</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <input
              value={rendersInput}
              onChange={(e) => setRendersInput(e.target.value)}
            />
            <p>Renders: {renders.current}</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <input
              ref={inputRef}
              value={focusInput}
              onChange={(e) => setFocusInput(e.target.value)}
            />
            <p>
              <button onClick={focusInputFunction}>Focus Input</button>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <p>Hello! My name is {name}</p>
            <p>And my name was {previousName.current}</p>
          </div>
        </div>
        <div className="useReducer">
          <h2>useReducer()</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <p>
              <button
                onClick={() => {
                  dispatch({ type: 'add-task', payload: inputValue });
                  setInputValue('');
                }}
              >
                Adicionar
              </button>
            </p>

            {state.tasks.map((task, index) => (
              <p
                onClick={() => dispatch({ type: 'toggle-task', payload: index })}
                style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
              >
                {task.name}
              </p>
            ))}
          </div>
        </div>
        <div class="useContext">
          <ThemeContextProvider>
            <Message />
            <Greeting />
          </ThemeContextProvider>
        </div>
        <div class="useMemo">
          <h2>useMemo()</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p>{number}</p>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <p>
              <button
                onClick={() => {
                  setNumber((prevState) => prevState + 1);
                }}
              >
                Adicionar
              </button>
            </p>
            <p>text: {text}</p>

            {state.tasks.map((task, index) => (
              <p
                onClick={() => dispatch({ type: 'toggle-task', payload: index })}
                style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
              >
                {task.name}
              </p>
            ))}
          </div>
        </div>
        <div class="useCallback">
          <h2>useCallback()</h2>
          <input value={text} onChange={(e) => setText(e.target.value)} />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>
              <button onClick={() => setResourceType('posts')}>Posts</button>
              <button onClick={() => setResourceType('comments')}>Comments</button>
              <button onClick={() => setResourceType('todos')}>Todos</button>
            </p>
          </div>
          <List getItems={getItems} />
        </div>
      </div>
    </>
  );
};

export default App;
