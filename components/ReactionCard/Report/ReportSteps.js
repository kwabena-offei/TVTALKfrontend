import React, { useState, useRef } from "react";
import { List, Box, DialogContent, DialogTitle } from "@mui/material";
import { ReportStep, FinalStep, Subtitle, BackArrow } from "./Report.styled";
import { steps } from "./constants";

export default function ReportSteps({ id, url, commentType, onClose }) {
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
  const handlePreviousStep = () => {
    if (steps[currentStep].prev_step === 'key') {
      setCurrentStep(report.current.reportable_type)
    }
    if (currentStep === report.current.reportable_type) {
      setCurrentStep('start')
    }
  }

  const report = useRef(
    {
      reportable_type: "",
      reportable_id: id,
      message: "",
      url: url
    }
  )

  const handleValues = () => {
    console.log('final', report.current)
    if (report.current.reportable_type === 'Comment') {
      report.current.reportable_type = commentType
      console.log('inside', report.current)
    }
    onClose()
  };

  return (
    <>
      <Box>
        <BackArrow onClick={currentStep === 'start' ? onClose : handlePreviousStep} />
        <DialogTitle>Report</DialogTitle>
      </Box>
      <DialogContent>
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
                    onClick={() => handleNextStep(key, value)}
                  />
                );
              })}
            </List>
          </>
        )}
      </DialogContent>
    </>
  );
}
