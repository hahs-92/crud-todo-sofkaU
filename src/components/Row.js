import { useContext } from "react"
//context
import { Store } from "../context/AppContext"
//url-api
const HOST_API = "http://localhost:8080/api"

export const Row = ({ todo }) => {
    const { dispatch } = useContext(Store);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
          method: "DELETE"
        }).then((list) => {
          dispatch({ type: "delete-item", id })
        })
    }

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    }

    const onChange = (event, todo) => {
        const request = {
          name: todo.name,
          id: todo.id,
          completed: event.target.checked
        };
        fetch(HOST_API + "/todo", {
          method: "PUT",
          body: JSON.stringify(request),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then((todo) => {
            dispatch({ type: "update-item", item: todo });
          })
    }

    const decorationDone = {
        textDecoration: 'line-through'
    }

    return(
        <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={(event) => onChange(event, todo)}
                ></input>
            </td>
            <td>
                <button onClick={() => onDelete(todo.id)}>Eliminar</button>
            </td>
            <td>
                <button onClick={() => onEdit(todo)}>Editar</button>
            </td>
        </tr>
    )
}
