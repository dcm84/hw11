import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { loadService, editService } from './servicesApi';
import { changeEditServiceField, cleanEditService } from '../serviceEditSlice'

function ServiceEdit() {
	const { status, id, name, price, content } = useSelector(state => state.serviceEdit);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	//при первом обращении грузим данные через API
	let params = useParams();
	useEffect(() => { loadService(params.id); }, []);

	//отслеживаем изменение статуса и после успешного апдейта редиректим к списку услуг
	useEffect(() => {
		if (status == "updateSuccess") {
			navigate("/services/");
			dispatch(cleanEditService());
		}
	}, [status]);


	const handleChange = evt => {
		const { name, value } = evt.target;
		dispatch(changeEditServiceField({ name, value }));
	}

	const handleSubmit = evt => {
		evt.preventDefault();
		editService({ id, name, price, content });
	}

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
				(status == "error" || status == "updateError") &&
				<div className="alert alert-danger d-flex justify-content-center my-3" role="alert">
					Произошла ошибка!
				</div>
			}
			{
				(status == "success" || status == "updateError" || status == "updating") &&
				<form onSubmit={handleSubmit}>
					<input type='hidden' name='id' onChange={handleChange} value={id} />


					<div className="mb-3">
						<label htmlFor="name" className="form-label">Название</label>
						<input name="name" className="form-control" id="name" onChange={handleChange} value={name} disabled={status == "updating" ? "disabled" : ""} />
					</div>
					<div className="mb-3">
						<label htmlFor="price" className="form-label">Стоимость</label>
						<input name="price" className="form-control" id="price" onChange={handleChange} value={price} disabled={status == "updating" ? "disabled" : ""} />
					</div>
					<div className="mb-3">
						<label htmlFor="content" className="form-label">Описание</label>
						<input name="content" className="form-control" id="content" onChange={handleChange} value={content} disabled={status == "updating" ? "disabled" : ""} />
					</div>

					<button type="button" onClick={() => {
						navigate('/services/')
					}} className="btn btn-danger me-1" disabled={status == "updating" ? "disabled" : ""}>Отмена</button>
					{
						(status == "success" || status == "updateError") &&
						<button type="button" onClick={handleSubmit} className="btn btn-danger">Сохранить</button>
					}
					{
						status == "updating" &&
						<button className="btn btn-danger" type="button" disabled>
							<span className="spinner-border spinner-border-sm p-2" role="status" aria-hidden="true"></span>
							<span className="visually-hidden">Loading...</span>
						</button>
					}

				</form>
			}

		</>
	);
}

export default ServiceEdit;
