import { useRouteError } from 'react-router-dom';

export function ErrorPage404() {
	const error = useRouteError();
	console.error(error);

    return (
        <div>
            <h1>всем привяшки мяу</h1>
            <h2>тут небольшая ошибочка^^</h2>
            <p>
                <i>{error.statusText}</i>
            </p>
            <p>
                <i>{error.data}</i>
            </p>
        </div>
    );
}