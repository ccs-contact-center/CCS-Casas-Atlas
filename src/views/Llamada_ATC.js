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
import EditarRAC from "./Editar_RAC";

import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

const columns = [
  {
    title: "Cliente",
    field: "no_cliente",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 90
  },
  {
    title: "Nombres",
    field: "nombres",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 200
  },
  {
    title: "Paterno",
    field: "paterno",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 70
  },
  {
    title: "Materno",
    field: "materno",
    align: "left",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 70
  },
  {
    title: "Telefono 1",
    field: "tel1",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 120
  },
  {
    title: "Telefono 2",
    field: "tel2",
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
    width: 130
  },
  {
    title: "Desarrollo",
    field: "desarrollo",
    align: "center",
    headerFilter: true,
    headerFilterPlaceholder: "Buscar",
    width: 130
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

  editRAC = (e, row) => {
    this.setState({
      client: row.getData().clave_reporte,
      newCLient: false,
      updateClient: false,
      searchClient: false,
      loading: true,
      updateRAC: true
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

  rowClick = (e, row) => {
    this.setState({
      client: row.getData().no_cliente,
      newCLient: false,
      updateClient: true,
      searchClient: false,
      loading: true
    });

    this.API_CCS.getRACSClient(row.getData().no_cliente)
      .then(response => {
        return response;
      })
      .then(json => {
        this.setState({ dataRACS: json });
      })
      .then(next => {
        this.API_CCS.getCliente(row.getData().no_cliente).then(res => {
          this.setState({
            no_cliente: res[0].no_cliente,
            nombres: res[0].nombres,
            paterno: res[0].paterno,
            materno: res[0].materno,
            sexo: res[0].sexo,
            fecha_nacimiento: res[0].fecha_nacimiento,
            estado_civil: res[0].estado_civil,
            plaza: res[0].plaza,
            desarrollo: res[0].desarrollo,
            cerrada: res[0].cerrada,
            prototipo: res[0].prototipo,
            sector: res[0].sector,
            supermanzana: res[0].supermanzana,
            manzana: res[0].manzana,
            lote: res[0].lote,
            interior: res[0].interior,
            tel1: res[0].tel1,
            ext1: res[0].ext1,
            tel2: res[0].tel2,
            ext2: res[0].ext2,
            email: res[0].email,
            estado: res[0].estado,
            entrega_vivienda: res[0].entrega_vivienda,
            entrega_escrituras: res[0].entrega_escrituras
          });

          this.setState({ loading: false });
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

  closeNuevo = () => {
    this.updateTable();
    this.setState({
      selectedLead: null,
      newCLient: false,
      updateClient: false,
      searchClient: true,
      loading: false,
      nuevoRAC: false,
      updateRAC:false
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

  newRac = e => {
    this.setState({
      client: this.state.no_cliente,
      newCLient: false,
      updateClient: false,
      searchClient: false,
      loading: true,
      nuevoRAC: true
    });

    this.API_CCS.getCliente(this.state.no_cliente)
      .then(response => {
        return response;
      })
      .then(json => {
        this.setState({ dataClient: json, loading: false });
      });
  };

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
          {/*######################################################################## BUSCADOR ########################################################################*/}
          {this.state.searchClient === true ? (
            <div className="animated fadeIn">
              <Form onSubmit={this.newLeadForms}>
                <Card>
                  <CardHeader className="text-center">
                    <i className="icon-magnifier" />
                    Busqueda de Clientes
                  </CardHeader>
                  <CardBody className="text-center">
                    <Row>
                      <Col>
                        <ReactTabulator
                          rowClick={this.rowClick}
                          index={"id"}
                          data={this.state.data}
                          columns={columns}
                          tooltips={true}
                          layout={"fitColumns"}
                          options={options}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button type="submit" className="btn btn-primary">
                          Nuevo Cliente
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
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
                    Cliente
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
                      autoComplete="off"
                    >
                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Nombres</Label>
                            <Input
                              type="text"
                              placeholder="Nombres"
                              required
                              onChange={this.handleChange}
                              id="nombres"
                              value={this.state.nombres}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Paterno</Label>
                            <Input
                              type="text"
                              placeholder="Apellido Paterno"
                              required
                              onChange={this.handleChange}
                              id="paterno"
                              value={this.state.paterno}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Materno</Label>
                            <Input
                              type="text"
                              placeholder="Apellido Materno"
                              onChange={this.handleChange}
                              id="materno"
                              required
                              value={this.state.materno}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Sexo</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              required
                              onChange={this.handleChange}
                              id="sexo"
                              value={this.state.sexo}
                            >
                              <option value="">-Selecciona-</option>
                              <option>Masculino</option>
                              <option>Femenino</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">
                              Fecha de Nacimiento
                            </Label>
                            <Input
                              type="date"
                              placeholder="Fecha Contacto"
                              onChange={this.handleChange}
                              id="fecha_nacimiento"
                              required
                              value={this.state.fecha_nacimiento}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Estado Civil</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              onChange={this.handleChange}
                              id="estado_civil"
                              required
                              value={this.state.estado_civil}
                            >
                              <option value="">-Selecciona-</option>
                              <option>Casado</option>
                              <option>Divorciado</option>
                              <option>Soltero</option>
                              <option>Union Libre</option>
                              <option>Viudo</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Plaza</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              required
                              onChange={this.handleChange}
                              id="plaza"
                              value={this.state.plaza}
                            >
                              <option value="">-Selecciona-</option>
                              <option value="AGUASCALIENTES">
                                AGUASCALIENTES
                              </option>
                              <option value="CHIHUAHUA">CHIHUAHUA</option>
                              <option value="CIUDAD DE MEXICO">
                                CIUDAD DE MEXICO
                              </option>
                              <option value="LOS CABOS">LOS CABOS</option>
                              <option value="MONTERREY">MONTERREY</option>
                              <option value="QUERÉTARO">QUERÉTARO</option>
                              <option value="TORREÓN">TORREÓN</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Desarrollo</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              required
                              onChange={this.handleChange}
                              id="desarrollo"
                              value={this.state.desarrollo}
                            >
                              <option value="">-Selecciona-</option>
                              <option value="ALTOPOP">ALTOPOP</option>
                              <option value="ANCONA CUU">ANCONA CUU</option>
                              <option value="BIANCO QRO">BIANCO QRO</option>
                              <option value="BOJAI QRO">BOJAI QRO</option>
                              <option value="EL MIRADOR QRO">
                                EL MIRADOR QRO
                              </option>
                              <option value="LAS MISIONES SJC">
                                LAS MISIONES SJC
                              </option>
                              <option value="LIMONCELLO QRO">
                                LIMONCELLO QRO
                              </option>
                              <option value="LIVORNO TRC">LIVORNO TRC</option>
                              <option value="LOCALES QRO">LOCALES QRO</option>
                              <option value="LORETTO TRC">LORETTO TRC</option>
                              <option value="LOS NARANJOS AGS">
                                LOS NARANJOS AGS
                              </option>
                              <option value="MONTICELLO CUU">
                                MONTICELLO CUU
                              </option>
                              <option value="MONTICELLO MTY">
                                MONTICELLO MTY
                              </option>
                              <option value="MUESTRA MIRADOR">
                                MUESTRA MIRADOR
                              </option>
                              <option value="MURANO MTY">MURANO MTY</option>
                              <option value="ORLEANS CUU">ORLEANS CUU</option>
                              <option value="PASEO SAVELLI">
                                PASEO SAVELLI
                              </option>
                              <option value="PROVENZA QRO">PROVENZA QRO</option>
                              <option value="PUERTA REAL TRC">
                                PUERTA REAL TRC
                              </option>
                              <option value="PUERTA SAVONA CUU">
                                PUERTA SAVONA CUU
                              </option>
                              <option value="PUERTA VERONA QRO">
                                PUERTA VERONA QRO
                              </option>
                              <option value="ROMANA PASEO SICILIA QTO">
                                ROMANA PASEO SICILIA QTO
                              </option>
                              <option value="SANTA LUCIA CUU">
                                SANTA LUCIA CUU
                              </option>
                              <option value="SANTA LUCIA QRO">
                                SANTA LUCIA QRO
                              </option>
                              <option value="SANTORINI QRO">
                                SANTORINI QRO
                              </option>
                              <option value="SONTERRA VILLA NAPOLES II QTO">
                                SONTERRA VILLA NAPOLES II QTO
                              </option>
                              <option value="SONTERRA VILLA NAPOLES III QTO">
                                SONTERRA VILLA NAPOLES III QTO
                              </option>
                              <option value="SONTERRA VILLA NAPOLES QTO">
                                SONTERRA VILLA NAPOLES QTO
                              </option>
                              <option value="VILLA BRESCIA QRO">
                                VILLA BRESCIA QRO
                              </option>
                              <option value="VILLA CAPRI AGS">
                                VILLA CAPRI AGS
                              </option>
                              <option value="VILLA CAPRI QTO">
                                VILLA CAPRI QTO
                              </option>
                              <option value="VILLA CAPRI TRC">
                                VILLA CAPRI TRC
                              </option>
                              <option value="VILLA CATANIA">
                                VILLA CATANIA
                              </option>
                              <option value="VILLA FERRARA">
                                VILLA FERRARA
                              </option>
                              <option value="VILLA LORETO CUU">
                                VILLA LORETO CUU
                              </option>
                              <option value="VILLA NAPOLES CUU">
                                VILLA NAPOLES CUU
                              </option>
                              <option value="VILLA NAPOLES IV QTO">
                                VILLA NAPOLES IV QTO
                              </option>
                              <option value="VILLA NAPOLES V QRO">
                                VILLA NAPOLES V QRO
                              </option>
                              <option value="VILLA ROMANA QRO">
                                VILLA ROMANA QRO
                              </option>
                              <option value="VILLA ROMANA TRC">
                                VILLA ROMANA TRC
                              </option>
                              <option value="VILLA SAN LORENZO I CUU">
                                VILLA SAN LORENZO I CUU
                              </option>
                              <option value="VILLA SAN LORENZO III,IV CUU">
                                VILLA SAN LORENZO III,IV CUU
                              </option>
                              <option value="VILLA SAN LORENZO QTO">
                                VILLA SAN LORENZO QTO
                              </option>
                              <option value="VILLA SAN LORENZO V CUU">
                                VILLA SAN LORENZO V CUU
                              </option>
                              <option value="VILLA TOLEDO QRO">
                                VILLA TOLEDO QRO
                              </option>
                              <option value="VILLA TOSCANA CUU">
                                VILLA TOSCANA CUU
                              </option>
                              <option value="VILLA TOSCANA QTO">
                                VILLA TOSCANA QTO
                              </option>
                              <option value="VILLA TOSCANA TRC">
                                VILLA TOSCANA TRC
                              </option>
                              <option value="VILLA VENETTO AGS">
                                VILLA VENETTO AGS
                              </option>
                              <option value="VILLA VENETTO QTO">
                                VILLA VENETTO QTO
                              </option>
                              <option value="VILLAS SANTORINI TRC">
                                VILLAS SANTORINI TRC
                              </option>
                              <option value="ZAKIA CELESTE QRO">
                                ZAKIA CELESTE QRO
                              </option>
                              <option value="ZIBATA QRO">ZIBATA QRO</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Cerrada</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              onChange={this.handleChange}
                              id="cerrada"
                              required
                              value={this.state.cerrada}
                            >
                              <option value="">-Selecciona-</option>
                              <option value="ALTOPOP">ALTOPOP</option>
                              <option value="ANCONA CUU">ANCONA CUU</option>
                              <option value="ARLES QRO">ARLES QRO</option>
                              <option value="AVINON">AVINON</option>
                              <option value="BIANCO CASA M">
                                BIANCO CASA M
                              </option>
                              <option value="BOJAI QRO">BOJAI QRO</option>
                              <option value="CABORA BASSA">CABORA BASSA</option>
                              <option value="CALVIN">CALVIN</option>
                              <option value="CANTAL">CANTAL</option>
                              <option value="CASA MUESTRA">CASA MUESTRA</option>
                              <option value="CASAS MUESTRA">
                                CASAS MUESTRA
                              </option>
                              <option value="CASSIS">CASSIS</option>
                              <option value="CEIBA">CEIBA</option>
                              <option value="CELESTE QRO">CELESTE QRO</option>
                              <option value="CERRADA ALEARDI">
                                CERRADA ALEARDI
                              </option>
                              <option value="CERRADA BRESCIA">
                                CERRADA BRESCIA
                              </option>
                              <option value="CERRADA CARLOTTI">
                                CERRADA CARLOTTI
                              </option>
                              <option value="CERRADA CATENA">
                                CERRADA CATENA
                              </option>
                              <option value="CERRADA CEIBA">
                                CERRADA CEIBA
                              </option>
                              <option value="CERRADA FERROVIA">
                                CERRADA FERROVIA
                              </option>
                              <option value="CERRADA FIORELO">
                                CERRADA FIORELO
                              </option>
                              <option value="CERRADA FIORELO QRO">
                                CERRADA FIORELO QRO
                              </option>
                              <option value="CERRADA FRANCESCO">
                                CERRADA FRANCESCO
                              </option>
                              <option value="CERRADA GARIBALDI">
                                CERRADA GARIBALDI
                              </option>
                              <option value="CERRADA NUOVO QRO">
                                CERRADA NUOVO QRO
                              </option>
                              <option value="CERRADA SICILIA">
                                CERRADA SICILIA
                              </option>
                              <option value="CERRADA YOLA">CERRADA YOLA</option>
                              <option value="CORCEGA">CORCEGA</option>
                              <option value="DONATO MTY">DONATO MTY</option>
                              <option value="FERRARA QTO">FERRARA QTO</option>
                              <option value="GARIBALDI">GARIBALDI</option>
                              <option value="ISLA PEREJIL">ISLA PEREJIL</option>
                              <option value="LIMONCELLO">LIMONCELLO</option>
                              <option value="LIMONCELLO QRO">
                                LIMONCELLO QRO
                              </option>
                              <option value="LIVORNO TRC">LIVORNO TRC</option>
                              <option value="LORETO">LORETO</option>
                              <option value="LORETTO TRC">LORETTO TRC</option>
                              <option value="MAGARIA">MAGARIA</option>
                              <option value="MASCARE�AS">MASCARE�AS</option>
                              <option value="MONTEMORO">MONTEMORO</option>
                              <option value="MONTICELLO">MONTICELLO</option>
                              <option value="MONTICELLO CUU">
                                MONTICELLO CUU
                              </option>
                              <option value="MONTICELLO I, II">
                                MONTICELLO I, II
                              </option>
                              <option value="MONTICELLO II CUU">
                                MONTICELLO II CUU
                              </option>
                              <option value="MONTICELLO III">
                                MONTICELLO III
                              </option>
                              <option value="MONTICELLO III CUU">
                                MONTICELLO III CUU
                              </option>
                              <option value="MONTICELLO IV MTY">
                                MONTICELLO IV MTY
                              </option>
                              <option value="MONTICELLO V MTY">
                                MONTICELLO V MTY
                              </option>
                              <option value="MONTICELLO VI MTY">
                                MONTICELLO VI MTY
                              </option>
                              <option value="MUESTRA">MUESTRA</option>
                              <option value="MURANO I">MURANO I</option>
                              <option value="NAPOLES">NAPOLES</option>
                              <option value="NAPOLES CUU">NAPOLES CUU</option>
                              <option value="NAPOLES II">NAPOLES II</option>
                              <option value="NAPOLES III">NAPOLES III</option>
                              <option value="NAPOLES III CUU">
                                NAPOLES III CUU
                              </option>
                              <option value="NAPOLES IV">NAPOLES IV</option>
                              <option value="NAPOLES V">NAPOLES V</option>
                              <option value="NIZA">NIZA</option>
                              <option value="NUOVO">NUOVO</option>
                              <option value="NUVOLE">NUVOLE</option>
                              <option value="OLMO">OLMO</option>
                              <option value="ORLEANS I CUU">
                                ORLEANS I CUU
                              </option>
                              <option value="ORLEANS II CUU">
                                ORLEANS II CUU
                              </option>
                              <option value="PASEO ANCONA QTO">
                                PASEO ANCONA QTO
                              </option>
                              <option value="PASEO ARCEVIA QTO">
                                PASEO ARCEVIA QTO
                              </option>
                              <option value="PASEO BERNINI">
                                PASEO BERNINI
                              </option>
                              <option value="PASEO BORBON">PASEO BORBON</option>
                              <option value="PASEO DA VINCI">
                                PASEO DA VINCI
                              </option>
                              <option value="PASEO FIORELO">
                                PASEO FIORELO
                              </option>
                              <option value="PASEO FLORENCIA">
                                PASEO FLORENCIA
                              </option>
                              <option value="PASEO GRIMALDI">
                                PASEO GRIMALDI
                              </option>
                              <option value="PASEO HABSBURGO">
                                PASEO HABSBURGO
                              </option>
                              <option value="PASEO LIVORNO">
                                PASEO LIVORNO
                              </option>
                              <option value="PASEO LOS ALAMOS">
                                PASEO LOS ALAMOS
                              </option>
                              <option value="PASEO LOS ENCINOS">
                                PASEO LOS ENCINOS
                              </option>
                              <option value="PASEO LOS NOGALES">
                                PASEO LOS NOGALES
                              </option>
                              <option value="PASEO LOS OLIVOS">
                                PASEO LOS OLIVOS
                              </option>
                              <option value="PASEO MIGUEL ANGEL">
                                PASEO MIGUEL ANGEL
                              </option>
                              <option value="PASEO ORLEANS">
                                PASEO ORLEANS
                              </option>
                              <option value="PASEO SABOYA">PASEO SABOYA</option>
                              <option value="PASEO SAN RAFAEL">
                                PASEO SAN RAFAEL
                              </option>
                              <option value="PASEO SAVAL QRO">
                                PASEO SAVAL QRO
                              </option>
                              <option value="PASEO SAVELLI">
                                PASEO SAVELLI
                              </option>
                              <option value="PASEO SIENA">PASEO SIENA</option>
                              <option value="PASEO WINDSOR">
                                PASEO WINDSOR
                              </option>
                              <option value="PRIVADA ALICANTE">
                                PRIVADA ALICANTE
                              </option>
                              <option value="PRIVADA CANTABRIA">
                                PRIVADA CANTABRIA
                              </option>
                              <option value="PRIVADA COLISEO">
                                PRIVADA COLISEO
                              </option>
                              <option value="PRIVADA DEL CORSO">
                                PRIVADA DEL CORSO
                              </option>
                              <option value="PRIVADA NAVONA">
                                PRIVADA NAVONA
                              </option>
                              <option value="PROVENZA CASSIS QRO">
                                PROVENZA CASSIS QRO
                              </option>
                              <option value="PROVENZA NIZA QRO">
                                PROVENZA NIZA QRO
                              </option>
                              <option value="PUERTA SANTUARIO CUU">
                                PUERTA SANTUARIO CUU
                              </option>
                              <option value="SABORA BASSA">SABORA BASSA</option>
                              <option value="SAN LORENZO III">
                                SAN LORENZO III
                              </option>
                              <option value="SAN LORENZO IV">
                                SAN LORENZO IV
                              </option>
                              <option value="SAN LORENZO V">
                                SAN LORENZO V
                              </option>
                              <option value="SANTA LUCIA">SANTA LUCIA</option>
                              <option value="SANTORINI QRO">
                                SANTORINI QRO
                              </option>
                              <option value="SANTUARIO">SANTUARIO</option>
                              <option value="SAVAL QRO">SAVAL QRO</option>
                              <option value="SAVONA">SAVONA</option>
                              <option value="SAVONA ETAPA C">
                                SAVONA ETAPA C
                              </option>
                              <option value="SAVONA ETAPA D">
                                SAVONA ETAPA D
                              </option>
                              <option value="SAVONA ETAPA E">
                                SAVONA ETAPA E
                              </option>
                              <option value="TENERES">TENERES</option>
                              <option value="TOLEDO">TOLEDO</option>
                              <option value="TRAMONTO">TRAMONTO</option>
                              <option value="VILLA CAPRI">VILLA CAPRI</option>
                              <option value="VILLA TOSCANA">
                                VILLA TOSCANA
                              </option>
                              <option value="YOLA">YOLA</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Prototipo</Label>
                            <Input
                              type="select"
                              placeholder="Categoría"
                              onChange={this.handleChange}
                              id="prototipo"
                              required
                              value={this.state.prototipo}
                            >
                              <option value="">-Selecciona-</option>
                              <option value="1A">1A</option>
                              <option value="1B">1B</option>
                              <option value="2A">2A</option>
                              <option value="2B">2B</option>
                              <option value="3A">3A</option>
                              <option value="5A">5A</option>
                              <option value="5B">5B</option>
                              <option value="6A">6A</option>
                              <option value="6B">6B</option>
                              <option value="6B ESQ">6B ESQ</option>
                              <option value="7A">7A</option>
                              <option value="7B">7B</option>
                              <option value="ALISEO">ALISEO</option>
                              <option value="ALISEO A">ALISEO A</option>
                              <option value="ALISEO B">ALISEO B</option>
                              <option value="ALISEO IS">ALISEO IS</option>
                              <option value="AMALFI A">AMALFI A</option>
                              <option value="AMALFI B">AMALFI B</option>
                              <option value="BARTOLI A">BARTOLI A</option>
                              <option value="BELLINI A 122 M2">
                                BELLINI A 122 M2
                              </option>
                              <option value="BELLINI A C/PASILLO INT">
                                BELLINI A C/PASILLO INT
                              </option>
                              <option value="BELLINI B C/PASILLO INT">
                                BELLINI B C/PASILLO INT
                              </option>
                              <option value="BERNINI 82 A">BERNINI 82 A</option>
                              <option value="BERNINI A">BERNINI A</option>
                              <option value="BERNINI A UM">BERNINI A UM</option>
                              <option value="BERNINI AMPL">BERNINI AMPL</option>
                              <option value="BERNINI B">BERNINI B</option>
                              <option value="BLU A">BLU A</option>
                              <option value="BORGHESE A">BORGHESE A</option>
                              <option value="BORGHESE ESQ 2">
                                BORGHESE ESQ 2
                              </option>
                              <option value="BORGHESE ESQUINERA">
                                BORGHESE ESQUINERA
                              </option>
                              <option value="BORGHESE MED A">
                                BORGHESE MED A
                              </option>
                              <option value="BORGHESE MED C">
                                BORGHESE MED C
                              </option>
                              <option value="BORGHESE MED D">
                                BORGHESE MED D
                              </option>
                              <option value="BORGHESE MED. A">
                                BORGHESE MED. A
                              </option>
                              <option value="BORGHESE MED. B">
                                BORGHESE MED. B
                              </option>
                              <option value="BORGHESE MED. C">
                                BORGHESE MED. C
                              </option>
                              <option value="BORGHESE MED. D">
                                BORGHESE MED. D
                              </option>
                              <option value="BORGIA  MED. C 119 M2">
                                BORGIA MED. C 119 M2
                              </option>
                              <option value="BORGIA (BOA)">BORGIA (BOA)</option>
                              <option value="BORGIA A">BORGIA A</option>
                              <option value="BORGIA B">BORGIA B</option>
                              <option value="BORGIA C">BORGIA C</option>
                              <option value="BORGIA CP">BORGIA CP</option>
                              <option value="BORGIA D">BORGIA D</option>
                              <option value="BORGIA ESQ">BORGIA ESQ</option>
                              <option value="BORGIA ESQ.2 119 M2">
                                BORGIA ESQ.2 119 M2
                              </option>
                              <option value="BORGIA ESQ2 119 M2">
                                BORGIA ESQ2 119 M2
                              </option>
                              <option value="BORGIA MED A 119 M2">
                                BORGIA MED A 119 M2
                              </option>
                              <option value="BORGIA MED B 119 M2">
                                BORGIA MED B 119 M2
                              </option>
                              <option value="BORGIA MED C 119 M2">
                                BORGIA MED C 119 M2
                              </option>
                              <option value="BORGIA MED. A 119 M2">
                                BORGIA MED. A 119 M2
                              </option>
                              <option value="BORGIA MED. B 119 M2">
                                BORGIA MED. B 119 M2
                              </option>
                              <option value="BORGIA SP">BORGIA SP</option>
                              <option value="BORGUESE">BORGUESE</option>
                              <option value="BOTICELLI">BOTICELLI</option>
                              <option value="BOTICELLI A">BOTICELLI A</option>
                              <option value="BOTICELLI B">BOTICELLI B</option>
                              <option value="BOTICELLI C">BOTICELLI C</option>
                              <option value="BOTICELLI D">BOTICELLI D</option>
                              <option value="CAPRI A MTY">CAPRI A MTY</option>
                              <option value="CAPRI B CUU">CAPRI B CUU</option>
                              <option value="CAPRI CUU">CAPRI CUU</option>
                              <option value="CAPRI MTY">CAPRI MTY</option>
                              <option value="CELESTE A">CELESTE A</option>
                              <option value="CELESTE B">CELESTE B</option>
                              <option value="CERRADA FIORELO QRO">
                                CERRADA FIORELO QRO
                              </option>
                              <option value="CHAMBORD">CHAMBORD</option>
                              <option value="CHAMBORD A">CHAMBORD A</option>
                              <option value="DAVINCI A">DAVINCI A</option>
                              <option value="DAVINCI B">DAVINCI B</option>
                              <option value="DAVINCI C">DAVINCI C</option>
                              <option value="DONATELLO A">DONATELLO A</option>
                              <option value="DONATELLO B">DONATELLO B</option>
                              <option value="DONATELLO C">DONATELLO C</option>
                              <option value="DONATELLO ESQ">
                                DONATELLO ESQ
                              </option>
                              <option value="DORATO A">DORATO A</option>
                              <option value="DORATO B">DORATO B</option>
                              <option value="FARINELLI A">FARINELLI A</option>
                              <option value="FARINELLI A 137 M2">
                                FARINELLI A 137 M2
                              </option>
                              <option value="FARINELLI B">FARINELLI B</option>
                              <option value="FARINELLI B 137 M2">
                                FARINELLI B 137 M2
                              </option>
                              <option value="FARINELLI C">FARINELLI C</option>
                              <option value="FARINELLI C 137 M2">
                                FARINELLI C 137 M2
                              </option>
                              <option value="FARINELLI ESQ 137 M2">
                                FARINELLI ESQ 137 M2
                              </option>
                              <option value="FELINI A">FELINI A</option>
                              <option value="FELINI B">FELINI B</option>
                              <option value="FELLINI A">FELLINI A</option>
                              <option value="FELLINI ESQ">FELLINI ESQ</option>
                              <option value="FLORENTININO A">
                                FLORENTININO A
                              </option>
                              <option value="FLORENTINO">FLORENTINO</option>
                              <option value="FLORENTINO 70 A">
                                FLORENTINO 70 A
                              </option>
                              <option value="FLORENTINO 70 B">
                                FLORENTINO 70 B
                              </option>
                              <option value="FLORENTINO 70 C">
                                FLORENTINO 70 C
                              </option>
                              <option value="FLORENTINO 90 A">
                                FLORENTINO 90 A
                              </option>
                              <option value="FLORENTINO 90 B">
                                FLORENTINO 90 B
                              </option>
                              <option value="FLORENTINO 90 ESQ">
                                FLORENTINO 90 ESQ
                              </option>
                              <option value="FLORENTINO B">FLORENTINO B</option>
                              <option value="FONTANA">FONTANA</option>
                              <option value="FONTANA A">FONTANA A</option>
                              <option value="GARIBALDI">GARIBALDI</option>
                              <option value="GENOVA">GENOVA</option>
                              <option value="GENOVA A">GENOVA A</option>
                              <option value="GRIMALDI ESQ.">
                                GRIMALDI ESQ.
                              </option>
                              <option value="GRIMALDI MED. B">
                                GRIMALDI MED. B
                              </option>
                              <option value="LOTE A">LOTE A</option>
                              <option value="LOTE B">LOTE B</option>
                              <option value="LUCCA B CUU">LUCCA B CUU</option>
                              <option value="LUCCA CUU">LUCCA CUU</option>
                              <option value="LUCIANA">LUCIANA</option>
                              <option value="LYON">LYON</option>
                              <option value="LYON A">LYON A</option>
                              <option value="LYON B">LYON B</option>
                              <option value="LYON C">LYON C</option>
                              <option value="LYON MTY">LYON MTY</option>
                              <option value="LYON QRO">LYON QRO</option>
                              <option value="MAGENTA A">MAGENTA A</option>
                              <option value="MAGENTA B">MAGENTA B</option>
                              <option value="MARBELLA">MARBELLA</option>
                              <option value="MARBELLA 113 A">
                                MARBELLA 113 A
                              </option>
                              <option value="MARBELLA 113 B">
                                MARBELLA 113 B
                              </option>
                              <option value="MARBELLA 95 A">
                                MARBELLA 95 A
                              </option>
                              <option value="MARBELLA 95 B">
                                MARBELLA 95 B
                              </option>
                              <option value="MARBELLA A">MARBELLA A</option>
                              <option value="MARBELLA B">MARBELLA B</option>
                              <option value="MARRONE A">MARRONE A</option>
                              <option value="MARSELLA">MARSELLA</option>
                              <option value="MARSELLA A MTY">
                                MARSELLA A MTY
                              </option>
                              <option value="MARSELLA A ROOF TOP MTY">
                                MARSELLA A ROOF TOP MTY
                              </option>
                              <option value="MARSELLA B">MARSELLA B</option>
                              <option value="MARSELLA B ROOF TOP MTY">
                                MARSELLA B ROOF TOP MTY
                              </option>
                              <option value="MEDICCI D">MEDICCI D</option>
                              <option value="MEDICCI ESQUINERA 1 159 M2">
                                MEDICCI ESQUINERA 1 159 M2
                              </option>
                              <option value="MEDICCI ESQUINERA 2 159 M2">
                                MEDICCI ESQUINERA 2 159 M2
                              </option>
                              <option value="MEDICCI ESQUINERA 2 163 M2">
                                MEDICCI ESQUINERA 2 163 M2
                              </option>
                              <option value="MEDICI">MEDICI</option>
                              <option value="MEDICI A">MEDICI A</option>
                              <option value="MEDICI A 164 M2">
                                MEDICI A 164 M2
                              </option>
                              <option value="MEDICI B">MEDICI B</option>
                              <option value="MEDICI C">MEDICI C</option>
                              <option value="MEDICI CON BALCON ESQ 2 163M2">
                                MEDICI CON BALCON ESQ 2 163M2
                              </option>
                              <option value="MEDICI CON BALCON ESQ. 2 163M2">
                                MEDICI CON BALCON ESQ. 2 163M2
                              </option>
                              <option value="MEDICI D 159 M2">
                                MEDICI D 159 M2
                              </option>
                              <option value="MEDICI D 163 M2">
                                MEDICI D 163 M2
                              </option>
                              <option value="MEDICI D 164 M2 C/CTO DE SERV">
                                MEDICI D 164 M2 C/CTO DE SERV
                              </option>
                              <option value="MEDICI D CON BALCON 163 M2">
                                MEDICI D CON BALCON 163 M2
                              </option>
                              <option value="MEDICI ESQ">MEDICI ESQ</option>
                              <option value="MEDICI ESQ 164  S/CTO DE SERV">
                                MEDICI ESQ 164 S/CTO DE SERV
                              </option>
                              <option value="MEDICI ESQ 164 C/ BCON S/CTOS">
                                MEDICI ESQ 164 C/ BCON S/CTOS
                              </option>
                              <option value="MEDICI ESQ1 164M C/CTO DE SERV">
                                MEDICI ESQ1 164M C/CTO DE SERV
                              </option>
                              <option value="MEDICI ESQUINERA 1">
                                MEDICI ESQUINERA 1
                              </option>
                              <option value="MEDICI ESQUINERA 159 M2">
                                MEDICI ESQUINERA 159 M2
                              </option>
                              <option value="MEDICI ESQUINERA 164 M2">
                                MEDICI ESQUINERA 164 M2
                              </option>
                              <option value="MEDICI ESQUINERA 2 163 M2">
                                MEDICI ESQUINERA 2 163 M2
                              </option>
                              <option value="MICHELANGELO">MICHELANGELO</option>
                              <option value="MICHELANGELO A">
                                MICHELANGELO A
                              </option>
                              <option value="MICHELANGELO B">
                                MICHELANGELO B
                              </option>
                              <option value="MICHELANGELO C">
                                MICHELANGELO C
                              </option>
                              <option value="MICHELANGELO ESQ">
                                MICHELANGELO ESQ
                              </option>
                              <option value="MILANO">MILANO</option>
                              <option value="MILANO A">MILANO A</option>
                              <option value="MILANO B">MILANO B</option>
                              <option value="MILANO C">MILANO C</option>
                              <option value="MILANO IS">MILANO IS</option>
                              <option value="MISTRAL">MISTRAL</option>
                              <option value="MISTRAL A">MISTRAL A</option>
                              <option value="MISTRAL B">MISTRAL B</option>
                              <option value="MISTRAL IS">MISTRAL IS</option>
                              <option value="MONTEVERDI B">MONTEVERDI B</option>
                              <option value="MONTEVERDI ESQUINERA II">
                                MONTEVERDI ESQUINERA II
                              </option>
                              <option value="MYKONOS">MYKONOS</option>
                              <option value="MYKONOS ESQUINERA 2">
                                MYKONOS ESQUINERA 2
                              </option>
                              <option value="NAPOLI A">NAPOLI A</option>
                              <option value="NAPOLI B">NAPOLI B</option>
                              <option value="NERO">NERO</option>
                              <option value="NERO B">NERO B</option>
                              <option value="NUEVA BORGHESE A">
                                NUEVA BORGHESE A
                              </option>
                              <option value="NUEVA BORGHESE B">
                                NUEVA BORGHESE B
                              </option>
                              <option value="NUEVA BORGHESE C">
                                NUEVA BORGHESE C
                              </option>
                              <option value="NUEVA BORGHESE D">
                                NUEVA BORGHESE D
                              </option>
                              <option value="OLIMPIA A">OLIMPIA A</option>
                              <option value="OLIMPIA B">OLIMPIA B</option>
                              <option value="OLIMPIA ESQ">OLIMPIA ESQ</option>
                              <option value="OLYMPIA">OLYMPIA</option>
                              <option value="OLYMPIA ESQUINERA">
                                OLYMPIA ESQUINERA
                              </option>
                              <option value="ORLEANS A">ORLEANS A</option>
                              <option value="ORSINI A">ORSINI A</option>
                              <option value="ORSINI C">ORSINI C</option>
                              <option value="ORSINI CON BALCON C">
                                ORSINI CON BALCON C
                              </option>
                              <option value="ORSINI CON BALCON D">
                                ORSINI CON BALCON D
                              </option>
                              <option value="ORSINI CON BALCON ESQUINERA">
                                ORSINI CON BALCON ESQUINERA
                              </option>
                              <option value="ORSINI D">ORSINI D</option>
                              <option value="ORSINI ESQUINERA">
                                ORSINI ESQUINERA
                              </option>
                              <option value="PISA A">PISA A</option>
                              <option value="PISA B">PISA B</option>
                              <option value="PISA C">PISA C</option>
                              <option value="PIZA">PIZA</option>
                              <option value="POR DEFINIRSE">
                                POR DEFINIRSE
                              </option>
                              <option value="PRADO">PRADO</option>
                              <option value="PRADO A">PRADO A</option>
                              <option value="PRADO A 114">PRADO A 114</option>
                              <option value="PRADO B">PRADO B</option>
                              <option value="PRADO B 114">PRADO B 114</option>
                              <option value="PROTOTIPO POR DEFINIRSE">
                                PROTOTIPO POR DEFINIRSE
                              </option>
                              <option value="PUCCINI ESQ">PUCCINI ESQ</option>
                              <option value="PUCCINI TIPO A">
                                PUCCINI TIPO A
                              </option>
                              <option value="PUCCINI TIPO B">
                                PUCCINI TIPO B
                              </option>
                              <option value="ROSSINI A">ROSSINI A</option>
                              <option value="ROSSINI ESQ">ROSSINI ESQ</option>
                              <option value="SABOYA">SABOYA</option>
                              <option value="SABOYA A">SABOYA A</option>
                              <option value="SABOYA A 103 M2">
                                SABOYA A 103 M2
                              </option>
                              <option value="SABOYA B">SABOYA B</option>
                              <option value="SABOYA C">SABOYA C</option>
                              <option value="SABOYA C/C">SABOYA C/C</option>
                              <option value="SABOYA D">SABOYA D</option>
                              <option value="SABOYA TIPO A">
                                SABOYA TIPO A
                              </option>
                              <option value="SAVOYA">SAVOYA</option>
                              <option value="SAVOYA A">SAVOYA A</option>
                              <option value="SAVOYA B">SAVOYA B</option>
                              <option value="SAVOYA TIPO A">
                                SAVOYA TIPO A
                              </option>
                              <option value="TERRENO">TERRENO</option>
                              <option value="TERRENO COM IS">
                                TERRENO COM IS
                              </option>
                              <option value="TORINO">TORINO</option>
                              <option value="TORINO A">TORINO A</option>
                              <option value="TORINO B">TORINO B</option>
                              <option value="VENECIA">VENECIA</option>
                              <option value="VENECIA A">VENECIA A</option>
                              <option value="VENECIA B">VENECIA B</option>
                              <option value="VENECIA C">VENECIA C</option>
                              <option value="VERDI ESQUINERA 2">
                                VERDI ESQUINERA 2
                              </option>
                              <option value="VERDI TIPO C">VERDI TIPO C</option>
                              <option value="VERSALLES A">VERSALLES A</option>
                              <option value="VERSALLES B">VERSALLES B</option>
                              <option value="VERSALLES C">VERSALLES C</option>
                              <option value="VERSALLES D">VERSALLES D</option>
                              <option value="VERSALLES ESQUINERA">
                                VERSALLES ESQUINERA
                              </option>
                              <option value="VERSALLES ESQUINERA 2">
                                VERSALLES ESQUINERA 2
                              </option>
                              <option value="VERSALLES F">VERSALLES F</option>
                              <option value="VERSALLES MOD A">
                                VERSALLES MOD A
                              </option>
                              <option value="VERSALLES MOD B">
                                VERSALLES MOD B
                              </option>
                              <option value="VERSALLES MOD. B">
                                VERSALLES MOD. B
                              </option>
                              <option value="VILLANOVA 2">VILLANOVA 2</option>
                              <option value="VILLANOVA 3">VILLANOVA 3</option>
                              <option value="VILLANOVA A">VILLANOVA A</option>
                              <option value="VILLANOVA B">VILLANOVA B</option>
                              <option value="VILLANOVA PLU">
                                VILLANOVA PLU
                              </option>
                              <option value="VILLANOVA PLU 64 A">
                                VILLANOVA PLU 64 A
                              </option>
                              <option value="VILLANOVA PLU 64 B">
                                VILLANOVA PLU 64 B
                              </option>
                              <option value="VILLANOVA PLU 73 A">
                                VILLANOVA PLU 73 A
                              </option>
                              <option value="VILLANOVA PLU 73 B">
                                VILLANOVA PLU 73 B
                              </option>
                              <option value="VILLANOVA UNI">
                                VILLANOVA UNI
                              </option>
                              <option value="VILLANOVA UNI 73">
                                VILLANOVA UNI 73
                              </option>
                              <option value="VILLANOVA UNI 73 A">
                                VILLANOVA UNI 73 A
                              </option>
                              <option value="VILLANOVA UNI 73 B">
                                VILLANOVA UNI 73 B
                              </option>
                              <option value="VILLANOVA UNI 73 C">
                                VILLANOVA UNI 73 C
                              </option>
                              <option value="VIOLA A">VIOLA A</option>
                              <option value="VIOLA C">VIOLA C</option>
                              <option value="VISCONTI">VISCONTI</option>
                              <option value="VISCONTI C">VISCONTI C</option>
                              <option value="VISCONTI D">VISCONTI D</option>
                              <option value="VISCONTI ESQUINERA 2">
                                VISCONTI ESQUINERA 2
                              </option>
                              <option value="VISCONTI ESQUINERA 3">
                                VISCONTI ESQUINERA 3
                              </option>
                              <option value="VISCONTI ESQUINERA 4">
                                VISCONTI ESQUINERA 4
                              </option>
                              <option value="VIVALDI">VIVALDI</option>
                              <option value="VIVALDI A 215 M2">
                                VIVALDI A 215 M2
                              </option>
                              <option value="VIVALDI A 217 M2">
                                VIVALDI A 217 M2
                              </option>
                              <option value="VIVALDI B 217 M2">
                                VIVALDI B 217 M2
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Sector</Label>
                            <Input
                              type="text"
                              placeholder="Sector"
                              onChange={this.handleChange}
                              id="email_2"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Supermanzana</Label>
                            <Input
                              type="text"
                              placeholder="Supermanzana"
                              onChange={this.handleChange}
                              id="supermanzana"
                              value={this.state.supermanzana}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-2">
                          <FormGroup>
                            <Label htmlFor="prospecto">Manzana</Label>
                            <Input
                              type="text"
                              placeholder="Mz"
                              onChange={this.handleChange}
                              id="manzana"
                              required
                              value={this.state.manzana}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Lote</Label>
                            <Input
                              type="text"
                              placeholder="Lote"
                              onChange={this.handleChange}
                              id="lote"
                              required
                              value={this.state.lote}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-2">
                          <FormGroup>
                            <Label htmlFor="prospecto">Interior</Label>
                            <Input
                              type="text"
                              placeholder="Interior"
                              onChange={this.handleChange}
                              id="interior"
                              value={this.state.interior}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Número de Cliente</Label>
                            <Input
                              type="text"
                              placeholder="No. Cliente"
                              onChange={this.handleChange}
                              id="no_cliente"
                              value={this.state.no_cliente}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Email</Label>
                            <Input
                              type="email"
                              placeholder="Email"
                              onChange={this.handleChange}
                              id="email"
                              value={this.state.email}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Telefono 1</Label>
                            <Input
                              type="text"
                              pattern="[0-9]{10}"
                              placeholder="5555555555"
                              required
                              onChange={this.handleChange}
                              id="tel1"
                              value={this.state.tel1}
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
                              id="ext1"
                              value={this.state.ext1}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-4">
                          <FormGroup>
                            <Label htmlFor="prospecto">Telefono 2</Label>
                            <Input
                              type="text"
                              pattern="[0-9]{10}"
                              placeholder="5555555555"
                              onChange={this.handleChange}
                              id="tel2"
                              value={this.state.tel2}
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
                              id="ext2"
                              value={this.state.ext2}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">Entrega Vivienda</Label>
                            <Input
                              type="date"
                              placeholder="Fecha Contacto"
                              onChange={this.handleChange}
                              id="entrega_vivienda"
                              value={this.state.entrega_vivienda}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="col-sm-6">
                          <FormGroup>
                            <Label htmlFor="prospecto">
                              Entrega Escrituras
                            </Label>
                            <Input
                              type="date"
                              placeholder="Fecha Contacto"
                              onChange={this.handleChange}
                              id="entrega_escrituras"
                              value={this.state.entrega_escrituras}
                            />
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
                      <br />
                      <CardHeader className="text-center">
                        Busqueda de RACS
                        <div className="card-header-actions">
                          <Button
                            color="link"
                            className="card-header-action btn-close"
                            onClick={this.newRac}
                          >
                            Nuevo &nbsp;
                            <i className="icon-note" />
                          </Button>
                        </div>
                      </CardHeader>
                      <Row>
                        <Col>
                          <ReactTabulator
                            rowClick={this.editRAC}
                            index={"idNuevo"}
                            data={this.state.dataRACS}
                            columns={columnsRACS}
                            tooltips={true}
                            layout={"fitColumns"}
                            options={options}
                          />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            )
          ) : null}
          {/*######################################################################## NUEVO ########################################################################*/}
          {this.state.newCLient === true ? (
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
              this.props.history.replace("/Nuevo_Cliente")
            )
          ) : null}
          {/*######################################################################## NUEVO RAC########################################################################*/}
          {this.state.nuevoRAC === true ? (
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
                    Nuevo RAC
                    <div className="card-header-actions">
                      <Button
                        color="link"
                        className="card-header-action btn-close"
                        onClick={this.closeNuevo}
                      >
                        <i className="icon-close" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardBody>
                    <EditarRAC
                      data={this.state.data}
                      dataClient={this.state.dataClient}
                      function="insert"
                    />
                  </CardBody>
                </Card>
              </div>
            )
          ) : null}

          {this.state.updateRAC === true ? (
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
                    Editar RAC
                    <div className="card-header-actions">
                      <Button
                        color="link"
                        className="card-header-action btn-close"
                        onClick={this.closeNuevo}
                      >
                        <i className="icon-close" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardBody>
                    <EditarRAC
                      data={this.state.data}
                      dataClient={this.state.dataClient}
                      function="update"
                    />
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
