import * as React from "react";
import Card from "../../../components/Card/Card";
import InfoCard from "../../../components/InformationElements/InfoCard";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import { removeToken } from "../../../util/UtilFunctions";
import PlaylistTable from "../../Tables/PlaylistTable";
import { useReduxFetch } from "../../../util/CustomHooks";
import RequestReducer from "../../../redux/RequestReducer";
import { spotifyToken } from "../../../api/Spotify";
import SpotifyBar from "../../../components/Input/SpotifyBar";
import RouteConfig from "../../../config/RouteConfig.json";
import LabelConfig from "../../../config/LabelConfig.json";
import "./MainPanel.scss";

/**
 * Main page container to display Main page elements(Playlist table, Info card, SearchBar , etc.)
 * @returns Main page container
 */
export default function MainPanel() {
  //To fetch spotify token and put it to redux
  useReduxFetch(
    spotifyToken,
    (state) => state.request.spotifyToken,
    RequestReducer.ActionType.SPOTIFY_TOKEN
  );
  return (
    <Page className="main">
      <div className="flex-column main-container">
        <div className="flex-row header">
          <SpotifyBar className="spotify-bar" />
          <RouteLink link={RouteConfig.LOGIN} callback={removeToken}>
            {LabelConfig.LOGOUT_LABEL}
          </RouteLink>
        </div>
        <div className="flex-row content">
          <Card className="table-card">
            <PlaylistTable />
          </Card>
          <InfoCard
            className="anthem-card"
            imageSource={
              "https://c-cl.cdn.smule.com/rs-s29/arr/e7/bc/bf4bae60-3fd0-4c4a-82e9-c2c56ce78140_1024.jpg"
            }
            header={LabelConfig.ANTHEM_HEADER}
            label="Enchanters"
          />
        </div>
      </div>
    </Page>
  );
}
