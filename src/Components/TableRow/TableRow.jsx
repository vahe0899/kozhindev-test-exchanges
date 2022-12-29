
function TableRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.data.CharCode}</td>
            <td>{props.data.Name}</td>
            <td>1</td>
            <td>70</td>
            <td>95</td>
            <td>32</td>
        </tr>
    )
}

export default TableRow