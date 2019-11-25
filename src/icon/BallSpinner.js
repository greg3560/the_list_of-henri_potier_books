import React from "react";
const BallSpinner = props => (
    <svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid" className="lds-ball">
        <circle cx="50" ng-attr-cy="{{config.cy}}" ng-attr-r="{{config.radius}}" ng-attr-fill="{{config.color}}"
                cy="31.9945" r="13" fill="#2196f3">
            <animate attributeName="cy" calcMode="spline" values="23;77;23" keyTimes="0;0.5;1" dur="1"
                     keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9" begin="0s" repeatCount="indefinite"></animate>
        </circle>
    </svg>
);

export default BallSpinner;