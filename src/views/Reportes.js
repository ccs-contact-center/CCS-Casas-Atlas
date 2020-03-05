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
  Form
} from "reactstrap";
import Iframe from "react-iframe";
import withAuth from "../components/withAuth";

class Reportes extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  state = {
    data: null,
    fecha_ini: "",
    fecha_fin: "",
    url: "",
    reportID: 0
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleChangeInput(e) {
    this.setState({
      reportID: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var options = {
      hour12: false,
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };

    var fecha_ini = new Intl.DateTimeFormat("es-MX", options).format(
      new Date(Date.parse(this.state.fecha_ini))
    );
    var fecha_fin = new Intl.DateTimeFormat("es-MX", options).format(
      new Date(Date.parse(this.state.fecha_fin))
    );
 

    var composeURL = "";


      if (this.state.reportID === "1") {
        composeURL =
          "https://reportes.ccscontactcenter.com/reports/Pages/ReportViewer.aspx?/Atlas/Llamadas%20Generales&rs:Embed=true&rc:Toolbar=true&rc:Parameters=false&rc:Section=' + 1 + '&FECHA_INI=" +
          fecha_ini +
          "&FECHA_FIN=" +
          fecha_fin;
      }  else if(this.state.reportID === "2") {
        composeURL =
        "https://reportes.ccscontactcenter.com/reports/Pages/ReportViewer.aspx?/Atlas/RACS&rs:Embed=true&rc:Toolbar=true&rc:Parameters=false&rc:Section=' + 1 + '&FECHA_INI=" +
        fecha_ini +
        "&FECHA_FIN=" +
        fecha_fin;
      }
  

    this.setState({ url: composeURL });
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="text-center">Reportes</CardHeader>
              <CardBody className="text-center">
                <Form onSubmit={this.handleFormSubmit}>
                  <Row>
                    <Col className="col-sm-6">
                      <FormGroup>
                        <Label htmlFor="ccmonth">Reporte</Label>

           
                          <Input
                            type="select"
                            name="ccmonth"
                            id="ccmonth"
                            required
                            onChange={this.handleChangeInput}
                          >
                            <option value="">-Selecciona-</option>
                            <option value="1">Llamadas Generales</option>
                            <option value="2">RACS</option>
                          </Input>
                      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-sm-6">
                      <FormGroup>
                        <Label>Fecha Inicial</Label>
                        <Input
                          type="date"
                          id="fecha_ini"
                          value={this.state.fecha_ini}
                          onChange={this.handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="col-sm-6">
                      <FormGroup>
                        <Label>Fecha Final</Label>
                        <Input
                          type="date"
                          id="fecha_fin"
                          value={this.state.fecha_fin}
                          onChange={this.handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button type="submit" className="btn btn-primary">
                        Ejecutar
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>&nbsp;</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Iframe
                        url={this.state.url}
                        width="100%"
                        height="550px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                        style={{ frameBorder: 0 }}
                        frameBorder={0}
                        allowFullScreen
                      />
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAuth(Reportes);
