import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import Loader from "react-loader-spinner";
import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Button } from "reactstrap";

import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditarRAC from "./Editar_RAC";

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

const columnsRACS = [
  {
    title: "RAC",
    field: "clave_reporte",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Fecha Alta",
    field: "fecha_alta",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Contacto",
    field: "contacto",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 260
  },
  {
    title: "Titular",
    field: "titular",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 260
  },
  {
    title: "No. Cliente",
    field: "id_cliente",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Plaza",
    field: "plaza",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Desarrollo",
    field: "desarrollo",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 140
  },
  {
    title: "Prototipo",
    field: "prototipo",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Cerrada",
    field: "cerrada",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 100
  },
  {
    title: "Mz",
    field: "manzana",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 65
  },
  {
    title: "Lt",
    field: "lote",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60
  },
  {
    title: "Int",
    field: "interior",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 60
  }
];

const options = {
  movableRows: false,
  pagination: "local",
  paginationSize: 10
};

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.newLeadForms = this.newLeadForms.bind(this);
    this.state = {
      data: [],
      dataRACS: [],
      dataClient: [],
      loading: false,
      id_user: this.Auth.getProfile().id_ccs,
      isSaving: false,
      searchClient: true,
      no_cliente: "",
      nombres: "",
      paterno: "",
      materno: "",
      sexo: "",
      fecha_nacimiento: "",
      estado_civil: "",
      plaza: "",
      desarrollo: "",
      cerrada: "",
      prototipo: "",
      sector: "",
      supermanzana: "",
      manzana: "",
      lote: "",
      interior: "",
      tel1: "",
      ext1: "",
      tel2: "",
      ext2: "",
      email: "",
      estado: "",
      entrega_vivienda: "",
      entrega_escrituras: ""
    };
  }

  rowClick = (e, row) => {
    this.setState({
      client: row.getData().clave_reporte,
      newCLient: false,
      updateClient: true,
      searchClient: false,
      loading: true
    });

    this.API_CCS.getRAC(row.getData().clave_reporte)
      .then(response => {
        return response;
      })
      .then(json => {
        this.setState({ data: json });
      })
      .then(res => {
        this.API_CCS.getCliente(row.getData().id_cliente)
          .then(response => {
            return response;
          })
          .then(json => {
            this.setState({ dataClient: json, loading: false });
          });
      });
  };

  closeUpdate = () => {
    this.setState({
      selectedLead: null,
      newCLient: false,
      updateClient: false,
      searchClient: true,
      loading: false
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  newLeadForms(e) {
    e.preventDefault();
    this.setState({
      newCLient: true,
      updateClient: false,
      searchClient: false
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });

    this.API_CCS.updateCliente(this.state)

      .then(res => {
        if (res.sucess === true) {
          MySwal.fire({
            title: "Correcto",
            text: "Cliente Actualizado Correctamente!",
            type: "success",
            confirmButtonColor: "#C00327",
            allowOutsideClick: false
          });
          this.updateTable();
          this.setState({ selectedLead: null });
          this.setState({ isSaving: false });
        } else {
          MySwal.fire({
            title: "Error",
            text:
              "Ocurrio un error al guardar el registro, por favor intenta de nuevo",
            type: "error",
            confirmButtonColor: "#C00327",
            allowOutsideClick: true
          });
          this.setState({ isSaving: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isSaving: false });
      });
  }

  updateTable() {
    this.setState({ isSaving: true });
    this.API_CCS.getRACS()
      .then(response => {
        return response;
      })
      .then(json => {
        this.setState({ dataRACS: json, isSaving: false });
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
          {/*######################################################################## BUSCADOR ########################################################################*/}
          {this.state.searchClient === true ? (
            <div className="animated fadeIn">
              <Card>
                <CardHeader className="text-center">
                  <i className="icon-magnifier" />
                  Busqueda de RACS
                </CardHeader>
                <CardBody className="text-center">
                  <Row>
                    <Col>
                      <ReactTabulator
                        rowClick={this.rowClick}
                        index={"id"}
                        data={this.state.dataRACS}
                        columns={columnsRACS}
                        tooltips={true}
                        layout={"fitColumns"}
                        options={options}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          ) : null}
          {/*######################################################################## UPDATE ########################################################################*/}
          {this.state.updateClient === true ? (
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
                    Actualizar RAC
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
                    {this.props.user.su === 0 ? (
                      <EditarRAC
                        data={this.state.data}
                        dataClient={this.state.dataClient}
                        function="update"
                      />
                    ) : (
                      <EditarRAC
                        data={this.state.data}
                        dataClient={this.state.dataClient}
                        function="desarrollos"
                      />
                    )}
                  </CardBody>
                </Card>
              </div>
            )
          ) : null}
        </div>
      );
    }
  }
}

export default withAuth(Inicio);
