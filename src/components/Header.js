import React from "react";
import {Route} from "react-router-dom";
import TopicHeaderCard from "./TopicHeaderCard";

const CreatePages = ({match: {url}, coreTopics}) => {
    return (
        <React.Fragment>
            <Route path = {`${url}/:topicId`} render = {
                ({ match }) =>
                <TopicHeaderCard {...coreTopics.find(topic => topic.id === match.params.topicId)}/>}
            />
        </React.Fragment>
    )
}

export default CreatePages;