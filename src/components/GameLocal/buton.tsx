const ButtonClass = (props) => {
    return (
        <button style={{
            border: "none",
            backgroundColor: props.color,
            top: "50%",
            width: 160,
            height: 60,
            marginLeft: "50%",
            marginTop: 4,
            justifyContent: "center",
            alignItems: 'center',
        }} onClick={props.onClick}>{props.text}</button>
    );
}
export default ButtonClass;