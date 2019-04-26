import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import MapWithAMarker from "./Map";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class Main extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { classes, latitude, longitude } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          <MapWithAMarker
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={[29.7182469, -95.40052039999999]}
            zoom={5}
            latitude={latitude}
            longitude={longitude}
          />
        </CardContent>
      </Card>
    );
  }
}

const mapState = state => {
  const { latitude, longitude } = state.drone;
  return {
    latitude,
    longitude
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Main));
