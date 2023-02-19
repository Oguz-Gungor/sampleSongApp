import * as React from "react";
import Card from "../../../components/Card/Card";
import InfoCard from "../../../components/InformationElements/InfoCard";
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
            <PlayListTable />
          </Card>
          <InfoCard
            className="anthem-card"
            imageSource={
              "https://c-cl.cdn.smule.com/rs-s29/arr/e7/bc/bf4bae60-3fd0-4c4a-82e9-c2c56ce78140_1024.jpg"
            }
            header={"Anthem"}
            label="Enchanters"
          />
        </div>
      </div>
    </Page>
  );
}
