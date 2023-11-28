import { Form, useNavigate, useLoaderData, useActionData,redirect } from "react-router-dom";
import { obtenerCliente,actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId);
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay Resultados'
        })
    }
    return cliente;
}
export async function action({ request, params }) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email');

    //validacion
    const errores = []
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push("El email no es valido")
    }
    if (Object.keys(errores).length) {
        return errores;
    }

    //Actualizar el cliente
    await actualizarCliente(params.clienteId,datos);

    return redirect('/');
}

function Editar() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores=useActionData();
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Modificar cliente</h1>
            <p className="mt-3">Puedes Modificar a los clientes</p>

            <div className="flex justify-end">
                <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>


            <div className="px-5 mt-20 py-10 bg-white shadow rounded-md md:w-3/4 mx-auto">
                {errores?.length && errores.map((error, i) => <Error key={i}>
                    {error}
                </Error>)}
                <Form noValidate method="">
                    <Formulario cliente={cliente}></Formulario>

                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg "
                        value="Guardar Cambios"
                    />
                </Form>
            </div>
        </>
    )
}

export default Editar
