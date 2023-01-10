import React, { useState, useRef } from "react";
import { List } from "@mui/material";
import { ReportStep, FinalStep } from "./Report.styled";
import { steps } from "./constants";

export default function ReportSteps({ id, url }) {
  const [currentStep, setCurrentStep] = useState('start')
  const handleNextStep = (key, value) => {
    if (value.action === 'update_type') {
      report.current.reportable_type = key
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
  console.log('report', report)
  const handleValues = () => console.log('final');

  return (
    <>
    { currentStep === 'final'
      ? <FinalStep onClick={handleValues} text={steps.final.text} />
      : <List as='div'>
        {Object.entries(steps[currentStep]).map(([key, value]) => {
          console.log('key', key, value)
          return (
          <ReportStep
            key={key}
            text={value.text}
            onClick={() => handleNextStep(key, value)}
            />)
        })}
      </List>
    }
    </>
  );
}
