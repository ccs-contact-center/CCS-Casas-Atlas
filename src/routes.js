import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

// eslint-disable-next-line
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Inicio = React.lazy(() => import("./views/Inicio"));
const Buscador = React.lazy(() => import("./views/Buscador"));
const Reportes = React.lazy(() => import("./views/Reportes"));
const NuevaLlamada = React.lazy(() => import("./views/Nueva_Llamada"));
const LlamadaATC = React.lazy(() => import("./views/Llamada_ATC"));
const LlamadaGeneral = React.lazy(() => import("./views/Llamada_General"));
const NuevoCliente = React.lazy(() => import("./views/Nuevo_Cliente"));
const BusquedaRACS = React.lazy(() => import("./views/Busqueda_RACS"));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Inicio", name: "Inicio", component: Inicio },
  { path: "/Nueva_Llamada", name: "Nueva Llamada", component: NuevaLlamada },
  { path: "/Nuevo_Cliente", name: "Nuevo Cliente", component: NuevoCliente },
  { path: "/Llamada_ATC", name: "Llamada ATC", component: LlamadaATC },
  { path: "/Llamada_General", name: "Llamada General", component: LlamadaGeneral },
  { path: "/Buscador", name: "Consulta Leads", component: Buscador },
  { path: "/Reportes", name: "Reportes", component: Reportes },
  { path: "/Busqueda_RACS", name: "Busqueda RACS", component: BusquedaRACS }
];

export default routes;
