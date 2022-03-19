import React from "react";

// Two props: a title and the thoughts array.
// Destructure argument data to avoid using props.title, props.thought.
const ThoughtList = ({ thoughts, title }) => {
  // Check for thought id.
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          // Key helps React internally track which data needs to be re-rendered if somethinv changes.
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                {/* If no reactions, user will start the discussion by adding the first reaction. If reactions, user will view or add their own reaction to an existing list. */}
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
