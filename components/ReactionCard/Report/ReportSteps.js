import React, { useState, useRef } from "react";
import { List } from "@mui/material";
import { ReportStep, FinalStep, Subtitle } from "./Report.styled";
import { steps } from "./constants";

export default function ReportSteps({ id, url, commentType }) {
  const [currentStep, setCurrentStep] = useState('start')
  const handleNextStep = (value) => {
    if (value.action === 'update_type') {
      report.current.reportable_type = commentType
    }
    if (value.action === 'update_message') {
      report.current.message = value.text
    }
    setCurrentStep(value.next_step)
  };

  const report = useRef(
    {
      reportable_type: "",
      reportable_id: id,
      message: "",
      url: url
    }
  )

  const handleValues = () => console.log('final', report);

  return (
    <>
      {currentStep === "final" ? (
        <>
          <Subtitle>Thanks for reporting this</Subtitle>
          <FinalStep onClick={handleValues} text={steps.final.text} />
        </>
      ) : (
        <>
          <Subtitle>Why are you reporting this account?</Subtitle>
          <List as="div">
            {Object.entries(steps[currentStep]).map(([key, value]) => {
              console.log("key", key, value);
              return (
                <ReportStep
                  key={key}
                  text={value.text}
                  onClick={() => handleNextStep(value)}
                />
              );
            })}
          </List>
        </>
      )}
    </>
  );
}
