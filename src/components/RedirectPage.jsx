import React from "react";
import _ from "lodash";
import { getParamValues } from "../utils/functions";

import {
  LSTORAGE_KEY_PARAMS,
  LSTORAGE_KEY_EXPIRY_TIME,
} from "../utils/constants";

export default class RedirectPage extends React.Component {
  componentDidMount() {
    const { setExpiryTime, history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        return history.push("/dashboard");
      }
      const access_token = getParamValues(location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem(LSTORAGE_KEY_PARAMS, JSON.stringify(access_token));
      localStorage.setItem(LSTORAGE_KEY_EXPIRY_TIME, expiryTime);
      setExpiryTime(expiryTime);
      history.push("/dashboard");
    } catch (error) {
      history.push("/");
    }
  }
  render() {
    return null;
  }
}
