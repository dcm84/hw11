import { setStatus, setServices, startDelete, finishDelete } from '../serviceListSlice'
import { setEditStatus, setEditService } from '../serviceEditSlice'

const loadServices = () => (dispatch, getState) => {
    dispatch(setStatus("pending"));
    fetch(process.env.REACT_APP_SERVICES_API_URL, { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(services => {
            dispatch(setServices(services));
            dispatch(setStatus("success"));
        })
        .catch(e => {
            dispatch(setStatus("error"));
        });
}

const deleteService = (id) => (dispatch, getState) => {
    dispatch(startDelete(id));
    fetch(process.env.REACT_APP_SERVICES_API_URL + '/' + id, {
        crossDomain: true,
        method: "DELETE"
    })
        .then(() => {
            dispatch(finishDelete(id));

            //Если все удаления завершены, то обновляем список услуг
            //вообще можно было бы отслеживать каждую услугу в отдельности, но API странное, оно удаляет, 
            //а потом шлет 500, поэтому возвращать назад кнопки управления записью бессмыленно.
            const state = getState();
            if (state.serviceList.deletingItems.length === state.serviceList.deletedItems)
                loadServices();
        })
        .catch(e => {
            dispatch(setStatus("error"));
        });
}
const loadService = (id) => (dispatch, getState) => {
    dispatch(setEditStatus("pending"));
    fetch(process.env.REACT_APP_SERVICES_API_URL + '/' + id, { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(service => {
            dispatch(setEditService(service));
            dispatch(setEditStatus("success"));
        })
        .catch(e => {
            dispatch(setEditStatus("error"));
        });
}

const editService = (data) => (dispatch, getState) => {
    dispatch(setEditStatus("updating"));
    fetch(process.env.REACT_APP_SERVICES_API_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(() => {
            dispatch(setEditStatus("updateSuccess"));
        })
        .catch(e => {
            dispatch(setEditStatus("updateError"));
        });

}

export { loadServices, deleteService, loadService, editService };