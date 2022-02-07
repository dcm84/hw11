import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadServices, deleteService } from './servicesApi';

function ServiceList() {
  const { status, deletingItems, services } = useSelector(state => state.serviceList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //при первом обращении загружаем список услуг через API
  useEffect(() => { dispatch(loadServices()); }, []);

  return (
    <>
      {
        status == "pending" &&
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border  text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      {
        status == "error" &&
        <div className="alert alert-danger d-flex justify-content-center my-3" role="alert">
          Произошла ошибка!
        </div>
      }
      {
        status == "success" &&
        <ul className="list-group pointed my-3" >
          {
            services
              .map(o => (
                <li className="list-group-item" key={o.id}>
                  {o.name} {o.price} руб.
                  {
                    !deletingItems || !deletingItems.find(el => el === o.id) &&
                    <>
                      <button type="button" className="btn btn-danger float-end" onClick={() =>
                        dispatch(deleteService(o.id))}><i className="bi bi-x"></i></button>
                      <button type="button" className="btn btn-danger float-end me-1" onClick={() => {
                        navigate('/services/' + o.id)
                      }}><i className="bi bi-pencil"></i></button>
                    </>
                  }
                  {
                    deletingItems && deletingItems.find(el => el === o.id) &&
                    <button type="button" className="btn btn-danger float-end" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="visually-hidden">Loading...</span>
                    </button>
                  }
                </li>
              ))
          }
        </ul >
      }
    </>
  )
}

export default ServiceList;
