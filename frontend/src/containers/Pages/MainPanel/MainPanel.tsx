import * as React from "react";
import Card from "../../../components/Card/Card";
import InfoCard from "../../../components/InformationElements/InfoCard";
import Table from "../../../components/InformationElements/Table";
import SearchBar from "../../../components/Input/SearchBar";
import RouteLink from "../../../components/Link/RouteLink";
import Page from "../../../components/Page/Page";
import "./MainPanel.scss";
import PlayListTable from "./PlaylistTable";


export default function MainPanel() {
  return (
    <Page className="main">
      <div className="flex-column main-container">
        <div className="flex-row header">
          <SearchBar list={[]} filterAttributes={[]} callback={() => {}} />
          <RouteLink link="/login">logout</RouteLink>
        </div>
        <div className="flex-row content">
          <Card className="table-card">
            <PlayListTable/>
          </Card>
          <InfoCard imageSource={"imageSource"} label={"label"} />
        </div>
      </div>
    </Page>
  );
}
