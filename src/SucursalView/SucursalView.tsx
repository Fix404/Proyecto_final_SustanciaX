import { Card } from "react-bootstrap";

export const SucursalView = () => {
    return (
        <Card style={{ width: '18rem', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card.Body>
                <Card.Title style={{ marginBottom: "28px" }}>Sucursal</Card.Title>
                <Card.Text>
                    <p>
                        <b>Nombre</b>
                    </p>
                    <p>
                        <b>Empresa</b>
                    </p>
                    <p>
                        <b>Domicilio</b>
                    </p>
                    <p>
                        <b>¿Casa matriz?</b>
                    </p>
                    <p>
                        <b>Horario apertura</b>
                    </p>
                    <p>
                        <b>Horario cierre</b>
                    </p>
                    <p>
                        <b>Logo</b>
                    </p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
