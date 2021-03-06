import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
} from "reactstrap";
import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
import AuthService from "../components/AuthService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-loader-spinner";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");

const MySwal = withReactContent(Swal);

class Nuevo_Cliente extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.API_CCS = new API_CCS();
    this.Auth = new AuthService();
    this.formRef = React.createRef();
    this.state = {
      isSaving: false,
      id_user: this.Auth.getProfile().id_ccs,
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
      entrega_escrituras: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  closeUpdate = () => {
    this.props.history.replace("/Llamada_ATC");
  };

  handleFormSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true });

    this.API_CCS.insertCliente(this.state)

      .then((res) => {
        if (res.sucess === true) {
          this.setState({
            data: [],
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
            entrega_escrituras: "",
          });
          MySwal.fire({
            title: "Correcto",
            text: "Cliente Guardado Correctamente!",
            type: "success",
            confirmButtonColor: "#C00327",
            allowOutsideClick: false,
          });

          this.setState({ selectedLead: null });
          this.setState({ isSaving: false });
        } else {
          MySwal.fire({
            title: "Error",
            text:
              "Ocurrio un error al guardar el registro, por favor intenta de nuevo",
            type: "error",
            confirmButtonColor: "#C00327",
            allowOutsideClick: true,
          });
          this.setState({ isSaving: false });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isSaving: false });
      });
  }

  render() {
    if (this.state.isSaving) {
      return (
        <div
          style={{
            height: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Loader type="Oval" color={brandPrimary} height="70" width="70" />{" "}
          </div>
        </div>
      );
    } else {
      return (
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
                      <Label htmlFor="prospecto">Fecha de Nacimiento</Label>
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
                        <option value="CDMX">CDMX</option>
                        <option value="CHIHUAHUA">CHIHUAHUA</option>
                        <option value="LAS MISIONES SJC">
                          LAS MISIONES SJC
                        </option>
                        <option value="MONTERREY">MONTERREY</option>
                        <option value="QUERETARO">QUERETARO</option>
                        <option value="TORREON">TORREON</option>
                        <option value="AGUASCALIENTES">AGUASCALIENTES</option>
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
                        <option value="AMARELLO QRO">AMARELLO QRO</option>
                        <option value="ANCONA CUU">ANCONA CUU</option>
                        <option value="BIANCO QRO">BIANCO QRO</option>
                        <option value="BOREAL CUU">BOREAL CUU</option>
                        <option value="COLISEO TRC">COLISEO TRC</option>
                        <option value="FERRARA MTY">FERRARA MTY</option>
                        <option value="LAS MISIONES SJC">
                          LAS MISIONES SJC
                        </option>
                        <option value="LIMONCELLO QRO">LIMONCELLO QRO</option>
                        <option value="LORETTO TRC">LORETTO TRC</option>
                        <option value="MONTICELLO CUU">MONTICELLO CUU</option>
                        <option value="MONTICELLO MTY">MONTICELLO MTY</option>
                        <option value="MURANO MTY">MURANO MTY</option>
                        <option value="ORLEANS CUU">ORLEANS CUU</option>
                        <option value="PROVENZA QRO">PROVENZA QRO</option>
                        <option value="PUERTA SAVONA CUU">
                          PUERTA SAVONA CUU
                        </option>
                        <option value="PUERTA VERONA QRO">
                          PUERTA VERONA QRO
                        </option>
                        <option value="SANTA LUCIA CUU">SANTA LUCIA CUU</option>
                        <option value="SANTA LUCIA QRO">SANTA LUCIA QRO</option>
                        <option value="SANTORINI QRO">SANTORINI QRO</option>
                        <option value="SONTERRA VILLA NAPOLES II QTO">
                          SONTERRA VILLA NAPOLES II QTO
                        </option>
                        <option value="VARENNA QRO">VARENNA QRO</option>
                        <option value="VILLA LORETO CUU">
                          VILLA LORETO CUU
                        </option>
                        <option value="VILLA NAPOLES CUU">
                          VILLA NAPOLES CUU
                        </option>
                        <option value="VILLA NAPOLES IV QRO">
                          VILLA NAPOLES IV QRO
                        </option>
                        <option value="VILLA NAPOLES V QRO">
                          VILLA NAPOLES V QRO
                        </option>
                        <option value="VILLA TOLEDO QRO">
                          VILLA TOLEDO QRO
                        </option>
                        <option value="ZAKIA CELESTE QRO">
                          ZAKIA CELESTE QRO
                        </option>
                        <option value="ALLEZA NORTE">ALLEZA NORTE</option>
                        <option value="MAGENTA QRO">MAGENTA QRO</option>
                        <option value="ALLEGRA VALLE CONDESA">ALLEGRA VALLE CONDESA</option>
                        <option value="FRACCIONAMIENTO MAGENTA DEPTOS QRO">FRACCIONAMIENTO MAGENTA DEPTOS QRO</option>
                        <option value="FRACCIONAMIENTO ALLEZA MIRADOR FASE 1">FRACCIONAMIENTO ALLEZA MIRADOR FASE 1</option>
                        <option value="FRACCIONAMIENTO PITAHAYA QRO">FRACCIONAMIENTO PITAHAYA QRO</option>
                        <option value="MAGENTA DEPTOS QRO">MAGENTA DEPTOS QRO</option>
                        <option value="ALLEZA MIRADOR FASE 1">ALLEZA MIRADOR FASE 1</option>
                        <option value="PITAHAYA QRO">PITAHAYA QRO</option>
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
                        <option value="AMARELLO QRO">AMARELLO QRO</option>
                        <option value="ANCONA CUU">ANCONA CUU</option>
                        <option value="BIANCO CASA M">BIANCO CASA M</option>
                        <option value="BOREAL CUU">BOREAL CUU</option>
                        <option value="CELESTE QRO">CELESTE QRO</option>
                        <option value="CERADA SAVAL">CERADA SAVAL</option>
                        <option value="CERRADA ALEARDI">CERRADA ALEARDI</option>
                        <option value="CERRADA CARLOTTI">
                          CERRADA CARLOTTI
                        </option>
                        <option value="CERRADA CATENA">CERRADA CATENA</option>
                        <option value="CERRADA FERROVIA">
                          CERRADA FERROVIA
                        </option>
                        <option value="CERRADA FIORELO">CERRADA FIORELO</option>
                        <option value="CERRADA FRANCESCO">
                          CERRADA FRANCESCO
                        </option>
                        <option value="CERRADA GARIBALDI">
                          CERRADA GARIBALDI
                        </option>
                        <option value="CERRADA NUOVO">CERRADA NUOVO</option>
                        <option value="CERRADA SAVAL">CERRADA SAVAL</option>
                        <option value="Cerrada Victoria">
                          Cerrada Victoria
                        </option>
                        <option value="COLISEO">COLISEO</option>
                        <option value="FERRARA I">FERRARA I</option>
                        <option value="Las Misiones">Las Misiones</option>
                        <option value="LIMONCELLO">LIMONCELLO</option>
                        <option value="LORETO">LORETO</option>
                        <option value="LORETTO">LORETTO</option>
                        <option value="MONTICELLO">MONTICELLO</option>
                        <option value="MONTICELLO CUU">MONTICELLO CUU</option>
                        <option value="MONTICELLO FASE IV">
                          MONTICELLO FASE IV
                        </option>
                        <option value="MONTICELLO I, II">
                          MONTICELLO I, II
                        </option>
                        <option value="MONTICELLO II CUU">
                          MONTICELLO II CUU
                        </option>
                        <option value="MONTICELLO III">MONTICELLO III</option>
                        <option value="MONTICELLO III CUU">
                          MONTICELLO III CUU
                        </option>
                        <option value="MONTICELLO IV">MONTICELLO IV</option>
                        <option value="MONTICELLO V">MONTICELLO V</option>
                        <option value="MONTICELLO VI">MONTICELLO VI</option>
                        <option value="MURANO I">MURANO I</option>
                        <option value="MURANO II">MURANO II</option>
                        <option value="MURANO II2">MURANO II2</option>
                        <option value="NAPOLES CUU">NAPOLES CUU</option>
                        <option value="NAPOLES II">NAPOLES II</option>
                        <option value="NAPOLES III CUU">NAPOLES III CUU</option>
                        <option value="NAPOLES IV">NAPOLES IV</option>
                        <option value="NAPOLES IV CUU">NAPOLES IV CUU</option>
                        <option value="NAPOLES V">NAPOLES V</option>
                        <option value="NUVOLE">NUVOLE</option>
                        <option value="ORLEANS I CUU">ORLEANS I CUU</option>
                        <option value="ORLEANS II CUU">ORLEANS II CUU</option>
                        <option value="PROVENZA ARLES">PROVENZA ARLES</option>
                        <option value="PROVENZA AVI—ON">PROVENZA AVI—ON</option>
                        <option value="PROVENZA CASSIS">PROVENZA CASSIS</option>
                        <option value="PROVENZA MARSELLA">
                          PROVENZA MARSELLA
                        </option>
                        <option value="PROVENZA NIZA">PROVENZA NIZA</option>
                        <option value="SANTA LUCIA">SANTA LUCIA</option>
                        <option value="SANTORINI QTO">SANTORINI QTO</option>
                        <option value="SAVONA">SAVONA</option>
                        <option value="SAVONA ETAPA C">SAVONA ETAPA C</option>
                        <option value="SAVONA ETAPA D">SAVONA ETAPA D</option>
                        <option value="SAVONA ETAPA E">SAVONA ETAPA E</option>
                        <option value="TOLEDO">TOLEDO</option>
                        <option value="TRAMONTO">TRAMONTO</option>
                        <option value="VARENNA QRO">VARENNA QRO</option>
                        <option value="CERRADA VENECIA">CERRADA VENECIA</option>
                        <option value="ALLEZA NORTE">ALLEZA NORTE</option>
                        <option value="MAGENTA QRO">MAGENTA QRO</option>
                        <option value="FERRARA I E2">FERRARA I E2</option>
                        <option value="VALLE CONDESA">VALLE CONDESA</option>
                        <option value="ALLEZA MIRADOR FASE 1">ALLEZA MIRADOR FASE 1</option>
                        <option value="PITAHAYA">PITAHAYA</option>
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
                        <option value="1A SANTA MARIA">1A SANTA MARIA</option>
                        <option value="1B">1B</option>
                        <option value="1B SANTA MARIA">1B SANTA MARIA</option>
                        <option value="2A">2A</option>
                        <option value="2A SANTA CATALINA">
                          2A SANTA CATALINA
                        </option>
                        <option value="2B">2B</option>
                        <option value="2B SANTA CATALINA">
                          2B SANTA CATALINA
                        </option>
                        <option value="5A">5A</option>
                        <option value="5B">5B</option>
                        <option value="6B ESQ">6B ESQ</option>
                        <option value="6B ESQ SAN JOSE">6B ESQ SAN JOSE</option>
                        <option value="ALISEO A">ALISEO A</option>
                        <option value="ALISEO B">ALISEO B</option>
                        <option value="AMALFI A">AMALFI A</option>
                        <option value="AMALFI B">AMALFI B</option>
                        <option value="AMALIFI A">AMALIFI A</option>
                        <option value="BELLAGIO A">BELLAGIO A</option>
                        <option value="BERNINI 82 A">BERNINI 82 A</option>
                        <option value="BERNINI A">BERNINI A</option>
                        <option value="BERNINI A UM">BERNINI A UM</option>
                        <option value="BERNINI AMPL">BERNINI AMPL</option>
                        <option value="BERNINI B">BERNINI B</option>
                        <option value="BLU A">BLU A</option>
                        <option value="BLU B">BLU B</option>
                        <option value="BORA B">BORA B</option>
                        <option value="CAPRI A">CAPRI A</option>
                        <option value="CAPRI B">CAPRI B</option>
                        <option value="CELESTE A">CELESTE A</option>
                        <option value="CELESTE B">CELESTE B</option>
                        <option value="DORATO A">DORATO A</option>
                        <option value="DORATO B">DORATO B</option>
                        <option value="FLORENTININO A">FLORENTININO A</option>
                        <option value="FLORENTINO 70 A">FLORENTINO 70 A</option>
                        <option value="FLORENTINO 70 B">FLORENTINO 70 B</option>
                        <option value="FLORENTINO 70 C">FLORENTINO 70 C</option>
                        <option value="FLORENTINO 90 B">FLORENTINO 90 B</option>
                        <option value="FLORENTINO A">FLORENTINO A</option>
                        <option value="FLORENTINO A 70">FLORENTINO A 70</option>
                        <option value="FLORENTINO B">FLORENTINO B</option>
                        <option value="FLORENTINO B 70">FLORENTINO B 70</option>
                        <option value="GENOVA">GENOVA</option>
                        <option value="GENOVA 121 SANTA LUCIA CUU">
                          GENOVA 121 SANTA LUCIA CUU
                        </option>
                        <option value="GENOVA A">GENOVA A</option>
                        <option value="GENOVA B">GENOVA B</option>
                        <option value="GENOVA C">GENOVA C</option>
                        <option value="LECCO A">LECCO A</option>
                        <option value="LUCCA A">LUCCA A</option>
                        <option value="LUCCA B">LUCCA B</option>
                        <option value="LUCCIANA A">LUCCIANA A</option>
                        <option value="LUCCIANA B">LUCCIANA B</option>
                        <option value="LUCCIANA BL">LUCCIANA BL</option>
                        <option value="LYON A">LYON A</option>
                        <option value="LYON B">LYON B</option>
                        <option value="LYON C">LYON C</option>
                        <option value="LYON CL">LYON CL</option>
                        <option value="LYON QTO">LYON QTO</option>
                        <option value="MAGENTA A">MAGENTA A</option>
                        <option value="MAGENTA B">MAGENTA B</option>
                        <option value="MARBELLA 95 A">MARBELLA 95 A</option>
                        <option value="MARBELLA 95 B">MARBELLA 95 B</option>
                        <option value="MARBELLA A">MARBELLA A</option>
                        <option value="MARBELLA B">MARBELLA B</option>
                        <option value="MARRONE A">MARRONE A</option>
                        <option value="MARRONE B">MARRONE B</option>
                        <option value="MARSELLA A">MARSELLA A</option>
                        <option value="MARSELLA A ROOF TOP MTY">
                          MARSELLA A ROOF TOP MTY
                        </option>
                        <option value="MARSELLA B">MARSELLA B</option>
                        <option value="MARSELLA B ROOF TOP MTY">
                          MARSELLA B ROOF TOP MTY
                        </option>
                        <option value="MILANO A">MILANO A</option>
                        <option value="MILANO B">MILANO B</option>
                        <option value="MILANO C">MILANO C</option>
                        <option value="MISTRAL A">MISTRAL A</option>
                        <option value="MISTRAL B">MISTRAL B</option>
                        <option value="MISTRAL IS">MISTRAL IS</option>
                        <option value="MODENA A">MODENA A</option>
                        <option value="MODENA B">MODENA B</option>
                        <option value="NAPOLI A">NAPOLI A</option>
                        <option value="NAPOLI B">NAPOLI B</option>
                        <option value="NERO A">NERO A</option>
                        <option value="NERO B">NERO B</option>
                        <option value="NIZA A">NIZA A</option>
                        <option value="NIZA B">NIZA B</option>
                        <option value="OLIMPIA A">OLIMPIA A</option>
                        <option value="OLIMPIA B">OLIMPIA B</option>
                        <option value="ORLEANS A">ORLEANS A</option>
                        <option value="ORLEANS B">ORLEANS B</option>
                        <option value="P-103">P-103</option>
                        <option value="P-94">P-94</option>
                        <option value="P-96">P-96</option>
                        <option value="PISA A">PISA A</option>
                        <option value="PISA A-UNI">PISA A-UNI</option>
                        <option value="PISA B">PISA B</option>
                        <option value="PISA C">PISA C</option>
                        <option value="POPOTLA TIPO A">POPOTLA TIPO A</option>
                        <option value="POPOTLA TIPO B">POPOTLA TIPO B</option>
                        <option value="POPOTLA TIPO C">POPOTLA TIPO C</option>
                        <option value="POPOTLA TIPO D">POPOTLA TIPO D</option>
                        <option value="POPOTLA TIPO E">POPOTLA TIPO E</option>
                        <option value="POPOTLA TIPO F">POPOTLA TIPO F</option>
                        <option value="POPOTLA TIPO G">POPOTLA TIPO G</option>
                        <option value="POPOTLA TIPO H">POPOTLA TIPO H</option>
                        <option value="POPOTLA TIPO I">POPOTLA TIPO I</option>
                        <option value="POPOTLA TIPO J">POPOTLA TIPO J</option>
                        <option value="POPOTLA TIPO K">POPOTLA TIPO K</option>
                        <option value="POPOTLA TIPO L">POPOTLA TIPO L</option>
                        <option value="SABOYA 110 B">SABOYA 110 B</option>
                        <option value="SABOYA A">SABOYA A</option>
                        <option value="SABOYA B">SABOYA B</option>
                        <option value="SABOYA C/C">SABOYA C/C</option>
                        <option value="TERRENO COM IS">TERRENO COM IS</option>
                        <option value="TORINO A">TORINO A</option>
                        <option value="TORINO B">TORINO B</option>
                        <option value="VENECIA A">VENECIA A</option>
                        <option value="VENECIA B">VENECIA B</option>
                        <option value="VENECIA C">VENECIA C</option>
                        <option value="VENECIA D">VENECIA D</option>
                        <option value="VILLANOVA 73 B">VILLANOVA 73 B</option>
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
                        <option value="VIOLA B">VIOLA B</option>
                        <option value="VIOLA C">VIOLA C</option>
                        <option value="SIENA A">SIENA A</option>
                        <option value="TORINO B 5.50">TORINO B 5.50</option>
                        <option value="PADERNO A">PADERNO A</option>
                        <option value="PADERNO B">PADERNO B</option>
                        <option value="VARESE D PH">VARESE D PH</option>
                        <option value="SIENA A ROOF">SIENA A ROOF</option>
                        <option value="ACANTO A">ACANTO A</option>
                        <option value="LARIS A">LARIS A</option>
                        <option value="VARESE C PH">VARESE c PH</option>
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
                      <Label htmlFor="prospecto">Entrega Escrituras</Label>
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
              </Form>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
}

export default withAuth(Nuevo_Cliente);
