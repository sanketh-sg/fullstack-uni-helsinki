# React


We use useEffect hook when the component does some side effects.
In a react class component managing side effects is handled through lifecycle methods
A react components job is to only return a JSX template, any other task like fetching data, logging to console, manipulating DOM is considered side effects.
useEffect runs after render and updates UI before running side effects.

without useeffect the side effect is called multiple times leading to unwanted performance loss for eg, fetch calls the url and fetches new data everytime then its set using setData which inturn renders the page again which inturn calls fetch API leading to infinte loop.

[] -> runs only once
\[state] -> runs when state is changed
with out array -> calls each time the component is rendered.

The process of React calling a component to generate virtual DOM happens when initially mounted, when state or props change.