const Alert = (props) => {
    const {message} = props;

    if (!message) {
        return null;
    } else {
        return (
            <div className="alert">
                {message}
            </div>
        );
    }
}

export default Alert;