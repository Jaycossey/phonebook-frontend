const List = (props) => {
    const {persons, onClick} = props;
    return (
        <>
            {persons.map((pers, i) => {
                return (
                    <div key={pers.id + i}>
                        <p key={i}>{pers.name}'s Number: {pers.number}</p>
                        <button key={pers.id} onClick={() => onClick(pers.id)} type="button">Delete</button>
                    </div>
                    )
            })}
        </>
    );
}

export default List;