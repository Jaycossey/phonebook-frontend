const Form = (props) => {
    const {handleSubmit, newName, handleChange, newNumber, handleNumberChange} = props;
    return (
        <>
        {/* important to note (for myself) prevent default runs on the FORM onSubmit, not the button of type submit */}
        <form onSubmit={handleSubmit}>
            <h2>Add New:</h2>
            <div>
                Name: <input value={newName} onChange={(e) => handleChange(e.target.value)} />
                Number: <input value={newNumber} onChange={(e) => handleNumberChange(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        
        </>
    );
}

export default Form;