import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const brandPrimary = getStyle("--primary");

const columns = [
  {
    title: "ID",
    field: "id",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60
  },
  {
    title: "Empresa",
    field: "nombre_prospecto",
    align: "center",
    color: "#F0F3F5",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100
  },
  {
    title: "Medio",
    field: "medio",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 150
  },
  {
    title: "SCE",
    field: "status_comercial_externo",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100
  },
  {
    title: "Status Gestion",
    field: "status_gestion",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Status Venta",
    field: "status_venta",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 135
  },
  {
    title: "Estaciones",
    field: "estaciones",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130
  },
  {
    title: "Ultimo Contacto",
    field: "ultimo_contacto",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130
  },
  {
    title: "Avance",
    field: "Avance",
    align: "center",
    color: "#F0F3F5",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100
  },  
  {
    title: "Contacto",
    field: "nombre_contacto",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 150
  },
  {
    title: "Telefono",
    field: "telefono",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 110
  },
  {
    title: "Extensión",
    field: "ext",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 110
  },
  {
    title: "Mail",
    field: "email",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Categoría",
    field: "categoria",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60
  },
  {
    title: "Estado",
    field: "estado",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100
  }
];

const options = {
  movableRows: true,
  pagination: "local",
  paginationSize: 5
};

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      nombre_prospecto: "",
      nombre_contacto: "",
      telefono: "",
      email: "",
      categoria: "",
      primer_contacto: "",
      estado: "",
      medio: "",
      status_comercial_externo: "",
      estaciones: 0,
      status_gestion: "",
      status_venta: "",
      data: [],
      selectedLead: null,
      loading: false,
      unidad_negocio: "",
      costo_hora: 0,
      descCategoria: "",
      ext: "",
      id_user: this.Auth.getProfile().id_ccs,
      avance: "",
      isSaving:false
    };
  }

  rowClick = (e, row) => {
    this.setState({
      selectedLead: `${row.getData().id}`,
      loading: true
    });

    this.API_CCS.getLead(`${row.getData().id}`).then(res => {
      this.setState({
        nombre_prospecto: res[0].nombre_prospecto,
        nombre_contacto: res[0].nombre_contacto,
        telefono: res[0].telefono,
        email: res[0].email,
        categoria: res[0].categoria,
        primer_contacto: res[0].primer_contacto,
        estado: res[0].estado,
        medio: res[0].medio,
        status_comercial_externo: res[0].status_comercial_externo,
        estaciones: res[0].estaciones,
        status_gestion: res[0].status_gestion,
        status_venta: res[0].status_venta,
        unidad_negocio: res[0].unidad_negocio,
        costo_hora: res[0].costo_hora,
        ext: res[0].ext,
        id_user: this.Auth.getProfile().id_ccs,
        avance: res[0].avance
      });

      if (this.state.categoria === "A") {
        this.setState({ descCategoria: "Más de 20 Estaciones" });
      } else if (this.state.categoria === "B") {
        this.setState({ descCategoria: "Entre 5 y 19 Estaciones" });
      } else if (this.state.categoria === "C") {
        this.setState({ descCategoria: "Menos de 5 Estaciones" });
      } else {
        this.setState({ descCategoria: "" });
      }

      this.setState({ loading: false });
    });
  };

  closeUpdate = () => {
    this.setState({ selectedLead: null });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({isSaving:true})
    this.API_CCS.updateLead({
      id: this.state.selectedLead,
      nombre_prospecto: this.state.nombre_prospecto,
      nombre_contacto: this.state.nombre_contacto,
      telefono: this.state.telefono,
      email: this.state.email,
      categoria: this.state.categoria,
      primer_contacto: this.state.primer_contacto,
      estado: this.state.estado,
      medio: this.state.medio,
      status_comercial_externo: this.state.status_comercial_externo,
      estaciones: this.state.estaciones,
      status_gestion: this.state.status_gestion,
      status_venta: this.state.status_venta,
      unidad_negocio: this.state.unidad_negocio,
      costo_hora: this.state.costo_hora,
      ext: this.state.ext,
      id_user: this.Auth.getProfile().id_ccs
    })

      .then(res => {
        if (res.sucess === true) {
          MySwal.fire({
            title: "Correcto",
            text: "¡Lead Actualizado Correctamente!",
            type: "success",
            confirmButtonColor: "#C00327",
            allowOutsideClick: false
          });
          this.updateTable();
          this.setState({ selectedLead: null });
          this.setState({isSaving:false})
        } else {
          MySwal.fire({
            title: "Error",
            text:
              "Ocurrio un error al guardar el registro, por favor intenta de nuevo",
            type: "error",
            confirmButtonColor: "#C00327",
            allowOutsideClick: true
          });
          this.setState({isSaving:false})
        }
      })
      .catch(err => console.log(err));
  }

  updateTable() {
    this.API_CCS.getClientes()
      .then(response => {
        return response;
      })
      .then(json => {
        this.setState({ data: json });
      });
  }

  componentDidMount() {
    this.updateTable();
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height="70" width="70" />{" "}
          </div>
        </div>
      );
    } else {
    return (
      <div>
        {this.state.selectedLead == null ? (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader className="text-center">
                    <i className="icon-magnifier" />
                    Busqueda de Leads
                  </CardHeader>
                  <CardBody className="text-center">
                    <ReactTabulator
                      rowClick={this.rowClick}
                      index={"id"}
                      data={this.state.data}
                      columns={columns}
                      tooltips={true}
                      layout={"fitColumns"}
                      options={options}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        ) : null}

        {this.state.selectedLead != null ? (
          this.state.loading === true ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <Loader
                  type="Oval"
                  color={brandPrimary}
                  height="100"
                  width="100"
                />{" "}
              </div>
            </div>
          ) : (
            <div className="animated fadeIn">
              <Card>
                <CardHeader className="text-center">
                  Actualizar Lead
                  <div className="card-header-actions">
                    <Button
                      color="link"
                      className="card-header-action btn-close"
                      onClick={this.closeUpdate}
                    >
                      <i className="icon-close" />
                    </Button>
                  </div>
                </CardHeader>

                <CardBody>
                  <Form
                    className="form-horizontal"
                    onSubmit={this.handleFormSubmit}
                    innerRef={this.formRef}
                  >
                    <Row>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Nombre Prospecto</Label>
                          <Input
                            type="text"
                            placeholder="Nombre Prospecto"
                            required
                            onChange={this.handleChange}
                            id="nombre_prospecto"
                            value={this.state.nombre_prospecto}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Nombre Contacto</Label>
                          <Input
                            type="text"
                            placeholder="Nombre Contacto"
                            required
                            onChange={this.handleChange}
                            id="nombre_contacto"
                            value={this.state.nombre_contacto}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-sm-4">
                        <FormGroup>
                          <Label htmlFor="prospecto">Telefono</Label>
                          <Input
                            type="text"
                            pattern="[0-9]{3}-[0-9]{7}"
                            placeholder="555-5555555"
                            required
                            onChange={this.handleChange}
                            id="telefono"
                            value={this.state.telefono}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-2">
                        <FormGroup>
                          <Label htmlFor="prospecto">Extension</Label>
                          <Input
                            type="text"
                            placeholder="Ext"
                            onChange={this.handleChange}
                            value={this.state.ext}
                            id="ext"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Email</Label>
                          <Input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={this.handleChange}
                            id="email"
                            value={this.state.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-sm-3">
                        <FormGroup>
                          <Label htmlFor="prospecto">Categoría</Label>
                          <Input
                            type="select"
                            placeholder="Categoría"
                            required
                            onChange={this.handleChange}
                            id="categoria"
                            value={this.state.categoria}
                          >
                            <option value="">-Selecciona-</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-3">
                        <FormGroup>
                          <Label htmlFor="prospecto">Descripción</Label>
                          <Input
                            type="text"
                            placeholder="Descripción"
                            readOnly="readOnly"
                            onChange={this.handleChange}
                            value={this.state.descCategoria}
                            id="descripcion"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6" />
                    </Row>

                    <Row>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Estado</Label>
                          <Input
                            type="select"
                            placeholder="Estado"
                            required
                            onChange={this.handleChange}
                            id="estado"
                            value={this.state.estado}
                          >
                            <option value="">-Selecciona-</option>
                            <option>Aguascalientes</option>
                            <option>Baja California</option>
                            <option>Baja California Sur</option>
                            <option>Campeche</option>
                            <option>Coahuila de Zaragoza</option>
                            <option>Colima</option>
                            <option>Chiapas</option>
                            <option>Chihuahua</option>
                            <option>CDMX</option>
                            <option>Durango</option>
                            <option>Guanajuato</option>
                            <option>Guerrero</option>
                            <option>Hidalgo</option>
                            <option>Jalisco</option>
                            <option>México</option>
                            <option>Michoacán de Ocampo</option>
                            <option>Morelos</option>
                            <option>Nayarit</option>
                            <option>Nuevo León</option>
                            <option>Oaxaca</option>
                            <option>Puebla</option>
                            <option>Querétaro</option>
                            <option>Quintana Roo</option>
                            <option>San Luis Potosí</option>
                            <option>Sinaloa</option>
                            <option>Sonora</option>
                            <option>Tabasco</option>
                            <option>Tamaulipas</option>
                            <option>Tlaxcala</option>
                            <option>Veracruz de Ignacio de la Llave</option>
                            <option>Yucatán</option>
                            <option>Zacatecas</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Medio</Label>
                          <Input
                            type="select"
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            id="medio"
                            value={this.state.medio}
                          >
                            <option value="">-Selecciona-</option>
                            <option>Página CCS</option>
                            <option>Llamada IN</option>
                            <option>Referido</option>
                            <option>Licitacion</option>
                            <option>Llamada OUT</option>
                            <option>Recomendado de Jero</option>
                            <option>Recomendado de Vivian</option>
                            <option>Correo</option>
                            <option>Chat</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">
                            Estatus Comercial Externo
                          </Label>
                          <Input
                            type="select"
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            id="status_comercial_externo"
                            value={this.state.status_comercial_externo}
                          >
                            <option value="">-Selecciona-</option>
                            <option>Operando</option>
                            <option>Por Implementar</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Estaciones</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10000"
                            placeholder="Número de Estaciones"
                            required
                            onChange={this.handleChange}
                            id="estaciones"
                            value={this.state.estaciones}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Unidad de Negocio</Label>
                          <Input
                            type="select"
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            value={this.state.unidad_negocio}
                            id="unidad_negocio"
                          >
                            <option value="">-Selecciona-</option>
                            <option>Outsourcing</option>
                            <option>Cosourcing</option>
                            <option>Consultoría</option>
                            <option>Calidad</option>
                            <option>Capacitación</option>
                            <option>BI</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Costo por Hora</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10000000"
                            placeholder="Costo por Hora (Pesos)"
                            required
                            value={this.state.costo_hora}
                            onChange={this.handleChange}
                            id="costo_hora"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Estatus de Gestión</Label>
                          <Input
                            type="select"
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            id="status_gestion"
                            value={this.state.status_gestion}
                          >
                            <option value="">-Selecciona-</option>
                            <option>Primer Contacto</option>
                            <option>Envio de Propuesta</option>
                            <option>Rebote de Propuesta</option>
                            <option>Por Firmar</option>
                            <option>Cerrada</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="col-sm-6">
                        <FormGroup>
                          <Label htmlFor="prospecto">Estatus de Venta</Label>
                          <Input
                            type="select"
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            id="status_venta"
                            value={this.state.status_venta}
                          >
                            <option value="">-Selecciona-</option>
                            <option>En Proceso</option>
                            <option>Por Firmar</option>
                            <option>Firmado</option>
                            <option>No Contcretado</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button type="submit" className="btn btn-primary">
                          Guardar
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </div>
          )
        ) : null}
      </div>
    );
  }}
}

export default withAuth(Inicio);
