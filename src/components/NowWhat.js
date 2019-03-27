import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

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

class NowWhat extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const {
      classes,
      loading,
      name,
      temperatureinFahrenheit,
      weather_state_name,
      latitude,
      longitude,
      timestamp
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Dashboard Visualization" />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText>Where's the drone?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <b>{name}</b>
              </ListItemText>
            </ListItem>
            <hr />
            <ListItem>
              <ListItemText>What's the weather like?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <b>{weather_state_name}</b>
              </ListItemText>
            </ListItem>
            <hr />
            <ListItem>
              <ListItemText>Temperature?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>{temperatureinFahrenheit}</ListItemText>
            </ListItem>
            <hr />
            <ListItem>
              <ListItemText>Latitude?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <b>{latitude}</b>
              </ListItemText>
            </ListItem>{" "}
            <hr />
            <ListItem>
              <ListItemText>Longitude?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <b>{longitude}</b>
              </ListItemText>
            </ListItem>{" "}
            <hr />
            <ListItem>
              <ListItemText>When did it last check in?</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <b>{(moment() - timestamp) / 1000000}</b>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude,
    timestamp
  } = state.weather;
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    latitude,
    longitude,
    timestamp
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(NowWhat));
