/* eslint-disable react/prop-types */
const Header = (props) => {
    console.log('Header props:', props);
    return (
        <h1>{props.course}</h1>
    )
}

export default Header;