import React from "react";
import { Link } from "react-router-dom";

// Being given reactions array as a prop, which can be mapped into a list of <P> elements.
const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Reactions</span>
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map((reaction) => (
            <p className="pill mb-3" key={reaction._id}>
              {reaction.reactionBody} {"// "}
              <Link
                to={`/profile/${reaction.username}`}
                style={{ fontWeight: 700 }}
              >
                {reaction.username} on {reaction.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
