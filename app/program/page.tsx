/* eslint-disable no-console */
"use client";

import withAuth from "@/hoc/withAuth";

function Program() {
  return (
    <div className="w-full min-w-80 flex flex-col items-center justify-center">
      <div>
        <h1 className="title">Program</h1>
        <p className="subtitle">Create your own training program</p>
      </div>
    </div>
  );
}

export default withAuth(Program);
