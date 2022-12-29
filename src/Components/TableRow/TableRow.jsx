function TableRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.data.CharCode}</td>
            <td>{props.data.Name}</td>
            <td>{(props.data.Value).toFixed(2)}</td>
            <td>{(props.data.Value/props.dollar.Value).toFixed(2)}</td>
            <td>{(props.data.Value/props.euro.Value).toFixed(2)}</td>
            <td>{(props.data.Value/props.yuan.Value).toFixed(2)}</td>
        </tr>
    )
}

export default TableRow