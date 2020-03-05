import React, { Component } from "react";
//import ChartComponent from "react-chartjs-2";
//import { ReactTabulator } from "react-tabulator"; // for React 15.x, use import { React15Tabulator }
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";

//import "chartjs-plugin-funnel";
//import "chartjs-plugin-deferred";
/*import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Button,
  ButtonGroup,
  CardHeader
  //CardGroup
} from "reactstrap";*/

import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import Loader from "react-loader-spinner";
//import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import withAuth from "../components/withAuth";
import API_CCS from "../components/API_CCS";
//import WidgetCard from '../../../components/charts/WidgetCard';

//import moment from "moment";
import "moment/locale/es";

const brandPrimary = getStyle("--primary");
//const brandInfo = getStyle('--info')

/*const columns = [
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
};*/

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.API_CCS = new API_CCS();
    //this.fetchAll = this.fetchAll.bind(this);
    //this.updateMainGraph = this.updateMainGraph.bind(this);
    //this.setStatus = this.setStatus.bind(this);

    this.state = {
      loading: false,
      loadMainGraph: false,
      percentKPI: false,
      selectedInterval: 2,
      mainChartData: {},
      mainChartOpts: {},
      data: [],
      status_lead: null
    };

    //setInterval(() => this.fetchAll(), 900000);
  }

  /*

  closeUpdate = () => {
    this.setState({ status_lead: null });
  };

  async fetchAll() {
    this.setState({ loading: true });

    this.updateMainGraph();

    this.setState({ loading: false });
  }

  async updateMainGraph() {
    this.setState({ loadMainGraph: true });

    var data = await this.API_CCS.getStatus(this.state.selectedInterval);

    var dataLabels = [];

    var otro = await this.requestUpdate(
      this.state.selectedInterval,
      this.state.status_lead
    );

    this.setState({ data: otro });

    JSON.stringify(data, (key, value) => {
      if (key === "status") dataLabels.push(value);
      return value;
    });

    var dataSet = [];

    JSON.stringify(data, (key, value) => {
      if (key === "Cuenta") dataSet.push(value);
      return value;
    });

    this.setState({ percentKPI: false });

    var mainChartOpts;

    mainChartOpts = {
      topWidth: 20,
      sort: "desc",
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "bottom"
      },
      tooltips: {
        enabled: true,
        mode: "point",
        position: "average"
      },
      plugins: {
        deferred: {
          delay: 200
        }
      }
    };

    this.setState({ mainChartOpts: mainChartOpts });

    var mainChartData = {
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            "rgba(192, 3, 39,1)",
            "rgba(208, 66, 93,1)",
            "rgba(216, 98, 120,1)",
            "rgba(231, 161, 174,1)",
            "rgba(247, 224, 228,1)"
          ],
          hoverBackgroundColor: [
            "rgba(192, 3, 39,.9)",
            "rgba(208, 66, 93,.9)",
            "rgba(216, 98, 120,.9)",
            "rgba(231, 161, 174,.9)",
            "rgba(247, 224, 228,.9)"
          ]
        }
      ],
      labels: dataLabels
    };

    this.setState({ mainChartData: mainChartData });

    this.setState({ loadMainGraph: false });
  }

  getYear(numero) {
    switch (numero) {
      case "01":
        return "Enero";
      case "02":
        return "Febrero";
      case "03":
        return "Marzo";
      case "04":
        return "Abril";
      case "05":
        return "Mayo";
      case "06":
        return "Junio";
      case "07":
        return "Julio";
      case "08":
        return "Agosto";
      case "09":
        return "Septiembre";
      case "10":
        return "Octubre";
      case "11":
        return "Noviembre";
      case "12":
        return "Diciembre";
      default:
      // code block
    }
  }

  setStatus(status) {
    this.setState({ status_lead: status }, function() {
      this.updateMainGraph();
    });
  }

  selectInterval(selectedInterval) {
    this.setState({ selectedInterval: selectedInterval }, function() {
      this.updateMainGraph();
    });
  }

  updateClick() {
    this.fetchAll();
  }

  componentDidMount() {
   // this.fetchAll();
  }

  requestUpdate = async (tipo, status) => {
    const response = await this.API_CCS.getLayoutFiiltrado(
      this.state.selectedInterval,
      this.state.status_lead
    );
    return response;
  };*/

  render() {
    //var today = new Date();
    //var mes = this.getYear(moment.utc(today).format("MM"));
    //var anio = moment.utc(today).format("YYYY");
    //var tagFecha = mes + " " + anio;

    if (this.state.loading) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div>
            <Loader type="Bars" color={brandPrimary} height="100" width="100" />
          </div>
        </div>
      );
    } else {
      return ( null
        /*<div className="animated fadeIn">
         <CardGroup className="mb-4">
          <WidgetCard icon="icon-speedometer" color="primary" header={this.state.totalVPH} value="100" loading={this.state.loadMainGraph}>VPH</WidgetCard>
          <WidgetCard icon="icon-people" color="primary" header={this.state.totalContactacion} value="100" loading={this.state.loadMainGraph}>Contactación</WidgetCard>
          <WidgetCard icon="icon-notebook" color="primary" header={this.state.totalCitas} value="100" loading={this.state.loadMainGraph}>Citas</WidgetCard>
          <WidgetCard icon="icon-graph" color="primary" header={this.state.totalConversion} value="100" loading={this.state.loadMainGraph}>Conversión</WidgetCard>
        </CardGroup>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className="h4">Funnel Comercial</CardTitle>
                      <div className="small text-muted">{tagFecha}</div>
                    </Col>
                    <div>
                      <Col style={{ float: "right" }}>
                        <ButtonGroup className="flex-wrap">
                          <Button
                            className="flex-wrap"
                            style={{
                              width: 87,
                              fontSize: 10,
                              fontWeight: "bold"
                            }}
                            size="sm"
                            color="outline-secondary"
                            onClick={() => this.selectInterval(1)}
                            active={this.state.selectedInterval === 1}
                          >
                            Semana
                          </Button>
                          <Button
                            className="flex-wrap"
                            style={{
                              width: 87,
                              fontSize: 10,
                              fontWeight: "bold"
                            }}
                            size="sm"
                            color="outline-secondary"
                            onClick={() => this.selectInterval(2)}
                            active={this.state.selectedInterval === 2}
                          >
                            Mes
                          </Button>
                          <Button
                            className="flex-wrap"
                            style={{
                              width: 87,
                              fontSize: 10,
                              fontWeight: "bold"
                            }}
                            size="sm"
                            color="outline-secondary"
                            onClick={() => this.selectInterval(3)}
                            active={this.state.selectedInterval === 3}
                          >
                            Año
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </div>
                  </Row>

                  {this.state.loadMainGraph ? (
                    <div
                      style={{
                        height: "340px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <div>
                        <Loader
                          type="Oval"
                          color={brandPrimary}
                          height="70"
                          width="70"
                        />{" "}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="chart-wrapper animated fadeIn"
                      style={{ height: 300 + "px", marginTop: 40 + "px" }}
                    >
                      <ChartComponent
                        data={this.state.mainChartData}
                        ref={ref =>
                          (this.chartInstance = ref && ref.chartInstance)
                        }
                        options={this.state.mainChartOpts}
                        type="funnel"
                        height={300}
                        onElementsClick={elems => {
                          try {
                          var status_gestion = elems[0]["_model"].label;
                          this.setStatus(status_gestion);
                          } catch (ex){
                            //console.log(ex)
                          }
                        }}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          {this.state.status_lead === null ? null : (
            <div className="animated fadeIn">
              <Row>
                <Col>
                  <Card>
                    <CardHeader className="text-center">
                      Leads
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
                    <CardBody className="text-center">
                      <ReactTabulator
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
          )}

          <Row>
          <Col>

            <Card>
            <CardHeader>Medio Quejas</CardHeader>
              <CardBody>
                <div className="chart-wrapper" style={{ height: 250 + 'px' }}>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
            <CardHeader>Top 5 Motivos de Queja</CardHeader>
              <CardBody>
                <div className="chart-wrapper" style={{ height: 250 + 'px'}}>
              
                </div>
              </CardBody>
            </Card>
          </Col>          
        </Row>
          </div>*/
      );
    }
  }
}

export default withAuth(Dashboard);
