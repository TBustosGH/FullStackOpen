
const Filter = ({ filterName, setFilterName }) => {
    const handleFilterName = (event) => {
        setFilterName(event.target.value)
    }

    return (
        <div>
            Filter shown with <input value={filterName} onChange={handleFilterName}/>
        </div>
    )
}

export default Filter