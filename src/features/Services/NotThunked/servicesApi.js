import store from '../../../store';
import { setStatus, setServices, startDelete, finishDelete } from '../serviceListSlice'
import { setEditStatus, setEditService } from '../serviceEditSlice'

const dispatch = store.dispatch;

export function loadServices() {
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

export function deleteService(id) {
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
            const state = store.getState();
            if (state.serviceList.deletingItems.length === state.serviceList.deletedItems)
                loadServices();
        })
        .catch(e => {
            dispatch(setStatus("error"));
        });
}

export function loadService(id) {
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

export function editService(data) {
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