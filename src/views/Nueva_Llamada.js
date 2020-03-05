import React, { Component } from "react";
import withAuth from "../components/withAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Nueva_Llamada extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  componentDidMount() {
    MySwal.fire({
      title: "Nueva Llamada",
      allowOutsideClick: false,
      text: "Elige el tipo de llamada",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#C00327",
      cancelButtonColor: "#C00327",
      confirmButtonText: "Atención",
      cancelButtonText: "General"
    }).then(result => {

      if (result.value) {
        this.props.history.replace("/Llamada_ATC");
      } else {
        this.props.history.replace("/Llamada_General");
      }
    });
  }

  render() {
    return null;
  }
}

export default withAuth(Nueva_Llamada);
