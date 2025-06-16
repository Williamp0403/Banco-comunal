import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { formatCurrency } from "../utils/formatCurrency";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  table: {
    display: "table",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  header: {
    fontWeight: "bold", 
  },
  cell: {
    fontSize: 10,
    paddingHorizontal: 6,
    width: "16%",
  },
  rightAlignedCell: {
    fontSize: 10,
    paddingHorizontal: 6,
    width: "16%",
    textAlign: "right",
  },
});

export function PDF({ movements }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Movimientos</Text>

        {movements?.length > 0 ? (
          <View style={styles.table}>
            {/* Encabezados en negrita */}
            <View style={[styles.row, styles.header]}>
              <Text style={styles.cell}>Fecha</Text>
              <Text style={styles.cell}>Proyecto</Text>
              <Text style={styles.cell}>Responsable</Text>
              <Text style={styles.cell}>Tipo</Text>
              <Text style={styles.cell}>Descripción</Text>
              <Text style={styles.rightAlignedCell}>Monto</Text>
            </View>

            {/* Filas */}
            {movements.map((movement) => (
              <View key={movement.id_movimiento} style={styles.row}>
                <Text style={styles.cell}>{movement.fecha}</Text>
                <Text style={styles.cell}>{movement.nombre_proyecto}</Text>
                <Text style={styles.cell}>{movement.nombre_usuario + " " + movement.apellido_usuario}</Text>
                <Text style={styles.cell}>{movement.transaccion}</Text>
                <Text style={styles.cell}>{movement.descripcion}</Text>
                <Text style={styles.rightAlignedCell}>{formatCurrency(movement.monto)} Bs</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No se encontraron movimientos.</Text>
        )}
      </Page>
    </Document>
  );
}
