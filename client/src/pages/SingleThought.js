import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from "../components/ReactionList";

function SingleThought(props) {
  const { id: thoughtId } = useParams();
  console.log("thought id", thoughtId);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="card mb-3">
          <p className="card-header">
            <span style={{ fontWeight: 700 }} className="text-light">
              {thought.username}
            </span>{" "}
            thought on {thought.createdAt}
          </p>
          <div className="card-body">
            <p>{thought.thoughtText}</p>
          </div>
        </div>
      </div>

      {/* Passes reactions array as a prop, combined with a thought.reactionCount > 0 to prevent rendering reactions if array is empty. */}
      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
    </div>
  );
};

export default SingleThought;
